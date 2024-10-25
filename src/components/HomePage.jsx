
'use client'

import React, { useState, useEffect, useRef } from 'react';
import { FaTwitter, FaFacebookF, FaInstagram, FaSkype, FaLinkedinIn, FaArrowUp } from 'react-icons/fa';
import { HiHome, HiUser, HiDocument, HiViewGrid, HiServer, HiMail, HiMenu } from 'react-icons/hi';
import { Smile, FileText, Headphones, Users } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import picture from "../IMAGE/pic.jpg";
import picture2 from "../IMAGE/pic2.jpg";
import background from "../IMAGE/UIUX1.jpg";
import qrcode from "../IMAGE/qr.png";
import { ZoomIn, Link as LinkIcon } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { PhoneCall } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Star, Send } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useCallback } from 'react';
import resume from '../IMAGE/My_Resume.pdf';
import mobileApp from "../IMAGE/kary.jpg"
import kigali from "../IMAGE/kigali.jpg"
import environment from "../IMAGE/environment.jpg"

const Button = ({ children, ...props }) => <button {...props}>{children}</button>
const Input = ({ ...props }) => <input {...props} />
const Textarea = ({ ...props }) => <textarea {...props} />
const Card = ({ children, className, ...props }) => <div className={`bg-white rounded-lg shadow-lg ${className}`} {...props}>{children}</div>
const CardHeader = ({ children, ...props }) => <div className="px-6 py-4 border-b" {...props}>{children}</div>
const CardContent = ({ children, ...props }) => <div className="px-6 py-4" {...props}>{children}</div>
const CardFooter = ({ children, ...props }) => <div className="px-6 py-4 border-t" {...props}>{children}</div>
const CardTitle = ({ children, ...props }) => <h2 className="text-xl font-semibold" {...props}>{children}</h2>

const emojis = ["😞", "🙁", "😐", "🙂", "😄"]
const TypeWriter = ({ text, delay }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span>{currentText}</span>;
}

const AnimatedNumber = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (start === end) return;

    let totalMilSecDur = parseInt(duration);
    let incrementTime = (totalMilSecDur / end) * 1000;

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => {
      clearInterval(timer);
    };
  }, [value, duration]);

  return <span>{count}</span>;
}

