import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Users,
  Code2,
  Trophy,
  Rocket,
  Star,
  MapPin,
  Calendar,
  Briefcase,
  Mail,
  ExternalLink,
  ChevronDown,
  Heart,
  MessageCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Explore = () => {
  const [search, setSearch] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState("");
  const [availability, setAvailability] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [showSkillsDropdown, setShowSkillsDropdown] = useState(false);
  const [showExperienceDropdown, setShowExperienceDropdown] = useState(false);
  const [showAvailabilityDropdown, setShowAvailabilityDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const skills = [
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

  const experienceLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];
  const availabilityOptions = ["Full-time", "Part-time", "Weekends", "Flexible"];

  const users = [
    {
      id: 1,
      name: "Aarav Sharma",
      title: "Full Stack Developer",
      skills: ["Web Development", "React", "Node.js"],
      experience: "Advanced",
      location: "San Francisco, CA",
      availability: "Full-time",
      projects: 12,
      rating: 4.8,
      bio: "Passionate about building scalable web applications with modern technologies.",
      avatar: "/src/assets/avatars/avatar1.png",
      verified: true,
      joined: "2023"
    },
    {
      id: 2,
      name: "Meera Patel",
      title: "Machine Learning Engineer",
      skills: ["AI/ML", "Python", "TensorFlow"],
      experience: "Expert",
      location: "New York, NY",
      availability: "Part-time",
      projects: 8,
      rating: 4.9,
      bio: "Specializing in deep learning and computer vision applications.",
      avatar: "/src/assets/avatars/avatar2.png",
      verified: true,
      joined: "2022"
    },
    {
      id: 3,
      name: "Sankalp Reddy",
      title: "Mobile App Developer",
      skills: ["Mobile Development", "Flutter", "React Native"],
      experience: "Intermediate",
      location: "Austin, TX",
      availability: "Flexible",
      projects: 6,
      rating: 4.7,
      bio: "Creating beautiful and functional mobile apps for iOS and Android.",
      avatar: "/src/assets/avatars/avatar3.png",
      verified: false,
      joined: "2023"
    },
    {
      id: 4,
      name: "Riya Gupta",
      title: "UI/UX Designer",
      skills: ["UI/UX Design", "Figma", "Adobe XD"],
      experience: "Advanced",
      location: "Seattle, WA",
      availability: "Weekends",
      projects: 15,
      rating: 4.9,
      bio: "Designing user-centered experiences that delight and inspire.",
      avatar: "/src/assets/avatars/avatar4.png",
      verified: true,
      joined: "2021"
    },
    {
      id: 5,
      name: "Alex Chen",
      title: "Blockchain Developer",
      skills: ["Blockchain", "Solidity", "Web3"],
      experience: "Expert",
      location: "Miami, FL",
      availability: "Full-time",
      projects: 10,
      rating: 4.6,
      bio: "Building decentralized applications and smart contracts.",
      avatar: "/src/assets/avatars/avatar5.png",
      verified: true,
      joined: "2022"
    },
    {
      id: 6,
      name: "Jordan Kim",
      title: "DevOps Engineer",
      skills: ["DevOps", "Docker", "Kubernetes"],
      experience: "Advanced",
      location: "Denver, CO",
      availability: "Flexible",
      projects: 9,
      rating: 4.8,
      bio: "Automating deployment pipelines and managing cloud infrastructure.",
      avatar: "/src/assets/avatars/avatar6.png",
      verified: false,
      joined: "2023"
    }
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.title.toLowerCase().includes(search.toLowerCase()) ||
      user.skills.some(skill => skill.toLowerCase().includes(search.toLowerCase()));

    const matchesSkills = selectedSkills.length === 0 ||
      selectedSkills.some(skill => user.skills.includes(skill));

    const matchesExperience = !experienceLevel || user.experience === experienceLevel;

    const matchesAvailability = !availability || user.availability === availability;

    return matchesSearch && matchesSkills && matchesExperience && matchesAvailability;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "projects") return b.projects - a.projects;
    if (sortBy === "experience") {
      const levels = { "Expert": 4, "Advanced": 3, "Intermediate": 2, "Beginner": 1 };
      return levels[b.experience] - levels[a.experience];
    }
  });

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedSkills, experienceLevel, availability, sortBy]);

  const toggleSkill = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setShowSkillsDropdown(false);
        setShowExperienceDropdown(false);
        setShowAvailabilityDropdown(false);
        setShowSortDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
              <span className="block">Find Your Perfect</span>
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Collaborators
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover talented developers, designers, and creators to bring your ideas to life.
              Connect with the right people based on skills, experience, and availability.
            </p>

            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, skills, or expertise..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
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
                    onClick={() => setShowSkillsDropdown(!showSkillsDropdown)}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 min-w-[150px]"
                  >
                    <Code2 className="w-4 h-4" />
                    <span>Skills</span>
                    <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${showSkillsDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  <div className={`${showSkillsDropdown ? 'block' : 'hidden'} absolute top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10`}>
                    <div className="p-4 max-h-64 overflow-y-auto">
                      <div className="flex flex-wrap gap-2">
                        {skills.map(skill => (
                          <button
                            key={skill}
                            onClick={() => {
                              toggleSkill(skill);
                              setShowSkillsDropdown(false);
                            }}
                            className={`px-3 py-1 rounded-full text-sm transition-colors ${selectedSkills.includes(skill)
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                          >
                            {skill}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative dropdown-container">
                  <button
                    onClick={() => setShowExperienceDropdown(!showExperienceDropdown)}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 min-w-[150px]"
                  >
                    <Trophy className="w-4 h-4" />
                    <span>{experienceLevel || "All Levels"}</span>
                    <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${showExperienceDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  <div className={`${showExperienceDropdown ? 'block' : 'hidden'} absolute top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10`}>
                    <div className="py-2">
                      <button
                        onClick={() => {
                          setExperienceLevel("");
                          setShowExperienceDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 text-gray-700"
                      >
                        All Levels
                      </button>
                      {experienceLevels.map(level => (
                        <button
                          key={level}
                          onClick={() => {
                            setExperienceLevel(level);
                            setShowExperienceDropdown(false);
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100"
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative dropdown-container">
                  <button
                    onClick={() => setShowAvailabilityDropdown(!showAvailabilityDropdown)}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 min-w-[150px]"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{availability || "All Availability"}</span>
                    <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${showAvailabilityDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  <div className={`${showAvailabilityDropdown ? 'block' : 'hidden'} absolute top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10`}>
                    <div className="py-2">
                      <button
                        onClick={() => {
                          setAvailability("");
                          setShowAvailabilityDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 text-gray-700"
                      >
                        All Availability
                      </button>
                      {availabilityOptions.map(option => (
                        <button
                          key={option}
                          onClick={() => {
                            setAvailability(option);
                            setShowAvailabilityDropdown(false);
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100"
                        >
                          {option}
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
                    <Rocket className="w-4 h-4" />
                    <span>
                      {sortBy === "relevance" && "Most Relevant"}
                      {sortBy === "rating" && "Highest Rated"}
                      {sortBy === "projects" && "Most Projects"}
                      {sortBy === "experience" && "Most Experienced"}
                    </span>
                    <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  <div className={`${showSortDropdown ? 'block' : 'hidden'} absolute top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10`}>
                    <div className="py-2">
                      <button
                        onClick={() => {
                          setSortBy("relevance");
                          setShowSortDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        Most Relevant
                      </button>
                      <button
                        onClick={() => {
                          setSortBy("rating");
                          setShowSortDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        Highest Rated
                      </button>
                      <button
                        onClick={() => {
                          setSortBy("projects");
                          setShowSortDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        Most Projects
                      </button>
                      <button
                        onClick={() => {
                          setSortBy("experience");
                          setShowSortDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        Most Experienced
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {(selectedSkills.length > 0 || experienceLevel || availability) && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedSkills.map(skill => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200"
                    >
                      {skill}
                      <span className="text-xs">×</span>
                    </button>
                  ))}
                  {experienceLevel && (
                    <button
                      onClick={() => setExperienceLevel("")}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200"
                    >
                      {experienceLevel}
                      <span className="text-xs">×</span>
                    </button>
                  )}
                  {availability && (
                    <button
                      onClick={() => setAvailability("")}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200"
                    >
                      {availability}
                      <span className="text-xs">×</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="text-gray-600">
              Found <span className="font-semibold text-gray-900">{sortedUsers.length}</span> collaborators
              {sortedUsers.length > itemsPerPage && (
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
          {sortedUsers.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentUsers.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100 overflow-hidden group"
                  >
                    <div className="p-6 border-b border-gray-100">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            {user.verified && (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                                <Star className="w-2 h-2 text-white fill-current" />
                              </div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{user.name}</h3>
                            <p className="text-gray-600 text-sm">{user.title}</p>
                          </div>
                        </div>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
                        </button>
                      </div>

                      <p className="text-gray-700 text-sm mb-4 line-clamp-2">{user.bio}</p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {user.skills.slice(0, 3).map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                        {user.skills.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{user.skills.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span>{user.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          <span>{user.projects} projects</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span className="truncate">{user.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${user.experience === 'Expert' ? 'bg-purple-100 text-purple-700' :
                          user.experience === 'Advanced' ? 'bg-blue-100 text-blue-700' :
                            user.experience === 'Intermediate' ? 'bg-green-100 text-green-700' :
                              'bg-gray-100 text-gray-700'
                          }`}>
                          {user.experience}
                        </span>
                        <span className="text-xs text-gray-500">{user.availability}</span>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-md transition-all duration-200 text-sm font-medium">
                          Connect
                        </button>
                        <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                          <MessageCircle className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                          <ExternalLink className="w-4 h-4 text-gray-600" />
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
                      <ChevronLeft className="w-5 h-5" />
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
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No collaborators found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or filters to find more people.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedSkills([]);
                  setExperienceLevel("");
                  setAvailability("");
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Explore;