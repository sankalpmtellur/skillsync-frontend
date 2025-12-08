import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { Users, Code2, Trophy, Rocket, Star, Calendar, Briefcase, TrendingUp, Clock, ExternalLink, Edit, Plus, Eye, User, MapPin, Mail, Settings, LogOut } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const Dashboard = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.log("No token found, user not authenticated");
                    return;
                }

                const res = await axios.get("http://localhost:3000/api/auth/me", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                console.log("User data fetched:", res.data);
                setUser(res.data);
            } catch (err) {
                console.error("Error fetching user data:", err);
                if (err.response?.status === 401) {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                }
            }
        };

        fetchUserData();
    }, []);

    const [user, setUser] = useState({
        name: "",
        title: "",
        email: "",
        location: "",
        bio: "",
        skills: [],
        experience: "",
        avatar: "",
        joined: "",
        projects: 0,
        collaborators: 0,
        views: 0
    });

    const [recentProjects, setRecentProjects] = useState([
        {
            id: 1,
            title: "AI-Powered Task Manager",
            description: "A smart task management application that uses machine learning to prioritize tasks",
            status: "in-progress",
            progress: 65,
            category: "AI/ML",
            views: 89,
            createdAt: "2024-01-15"
        },
        {
            id: 2,
            title: "E-Commerce Platform",
            description: "Full-stack e-commerce solution with real-time inventory management",
            status: "completed",
            progress: 100,
            category: "Web Development",
            views: 156,
            createdAt: "2024-01-10"
        },
        {
            id: 3,
            title: "Mobile Fitness Tracker",
            description: "Cross-platform mobile app for tracking workouts and health metrics",
            status: "planning",
            progress: 15,
            category: "Mobile Development",
            views: 45,
            createdAt: "2024-01-22"
        }
    ]);

    const [collaborators, setCollaborators] = useState([
        {
            id: 1,
            name: "Meera Patel",
            title: "Machine Learning Engineer",
            avatar: "/src/assets/avatars/avatar2.png",
            skills: ["Python", "TensorFlow", "AI/ML"],
            status: "active"
        },
        {
            id: 2,
            name: "Sankalp Reddy",
            title: "Mobile App Developer",
            avatar: "/src/assets/avatars/avatar3.png",
            skills: ["Flutter", "React Native"],
            status: "active"
        },
        {
            id: 3,
            name: "Riya Gupta",
            title: "UI/UX Designer",
            avatar: "/src/assets/avatars/avatar4.png",
            skills: ["Figma", "Adobe XD"],
            status: "busy"
        }
    ]);

    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: "project",
            message: "Meera Patel commented on your project",
            time: "2 hours ago",
            read: false
        },
        {
            id: 2,
            type: "collaboration",
            message: "Sankalp Reddy wants to collaborate",
            time: "5 hours ago",
            read: false
        },
        {
            id: 3,
            type: "system",
            message: "Your project reached 100 views!",
            time: "1 day ago",
            read: true
        }
    ]);

    const getStatusColor = (status) => {
        switch (status) {
            case "active": return "bg-green-100 text-green-700";
            case "busy": return "bg-yellow-100 text-yellow-700";
            case "offline": return "bg-gray-100 text-gray-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    const getProjectStatusColor = (status) => {
        switch (status) {
            case "completed": return "bg-green-100 text-green-700";
            case "in-progress": return "bg-blue-100 text-blue-700";
            case "planning": return "bg-yellow-100 text-yellow-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />

            <div className="flex-1 lg:ml-0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-8"
                    >
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold mb-2">Welcome {user.name}!</h1>
                                    <p className="text-blue-100">Here's what's happening with your projects and collaborations today.</p>
                                </div>
                                <div className="hidden lg:block">
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="w-20 h-20 rounded-full border-4 border-white/20"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Stats Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                    >
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <Code2 className="w-8 h-8 text-blue-600" />
                                <span className="text-2xl font-bold">{user.projects}</span>
                            </div>
                            <h3 className="text-gray-600 text-sm">Total Projects</h3>
                            <p className="text-xs text-gray-500 mt-1">2 active this month</p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <Users className="w-8 h-8 text-green-600" />
                                <span className="text-2xl font-bold">{user.collaborators}</span>
                            </div>
                            <h3 className="text-gray-600 text-sm">Collaborators</h3>
                            <p className="text-xs text-gray-500 mt-1">3 online now</p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <Eye className="w-8 h-8 text-purple-600" />
                                <span className="text-2xl font-bold">{user.views}</span>
                            </div>
                            <h3 className="text-gray-600 text-sm">Profile Views</h3>
                            <p className="text-xs text-gray-500 mt-1">+12% this week</p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <Trophy className="w-8 h-8 text-yellow-600" />
                                <span className="text-2xl font-bold">4.8</span>
                            </div>
                            <h3 className="text-gray-600 text-sm">Avg Rating</h3>
                            <p className="text-xs text-gray-500 mt-1">Based on 12 reviews</p>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Recent Projects */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="lg:col-span-2"
                        >
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                                <div className="p-6 border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-semibold">Recent Projects</h2>
                                        <Link
                                            to="/projects"
                                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                        >
                                            View All
                                        </Link>
                                    </div>
                                </div>

                                <div className="p-6 space-y-4">
                                    {recentProjects.map((project) => (
                                        <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
                                                    <p className="text-gray-600 text-sm line-clamp-2">{project.description}</p>
                                                </div>
                                                <span className={`px-2 py-1 text-xs rounded-full ${getProjectStatusColor(project.status)}`}>
                                                    {project.status.replace('-', ' ')}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {project.createdAt}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Eye className="w-4 h-4" />
                                                        {project.views}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                                                        <div
                                                            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                                                            style={{ width: `${project.progress}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-xs text-gray-600">{project.progress}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Sidebar */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="space-y-6"
                        >
                            {/* Quick Actions */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                                <div className="space-y-3">
                                    <Link
                                        to="/projects"
                                        className="flex items-center gap-3 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                                    >
                                        <Plus className="w-5 h-5" />
                                        <span className="font-medium">New Project</span>
                                    </Link>
                                    <Link
                                        to="/explore"
                                        className="flex items-center gap-3 p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                                    >
                                        <Users className="w-5 h-5" />
                                        <span className="font-medium">Find Collaborators</span>
                                    </Link>
                                    <Link
                                        to="/profile"
                                        className="flex items-center gap-3 p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                                    >
                                        <Edit className="w-5 h-5" />
                                        <span className="font-medium">Edit Profile</span>
                                    </Link>
                                </div>
                            </div>

                            {/* Active Collaborators */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h2 className="text-xl font-semibold mb-4">Active Collaborators</h2>
                                <div className="space-y-3">
                                    {collaborators.map((collaborator) => (
                                        <div key={collaborator.id} className="flex items-center gap-3">
                                            <img
                                                src={collaborator.avatar}
                                                alt={collaborator.name}
                                                className="w-10 h-10 rounded-full"
                                            />
                                            <div className="flex-1">
                                                <h4 className="font-medium text-sm">{collaborator.name}</h4>
                                                <p className="text-xs text-gray-500">{collaborator.title}</p>
                                            </div>
                                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(collaborator.status)}`}>
                                                {collaborator.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    );
};

export default Dashboard;