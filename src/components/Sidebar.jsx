import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    Code2,
    User,
    Settings,
    LogOut,
    Menu,
    X,
    Trophy,
    Briefcase,
    Star,
    Calendar
} from "lucide-react";

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    const menuItems = [
        {
            title: "Dashboard",
            icon: LayoutDashboard,
            path: "/dashboard",
            description: "Overview and stats"
        },
        {
            title: "Connections",
            icon: Users,
            path: "/explore",
            description: "Find collaborators"
        },
        {
            title: "Projects",
            icon: Code2,
            path: "/projects",
            description: "Manage projects"
        },
        {
            title: "Profile",
            icon: User,
            path: "/profile",
            description: "View and edit profile"
        },
        {
            title: "Achievements",
            icon: Trophy,
            path: "/achievements",
            description: "Your accomplishments"
        },
        {
            title: "Calendar",
            icon: Calendar,
            path: "/calendar",
            description: "Schedule and events"
        },
        {
            title: "Settings",
            icon: Settings,
            path: "/settings",
            description: "Account settings"
        }
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200 hover:bg-gray-50"
            >
                {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Sidebar Overlay for Mobile */}
            {isSidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                <div className="flex flex-col h-full">
                    {/* Logo/Brand */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <Briefcase className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">SkillSync</h1>
                                <p className="text-xs text-gray-500">Collaborate & Create</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="flex-1 p-4 space-y-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group
                    ${isActive(item.path)
                                            ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200'
                                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                        }
                  `}
                                >
                                    <Icon className={`w-5 h-5 ${isActive(item.path) ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'}`} />
                                    <div className="flex-1">
                                        <div className="font-medium">{item.title}</div>
                                        <div className="text-xs text-gray-500">{item.description}</div>
                                    </div>
                                    {isActive(item.path) && (
                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Profile Section */}
                    <div className="p-4 border-t border-gray-200">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                            <img
                                src="/src/assets/avatars/avatar1.png"
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full"
                            />
                            <div className="flex-1">
                                <div className="font-medium text-gray-900">Aarav Sharma</div>
                                <div className="text-xs text-gray-500">Full Stack Developer</div>
                            </div>
                        </div>

                        <button className="w-full mt-3 flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium text-sm">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
