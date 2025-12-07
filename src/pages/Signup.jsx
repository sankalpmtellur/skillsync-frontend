import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Zap,
  ArrowRight,
  Github,
  Twitter,
  Chrome,
  Shield,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Briefcase,
  MapPin,
  Calendar
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    experience: "",
    location: "",
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const experienceLevels = [
    { value: "beginner", label: "Beginner", description: "Just starting out" },
    { value: "intermediate", label: "Intermediate", description: "Some project experience" },
    { value: "advanced", label: "Advanced", description: "Experienced developer" },
    { value: "expert", label: "Expert", description: "Senior level expertise" }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === "checkbox" ? checked : value 
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
    }
    
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
    }
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    return newErrors;
  };

  const validateStep3 = () => {
    const newErrors = {};
    
    if (!formData.experience) {
      newErrors.experience = "Please select your experience level";
    }
    
    if (!formData.location) {
      newErrors.location = "Location is required";
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }
    
    return newErrors;
  };

  const handleNext = () => {
    let newErrors = {};
    
    if (step === 1) {
      newErrors = validateStep1();
    } else if (step === 2) {
      newErrors = validateStep2();
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setStep(step + 1);
    setErrors({});
  };

  const handlePrevious = () => {
    setStep(step - 1);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateStep3();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/profile");
    }, 2000);
  };

  const handleSocialSignup = (provider) => {
    setIsLoading(true);
    // Simulate social signup
    setTimeout(() => {
      setIsLoading(false);
      navigate("/profile");
    }, 1500);
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, color: "bg-gray-300", text: "" };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    
    const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500", "bg-green-600"];
    const texts = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    
    return {
      strength: (strength / 5) * 100,
      color: colors[strength - 1] || "bg-gray-300",
      text: texts[strength - 1] || ""
    };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-gray-900 font-inter">
      <Navbar />

      {/* Signup Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="hidden lg:block"
            >
              <div className="text-center lg:text-left">
                <div className="flex justify-center lg:justify-start mb-6">
                  <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                  <span className="block">Join the</span>
                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    SkillSync Community
                  </span>
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Start your journey of building amazing projects with talented collaborators from around the world.
                </p>
                
                {/* Progress Indicator */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Step {step} of 3</span>
                    <span className="text-sm text-gray-600">{Math.round((step / 3) * 100)}% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(step / 3) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${step >= 1 ? "bg-blue-100" : "bg-gray-100"}`}>
                      <User className={`w-6 h-6 ${step >= 1 ? "text-blue-600" : "text-gray-400"}`} />
                    </div>
                    <div>
                      <h3 className={`font-semibold ${step >= 1 ? "text-gray-900" : "text-gray-400"}`}>
                        Personal Information
                      </h3>
                      <p className="text-sm text-gray-600">Tell us about yourself</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${step >= 2 ? "bg-blue-100" : "bg-gray-100"}`}>
                      <Lock className={`w-6 h-6 ${step >= 2 ? "text-blue-600" : "text-gray-400"}`} />
                    </div>
                    <div>
                      <h3 className={`font-semibold ${step >= 2 ? "text-gray-900" : "text-gray-400"}`}>
                        Account Security
                      </h3>
                      <p className="text-sm text-gray-600">Create a secure password</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${step >= 3 ? "bg-blue-100" : "bg-gray-100"}`}>
                      <Briefcase className={`w-6 h-6 ${step >= 3 ? "text-blue-600" : "text-gray-400"}`} />
                    </div>
                    <div>
                      <h3 className={`font-semibold ${step >= 3 ? "text-gray-900" : "text-gray-400"}`}>
                        Professional Details
                      </h3>
                      <p className="text-sm text-gray-600">Your experience and preferences</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Signup Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-md mx-auto w-full"
            >
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                {/* Mobile Header */}
                <div className="lg:hidden text-center mb-8">
                  <div className="flex justify-center mb-6">
                    <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h1 className="text-3xl font-bold mb-2">Join SkillSync</h1>
                  <p className="text-gray-600">Create your account to get started</p>
                </div>

                {/* Back to Home Link */}
                <Link 
                  to="/" 
                  className="hidden lg:flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Link>

                <h2 className="text-2xl font-bold mb-6">Create Account</h2>

                {/* Social Signup Buttons - Only show on step 1 */}
                {step === 1 && (
                  <>
                    <div className="space-y-3 mb-6">
                      <button
                        onClick={() => handleSocialSignup("google")}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Chrome className="w-5 h-5" />
                        <span>Continue with Google</span>
                      </button>
                      
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleSocialSignup("github")}
                          disabled={isLoading}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Github className="w-5 h-5" />
                          <span>GitHub</span>
                        </button>
                        
                        <button
                          onClick={() => handleSocialSignup("twitter")}
                          disabled={isLoading}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Twitter className="w-5 h-5" />
                          <span>Twitter</span>
                        </button>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="relative mb-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or sign up with email</span>
                      </div>
                    </div>
                  </>
                )}

                {/* Signup Form */}
                <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }} className="space-y-4">
                  {/* Step 1: Personal Information */}
                  {step === 1 && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                            First Name
                          </label>
                          <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              errors.firstName ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="John"
                            disabled={isLoading}
                          />
                          {errors.firstName && (
                            <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name
                          </label>
                          <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              errors.lastName ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Doe"
                            disabled={isLoading}
                          />
                          {errors.lastName && (
                            <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              errors.email ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="john.doe@example.com"
                            disabled={isLoading}
                          />
                        </div>
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                      </div>
                    </>
                  )}

                  {/* Step 2: Password */}
                  {step === 2 && (
                    <>
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              errors.password ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Create a strong password"
                            disabled={isLoading}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                        {errors.password && (
                          <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                        )}
                        
                        {/* Password Strength Indicator */}
                        {formData.password && (
                          <div className="mt-2">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-600">Password strength</span>
                              <span className={`text-xs font-medium ${passwordStrength.color.replace('bg-', 'text-')}`}>
                                {passwordStrength.text}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div 

                              className={`h-1.5 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                              style={{ width: `${passwordStrength.strength}%` }}
                            ></div>
                            </div>
                            <div className="mt-2 text-xs text-gray-600">
                              <div className="flex items-center gap-1">
                                {/(?=.*[a-z])/.test(formData.password) && <CheckCircle className="w-3 h-3 text-green-500" />}
                                {/(?=.*[a-z])/.test(formData.password) && <span>Lowercase letter</span>}
                              </div>
                              <div className="flex items-center gap-1">
                                {/(?=.*[A-Z])/.test(formData.password) && <CheckCircle className="w-3 h-3 text-green-500" />}
                                {/(?=.*[A-Z])/.test(formData.password) && <span>Uppercase letter</span>}
                              </div>
                              <div className="flex items-center gap-1">
                                {/\d/.test(formData.password) && <CheckCircle className="w-3 h-3 text-green-500" />}
                                {/\d/.test(formData.password) && <span>Number</span>}
                              </div>
                              <div className="flex items-center gap-11">
                                {formData.password.length >= 8 && <CheckCircle className="w-3 h-3 text-green-500" />}
                                {formData.password.length >= 8 && <span>At least 8 characters</span>}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              errors.confirmPassword ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Confirm your password"
                            disabled={isLoading}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                        {errors.confirmPassword && (
                          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                        )}
                      </div>
                    </>
                  )}

                  {/* Step 3: Professional Details */}
                  {step === 3 && (
                    <>
                      <div>
                        <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                          Experience Level
                        </label>
                        <select
                          id="experience"
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                            errors.experience ? "border-red-500" : "border-gray-300"
                          }`}
                          disabled={isLoading}
                        >
                          <option value="">Select your experience level</option>
                          {experienceLevels.map(level => (
                            <option key={level.value} value={level.value}>
                              {level.label} - {level.description}
                            </option>
                          ))}
                        </select>
                        {errors.experience && (
                          <p className="mt-1 text-sm text-red-600">{errors.experience}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                          Location
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            id="location"
                            name="location"
                            type="text"
                            value={formData.location}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                              errors.location ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="San Francisco, CA"
                            disabled={isLoading}
                          />
                        </div>
                        {errors.location && (
                          <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                        )}
                      </div>

                      <div>
                        <label className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            name="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                            disabled={isLoading}
                          />
                          <span className="text-sm text-gray-600">
                            I agree to the{" "}
                            <Link to="/terms" className="text-blue-600 hover:text-blue-700">
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link to="/privacy" className="text-blue-600 hover:text-blue-700">
                              Privacy Policy
                            </Link>
                          </span>
                        </label>
                        {errors.agreeToTerms && (
                          <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>
                        )}
                      </div>
                    </>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex gap-3 pt-4">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={handlePrevious}
                        disabled={isLoading}
                        className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                    )}
                    
                    <button
                      type={step === 3 ? "submit" : "button"}
                      disabled={isLoading}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {step === 3 ? "Creating Account..." : "Processing..."}
                        </>
                      ) : (
                        <>
                          {step === 3 ? "Create Account" : "Next"}
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Sign In Link */}
                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Background Decorations */}
        <div className="absolute top-0 right-0 opacity-20">
          <div className="w-64 h-64 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute bottom-0 left-0 opacity-20">
          <div className="w-64 h-64 bg-gradient-to-tr from-purple-400 to-pink-400 rounded-full blur-3xl"></div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Signup;
