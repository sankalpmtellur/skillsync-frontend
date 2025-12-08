import React, { useState, useEffect } from "react";
import axios from "axios";
import { User, Mail, MapPin, Calendar, Briefcase, Edit, Code2, Users, Star } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setIsLoading(false);
                    return;
                }

                const response = await axios.get("http://localhost:3000/api/auth/me", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                setUser(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex">
                <Sidebar />
                <div className="flex-1 lg:ml-0">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading profile...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex">
                <Sidebar />
                <div className="flex-1 lg:ml-0">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <p className="text-gray-600 mb-4">Please log in to view your profile</p>
                            <a href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                Login
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />

            <div className="flex-1 lg:ml-0">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Profile Header */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                <Edit className="w-4 h-4" />
                                {isEditing ? 'Cancel' : 'Edit'}
                            </button>
                        </div>

                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                            <div className="flex-shrink-0">
                                <img
                                    src={user.avatar || "/src/assets/avatars/avatar1.png"}
                                    alt={user.name}
                                    className="w-24 h-24 rounded-full border-4 border-gray-200"
                                />
                            </div>
                            
                            <div className="flex-1 text-center md:text-left">
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">{user.name}</h2>
                                <p className="text-gray-600 mb-4">{user.title || "Developer"}</p>
                                
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Mail className="w-4 h-4" />
                                        <span>{user.email}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        <span>{user.location || "Not specified"}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Briefcase className="w-4 h-4" />
                                        <span>{user.experience || "Beginner"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* About Section */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
                        <p className="text-gray-600">
                            {user.bio || "No bio added yet. Click edit to add your bio."}
                        </p>
                    </div>

                    {/* Skills Section */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {user.skills && user.skills.length > 0 ? (
                                user.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))
                            ) : (
                                <p className="text-gray-500">No skills added yet.</p>
                            )}
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <Code2 className="w-5 h-5 text-blue-600" />
                                    <span className="text-2xl font-bold text-gray-900">12</span>
                                </div>
                                <p className="text-sm text-gray-600">Projects</p>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <Users className="w-5 h-5 text-green-600" />
                                    <span className="text-2xl font-bold text-gray-900">8</span>
                                </div>
                                <p className="text-sm text-gray-600">Collaborators</p>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <Star className="w-5 h-5 text-yellow-600" />
                                    <span className="text-2xl font-bold text-gray-900">4.8</span>
                                </div>
                                <p className="text-sm text-gray-600">Rating</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;