import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    User,
    Mail,
    MapPin,
    Calendar,
    Briefcase,
    Star,
    Trophy,
    Award,
    Github,
    Twitter,
    Linkedin,
    Globe,
    Edit,
    Settings,
    Camera,
    X,
    Check,
    Heart,
    MessageCircle,
    Users,
    Code2,
    Rocket,
    TrendingUp,
    Clock,
    ExternalLink
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Profile = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [activeTab, setActiveTab] = useState("overview");
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState("/src/assets/avatars/avatar1.png");

    const [profileData, setProfileData] = useState({
        name: "Aarav Sharma",
        title: "Full Stack Developer",
        bio: "Passionate about building scalable web applications with modern technologies. Love collaborating on innovative projects and learning from the community.",
        email: "aarav.sharma@example.com",
        location: "San Francisco, CA",
        website: "aaravsharma.dev",
        github: "aaravsharma",
        twitter: "aarav_dev",
        linkedin: "aaravsharma",
        joinedDate: "January 2023",
        experience: "Advanced",
        availability: "Full-time",
        skills: ["React", "Node.js", "TypeScript", "MongoDB", "AWS", "Docker"],
        languages: ["English", "Hindi", "Spanish"],
        education: "B.S. Computer Science - Stanford University",
        workExperience: "3+ years in web development"
    });

    const [editData, setEditData] = useState({ ...profileData });

    const avatars = [
        "/src/assets/avatars/avatar1.png",
        "/src/assets/avatars/avatar2.png",
        "/src/assets/avatars/avatar3.png",
        "/src/assets/avatars/avatar4.png",
        "/src/assets/avatars/avatar5.png",
        "/src/assets/avatars/avatar6.png",
        "/src/assets/avatars/avatar7.png",
        "/src/assets/avatars/avatar8.png",
        "/src/assets/avatars/avatar9.png",
        "/src/assets/avatars/avatar10.png"
    ];

    const projects = [
        {
            id: 1,
            title: "AI-Powered Task Manager",
            role: "Lead Developer",
            duration: "Jan 2024 - Present",
            status: "in-progress",
            progress: 65,
            description: "Smart task management app with ML prioritization"
        },
        {
            id: 2,
            title: "E-Commerce Platform",
            role: "Full Stack Developer",
            duration: "Sep 2023 - Dec 2023",
            status: "completed",
            progress: 100,
            description: "Full-stack e-commerce solution with real-time features"
        },
        {
            id: 3,
            title: "Mobile Fitness Tracker",
            role: "Frontend Developer",
            duration: "Jun 2023 - Aug 2023",
            status: "completed",
            progress: 100,
            description: "Cross-platform mobile app for fitness tracking"
        }
    ];

    const achievements = [
        { id: 1, title: "Top Contributor", description: "Recognized for outstanding community contributions", icon: Trophy, date: "2024" },
        { id: 2, title: "Project Master", description: "Completed 10+ successful projects", icon: Award, date: "2023" },
        { id: 3, title: "Rising Star", description: "Fastest growing profile in Q4 2023", icon: Star, date: "2023" }
    ];

    const stats = [
        { label: "Projects", value: "12", icon: Briefcase },
        { label: "Collaborators", value: "48", icon: Users },
        { label: "Rating", value: "4.8", icon: Star },
        { label: "Experience", value: "3+ yrs", icon: Trophy }
    ];

    const handleSaveProfile = () => {
        setProfileData(editData);
        setIsEditingProfile(false);
    };

    const handleCancelEdit = () => {
        setEditData({ ...profileData });
        setIsEditingProfile(false);
    };

    const handleAvatarSelect = (avatar) => {
        setSelectedAvatar(avatar);
        setShowAvatarModal(false);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "completed": return "bg-green-100 text-green-700";
            case "in-progress": return "bg-blue-100 text-blue-700";
            case "planning": return "bg-yellow-100 text-yellow-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-gray-900 font-inter">
            <Navbar />

            <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col lg:flex-row gap-8 items-start"
                    >
                        <div className="flex-shrink-0">
                            <div className="relative">
                                <img
                                    src={selectedAvatar}
                                    alt={profileData.name}
                                    className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border-4 border-white shadow-xl"
                                />
                                <button
                                    onClick={() => setShowAvatarModal(true)}
                                    className="absolute bottom-2 right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg"
                                >
                                    <Camera className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h1 className="text-3xl lg:text-4xl font-bold mb-2">{profileData.name}</h1>
                                    <p className="text-xl text-gray-600 mb-4">{profileData.title}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <div className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                            <Briefcase className="w-4 h-4" />
                                            {profileData.experience}
                                        </div>
                                        <div className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                            <Clock className="w-4 h-4" />
                                            {profileData.availability}
                                        </div>
                                        <div className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                                            <MapPin className="w-4 h-4" />
                                            {profileData.location}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsEditingProfile(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm cursor-pointer relative z-10"
                                >
                                    <Edit className="w-4 h-4" />
                                    Edit Profile
                                </button>
                            </div>

                            <p className="text-gray-700 mb-6 max-w-3xl">{profileData.bio}</p>

                            <div className="flex gap-4 mb-6">
                                {profileData.github && (
                                    <a href={`https://github.com/${profileData.github}`} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                                        <Github className="w-5 h-5" />
                                        <span className="text-sm">{profileData.github}</span>
                                    </a>
                                )}
                                {profileData.twitter && (
                                    <a href={`https://twitter.com/${profileData.twitter}`} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                                        <Twitter className="w-5 h-5" />
                                        <span className="text-sm">@{profileData.twitter}</span>
                                    </a>
                                )}
                                {profileData.linkedin && (
                                    <a href={`https://linkedin.com/in/${profileData.linkedin}`} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                                        <Linkedin className="w-5 h-5" />
                                        <span className="text-sm">{profileData.linkedin}</span>
                                    </a>
                                )}
                                {profileData.website && (
                                    <a href={`https://${profileData.website}`} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                                        <Globe className="w-5 h-5" />
                                        <span className="text-sm">{profileData.website}</span>
                                    </a>
                                )}
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {stats.map((stat, index) => (
                                    <div key={index} className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                                        <div className="flex justify-center mb-2">
                                            <stat.icon className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                                        <div className="text-sm text-gray-600">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="absolute top-0 right-0 opacity-20">
                    <div className="w-64 h-64 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-3xl"></div>
                </div>
            </section>

            <section className="py-8 bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-8 border-b border-gray-200">
                        {["overview", "projects", "achievements", "skills"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 px-1 border-b-2 transition-colors capitalize ${activeTab === tab
                                        ? "border-blue-600 text-blue-600"
                                        : "border-transparent text-gray-600 hover:text-gray-900"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {activeTab === "overview" && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="grid lg:grid-cols-3 gap-8"
                        >
                            <div className="lg:col-span-2 space-y-6">
                                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                    <h2 className="text-xl font-semibold mb-4">About</h2>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <Mail className="w-5 h-5 text-gray-400" />
                                            <span>{profileData.email}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <MapPin className="w-5 h-5 text-gray-400" />
                                            <span>{profileData.location}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Calendar className="w-5 h-5 text-gray-400" />
                                            <span>Joined {profileData.joinedDate}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Briefcase className="w-5 h-5 text-gray-400" />
                                            <span>{profileData.workExperience}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Trophy className="w-5 h-5 text-gray-400" />
                                            <span>Education: {profileData.education}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                    <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
                                    <div className="space-y-4">
                                        {projects.map((project) => (
                                            <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <h3 className="font-semibold">{project.title}</h3>
                                                        <p className="text-sm text-gray-600">{project.role}</p>
                                                    </div>
                                                    <div className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                                                        {project.status.replace('-', ' ')}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-gray-700 mb-3">{project.description}</p>
                                                <div className="flex items-center justify-between text-sm text-gray-600">
                                                    <span>{project.duration}</span>
                                                    <div className="flex items-center gap-2">
                                                        <span>Progress: {project.progress}%</span>
                                                        <div className="w-20 bg-gray-200 rounded-full h-2">
                                                            <div
                                                                className="bg-blue-600 h-2 rounded-full"
                                                                style={{ width: `${project.progress}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                    <h2 className="text-xl font-semibold mb-4">Skills</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {profileData.skills.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                    <h2 className="text-xl font-semibold mb-4">Languages</h2>
                                    <div className="space-y-2">
                                        {profileData.languages.map((language, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                                <span>{language}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                    <h2 className="text-xl font-semibold mb-4">Engagement</h2>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Heart className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm">Likes Received</span>
                                            </div>
                                            <span className="font-semibold">234</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <MessageCircle className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm">Comments</span>
                                            </div>
                                            <span className="font-semibold">89</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Users className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm">Collaborations</span>
                                            </div>
                                            <span className="font-semibold">48</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "projects" && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {projects.map((project, index) => (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100 overflow-hidden"
                                    >
                                        <div className="p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                                                    {project.status.replace('-', ' ')}
                                                </div>
                                                <div className="text-sm text-gray-600">{project.progress}%</div>
                                            </div>
                                            <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                                            <p className="text-sm text-gray-600 mb-1">{project.role}</p>
                                            <p className="text-sm text-gray-700 mb-4">{project.description}</p>
                                            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                                                <span>{project.duration}</span>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                                                        style={{ width: `${project.progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-md transition-all duration-200 text-sm font-medium flex items-center justify-center gap-2">
                                                <ExternalLink className="w-4 h-4" />
                                                View Project
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "achievements" && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {achievements.map((achievement, index) => (
                                    <motion.div
                                        key={achievement.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100 p-6"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full">
                                                <achievement.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <span className="text-sm text-gray-600">{achievement.date}</span>
                                        </div>
                                        <h3 className="font-semibold text-lg mb-2">{achievement.title}</h3>
                                        <p className="text-sm text-gray-700">{achievement.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "skills" && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                                <h2 className="text-2xl font-semibold mb-6">Technical Skills</h2>
                                <div className="flex flex-wrap gap-3">
                                    {profileData.skills.map((skill, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full text-blue-700 font-medium"
                                        >
                                            {skill}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>

            {isEditingProfile && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                            <h2 className="text-2xl font-bold">Edit Profile</h2>
                            <button
                                onClick={() => setIsEditingProfile(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                    <input
                                        type="text"
                                        value={editData.name}
                                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={editData.title}
                                        onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                                    <textarea
                                        value={editData.bio}
                                        onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <input
                                            type="email"
                                            value={editData.email}
                                            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                        <input
                                            type="text"
                                            value={editData.location}
                                            onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                                        <input
                                            type="text"
                                            value={editData.website}
                                            onChange={(e) => setEditData({ ...editData, website: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                                        <select
                                            value={editData.experience}
                                            onChange={(e) => setEditData({ ...editData, experience: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="Beginner">Beginner</option>
                                            <option value="Intermediate">Intermediate</option>
                                            <option value="Advanced">Advanced</option>
                                            <option value="Expert">Expert</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Skills (comma separated)</label>
                                    <input
                                        type="text"
                                        value={editData.skills.join(", ")}
                                        onChange={(e) => setEditData({ ...editData, skills: e.target.value.split(", ").filter(s => s.trim()) })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                            <button
                                onClick={handleCancelEdit}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveProfile}
                                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-md transition-all duration-200"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showAvatarModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                            <h2 className="text-2xl font-bold">Choose Avatar</h2>
                            <button
                                onClick={() => setShowAvatarModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-5 gap-4">
                                {avatars.map((avatar, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleAvatarSelect(avatar)}
                                        className={`relative group transition-all duration-200 ${selectedAvatar === avatar ? "ring-2 ring-blue-600 rounded-full" : ""
                                            }`}
                                    >
                                        <img
                                            src={avatar}
                                            alt={`Avatar ${index + 1}`}
                                            className="w-20 h-20 rounded-full object-cover group-hover:scale-105 transition-transform"
                                        />
                                        {selectedAvatar === avatar && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                                                <Check className="w-6 h-6 text-white" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Profile;