const SkillBar = ({ skill, percentage }) => {
  const [width, setWidth] = useState(0);
  const skillRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(percentage), 200);
        }
      },
      { threshold: 0.5 }
    );

    if (skillRef.current) {
      observer.observe(skillRef.current);
    }

    return () => {
      if (skillRef.current) {
        observer.unobserve(skillRef.current);
      }
    };
  }, [percentage]);

  return (
    <div ref={skillRef} className="mb-6">
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-slate-800 dark:text-white">{skill}</span>
        <span className="text-sm font-medium text-slate-800 dark:text-white">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-slate-800">
        <div
          className="bg-blue-300 h-2.5 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isQRCodeOpen, setIsQRCodeOpen] = useState(false);
  const [activePage, setActivePage] = useState('home');
  const [showScrollArrow, setShowScrollArrow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRefs = useRef({});

  const portfolioItems = [
    { id: 1, category: 'UI/UX', image: mobileApp, title: 'karkelly', link: 'https://www.figma.com/proto/dA01grWsZ5KM4hXNDa7T23/KARKELLY-COMPANY-Ltd?node-id=1115-4&scaling=scale-down-width&content-scaling=fixed&t=mEpMpYTMwS3snFIT-1' },
    { id: 2, category: 'UI/UX', image: kigali, title: 'kigali event', link: 'https://www.figma.com/proto/tjVq7WgpbsHqUwMXLiKMDv/KIGALI-Events?node-id=247-81&t=1UfjEjtcjtqgphY7-1' },
    { id: 6, category: 'UI/UX', image: environment , title: 'Environment', link: 'https://www.figma.com/design/lrb0eHW1YkDglh30yIo5Vo/Environment-project?node-id=0-1&t=CPaA0FavjXntwNKD-1' },
    // { id: 4, category: 'FRONT-END', image: '/placeholder.svg?height=300&width=400', title: 'Teal Book Cover', link: '/projects/teal-book' },
    // { id: 5, category: 'FRONT-END', image: '/placeholder.svg?height=300&width=400', title: 'Wallet App Interface', link: '/projects/wallet-app' },
    // { id: 3, category: 'FRONT-END', image: '/placeholder.svg?height=300&width=400', title: 'Photography Equipment', link: '/projects/photography-equipment' },
  ];
  
  const categories = ['ALL', 'UI/UX', 'FRONT-END'];
  const skills = [
    { name: 'HTML', percentage: 100 },
    { name: 'CSS', percentage: 90 },
    { name: 'JAVASCRIPT', percentage: 75 },
    { name: 'REACT', percentage: 80 },
    { name: 'FIGMA', percentage: 100 },
    { name: 'TAILWIND', percentage: 55 },
  ];

  const stats = [
    { icon: Smile, value: 232, label: 'Happy Clients', description: 'Your guidance made a difference!' },
    { icon: FileText, value: 30, label: 'Projects', description: 'Outstanding work on recent project!' },
    { icon: Headphones, value: 100, label: 'Contact Me', description: 'Thank you for reaching out!' },
    { icon: Users, value: 32, label: 'Team Work', description: 'rerum asperiores dolor' },
  ];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [reviews, setReviews] = useState([
    { id: 1, name: "Myrtie May", job: "Head of Global Product", comment: "Great experience!", rating: 4 },
    { id: 2, name: "Blanche Pearson", job: "Sales Manager", comment: "Excellent service!", rating: 5 },
    { id: 3, name: "Laura French", job: "External Consultant", comment: "Good, but could be better.", rating: 3 },
  ])
  const [currentReview, setCurrentReview] = useState(0)
  const [newReview, setNewReview] = useState({ name: "", job: "", comment: "", rating: 0 })
  const [showForm, setShowForm] = useState(true)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])
  const nextReview = useCallback(() => {
    setDirection(1)
    setCurrentReview((prev) => (prev + 1) % reviews.length)
  }, [reviews.length])

  const prevReview = useCallback(() => {
    setDirection(-1)
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)
  }, [reviews.length])

  useEffect(() => {
    const interval = setInterval(() => {
      nextReview()
    }, 5000) // Change review every 5 seconds

    return () => clearInterval(interval)
  }, [nextReview])


  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
  const validateForm = () => {
    let errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) errors.message = 'Message is required';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newReview.name && newReview.comment && newReview.rating) {
      setReviews([...reviews, { ...newReview, id: reviews.length + 1 }])
      setNewReview({ name: "", job: "", comment: "", rating: 0 })
      setShowForm(false)
    }
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      // Here you would typically send the form data to your server
      // For this example, we'll just log it to the console
      console.log('Form submitted:', formData);
      alert('Message sent successfully!');
      // In a real application, you would send this data to your server
      // which would then forward it to your Gmail account
    } else {
      setErrors(formErrors);
    }
  };

  const currentYear = new Date().getFullYear();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [modalImage, setModalImage] = useState('');
  const filteredItems = selectedCategory === 'ALL'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCategory);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const openQRCode = () => {
    setIsQRCodeOpen(true);
  };

  const closeQRCode = (e) => {
    if (e.target === e.currentTarget) {
      setIsQRCodeOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      setShowScrollArrow(scrollPosition > windowHeight * 0.5);

      Object.entries(sectionRefs.current).forEach(([key, ref]) => {
        if (ref && ref.offsetTop <= scrollPosition + 200) {
          setActivePage(key);
        }
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = sectionRefs.current[sectionId];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setActivePage(sectionId);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
      <div className="fixed top-0 right-0 p-4 z-50 md:hidden">
        <button onClick={toggleSidebar} className="text-blue-300 focus:outline-none">
          <HiMenu className="text-3xl sm:text-4xl" />
        </button>
      </div>

      <aside className={`w-64 bg-slate-800 p-6 fixed h-full overflow-y-auto transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 z-40`}>
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full bg-blue-300 opacity-25 animate-ping z-0"></div>
            <img
              src={picture}
              alt="Profile"
              className="w-full h-full rounded-full relative z-10" // Ensure the image is on top
            />
          </div>
          <h2 className="text-xl font-bold mt-4">Promesse IRAKOZE</h2>
        </div>
        <nav>
          <div className="mt-8 flex justify-center space-x-4">
            <a href="#" className="text-gray-400 hover:text-white"><FaTwitter /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaFacebookF /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaInstagram /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaLinkedinIn /></a>
          </div>
          <ul className="space-y-7 mt-7">
            {[
              { id: 'home', icon: HiHome, label: 'Home' },
              { id: 'about', icon: HiUser, label: 'About' },
              { id: 'resume', icon: HiDocument, label: 'Resume' },
              { id: 'portfolio', icon: HiViewGrid, label: 'Portfolio' },
              { id: 'contact', icon: HiMail, label: 'Contact' },
            ].map(({ id, icon: Icon, label }) => (
              <li key={id}>
                <button
                  onClick={() => scrollToSection(id)}
                  className={`flex items-center space-x-2 w-full text-left transition-colors duration-200 ${activePage === id ? 'text-blue-300' : 'text-gray-400 hover:text-white'
                    }`}
                >
                  <Icon className="text-xl" />
                  <span>{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="flex-1 md:ml-64">
        <div ref={el => sectionRefs.current['home'] = el} className="relative w-full h-screen ">
          <img
            src={background}
            alt="Background"
            className="w-full h-full object-cover"
          />



          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end items-center  text-center p-4">
            <h1 className="text-2xl md:text-7xl font-bold mb-4  ">Promesse IRAKOZE</h1>
            <p className="text-2xl md:text-3xl mb-8">
              I'm <TypeWriter text=" Front-End Developer " delay={100} />
            </p>
            <button
              onClick={openQRCode}
              className="bg-blue-300 text-black mb-20 font-semibold py-2 px-8 rounded-full transition-all duration-300 ease-in-out hover:bg-slate-800 hover:text-white border-2 border-blue-300 shadow-[0_0_15px_rgba(255,255,255,0.5)] hover:shadow-[0_0_20px_rgba(255,255,255,0.8)]"
            >
              Hire Me
            </button>
          </div>

        </div>

        <section ref={el => sectionRefs.current['about'] = el} className="bg-white text-black pb-4">
          <div className="container mb-14 mx-auto px-5 py-16 max-w-6xl">
            <h1 className="text-4xl text-slate-700  md:text-5xl font-bold mb-6" data-aos="fade-up">About</h1>
            <div className="w-20 h-1 bg-blue-300 mb-8" data-aos="fade-up" data-aos-delay="200"></div>

            <p className="text-sm mb-12" data-aos="fade-up" data-aos-delay="400">
              I am passionate front-end developers dedicated to crafting visually stunning and user-friendly web experiences. With expertise in HTML, CSS, JavaScript, and modern frameworks, we bring designs to life, ensuring responsive, accessible, and seamless digital interactions.
            </p>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-80" data-aos="fade-right">
                <img
                  src={picture2}
                  alt="Profile"
                  className="h-auto rounded-lg shadow-lg"
                />
              </div>

              <div className="md:w-1/2" data-aos="fade-left">
                <h2 className="text-2xl text-slate-700 font-semibold mb-4">Front-End Developer</h2>
                <p className="text-base italic mb-6">
                  I’m Promesse IRAKOZE, a dedicated front-end developer and UI/UX designer with expertise in creating responsive and engaging digital interfaces. I focus on combining design principles and development skills to build seamless, user-focused web experiences.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <span className="text-blue-300 mr-2">▸</span>
                    <span className="font-semibold mr-2">Birthday:</span> 30/08/2004
                  </div>

                  <div className="flex items-center">
                    <span className="text-blue-300 mr-2">▸</span>
                    <span className="font-semibold mr-2">Phone:</span> +250 780 114 522
                  </div>

                  <div className="flex items-center">
                    <span className="text-blue-300 mr-2">▸</span>
                    <span className="font-semibold mr-2">City:</span> Kigali,Rwanda
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-300 mr-2">▸</span>
                    <span className="font-semibold mr-2">Freelance:</span> Available
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center mt-4">
                  <span className="text-blue-300 mr-2">▸</span>
                  <span className="font-semibold mr-2">Email:</span>
                  <h6 className="break-all">promesseirakoze10@gmail.com</h6>
                </div>

              </div>
            </div>
          </div>
          <div className="py-9 container mx-auto ">

            <div className="grid grid-cols-1 p-4 bg-gradient-to-br from-blue-300 to-white  sm:grid-cols-2 lg:grid-cols-4 gap-8  mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-12 h-12 text-white  mx-auto mb-4" />
                  <div className="text-4xl text-slate-800 font-bold mb-2">
                    <AnimatedNumber value={stat.value} />
                  </div>
                  <h3 className="text-xl text-slate-800  font-semibold mb-2">{stat.label}</h3>
                  <p className="text-gray-400">{stat.description}</p>
                </div>
              ))}
            </div>

            <div className="mb-16  p-4 ">
              <h2 className="text-4xl text-slate-700 font-bold mb-6">Skills</h2>
              <p className="text-slate-700  mb-8">
                Skilled in React, JSX, Tailwind, Bootstrap, HTML, CSS, and JavaScript; specialized in UI/UX design using Figma for interactive prototyping.
              </p>
              <div className="grid  text-white  grid-cols-1 md:grid-cols-2 gap-8">
                {skills.map((skill, index) => (
                  <SkillBar key={index} skill={skill.name} percentage={skill.percentage} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section ref={el => sectionRefs.current['resume'] = el} className="">
        <div className="bg-white text-slate-700 min-h-screen p-8 md:p-16">
  <div className="max-w-4xl mx-auto">
    <h1 className="text-4xl font-bold mb-4" data-aos="fade-down">Resume</h1>
    <div className="h-1 w-16 bg-blue-300 mb-8" data-aos="fade-right"></div>

    <p className="mb-12 text-gray-600" data-aos="fade-up">
      Designed intuitive and visually appealing user interfaces for web applications, focusing on usability and user experience. Conducted user research, created wireframes, and developed interactive prototypes to test and refine design concepts. Collaborated with developers and stakeholders to ensure seamless integration of design elements into web applications.
    </p>

    <div className="grid md:grid-cols-2 gap-12">
      <div>
        <h2 className="text-2xl font-bold mb-6" data-aos="fade-right">Summary</h2>
        <div className="relative pl-8 mb-8" data-aos="fade-up">
          <div className="absolute left-0 top-1 w-4 h-4 bg-blue-300 rounded-full"></div>
          <div className="absolute left-[7px] top-5 bottom-0 w-0.5 bg-blue-300"></div>
          <h3 className="text-xl font-semibold mb-2">My Info</h3 >
          <p className="text-gray-600 mb-4">
            Front End Developer with a passion for creating visually appealing and user-friendly interfaces. Experienced in using modern web technologies to craft responsive and accessible web applications.
          </p>
          <ul className="list-disc list-inside text-gray-600">
            <li>Kigali, Kicukiro, Rwanda</li>
            <li>+250780114522</li>
            <li>promesseirakoze10@gmail.com</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold mb-6" data-aos="fade-right">Education</h2>
        <div className="relative pl-8 mb-8" data-aos="fade-up">
          <div className="absolute left-0 top-1 w-4 h-4 bg-blue-300 rounded-full"></div>
          <div className="absolute left-[7px] top-5 bottom-0 w-0.5 bg-blue-300"></div>
          <h3 className="text-xl font-semibold mb-2">BACHELOR OF SCIENCE IN COMPUTER SCIENCE</h3>
          <p className="text-gray-600 mb-2">2024 - Present </p>
          <p className="text-gray-600 mb-4">University of Kigali, Kigali, Rwanda</p>
          <p className="text-gray-600">
            Focused on Front End Development, UI/UX Design, and mastering web technologies like React and Tailwind CSS to build user-centric applications.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6" data-aos="fade-left">Professional Experience</h2>
        <div className="relative pl-8 mb-8" data-aos="fade-up">
          <div className="absolute left-0 top-1 w-4 h-4 bg-blue-300 rounded-full"></div>
          <div className="absolute left-[7px] top-5 bottom-0 w-0.5 bg-blue-300"></div>
          <h3 className="text-xl font-semibold mb-2">UI/UX DESIGNER</h3>
          <p className="text-gray-600 mb-2">2021 - 2023</p>
          <p className="text-gray-600 mb-4">HAZA TECH, Kigali, Kicukiro</p>
          <ul className="list-disc list-inside text-gray-600">
            <li>Designed and developed user-centered interfaces for web applications, enhancing usability and overall experience.</li>
            <li>Conducted user research, wireframing, and interactive prototyping to refine design concepts.</li>
            <li>Collaborated closely with developers to ensure consistency and quality in integration.</li>
          </ul>
        </div>

        <div className="relative pl-8 mb-8" data-aos="fade-up">
          <div className="absolute left-0 top-1 w-4 h-4 bg-blue-300 rounded-full"></div>
          <div className="absolute left-[7px] top-5 bottom-0 w-0.5 bg-blue-300"></div>
          <h3 className="text-xl font-semibold mb-2">FRONT END DEVELOPER</h3>
          <p className="text-gray-600 mb-2">2023 - 2024</p>
          <p className="text-gray-600 mb-4">TeckVilla Ltd, Kigali, Kicukiro</p>
          <ul className="list-disc list-inside text-gray-600">
            <li>Implemented responsive designs using HTML, CSS, and JavaScript, ensuring consistency across devices and browsers.</li>
            <li>Conducted usability testing to iterate and improve design solutions based on user feedback.</li>
            <li>Developed and maintained front-end code using React and modern JavaScript features (ES6+).</li>
          </ul>
        </div>
      </div>
      <button>    <a
        href={resume}
        download="My_Resume.pdf" // Customize the download file name if needed
        data-aos="bounce"
        className="bg-gradient-to-br to-whitebg-gradient-to-br from-blue-300 to-blue-400 hover:from-blue-400 hover:to-slate-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
      >
        Download My CV
      </a></button>
    </div>
  </div>
</div>

          
        </section>

        <section ref={el => sectionRefs.current['portfolio'] = el} className="bg-slate-800 ">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-4">Portfolio</h1>
            <p className="mb-8 text-white">
            Designed engaging UI/UX projects and developed responsive front-end solutions, focusing on intuitive interfaces, accessibility, and seamless user experiences
            </p>

            <div className="flex flex-wrap justify-center mb-8">
  {categories.map((category) => (
    <button
      key={category}
      className={`mx-1 sm:mx-2 my-1 px-3 py-2 sm:px-4 rounded ${selectedCategory === category ? 'bg-blue-300 text-white' : 'bg-white text-slate-700'
        }`}
      onClick={() => setSelectedCategory(category)}
    >
      {category}
    </button>
  ))}
</div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <div key={item.id} className="relative group" data-aos="fade-up">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto"
                  />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
  <div className="flex items-center">
    <button
      onClick={() => setModalImage(item.image)}
      className="p-2 bg-white rounded-full mr-2"
      aria-label="Zoom"
    >
      <ZoomIn className="w-6 text-gray-600 h-6" />
    </button>
    <a
      href={item.link}
      className="p-2 bg-white rounded-full shadow"
      aria-label={`Link to ${item.title}`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <LinkIcon className="w-6 h-6 text-gray-600" />
    </a>
  </div>
</div>

                </div>
              ))}
            </div>

            {modalImage && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setModalImage('')}>
                <img
                  src={modalImage}
                  alt="Enlarged portfolio item"
                  className="max-w-4xl max-h-max"
                />
              </div>
            )}
          </div>
          {/* <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-purple-100 p-4 sm:p-8">
            <AnimatePresence>
              {showForm && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="w-full max-w-md mb-8"
                  data-aos="fade-up"
                >
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold text-center">Leave a Review</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                          placeholder="Your Name"
                          value={newReview.name}
                          onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                          className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <Input
                          placeholder="Your Job Title"
                          value={newReview.job}
                          onChange={(e) => setNewReview({ ...newReview, job: e.target.value })}
                          className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <Textarea
                          placeholder="Your Comment"
                          value={newReview.comment}
                          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                          className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <div className="flex justify-between items-center">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`cursor-pointer transition-colors duration-300 ${star <= newReview.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                  }`}
                                onClick={() => setNewReview({ ...newReview, rating: star })}
                              />
                            ))}
                          </div>
                          <div className="text-2xl">{emojis[newReview.rating - 1]}</div>
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <Send className="inline-block mr-2 h-4 w-4" /> Submit Review
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full max-w-md"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <Card className="shadow-lg">
                <CardContent className="relative overflow-hidden pt-6">
                  <AnimatePresence initial={false} mode="wait" custom={direction}>
                    <motion.div
                      key={currentReview}
                      custom={direction}
                      initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                      transition={{ duration: 0.3 }}
                      className="text-center"
                    >
                      <h3 className="text-2xl font-semibold mb-2">{reviews[currentReview].name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{reviews[currentReview].job}</p>
                      <div className="relative mb-6">
                        <p className="italic text-lg">&ldquo;{reviews[currentReview].comment}&rdquo;</p>
                        <div className="absolute -top-4 -left-4 text-6xl text-blue-200 opacity-50">&ldquo;</div>
                        <div className="absolute -bottom-8 -right-4 text-6xl text-blue-200 opacity-50">&rdquo;</div>
                      </div>
                      <div className="flex justify-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`${star <= reviews[currentReview].rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                              }`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </CardContent>
                <CardFooter className="flex flex-col items-center">
                  <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mb-4">
                    <motion.div
                      className="h-full bg-blue-500"
                      initial={{ width: `${(currentReview / (reviews.length - 1)) * 100}%` }}
                      animate={{ width: `${(currentReview / (reviews.length - 1)) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div className="flex justify-between w-full">
                    <Button onClick={prevReview} className="text-blue-500 hover:text-blue-600 transition-colors duration-300">
                      Previous
                    </Button>
                    <Button onClick={nextReview} className="text-blue-500 hover:text-blue-600 transition-colors duration-300">
                      Next
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          </div> */}
        </section>

        <section ref={el => sectionRefs.current['contact'] = el} className=" ">
          <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-4xl text-slate-700 font-bold mb-2" data-aos="fade-down">Contact</h1>
              <div className="w-20 h-1 bg-blue-300 mb-8" data-aos="fade-right"></div>
              <p className="text-gray-600 mb-12" data-aos="fade-up">
              "Reach out for inquiries, support, or partnership opportunities!"
              
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div data-aos="fade-right">
                  <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <div className="flex items-center mb-6 group">
                      <MapPin className="text-2xl text-blue-300 mr-4 group-hover:text-blue-300 transition-colors duration-300" />
                      <div>
                        <h3 className="text-lg font-semibold">Address</h3>
                        <p className="text-gray-600">Kicukiro,Kigali,Rwanda</p>
                      </div>
                    </div>
                    <div className="flex items-center mb-6 group">
                      <PhoneCall className="text-2xl text-blue-300 mr-4 group-hover:text-blue-300 transition-colors duration-300" />
                      <div>
                        <h3 className="text-lg font-semibold">Call Us</h3>
                        <p className="text-gray-600">+250 780 114 522</p>
                      </div>
                    </div>
                    <div className="flex items-center group">
                      <Mail className="text-2xl text-blue-300 mr-4 group-hover:text-blue-300 transition-colors duration-300" />
                      <div>
                        <h3 className="text-lg font-semibold">Email Us</h3>
                        <p className="text-gray-600">promesseirakoze10@gmail.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-64 rounded-lg overflow-hidden">
                  <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d220.00910963383117!2d30.223558070185927!3d-1.9859983357037614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19db59007433291f%3A0x88ad69ba4cb15854!2sKarkelly%20ltd!5e1!3m2!1sen!2sus!4v1726288453388!5m2!1sen!2sus"
                width="90%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
                  </div>
                </div>

                <div data-aos="fade-left">
                  <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="name" className="block text-gray-700 mb-2">Your Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">*{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-gray-700 mb-2">Your Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">*{errors.email}</p>}
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md ${errors.subject ? 'border-red-500' : 'border-gray-300'}`}
                      />
                      {errors.subject && <p className="text-red-500 text-xs mt-1">*{errors.subject}</p>}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                      ></textarea>
                      {errors.message && <p className="text-red-500 text-xs mt-1">*{errors.message}</p>}
                    </div>
                    <div className="text-center">
                      <button type="submit" className="bg-blue-300 text-white px-6 py-3 rounded-md hover:bg-blue-300  transition-colors duration-300">
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>


          </div>
        </section>

        <footer className=" bg-slate-700 py-5 text-center text-white">
          <p>© Copyright PromesseIrakoze  <br />All Rights Reserved {currentYear}</p>
          
        </footer>

      </main>

      {isQRCodeOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeQRCode}>
          <div className="bg-white p-6 rounded-lg max-w-md w-full" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4 text-black">Scan QR Code to Hire Me</h2>
            <img
              src={qrcode}
              alt="QR Code"
              className="w-64 h-64 object-contain mx-auto"
            />
            <p className="mt-4 text-sm text-gray-500">Scan the QR code or click outside to close</p>
          </div>
        </div>
      )}

      <button
        onClick={scrollToTop}
        className={`fixed bottom-4 right-4 md:bottom-8 md:right-8 bg-blue-300 text-white p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out ${showScrollArrow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        aria-label="Scroll to top"
      >
        <FaArrowUp className="text-lg sm:text-xl" />
      </button>

    </div>
  );
}