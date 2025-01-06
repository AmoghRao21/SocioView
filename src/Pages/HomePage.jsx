import React from "react";
import { motion } from "framer-motion";
import { BarChart2, Users, Globe, Activity } from "lucide-react";

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white flex flex-col items-center w-full">
      {/* Header Section */}
      <header className="w-full text-center py-10 px-4">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          AI-Powered Social Media Insights
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Unlock actionable insights to grow your audience and make data-driven decisions.
        </motion.p>
      </header>

      {/* Features Section */}
      <section className="w-full px-4 py-8 bg-gray-900">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <FeatureCard
            icon={<BarChart2 className="h-12 w-12 text-blue-400" />}
            title="Analytics"
            description="Track and analyze your social media performance with precision."
          />
          <FeatureCard
            icon={<Users className="h-12 w-12 text-green-400" />}
            title="Audience Insights"
            description="Understand your followers and their preferences like never before."
          />
          <FeatureCard
            icon={<Globe className="h-12 w-12 text-yellow-400" />}
            title="Global Trends"
            description="Stay updated with the latest trends across platforms and regions."
          />
          <FeatureCard
            icon={<Activity className="h-12 w-12 text-red-400" />}
            title="Real-Time Insights"
            description="Get real-time updates and adapt to changes instantly."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="w-full flex bg-gray-900 flex-col justify-center items-center max-w-7xl mx-auto py-6 px-4 lg:px-8"
        style={{
          backgroundImage: "url('https://source.unsplash.com/1920x1080/?technology,gradient')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "50vh", // Minimum height for responsiveness
          width: "100%",
        }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Take Your Social Media Strategy to the Next Level
        </motion.h2>
        <motion.p
          className="text-gray-400 mb-8 max-w-lg mx-auto text-base md:text-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Start gaining insights and growing your presence.
        </motion.p>
        <motion.a
          href="#"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.a>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      className="bg-gray-700 p-6 rounded-xl shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl md:text-2xl font-semibold mb-2 text-center text-blue-400">{title}</h3>
      <p className="text-sm md:text-base text-gray-300 text-center">{description}</p>
    </motion.div>
  );
}

export default HomePage;
