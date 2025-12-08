import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Search, Filter, Plus, Code2, Trophy, Rocket, Star, Calendar, Users, ExternalLink, Edit, Trash2, ChevronDown, Clock, TrendingUp, X } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Projects = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [showFilters, setShowFilters] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    category: "",
    status: "planning",
    teamSize: 1,
    duration: "",
    difficulty: "beginner"
  });

  const categories = [
    "Web Development",
    "Mobile Development",
    "AI/ML",
    "UI/UX Design",
    "Blockchain",
    "Cybersecurity",
    "DevOps",
    "Data Science",
    "Game Development",
    "Cloud Computing"
  ];

  const statuses = ["planning", "in-progress", "completed", "on-hold"];

  const [projects, setProjects] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProject, setEditProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:3000/api/projects", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProjects(res.data);

        console.log("Fetched projects:", res.data);

      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, []);


  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.description.toLowerCase().includes(search.toLowerCase()) ||
      (project.tags || []).some(tag =>
        tag.toLowerCase().includes(search.toLowerCase())
      );
    const matchesCategory = !selectedCategory || project.category === selectedCategory;
    const matchesStatus = !selectedStatus || project.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === "latest") return new Date(b.updatedAt) - new Date(a.updatedAt);
    if (sortBy === "popular") return b.views - a.views;
    if (sortBy === "views") return b.views - a.views;
    if (sortBy === "progress")
      return (b.progress || 0) - (a.progress || 0);
    return 0;
  });

  const indexOfLastProject = currentPage * itemsPerPage;
  const indexOfFirstProject = indexOfLastProject - itemsPerPage;
  const currentProjects = sortedProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(sortedProjects.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, selectedStatus, sortBy]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setShowCategoryDropdown(false);
        setShowStatusDropdown(false);
        setShowSortDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCreateProject = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:3000/api/projects",
        {
          title: newProject.title,
          description: newProject.description,
          category: newProject.category,
          status: newProject.status,
          teamSize: Number(newProject.teamSize),
          duration: newProject.duration,
          difficulty: newProject.difficulty,
          progress: 0,
          tags: [],
          featured: false
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("Project created:", res.data);
      const createdProject = res.data.project;
      setProjects((prev) => [createdProject, ...prev]);

      setNewProject({
        title: "",
        description: "",
        category: "",
        status: "planning",
        teamSize: 1,
        duration: "",
        difficulty: "beginner"
      });

      setShowCreateModal(false);

    } catch (err) {
      console.log("Create project error:", err.response?.data || err);
      alert("Failed to create project");
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:3000/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects((prev) => prev.filter((p) => p.id !== id));

      alert("Project deleted!");

    } catch (err) {
      console.log("Delete project error:", err.response?.data || err);
      alert("Failed to delete project");
    }
  };

  const openEditModal = (project) => {
    setEditProject(project);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditProject(null);
  };

  const handleUpdateProject = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://localhost:3000/api/projects/${editProject.id}`,
        {
          title: editProject.title,
          description: editProject.description,
          category: editProject.category,
          status: editProject.status,
          teamSize: Number(editProject.teamSize),
          duration: editProject.duration,
          difficulty: editProject.difficulty,
          progress: editProject.progress || 0,
          tags: editProject.tags || [],
          featured: editProject.featured || false
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("Project updated:", res.data);
      const updatedProject = res.data.project || res.data;

      if (updatedProject && updatedProject.id) {
        setProjects((prev) =>
          prev.map((p) => p.id === updatedProject.id ? updatedProject : p)
        );
      } else {
        // If the response doesn't contain the updated project, refetch all projects
        const fetchProjects = async () => {
          try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:3000/api/projects", {
              headers: { Authorization: `Bearer ${token}` },
            });
            setProjects(res.data);
          } catch (err) {
            console.error("Error refetching projects:", err);
          }
        };
        fetchProjects();
      }

      closeEditModal();
      alert("Project updated successfully!");

    } catch (err) {
      console.log("Update project error:", err.response?.data || err);
      alert("Failed to update project");
    }
  };


  const getStatusColor = (status) => {
    switch (status) {
      case "planning": return "bg-yellow-100 text-yellow-700";
      case "in-progress": return "bg-blue-100 text-blue-700";
      case "completed": return "bg-green-100 text-green-700";
      case "on-hold": return "bg-gray-100 text-gray-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "beginner": return "bg-green-100 text-green-700";
      case "intermediate": return "bg-yellow-100 text-yellow-700";
      case "advanced": return "bg-orange-100 text-orange-700";
      case "expert": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-gray-900 font-inter">
      <Navbar />

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="block">Discover Amazing</span>
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Projects
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Explore innovative projects, collaborate with talented creators, and bring your ideas to life.
              Find inspiration and connect with the community.
            </p>

            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects by title, description, or tags..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all duration-200 font-semibold"
              >
                <Plus className="w-5 h-5" />
                Create New Project
              </button>
            </div>
          </motion.div>
        </div>

        <div className="absolute top-0 right-0 opacity-20">
          <div className="w-64 h-64 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute bottom-0 left-0 opacity-20">
          <div className="w-64 h-64 bg-gradient-to-tr from-purple-400 to-pink-400 rounded-full blur-3xl"></div>
        </div>
      </section>

      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-auto`}>
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative dropdown-container">
                  <button
                    onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 min-w-[150px]"
                  >
                    <Code2 className="w-4 h-4" />
                    <span>{selectedCategory || "All Categories"}</span>
                    <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  <div className={`${showCategoryDropdown ? 'block' : 'hidden'} absolute top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10`}>
                    <div className="py-2 max-h-64 overflow-y-auto">
                      <button
                        onClick={() => {
                          setSelectedCategory("");
                          setShowCategoryDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 text-gray-700"
                      >
                        All Categories
                      </button>
                      {categories.map(category => (
                        <button
                          key={category}
                          onClick={() => {
                            setSelectedCategory(category);
                            setShowCategoryDropdown(false);
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100"
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative dropdown-container">
                  <button
                    onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 min-w-[150px]"
                  >
                    <Clock className="w-4 h-4" />
                    <span>{selectedStatus ? selectedStatus.replace('-', ' ') : "All Status"}</span>
                    <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${showStatusDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  <div className={`${showStatusDropdown ? 'block' : 'hidden'} absolute top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10`}>
                    <div className="py-2">
                      <button
                        onClick={() => {
                          setSelectedStatus("");
                          setShowStatusDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 text-gray-700"
                      >
                        All Status
                      </button>
                      {statuses.map(status => (
                        <button
                          key={status}
                          onClick={() => {
                            setSelectedStatus(status);
                            setShowStatusDropdown(false);
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100"
                        >
                          {status.replace('-', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative dropdown-container">
                  <button
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 min-w-[150px]"
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span>
                      {sortBy === "latest" && "Latest"}
                      {sortBy === "popular" && "Most Popular"}
                      {sortBy === "views" && "Most Viewed"}
                      {sortBy === "progress" && "Progress"}
                    </span>
                    <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  <div className={`${showSortDropdown ? 'block' : 'hidden'} absolute top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10`}>
                    <div className="py-2">
                      <button
                        onClick={() => {
                          setSortBy("latest");
                          setShowSortDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        Latest
                      </button>
                      <button
                        onClick={() => {
                          setSortBy("popular");
                          setShowSortDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        Most Popular
                      </button>
                      <button
                        onClick={() => {
                          setSortBy("views");
                          setShowSortDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        Most Viewed
                      </button>
                      <button
                        onClick={() => {
                          setSortBy("progress");
                          setShowSortDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        Progress
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {(selectedCategory || selectedStatus) && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedCategory && (
                    <button
                      onClick={() => setSelectedCategory("")}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200"
                    >
                      {selectedCategory}
                      <span className="text-xs">×</span>
                    </button>
                  )}
                  {selectedStatus && (
                    <button
                      onClick={() => setSelectedStatus("")}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200"
                    >
                      {selectedStatus.replace('-', ' ')}
                      <span className="text-xs">×</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="text-gray-600">
              Found <span className="font-semibold text-gray-900">{sortedProjects.length}</span> projects
              {sortedProjects.length > itemsPerPage && (
                <span className="ml-2">
                  (Page {currentPage} of {totalPages})
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {sortedProjects.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100 overflow-hidden group"
                  >
                    <div className="p-6 border-b border-gray-100">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {project.featured && (
                              <div className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">
                                Featured
                              </div>
                            )}
                            <div className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                              {project.status.replace('-', ' ')}
                            </div>
                          </div>
                          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{project.title}</h3>
                          <p className="text-gray-600 text-sm line-clamp-3">{project.description}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{project.teamSize} members</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{project.duration}</span>
                        </div>
                        <div className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(project.difficulty)}`}>
                          {project.difficulty}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={project.authorAvatar}
                            alt={project.author}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="text-sm text-gray-700">{project.author}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <ExternalLink className="w-4 h-4" />
                            <span>{project.views}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-md transition-all duration-200 text-sm font-medium">
                          View Project
                        </button>
                        <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                          <Edit
                            className="cursor-pointer text-blue-500 hover:text-blue-700"
                            onClick={() => openEditModal(project)}
                          />
                        </button>
                        <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                          <Trash2
                            className="cursor-pointer text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteProject(project.id)}
                          />

                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-lg border transition-colors ${currentPage === 1
                        ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                      <ChevronDown className="w-5 h-5 rotate-90" />
                    </button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`w-10 h-10 rounded-lg font-medium transition-colors ${currentPage === page
                                ? 'bg-blue-600 text-white'
                                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                              {page}
                            </button>
                          );
                        } else if (
                          page === currentPage - 2 ||
                          page === currentPage + 2
                        ) {
                          return (
                            <span key={page} className="px-2 text-gray-400">
                              ...
                            </span>
                          );
                        }
                        return null;
                      })}
                    </div>

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-lg border transition-colors ${currentPage === totalPages
                        ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                      <ChevronDown className="w-5 h-5 -rotate-90" />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-gray-600 mb-6">
                Start by creating your first project or adjust your search filters.
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Your First Project
              </button>
            </div>
          )}
        </div>
      </section>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold">Create New Project</h2>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                  <input
                    type="text"
                    placeholder="Enter project title"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    placeholder="Describe your project"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={newProject.status}
                      onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {statuses.map(status => (
                        <option key={status} value={status}>{status.replace('-', ' ')}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Team Size</label>
                    <input
                      type="number"
                      min="1"
                      value={newProject.teamSize}
                      onChange={(e) => setNewProject({ ...newProject, teamSize: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    <input
                      type="text"
                      placeholder="e.g., 3 months"
                      value={newProject.duration}
                      onChange={(e) => setNewProject({ ...newProject, duration: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                  <select
                    value={newProject.difficulty}
                    onChange={(e) => setNewProject({ ...newProject, difficulty: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                disabled={!newProject.title || !newProject.description || !newProject.category}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && editProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Edit Project</h2>
              <button
                onClick={closeEditModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                  <input
                    type="text"
                    placeholder="Enter project title"
                    value={editProject.title}
                    onChange={(e) => setEditProject({ ...editProject, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    placeholder="Describe your project"
                    value={editProject.description}
                    onChange={(e) => setEditProject({ ...editProject, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={editProject.category}
                      onChange={(e) => setEditProject({ ...editProject, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={editProject.status}
                      onChange={(e) => setEditProject({ ...editProject, status: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {statuses.map(status => (
                        <option key={status} value={status}>{status.replace('-', ' ')}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Team Size</label>
                    <input
                      type="number"
                      min="1"
                      value={editProject.teamSize}
                      onChange={(e) => setEditProject({ ...editProject, teamSize: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    <input
                      type="text"
                      placeholder="e.g., 3 months"
                      value={editProject.duration}
                      onChange={(e) => setEditProject({ ...editProject, duration: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                    <select
                      value={editProject.difficulty}
                      onChange={(e) => setEditProject({ ...editProject, difficulty: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Progress (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={editProject.progress || 0}
                      onChange={(e) => setEditProject({ ...editProject, progress: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={closeEditModal}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProject}
                disabled={!editProject.title || !editProject.description || !editProject.category}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Update Project
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Projects;