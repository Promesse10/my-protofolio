"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiNextdotjs } from "react-icons/si";
import { FaComments } from "react-icons/fa";
import {
  FaUser,
  FaPhone,
  FaBriefcase,
  FaHome,
  FaFacebookF,
  FaLinkedinIn,
  FaReact,
  FaFigma,
  FaHtml5,
  FaDownload,
  FaGithub,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import ShootingStars from "./ShootingStars";
import TypeWriter from "./Typer";
import SkillBar from "./Skillbar";
import { CheckCircle } from "lucide-react";
import Chatbot from "./chatbot";
import karkelly from "../IMAGE/karkelly.jpg";
import rushago from "../IMAGE/rusha go.jpg";
import Restor from "../IMAGE/Restoran.jpg";
import isuzume from "../IMAGE/isuzume.jpg";
import image from "../IMAGE/pic2.jpg";
import ProjectCarousel from "./ProjectCarousel";
import LoadingScreen from "./LoadingScreen";
import estation from "../IMAGE/estation.jpg";
import emailjs from "@emailjs/browser";
import agro from "../IMAGE/agro.png";
export default function Portfolio() {
  const [activePage, setActivePage] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const contentRef = useRef(null);
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo(0, 0);
    }
  }, [activePage]);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  const sendEmail = (templateParams) => {
    return emailjs.send(
      "service_f04qg4p",
      "template_ne6rzch",
      templateParams,
      "yjDmZVG90i3oxo4s5"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    setIsMessageSent(true);

    setTimeout(() => {
      setIsMessageSent(false);
      e.target.reset();
    }, 5000);
    const templateParams = {
      from_name: formData.get("name"),
      from_email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      await sendEmail(templateParams);
      setIsMessageSent(true);
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  const StatusDot = ({ status }) => {
    const color = status === "online" ? "bg-green-500" : "bg-orange-500";

    return (
      <motion.div
        className={`absolute top-0 right-0 w-3 h-3 ${color} rounded-full`}
        animate={{
          boxShadow: [
            `0 0 0 0 ${
              status === "online"
                ? "rgba(34, 197, 94, 0.4)"
                : "rgba(249, 115, 22, 0.4)"
            }`,
            `0 0 0 10px ${
              status === "online"
                ? "rgba(34, 197, 94, 0)"
                : "rgba(249, 115, 22, 0)"
            }`,
          ],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 1.5,
          ease: "easeInOut",
        }}
      />
    );
  };
  const toggleChatbot = () => {
    setIsChatbotOpen((prev) => !prev);
  };

  const closeChatbot = () => {
    setIsChatbotOpen(false);
  };

  const projects = [
    {
      title: "Karkelly",
      link: "https://karkelly.rw/",
      category: "frontend",
      image: karkelly,
    },
    {
      title: "ISUZUME",
      link: "https:isuzume.rw",
      category: "frontend",
      image: isuzume,
    },
    {
      title: "Rushago",

      link: "https://www.figma.com/proto/4WF3xMJAhpUgooKKl1jShO/RUSHA-GO?node-id=0-1&t=0NG0tXgOLLsSMJJ9-1",
      category: "ui/ux",
      image: rushago,
    },
    {
      title: "Restran",

      link: "https://mangwibi.netlify.app/",
      category: "frontend",
      image: Restor,
    },
    {
      title: "Estation",

      link: "https://www.figma.com/proto/mkgBFn0K6nPLdRQsB6VHcG/Untitled?node-id=1-2&starting-point-node-id=1%3A2&scaling=contain&content-scaling=responsive&t=25xquNXjbDXDyVT7-1",
      category: "ui/ux",
      image: estation,
    },
    {
      title: "AgroTech",

      link: "https://agrotechrw.vercel.app/",
      category: "frontend",
      image: agro,
    },
  ];

  const pages = {
    home: {
      title: "",
      content: (
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">Hi, I'm Promesse</h1>
          <p className="text-xl">
            <TypeWriter
              words={["Front-end Developer", "UI/UX Designer"]}
              typingSpeed={150}
              deletingSpeed={100}
              pauseTime={2000}
            />
          </p>
          <div className={`${isDarkMode ? "text-gray-300" : "text-gray-950"}`}>
            <p>
             
I am a passionate UI/UX Designer and Front-End Engineer with over three years of experience. I am skilled in Figma and Adobe Photoshop, and I create intuitive designs for web applications. As a front-end developer, I specialize in React.js, Next.js, HTML, CSS, and JavaScript to bring designs to life and deliver seamless user experiences. I have a robust background in enhancing web application performance and user experience.






Sources

            </p>

            <div className="flex mb-3 gap-4 mt-4">
              {/* React */}
              <div className="relative group p-3 bg-[#02a3e4] text-white rounded-full">
                <FaReact className="text-2xl" />
                <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 bg-black text-white text-xs py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-10 transition-all duration-300">
                  React.js
                </span>
              </div>

              {/* Figma */}
              <div className="relative group p-3 bg-[#02a3e4] text-white rounded-full">
                <FaFigma className="text-2xl" />
                <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 bg-black text-white text-xs py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-10 transition-all duration-300">
                  Figma
                </span>
              </div>

              {/* Three.js */}
              <div className="relative group p-3 bg-[#02a3e4] text-white rounded-full">
              <SiNextdotjs className="text-2xl" />
                <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 bg-black text-white text-xs py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-10 transition-all duration-300">
                  Next Js
                </span>
              </div>

              {/* HTML5 */}
              <div className="relative group p-3 bg-[#02a3e4] text-white rounded-full">
                <FaHtml5 className="text-2xl" />
                <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 bg-black text-white text-xs py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-10 transition-all duration-300">
                  HTML5
                </span>
              </div>
            </div>
          </div>{" "}
          <button
            className="px-6  py-3 bg-[#00a2e3] text-white rounded-lg hover:bg-[#0081b3] transition-colors"
            onClick={() => setIsProjectModalOpen(true)}
          >
            View My Work
          </button>
        </div>
      ),
    },
    about: {
      title: "About Me",
      content: (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-4 text-sm text-[#00a2e3]"></div>
          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-950"}`}>
            Frontend Developer & UI/UX Designer with a passion for creating
            intuitive and engaging digital experiences. Skilled in Figma for
            designing seamless user interfaces and React for building dynamic
            web applications. Successfully improved user engagement by 40%
            across multiple projects, including Karkelly, where I contributed
            both in Figma and coding. Led design and frontend development
            initiatives that resulted in a 70% increase in conversions and
            usability scores. Passionate about crafting world-class applications
            with a focus on user-centric design and performance.
          </p>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-6">Skills</h3>
            <div className="grid grid-cols-1 gap-2">
              <SkillBar skill="HTML" percentage={100} isDarkMode={isDarkMode} />
              <SkillBar skill="CSS" percentage={90} isDarkMode={isDarkMode} />
              <SkillBar
                skill="JAVASCRIPT"
                percentage={75}
                isDarkMode={isDarkMode}
              />
              <SkillBar
                skill="React, React Native"
                percentage={84}
                isDarkMode={isDarkMode}
              />
              <SkillBar
                skill="Next Js"
                percentage={60}
                isDarkMode={isDarkMode}
              />
              <SkillBar skill="FIGMA" percentage={95} isDarkMode={isDarkMode} />
              <SkillBar skill="Tailwind" percentage={93} isDarkMode={isDarkMode} />
            </div>
          </div>
          <div className="space-y-4 mt-6">
            <h3 className="text-2xl font-bold">Education</h3>
            <ul className="space-y-2">
              <li>
                <h4 className="font-semibold">
                  {" "}
                  Bachelor's in Computer Science
                </h4>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-950"
                  }`}
                >
                  University of KIgali, 2024
                </p>
              </li>
            </ul>
          </div>
          <div className="space-y-4 mt-6">
            <h3 className="text-2xl font-bold">Resume Summary</h3>
            <p className={`${isDarkMode ? "text-gray-300" : "text-gray-950"}`}>
              Experienced Front-End Engineer with a strong background in
              enhancing web application performance and user experience. Skilled
              in HTML, CSS, JavaScript, and React, with a track record of
              improving website load times, user retention, and accessibility.
              Adept at UI/UX design, usability testing, and responsive web
              development, ensuring seamless integration of design and
              functionality. Passionate about delivering efficient, scalable,
              and user-friendly digital solutions.
            </p>
          </div>
          <a
            href="/Correct CV.pdf"
            download="Promesse_Irakoze_Resume.pdf"
            className="inline-flex items-center px-4 py-2 bg-[#00a2e3] text-white rounded-lg hover:bg-[#0081b3] transition-colors"
          >
            <FaDownload className="mr-2" />
            Download Resume
          </a>
        </div>
      ),
    },
    portfolio: {
      title: "Portfolio",
      content: (
        <div className="space-y-8">
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setFilter("all")}
              className="px-4 py-2 bg-[#00a2e3] text-white rounded"
            >
              All
            </button>
            <button
              onClick={() => setFilter("ui/ux")}
              className="px-4 py-2 bg-[#00a2e3] text-white rounded"
            >
              UI/UX
            </button>
            <button
              onClick={() => setFilter("frontend")}
              className="px-4 py-2 bg-[#00a2e3] text-white rounded"
            >
              Frontend
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter(
                (project) => filter === "all" || project.category === filter
              )
              .map((project, index) => (
                <div
                  key={index}
                  className="relative group w-full h-64 rounded-lg overflow-hidden shadow-lg"
                >
                  {/* Project Image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />

                  {/* Hover Overlay with Slide-up Effect */}
                  <div className="absolute bottom-0 left-0 w-full h-0 bg-black bg-opacity-60 opacity-0 group-hover:h-16 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white text-black rounded-lg shadow-md hover:bg-gray-200"
                    >
                      View Project
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ),
    },
    contact: {
      title: "Contact",
      content: (
        <div className="space-y-6">
          {isMessageSent ? (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center space-y-4 py-12"
            >
              <CheckCircle className="w-16 h-16 text-[#00a2e3] animate-bounce" />
              <p
                className={`${isDarkMode ? "text-gray-300" : "text-gray-950"}`}
              >
                Message sent successfully!
              </p>
            </motion.div>
          ) : (
            <>
              <h2 className="text-2xl font-bold">Get in touch</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  className="w-full p-3 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-300 dark:border-gray-700 focus:border-[#00a2e3] focus:outline-none dark:text-white text-black"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full p-3 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-300 dark:border-gray-700 focus:border-[#00a2e3] focus:outline-none dark:text-white text-black"
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  rows={4}
                  required
                  className="w-full p-3 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-300 dark:border-gray-700 focus:border-[#00a2e3] focus:outline-none dark:text-white text-black"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#00a2e3] text-white rounded-lg hover:bg-[#0081b3] transition-colors"
                >
                  Send Message
                </button>
              </form>
            </>
          )}

          <p className=" text-[11px]">
            &copy; {new Date().getFullYear()} create by promesse irakoze.
          </p>
        </div>
      ),
    },
  };

  const handlePageChange = (page) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
  };
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "dark bg-gray-900" : "bg-gray-100"
      } transition-colors duration-300`}
    >
      <div className="min-h-screen dark:text-white p-4 md:p-8 flex flex-col md:flex-row md:items-center md:justify-center">
        <ShootingStars isDarkMode={isDarkMode} />
        <div className="relative w-full max-w-6xl flex flex-col md:flex-row">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden fixed top-4 right-4 z-50 p-2 bg-gray-200 dark:bg-gray-800 rounded-full"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          {/* Navigation Sidebar Card */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={`${
              isMobileMenuOpen
                ? "fixed inset-0 bg-white/95 dark:bg-gray-900/95"
                : "hidden"
            } md:flex md:static md:bg-transparent md:w-20 bg-white  backdrop-blur rounded-3xl flex-col items-center py-4 space-y-4 z-40`}
          >
            <motion.div
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-16 h-14 bg-[#00a2e3]/20 text-[#00a2e3] rounded-xl flex items-center justify-center text-xl font-bold"
            >
              {`<IP />`}
            </motion.div>

            <nav className="flex flex-col gap-6 items-center md:items-stretch">
              <button
                onClick={toggleDarkMode}
                className="p-3 rounded-xl transition-colors flex items-center justify-center"
              >
                {isDarkMode ? (
                  <FaSun className="text-yellow-400" />
                ) : (
                  <FaMoon className="text-gray-600 dark:text-gray-400" />
                )}
              </button>
              {[
                { icon: FaHome, page: "home", label: "Home" },
                { icon: FaUser, page: "about", label: "About" },
                { icon: FaBriefcase, page: "portfolio", label: "Portfolio" },
                { icon: FaPhone, page: "contact", label: "Contact" },
              ].map(({ icon: Icon, page, label }) => (
                <motion.button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`p-3 rounded-xl transition-colors flex items-center gap-3 ${
                    activePage === page
                      ? "bg-[#00a2e3]/20 text-[#00a2e3]"
                      : `${
                          isDarkMode
                            ? "text-gray-400 hover:text-white"
                            : "text-gray-600 hover:text-black"
                        }`
                  }`}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <Icon className="text-xl" />
                  <span className="md:hidden">{label}</span>
                </motion.button>
              ))}
            </nav>
          </motion.div>

          {/* Profile Card */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full md:w-[400px] h-[calc(100vh-2rem)] md:h-[calc(100vh-4rem)] max-h-[800px] bg-gray-200/95 dark:bg-gray-800/95 backdrop-blur rounded-3xl md:ml-8 relative z-20 overflow-hidden my-4 md:my-0"
          >
            <div className="relative h-full">
              {/* Image container with gradient overlay */}
              <div className="absolute inset-0">
                <img
                  src={image}
                  alt="Profile"
                  className="object-cover w-ful  h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/70 to-gray-900"></div>
              </div>

              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-10 ">
                <h1 className="text-4xl md:text-5xl font-bold dark:text-white text-white mb-2">
                  Promesse IRAKOZE
                </h1>

                <div className="flex gap-6">
                  {[
                    {
                      icon: FaFacebookF,
                      url: "https://www.facebook.com/IPLOFTE",
                    },

                    {
                      icon: FaLinkedinIn,
                      url: "https://rw.linkedin.com/in/irakoze-promesse-422700217",
                    },
                    { icon: FaGithub, url: "https://github.com/Promesse10" },
                  ].map(({ icon: Icon, url }, index) => (
                    <motion.a
                      key={index}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -5 }}
                      className={`w-12 h-12 ${
                        isDarkMode
                          ? "bg-gray-800/30 dark:text-white"
                          : "bg-gray-200/90 text-black"
                      } backdrop-blur rounded-lg flex items-center justify-center hover:text-[#00a2e3] transition-colors text-xl`}
                    >
                      <Icon />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="fixed bottom-4 right-4 z-50">
            <motion.button
              onClick={toggleChatbot}
              className="bg-[#00a2e3] text-white p-3 rounded-full shadow-lg hover:bg-[#0081b3] transition-colors relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaComments className="text-2xl" />
              <StatusDot status={status} />
            </motion.button>
            <AnimatePresence>
              {isChatbotOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-10 right-0 w-[400px]"
                >
                  <Chatbot onClose={() => setIsChatbotOpen(false)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Content Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
              className={`w-full md:w-[calc(100%-480px)] ${
                isDarkMode
                  ? "bg-gray-800/95 text-white"
                  : "bg-gray-200 text-slate-950"
              } backdrop-blur rounded-3xl p-6 md:p-12 overflow-hidden z-20 mt-4 md:mt-0 md:ml-8 flex flex-col`}
              style={{ maxHeight: "calc(100vh - 2rem)" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                {pages[activePage].title}
              </h2>
              <div className="overflow-y-auto flex-grow" ref={contentRef}>
                {pages[activePage].content}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        {isProjectModalOpen && (
          <ProjectCarousel onClose={() => setIsProjectModalOpen(false)} />
        )}
      </div>
    </div>
  );
}
