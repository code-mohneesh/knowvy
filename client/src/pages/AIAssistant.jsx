import { useState, useContext, useEffect } from 'react';
import { MessageSquare, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Chat from '../components/Chat';
import VoiceInterview from './VoiceInterview';

const AIAssistant = () => {
    const [mode, setMode] = useState(null); // null, 'chat', or 'voice'
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Redirect to login if not authenticated
    // useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
    // }, [user, navigate]);
    if (mode === 'chat') {
        return (
            <div>
                <div className="p-4 border-b border-white/10 bg-dark-card/40">
                    <button
                        onClick={() => setMode(null)}
                        className="bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-lg font-bold transition-all"
                    >
                        ← Back to Selection
                    </button>
                </div>
                <Chat />
            </div>
        );
    }

    if (mode === 'voice') {
        return (
            <div>
                <div className="p-4 border-b border-white/10 bg-dark-card/40">
                    <button
                        onClick={() => setMode(null)}
                        className="bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-lg font-bold transition-all"
                    >
                        ← Back to Selection
                    </button>
                </div>
                <VoiceInterview />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="max-w-5xl w-full space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-5xl md:text-6xl font-display font-bold bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple bg-clip-text text-transparent">
                        Knowvy AI Assistant
                    </h1>
                    <p className="text-xl text-gray-400">
                        Choose how you'd like to interact with AI
                    </p>
                </div>

                {/* Mode Selection Cards */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Chat Mode */}
                    <button
                        onClick={() => setMode('chat')}
                        className="glass-panel p-10 group hover:border-neon-blue/50 transition-all duration-300 cursor-pointer relative overflow-hidden"
                    >
                        {/* Animated Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/0 to-neon-blue/0 group-hover:from-neon-blue/10 group-hover:to-neon-blue/5 transition-all duration-500" />

                        <div className="relative z-10 space-y-6">
                            {/* Icon */}
                            <div className="w-20 h-20 rounded-2xl bg-neon-blue/10 flex items-center justify-center text-neon-blue mx-auto group-hover:scale-110 transition-transform duration-300">
                                <MessageSquare size={40} />
                            </div>

                            {/* Title */}
                            <h2 className="text-3xl font-bold text-white group-hover:text-neon-blue transition-colors">
                                Chat Mode
                            </h2>

                            {/* Description */}
                            <p className="text-gray-400 leading-relaxed">
                                Have a text-based conversation with our AI. Perfect for detailed explanations, code help, and in-depth discussions.
                            </p>

                            {/* Features */}
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li className="flex items-center gap-2">
                                    <span className="text-neon-blue">✓</span>
                                    Real-time streaming responses
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-neon-blue">✓</span>
                                    Code syntax highlighting
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-neon-blue">✓</span>
                                    Markdown support
                                </li>
                            </ul>

                            {/* CTA */}
                            <div className="pt-4">
                                <span className="inline-block bg-neon-blue text-black px-6 py-2 rounded-lg font-bold group-hover:shadow-[0_0_20px_rgba(0,200,255,0.5)] transition-all">
                                    Start Chatting →
                                </span>
                            </div>
                        </div>
                    </button>

                    {/* Voice Mode */}
                    <button
                        onClick={() => setMode('voice')}
                        className="glass-panel p-10 group hover:border-neon-green/50 transition-all duration-300 cursor-pointer relative overflow-hidden"
                    >
                        {/* Animated Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-neon-green/0 to-neon-green/0 group-hover:from-neon-green/10 group-hover:to-neon-green/5 transition-all duration-500" />

                        <div className="relative z-10 space-y-6">
                            {/* Icon */}
                            <div className="w-20 h-20 rounded-2xl bg-neon-green/10 flex items-center justify-center text-neon-green mx-auto group-hover:scale-110 transition-transform duration-300">
                                <Mic size={40} />
                            </div>

                            {/* Title */}
                            <h2 className="text-3xl font-bold text-white group-hover:text-neon-green transition-colors">
                                Voice Mode
                            </h2>

                            {/* Description */}
                            <p className="text-gray-400 leading-relaxed">
                                Talk to our AI interviewer using your voice. Ideal for mock interviews, practice sessions, and hands-free interaction.
                            </p>

                            {/* Features */}
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li className="flex items-center gap-2">
                                    <span className="text-neon-green">✓</span>
                                    Voice-to-text conversion
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-neon-green">✓</span>
                                    AI voice responses
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-neon-green">✓</span>
                                    Stop speaking control
                                </li>
                            </ul>

                            {/* CTA */}
                            <div className="pt-4">
                                <span className="inline-block bg-neon-green text-black px-6 py-2 rounded-lg font-bold group-hover:shadow-[0_0_20px_rgba(57,255,20,0.5)] transition-all">
                                    Start Talking →
                                </span>
                            </div>
                        </div>
                    </button>
                </div>

                {/* Info Banner */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                    <p className="text-gray-400">
                        💡 <span className="font-bold text-white">Tip:</span> Both modes use the same powerful AI. Choose based on your preference!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AIAssistant;
