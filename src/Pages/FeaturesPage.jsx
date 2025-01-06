import React from "react";
import { motion } from "framer-motion";
import { Rocket, Settings, Lock, Phone, Cloud, Smile } from "lucide-react";

const features = [
  {
    title: "Fast Performance",
    description: "Experience lightning-fast loading times with our optimized platform.",
    icon: <Rocket className="w-12 h-12 text-blue-500" />,
  },
  {
    title: "Customizable",
    description: "Tailor the platform to meet your specific needs and preferences.",
    icon: <Settings className="w-12 h-12 text-green-500" />,
  },
  {
    title: "Secure",
    description: "State-of-the-art security measures to protect your data.",
    icon: <Lock className="w-12 h-12 text-red-500" />,
  },
  {
    title: "24/7 Support",
    description: "Our team is always available to assist you whenever you need.",
    icon: <Phone className="w-12 h-12 text-yellow-500" />,
  },
  {
    title: "Cloud Integration",
    description: "Seamless integration with your existing cloud services.",
    icon: <Cloud className="w-12 h-12 text-indigo-500" />,
  },
  {
    title: "User-Friendly",
    description: "Simple and intuitive design for a seamless experience.",
    icon: <Smile className="w-12 h-12 text-purple-500" />,
  },
];

const headerTextVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.2, duration: 0.5 },
  }),
};

const FeaturesPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-8 w-full h-full">
      {/* Enhanced Header */}
      <motion.header
        className="relative text-center mb-16"
        initial="hidden"
        animate="visible"
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-900 rounded-lg blur-lg"></div>

        {/* Animated Icon */}
        <motion.div
          className="mb-4 inline-block bg-gray-800 p-4 rounded-full shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Rocket className="w-16 h-16 text-blue-500" />
        </motion.div>

        {/* Animated Heading */}
        <div className="overflow-hidden">
          <motion.h1
            className="text-5xl font-extrabold tracking-tight mb-4"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.2 }}
          >
            {"Our Features".split(" ").map((word, index) => (
              <motion.span
                key={index}
                className="inline-block"
                variants={headerTextVariants}
                custom={index}
              >
                {word}{" "}
              </motion.span>
            ))}
          </motion.h1>
        </div>

        {/* Subtext */}
        <motion.p
          className="text-gray-400 mt-4 text-lg bg-gray-900"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Explore the key benefits that set us apart.
        </motion.p>

        {/* Call-to-Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-6"
        ></motion.div>
      </motion.header>

      {/* Features Grid */}
      <motion.section
        className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="relative bg-gray-800 p-6 rounded-xl shadow-lg group transform-gpu transition-transform duration-300 hover:shadow-2xl hover:scale-105 hover:bg-gradient-to-br hover:from-gray-700 hover:via-gray-800 hover:to-gray-900"
            custom={index}
            variants={headerTextVariants}
            whileHover={{ rotateX: -5, rotateY: 5 }}
          >
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-700 p-4 rounded-full shadow-lg">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-bold mt-12 text-center">{feature.title}</h3>
            <p className="text-gray-300 mt-4 text-center">{feature.description}</p>
          </motion.div>
        ))}
      </motion.section>
    </div>
  );
};

export default FeaturesPage;
