import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  Code2,
  Trophy,
  Rocket,
  ArrowRight,
  Star,
  Globe,
  HeartHandshake
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Smart Team Matching",
      description: "AI-powered matching connects you with teammates based on skills, availability, and goals."
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Project Collaboration",
      description: "Built-in tools for seamless project management, code sharing, and real-time communication."
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Hackathon Ready",
      description: "Find perfect teammates for hackathons and competitions with matching expertise levels."
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Skill Development",
      description: "Learn from peers, mentor others, and grow your skills through collaborative projects."
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "5K+", label: "Projects Completed" },
    { number: "500+", label: "Hackathons" },
    { number: "98%", label: "Success Rate" }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Full Stack Developer",
      content: "SkillSync helped me find amazing teammates for my startup project. We built and launched in just 3 months!",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "UI/UX Designer",
      content: "The matching algorithm is incredible. I found designers and developers who complement my skills perfectly.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Data Scientist",
      content: "Won my first hackathon thanks to SkillSync! Connected with brilliant ML engineers and frontend devs.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-gray-900 font-inter">
      <Navbar />

      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
                <Star className="w-4 h-4 mr-2" />
                Trusted by 10,000+ developers and creators
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="block">Find Your Perfect</span>
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Teammates
                </span>
              </h1>

              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
                Connect with skilled collaborators, build amazing projects, and accelerate your journey
                in the world of tech. From hackathons to startups, find your people.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/signup"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all duration-200 font-semibold text-lg flex items-center group"
                >
                  Start Collaborating
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/projects"
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all duration-200 font-semibold text-lg"
                >
                  Explore Projects
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 opacity-20">
          <div className="w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 opacity-20">
          <div className="w-96 h-96 bg-gradient-to-tr from-purple-400 to-pink-400 rounded-full blur-3xl"></div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center text-white"
              >
                <div className="text-3xl lg:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Everything You Need to Collaborate Effectively
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to help you find the right teammates and build amazing things together.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-100"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              How SkillSync Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in minutes and find your perfect teammates in three simple steps.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Create Your Profile", description: "Showcase your skills, experience, and what you're looking for in teammates." },
              { step: "2", title: "Get Matched", description: "Our AI analyzes your profile and suggests compatible teammates based on skills and goals." },
              { step: "3", title: "Start Building", description: "Connect with your matches, discuss projects, and start collaborating immediately." }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of developers, designers, and creators who are already collaborating on SkillSync.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:shadow-xl transition-all duration-200 font-semibold text-lg"
              >
                Get Started Free
              </Link>
              <Link
                to="/howitworks"
                className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-200 font-semibold text-lg"
              >
                See How It Works
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute top-0 right-0 opacity-10">
          <Globe className="w-64 h-64 text-white" />
        </div>
        <div className="absolute bottom-0 left-0 opacity-10">
          <HeartHandshake className="w-64 h-64 text-white" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;