'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaUser, FaPhone, FaBriefcase, FaHome, FaFacebookF, 
  FaTwitter, FaLinkedinIn, FaBehance, FaDatabase, 
  FaShieldAlt, FaCode, FaSearch, 
  FaDownload, FaGithub, FaDribbble, FaMoon, FaSun, FaRobot
} from 'react-icons/fa'
import ShootingStars from './ShootingStars'
import TypeWriter from './Typer'
import SkillBar from './Skillbar'
import { CheckCircle } from 'lucide-react'
import Chatbot from './chatbot'
import image from "../IMAGE/pic.jpg"
export default function Portfolio() {
  const [activePage, setActivePage] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const contentRef = useRef(null)
  const [isMessageSent, setIsMessageSent] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo(0, 0)
    }
  }, [activePage])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsMessageSent(true)
    
    setTimeout(() => {
      setIsMessageSent(false)
      e.target.reset()
    }, 5000)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const toggleChatbot = () => {
    setIsChatbotOpen(prev => !prev)
  }

  const closeChatbot = () => {
    setIsChatbotOpen(false)
  }

  const pages = {
    home: {
      title: "",
      content: (
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">Hi, I'm Jose Niko</h1>
          <p className="text-xl">
            <TypeWriter 
              words={["Front-end Developer", "UI/UX Developer"]} 
              typingSpeed={150}
              deletingSpeed={100}
              pauseTime={2000}
            />
          </p>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-950'}`}>
            Crafting beautiful and functional web experiences with a passion for clean code and pixel-perfect designs.
          </p>
          <button className="px-6 py-3 bg-[#00a2e3] text-white rounded-lg hover:bg-[#0081b3] transition-colors">
            View My Work
          </button>
        </div>
      )
    },
    about: {
      title: "About Me",
      content: (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-4 text-sm text-[#00a2e3]">
            <span>28 years</span>
            <span>/</span>
            <span>Live</span>
            <span>/</span>
            <span>Freelance</span>
          </div>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-950'}`}>
            Profile: Full stack web developer with a passion for metrics and testing former "Technical Supervisor" at two product based startups. Increased Deployment by 52% and sales by 12%. Consistently receive high user experience scores for all web development projects, including a 55% increase for Flavor Inc. Passionate about building world class web applications.
          </p>
          
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-6">Skills</h3>
            <div className="grid grid-cols-1 gap-2">
  <SkillBar skill="HTML" percentage={100} isDarkMode={isDarkMode} />
  <SkillBar skill="CSS" percentage={90} isDarkMode={isDarkMode} />
  <SkillBar skill="JAVASCRIPT" percentage={75} isDarkMode={isDarkMode} />
  <SkillBar skill="PHP" percentage={80} isDarkMode={isDarkMode} />
  <SkillBar skill="WORDPRESS/CMS" percentage={90} isDarkMode={isDarkMode} />
  <SkillBar skill="PHOTOSHOP" percentage={55} isDarkMode={isDarkMode} />
</div>

          </div>
          <div className="space-y-4 mt-6">
            <h3 className="text-2xl font-bold">Education</h3>
            <ul className="space-y-2">
              <li>
                <h4 className="font-semibold">Master's in Computer Science</h4>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-950'}`}>University of Technology, 2018</p>
              </li>
              <li>
                <h4 className="font-semibold">Bachelor's in Software Engineering</h4>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-950'}`}>State University, 2016</p>
              </li>
            </ul>
          </div>
          <div className="space-y-4 mt-6">
            <h3 className="text-2xl font-bold">Resume Summary</h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-950'}`}>
              Experienced full-stack developer with a strong background in web technologies and a passion for creating efficient, scalable, and user-friendly applications. Skilled in React, Node.js, and cloud technologies with a track record of delivering high-quality projects on time and within budget.
            </p>
          </div>
          <a href="#" className="inline-flex items-center px-4 py-2 bg-[#00a2e3] text-white rounded-lg hover:bg-[#0081b3] transition-colors">
            <FaDownload className="mr-2" />
            Download Resume
          </a>
        </div>
      )
    },
    portfolio: {
      title: "portfolio",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="space-y-4">
                <div className="aspect-video bg-gray-700 rounded-lg"></div>
                <h3 className="text-xl font-bold">Project {item}</h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-950'}`}>A brief description of the project and the technologies used. This project showcases my skills in web development and design.</p>
                <div className="flex space-x-4">
                  <a href="#" className="text-[#00a2e3] hover:underline">Live Demo</a>
                  <a href="#" className="text-[#00a2e3] hover:underline">GitHub</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    contact: {
      title: "contact",
      content: (
        <div className="space-y-6">
          {isMessageSent ? (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center space-y-4 py-12"
            >
              <CheckCircle className="w-16 h-16 text-[#00a2e3] animate-bounce" />
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-950'}`}>Message sent successfully!</p>
            </motion.div>
          ) : (
            <>
              <h2 className="text-2xl font-bold">Get in touch</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Name" 
                  required
                  className="w-full p-3 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-300 dark:border-gray-700 focus:border-[#00a2e3] focus:outline-none dark:text-white text-black" 
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  required
                  className="w-full p-3 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-300 dark:border-gray-700 focus:border-[#00a2e3] focus:outline-none dark:text-white text-black" 
                />
                <textarea 
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
              <div className="flex space-x-4">
  <a
    href="#"
    className={`${
      isDarkMode ? 'text-gray-300' : 'text-black'
    } hover:text-[#00a2e3]`}
  >
    <FaLinkedinIn />
  </a>
  <a
    href="#"
    className={`${
      isDarkMode ? 'text-gray-300' : 'text-black'
    } hover:text-[#00a2e3]`}
  >
    <FaGithub />
  </a>
  <a
    href="#"
    className={`${
      isDarkMode ? 'text-gray-300' : 'text-black'
    } hover:text-[#00a2e3]`}
  >
    <FaDribbble />
  </a>
</div>

            </>
          )}
        </div>
      )
    }
  }

  const handlePageChange = (page) => {
    setActivePage(page)
    setIsMobileMenuOpen(false)
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-100'} transition-colors duration-300`}>
      <div className="min-h-screen dark:text-white p-4 md:p-8 flex flex-col md:flex-row md:items-center md:justify-center">
        <ShootingStars isDarkMode={isDarkMode} />
        <div className="relative w-full max-w-6xl flex flex-col md:flex-row">
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden fixed top-4 right-4 z-50 p-2 bg-gray-200 dark:bg-gray-800 rounded-full"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>

          {/* Navigation Sidebar Card */}
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={`${isMobileMenuOpen ? 'fixed inset-0 bg-white/95 dark:bg-gray-900/95' : 'hidden'} md:flex md:static md:bg-transparent md:w-20 bg-white  backdrop-blur rounded-3xl flex-col items-center py-4 space-y-4 z-40`}
          >
            <motion.div
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-12 h-12 bg-[#00a2e3]/20 text-[#00a2e3] rounded-xl flex items-center justify-center text-xl font-bold"
            >
              JN
            </motion.div>
            
            <nav className="flex flex-col gap-6 items-center md:items-stretch">
              <button
                onClick={toggleDarkMode}
                className="p-3 rounded-xl transition-colors flex items-center justify-center"
              >
                {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600 dark:text-gray-400" />}
              </button>
              {[
                { icon: FaHome, page: 'home', label: 'Home' },
                { icon: FaUser, page: 'about', label: 'About' },
                { icon: FaBriefcase, page: 'portfolio', label: 'Portfolio' },
                { icon: FaPhone, page: 'contact', label: 'Contact' }
              ].map(({ icon: Icon, page, label }) => (
                <motion.button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`p-3 rounded-xl transition-colors flex items-center gap-3 ${
                    activePage === page
                    ? 'bg-[#00a2e3]/20 text-[#00a2e3]'
                    : `${
                        isDarkMode
                          ? 'text-gray-400 hover:text-white'
                          : 'text-gray-600 hover:text-black'
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
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/70 to-gray-900"></div>
              </div>

              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-10 ">
                <h1 className="text-4xl md:text-5xl font-bold dark:text-white text-white mb-2">Promesse IRAKOZE</h1>
                <p className="dark:text-white text-[#00a2e3] text-lg mb-6">Developer</p>
                <div className="flex gap-6">
  {[
    { icon: FaFacebookF, url: '#' },
    { icon: FaTwitter, url: '#' },
    { icon: FaLinkedinIn, url: '#' },
    { icon: FaBehance, url: '#' },
  ].map(({ icon: Icon, url }, index) => (
    <motion.a
      key={index}
      href={url}
      whileHover={{ y: -5 }}
      className={`w-12 h-12 ${
        isDarkMode
          ? 'bg-gray-800/30 dark:text-white'
          : 'bg-gray-200/90 text-black'
      } backdrop-blur rounded-lg flex items-center justify-center hover:text-[#00a2e3] transition-colors text-xl`}
    >
      <Icon />
    </motion.a>
  ))}
</div>

              </div>
            </div>
          </motion.div>

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
                damping: 20
              }}
              className={`w-full md:w-[calc(100%-480px)] ${
                isDarkMode
                  ? 'bg-gray-800/95 text-white'
                  : 'bg-gray-200 text-slate-950'
              } backdrop-blur rounded-3xl p-6 md:p-12 overflow-hidden z-20 mt-4 md:mt-0 md:ml-8 flex flex-col`}
              

              style={{ maxHeight: 'calc(100vh - 2rem)' }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8">{pages[activePage].title}</h2>
              <div className="overflow-y-auto flex-grow" ref={contentRef}>
                {pages[activePage].content}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <button
          onClick={toggleChatbot}
          className="fixed bottom-4 right-4 bg-[#00a2e3] text-white p-3 rounded-full shadow-lg hover:bg-[#0081b3] transition-colors z-50"
        >
          <FaRobot className="text-2xl" />
        </button>
        <AnimatePresence>
          {isChatbotOpen && <Chatbot onClose={closeChatbot} />}
        </AnimatePresence>
      </div>
    </div>
  )
}

