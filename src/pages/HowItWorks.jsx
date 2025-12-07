import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Users,
  Search,
  Code2,
  Handshake,
  Rocket,
  CheckCircle,
  ArrowRight,
  Star,
  MessageCircle,
  Calendar,
  Trophy,
  Zap,
  Target,
  Lightbulb,
  Shield,
  Globe,
  Clock,
  Award,
  TrendingUp
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const steps = [
    {
      id: 1,
      title: "Create Your Profile",
      description: "Sign up and build your professional profile with your skills, experience, and portfolio.",
      icon: Users,
      color: "from-blue-500 to-blue-600",
      details: [
        "Add your personal information and bio",
        "Showcase your technical skills",
        "Upload your portfolio projects",
        "Set your availability and preferences"
      ]
    },
    {
      id: 2,
      title: "Discover Projects",
      description: "Browse through innovative projects posted by creators looking for collaborators like you.",
      icon: Search,
      color: "from-purple-500 to-purple-600",
      details: [
        "Filter by skills and categories",
        "Search by keywords or technologies",
        "View project requirements and timeline",
        "Connect with project creators"
      ]
    },
    {
      id: 3,
      title: "Collaborate & Build",
      description: "Join projects that match your skills and start collaborating with talented creators worldwide.",
      icon: Handshake,
      color: "from-green-500 to-green-600",
      details: [
        "Communicate with team members",
        "Share ideas and contribute code",
        "Track progress together",
        "Learn from experienced developers"
      ]
    },
    {
      id: 4,
      title: "Launch & Grow",
      description: "Complete amazing projects, build your reputation, and grow your professional network.",
      icon: Rocket,
      color: "from-orange-500 to-orange-600",
      details: [
        "Launch successful projects",
        "Receive testimonials and ratings",
        "Expand your professional network",
        "Unlock new opportunities"
      ]
    }
  ];

  const features = [
    {
      icon: Target,
      title: "Smart Matching",
      description: "Our AI-powered algorithm matches you with projects that perfectly align with your skills and interests."
    },
    {
      icon: Shield,
      title: "Secure Collaboration",
      description: "Work safely with built-in project management tools and secure communication channels."
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Connect with creators and developers from around the world in our diverse community."
    },
    {
      icon: Clock,
      title: "Flexible Timeline",
      description: "Choose projects that fit your schedule - from quick sprints to long-term collaborations."
    },
    {
      icon: Award,
      title: "Skill Recognition",
      description: "Get recognized for your contributions with badges, ratings, and achievement certificates."
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Build your portfolio, gain experience, and advance your career through real projects."
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Frontend Developer",
      avatar: "/src/assets/avatars/avatar2.png",
      content: "SkillSync helped me find amazing projects and connect with talented developers. I've built 3 projects in just 2 months!",
      rating: 5,
      project: "E-Commerce Platform"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Full Stack Developer",
      avatar: "/src/assets/avatars/avatar5.png",
      content: "The platform makes it so easy to find collaborators. I met my current co-founder through SkillSync!",
      rating: 5,
      project: "AI Task Manager"
    },
    {
      id: 3,
      name: "Emily Johnson",
      role: "UI/UX Designer",
      avatar: "/src/assets/avatars/avatar4.png",
      content: "As a designer, I love how I can find developers who appreciate good design. Great projects and great people!",
      rating: 5,
      project: "Design System Library"
    }
  ];

  const faqs = [
    {
      question: "How do I get started with SkillSync?",
      answer: "Simply sign up for a free account, create your profile showcasing your skills and experience, then browse available projects or post your own project ideas."
    },
    {
      question: "Is SkillSync free to use?",
      answer: "Yes! SkillSync is free to join and use for both creators and collaborators. We offer premium features for advanced project management, but the core platform is completely free."
    },
    {
      question: "How do I find the right projects?",
      answer: "Use our smart search and filtering system to find projects matching your skills, experience level, and availability. You can also set up alerts for new projects in your areas of expertise."
    },
    {
      question: "Can I post my own project ideas?",
      answer: "Absolutely! As a creator, you can post detailed project descriptions, specify required skills, set timelines, and attract talented collaborators to bring your ideas to life."
    },
    {
      question: "How does collaboration work on SkillSync?",
      answer: "Once you join a project, you'll have access to built-in communication tools, project management features, and progress tracking. You can communicate directly with team members and share resources securely."
    },
    {
      question: "What if I'm just starting out?",
      answer: "SkillSync is perfect for beginners! We have projects specifically designed for learning and skill development. You can start with smaller projects to build experience and confidence."
    }
  ];

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
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="block">How SkillSync</span>
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Works
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Connect, collaborate, and create amazing projects with talented creators and developers from around the world.
              Your journey to building something extraordinary starts here.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all duration-200 font-semibold text-center"
              >
                Get Started Free
              </Link>
              <Link
                to="/projects"
                className="px-8 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-center"
              >
                Explore Projects
              </Link>
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

      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Your Journey in 4 Simple Steps</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From signing up to launching successful projects - we make it easy and enjoyable.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${activeStep === index
                    ? "border-blue-600 bg-blue-50 shadow-lg"
                    : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  onClick={() => setActiveStep(index)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full bg-gradient-to-r ${step.color}`}>
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-xl border border-gray-100 p-8"
            >
              <div className={`p-4 rounded-full bg-gradient-to-r ${steps[activeStep].color} w-16 h-16 flex items-center justify-center mb-6`}>
                {React.createElement(steps[activeStep].icon, { className: "w-8 h-8 text-white" })}
              </div>
              <h3 className="text-2xl font-bold mb-4">{steps[activeStep].title}</h3>
              <p className="text-gray-600 mb-6">{steps[activeStep].description}</p>
              <ul className="space-y-3">
                {steps[activeStep].details.map((detail, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Choose SkillSync?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to make your collaboration experience exceptional.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100"
              >
                <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from creators and developers who built amazing things through SkillSync.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-xs text-blue-600 mt-1">{testimonial.project}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about SkillSync
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of creators and developers building amazing projects together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="px-8 py-3 bg-white text-blue-600 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-center"
              >
                Sign Up Free
              </Link>
              <Link
                to="/projects"
                className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-200 font-semibold text-center"
              >
                Explore Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;
