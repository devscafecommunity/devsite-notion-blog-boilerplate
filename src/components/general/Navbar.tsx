import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

// Icons - Lupe, Home and Star Fa Icons
import { FaHome, FaCalendar } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
// Theme icons
import { FaMoon, FaSun } from "react-icons/fa";

// Function for theme change chacra-ui
import { useColorMode } from "@chakra-ui/react";

function ThemeSwitch() {
  const { colorMode, toggleColorMode } = useColorMode();
  const theme = colorMode === "light" ? "bg-white" : "bg-gray-800";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      whileHover={{ scale: 1.1, rotate: 20, transition: { duration: 0.3 } }}
      className="cursor-pointer"
    >
      <div
        className={`flex items-center gap-2 bg-white p-2 rounded-full shadow-md ${theme} text-gray-800 p-4`}
        onClick={toggleColorMode}
      >
        {colorMode === "light" ? <FaMoon size={40} /> : <FaSun size={40} />}
      </div>
    </motion.div>
  );
}

export default function Navbar() {
  // Theme var for change non chakra-ui components
  const { colorMode } = useColorMode();
  const theme = colorMode === "light" ? "bg-white" : "bg-gray-800";
  const buttonTheme = colorMode === "light" ? "text-gray-800" : "text-white";

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center items-center p-4 shadow-md ${theme} m-8 rounded-xl mx-4 bg-opacity-50 backdrop-filter backdrop-blur-lg
      `}
    >
      <div className="flex items-center gap-4 text-2xl justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.1, rotate: 20, transition: { duration: 0.3 } }}
          className="cursor-pointer"
        >
          <div
            className={`flex items-center gap-2 bg-white p-2 rounded-full shadow-md ${theme} ${buttonTheme} p-4`}
          >
            <Link href="/">
              <FaHome size={40} className="cursor-pointer text-gray-800" />
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.1, rotate: 20, transition: { duration: 0.3 } }}
          className="cursor-pointer"
        >
          <div
            className={`flex items-center gap-2 bg-white p-2 rounded-full shadow-md ${theme} ${buttonTheme} p-4`}
          >
            <Link href="/blog">
              <IoDocumentTextOutline
                size={40}
                className="cursor-pointer text-gray-800"
              />
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.1, rotate: 20, transition: { duration: 0.3 } }}
          className="cursor-pointer"
        >
          <div
            className={`flex items-center gap-2 bg-white p-2 rounded-full shadow-md ${theme} ${buttonTheme} p-4`}
          >
            <Link href="/events">
              <FaCalendar size={40} className="cursor-pointer text-gray-800" />
            </Link>
          </div>
        </motion.div>
        <ThemeSwitch />
      </div>
    </motion.div>
  );
}
