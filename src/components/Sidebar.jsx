import { BarChart2, Home, Menu, MessageCircle, Star, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, color, motion } from "framer-motion";
import { Link } from "react-router-dom";

const SIDEBAR_ITEMS = [
  { name: "Home", icon: Home, color: "#6EE7B7", href: "/" },
  { name: "Overview", icon: BarChart2, color: "#6366f1", href: "/overview" },
  { name: "Features", icon: Star, color: "#8B5CF6", href: "/features" },
  { name: "Team", icon: Users, color: "#EC4899", href: "/team" },
  { name: "Chat With AI", icon: MessageCircle, color:'#fd0086', href: "/chat" }
];

const Sidebar = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Handle screen resizing
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
    if (window.innerWidth > 768) {
      setIsSidebarOpen(true); // Ensure sidebar is open on larger screens
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <motion.div
        className={`fixed z-30 top-0 left-0 h-full bg-gray-800 transition-all duration-300 ease-in-out ${
          isMobile ? (isSidebarOpen ? "w-64" : "w-0") : isSidebarOpen ? "w-64" : "w-20"
        }`}
        animate={{
          width: isSidebarOpen ? (isMobile ? 256 : 256) : isMobile ? 0 : 80,
        }}
      >
        <div className="h-full bg-gray-800 p-4 flex flex-col border-r border-gray-700">
          {/* Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-2 rounded-full hover:bg-gray-700 transition-colors ${
              isMobile ? "absolute top-4 right-4" : "max-w-fit"
            }`}
          >
            <Menu size={24} />
          </motion.button>

          {/* Sidebar Items */}
          <motion.nav
            className="mt-8 flex-grow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {SIDEBAR_ITEMS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => isMobile && setIsSidebarOpen(false)}
              >
                <motion.div
                  className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                  <AnimatePresence>
                    {isSidebarOpen && (
                      <motion.span
                        className="ml-4 whitespace-nowrap"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2, delay: 0.3 }}
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            ))}
          </motion.nav>
        </div>
      </motion.div>

      {/* Overlay */}
      {isMobile && isSidebarOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsSidebarOpen(false)} // Close sidebar when clicking the overlay
        ></motion.div>
      )}

      {/* Main Content */}
      <motion.div
        className={`flex-grow transition-all duration-300 ease-in-out ${
          isSidebarOpen && !isMobile ? "ml-64" : "ml-20"
        }`}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Sidebar;
