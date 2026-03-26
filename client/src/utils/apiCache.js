/**
 * apiCache.js — Client-Side API Cache + Request Deduplication
 *
 * =============================================================
 * DSA CONCEPTS APPLIED:
 *
 * 1. HASH MAP (O(1) lookup)
 *    cache = Map  →  key: url  →  value: { data, expiresAt }
 *    Checking if data is fresh is O(1) — same as a dictionary lookup.
 *
 * 2. REQUEST DEDUPLICATION — "In-Flight" Map (Flyweight Pattern)
 *    If two components both fetch /api/hackathons at mount time, only ONE
 *    network request fires. The second caller waits on the same Promise.
 *    This prevents the classic "N simultaneous requests on page load" problem.
 *
 * 3. TTL (Time-To-Live) — Expiry Strategy
 *    After `ttl` ms, the cache entry is considered stale and evicted.
 *    Equivalent to a TTL-keyed priority queue where the min-expiry
 *    entry is the next to be evicted (LRU cache variant).
 *
 * HOW TO USE:
 *   import { cachedGet, invalidateCache } from '../utils/apiCache';
 *   const data = await cachedGet('/api/hackathons', { ttl: 30_000 });
 *
 * After a mutation (create/update/delete), invalidate the relevant cache:
 *   invalidateCache('/api/hackathons');
 * =============================================================
 */

import axios from 'axios';

// In-memory store: url → { data, expiresAt }
const cache = new Map();

// In-flight store: url → Promise  (deduplication)
const inFlight = new Map();

const DEFAULT_TTL = 30_000; // 30 seconds

/**
 * cachedGet(url, options)
 * @param {string}  url             - Full API URL
 * @param {object}  [options]
 * @param {number}  [options.ttl]   - Cache TTL in ms (default 30s)
 * @param {boolean} [options.force] - Bypass cache and force fresh fetch
 * @returns {Promise<any>}          - Axios response .data
 */
export async function cachedGet(url, { ttl = DEFAULT_TTL, force = false } = {}) {
  const now = Date.now();

  // 1. Cache HIT — serve from memory in O(1)
  if (!force && cache.has(url)) {
    const entry = cache.get(url);
    if (entry.expiresAt > now) {
      return entry.data;
    }
    cache.delete(url); // evict stale entry
  }

  // 2. DEDUPLICATION — if a request is already in-flight, share its Promise
  if (inFlight.has(url)) {
    return inFlight.get(url);
  }

  // 3. CACHE MISS — make the actual network request
  const promise = axios.get(url)
    .then(({ data }) => {
      cache.set(url, { data, expiresAt: now + ttl });
      inFlight.delete(url);
      return data;
    })
    .catch((err) => {
      inFlight.delete(url); // don't cache errors — always retry
      throw err;
    });

  inFlight.set(url, promise);
  return promise;
}

/**
 * invalidateCache(url)
 * Call this after a mutation (POST/PUT/DELETE) to force a fresh fetch next time.
 * Pass a partial url to invalidate all matching entries.
 * @param {string} urlOrPrefix
 */
export function invalidateCache(urlOrPrefix) {
  for (const key of cache.keys()) {
    if (key.startsWith(urlOrPrefix)) {
      cache.delete(key);
    }
  }
}

/**
 * clearAllCache()
 * Wipe all cached data — call on logout so stale user data doesn't linger.
 */
export function clearAllCache() {
  cache.clear();
  inFlight.clear();
}
