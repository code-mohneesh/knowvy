import { Mail, Github, Linkedin, Twitter, Globe, MapPin, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import adminAvatar from "../assets/admin.png"; // adjust path if needed

const adminInfo = {
    name: "Mohneesh Gupta",
    role: "Platform Admin & Founder",
    bio: "Passionate about building communities and empowering student developers. With a vision to create the ultimate ecosystem for learning, collaboration, and growth, Knowvy was born to bridge the gap between students and opportunities.",
    avatar: adminAvatar,
    email: "work.mohneesh@gmail.com",
    location: "Bhopal, India",
    occupation: "Pre-final year student",
    socials: {
        github: "https://github.com/mohneesh-gupta",
        linkedin: "https://linkedin.com/in/mohneesh-gupta",
        twitter: "https://twitter.com/mohneesh_gupta1",
        portfolio: "https://mohneesh.xyz"
    },
    skills: ["React", "Node.js", "MongoDB", "Tailwind", "AWS", "SQL", "Java", "System Design", "Community Building"],
    achievements: [
        "Organized 50+ hackathons and tech events",
        "Mentored 500+ aspiring developers",
        "Microsoft Student Ambassador",
    ]
};

const AboutAdmin = () => {
    return (
        <div className="min-h-screen py-10">
            <div className="max-w-5xl mx-auto px-6 space-y-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center space-y-4"
                >
                    <h1 className="text-5xl font-display font-bold bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple bg-clip-text text-transparent">
                        Meet the Admin
                    </h1>
                    <p className="text-gray-400 text-lg">
                        The mind behind Knowvy Technologies
                    </p>
                </motion.div>

                {/* Main Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="glass-panel p-8 md:p-12"
                >
                    <div className="grid md:grid-cols-3 gap-8">

                        {/* Avatar & Basic Info */}
                        <div className="md:col-span-1 flex flex-col items-center text-center space-y-4">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-neon-green to-neon-blue rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                                <img
                                    src={adminInfo.avatar}
                                    alt={adminInfo.name}
                                    className="relative w-48 h-48 rounded-full object-cover border-4 border-white/20 shadow-2xl"
                                />
                            </div>

                            <div>
                                <h2 className="text-3xl font-bold text-white">
                                    {adminInfo.name}
                                </h2>
                                <p className="text-neon-blue font-medium">
                                    {adminInfo.role}
                                </p>
                            </div>

                            <a
                                href="https://linkedin.com/in/mohneesh-gupta"
                                className="flex items-center gap-2 bg-gradient-to-r from-neon-green to-neon-blue text-black font-bold px-6 py-3 rounded-lg hover:shadow-[0_0_20px_rgba(57,255,20,0.5)] transition-all"
                            >
                                <Mail size={18} />
                                Contact Me
                            </a>
                        </div>

                        {/* Right Section */}
                        <div className="md:col-span-2 space-y-6">

                            {/* Bio */}
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <span className="w-1 h-6 bg-gradient-to-b from-neon-green to-neon-blue rounded-full" />
                                    About
                                </h3>
                                <p className="text-gray-300 leading-relaxed">
                                    {adminInfo.bio}
                                </p>
                            </div>

                            {/* Details */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <DetailCard
                                    icon={MapPin}
                                    title="Location"
                                    value={adminInfo.location}
                                    color="text-neon-pink"
                                />
                                <DetailCard
                                    icon={Briefcase}
                                    title="Occupation"
                                    value={adminInfo.occupation}
                                    color="text-neon-purple"
                                />
                            </div>

                            {/* Skills */}
                            <div className="space-y-3">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <span className="w-1 h-6 bg-gradient-to-b from-neon-blue to-neon-purple rounded-full" />
                                    Skills
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {adminInfo.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="px-4 py-2 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 border border-neon-blue/30 rounded-full text-sm font-medium text-neon-blue"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Achievements */}
                            <div className="space-y-3">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <span className="w-1 h-6 bg-gradient-to-b from-neon-pink to-neon-purple rounded-full" />
                                    Achievements
                                </h3>
                                <ul className="space-y-2">
                                    {adminInfo.achievements.map((achievement, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start gap-2 text-gray-300"
                                        >
                                            <span className="text-neon-green mt-1">✓</span>
                                            {achievement}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="mt-8 pt-8 border-t border-white/10">
                        <h3 className="text-xl font-bold text-white mb-4 text-center">
                            Connect With Me
                        </h3>
                        <div className="flex justify-center gap-4">
                            <SocialLink icon={Globe} link={adminInfo.socials.portfolio} />
                            <SocialLink icon={Github} link={adminInfo.socials.github} />
                            <SocialLink icon={Linkedin} link={adminInfo.socials.linkedin} />
                            <SocialLink icon={Twitter} link={adminInfo.socials.twitter} />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

/* ---------- Small reusable components ---------- */

const DetailCard = ({ icon: Icon, title, value, color }) => (
    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
        <div className={`flex items-center gap-2 ${color} mb-2`}>
            <Icon size={18} />
            <span className="font-bold">{title}</span>
        </div>
        <p className="text-gray-300">{value}</p>
    </div>
);

const SocialLink = ({ icon: Icon, link }) => (
    <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-neon-green hover:text-black transition-all border border-white/10 hover:border-neon-green"
    >
        <Icon size={22} />
    </a>
);

export default AboutAdmin;
