import React from 'react'
import { BarChart, Layout, Share2, LineChart } from 'lucide-react'
import pic from "../IMAGE/pic2.jpg"
import logo from "../IMAGE/logo.png"
import pick from "../IMAGE/pic.jpg"
import picl from "../IMAGE/gallery_image_5.jpg"
import cvFile from '../IMAGE/PromesseIrakozeResume .pdf';
import picg from "../IMAGE/gallery_image_1.jpg"
const handleDownload = () => {
  const link = document.createElement('a');
  link.href = cvFile;
  link.download = 'PromesseIrakozeResume .pdf'; // Specify the file name for the download
  link.click();
};
export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full bg-white z-50 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={logo}
              alt="Texter Logo"
              className="h-10 w-auto"
            />
          </div>
          <div className="hidden md:flex space-x-8">
            {['Home', 'About Us', 'Services', 'Portfolio', 'Contact Us'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-lg font-medium text-gray-600 hover:text-[#1B4B43]"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section id="home" className="pt-24 pb-16 px-4 md:pt-32">
        <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-[#1B4B43]">
              Hello, I am <span className="text-[#1B4B43]">Promesse</span>,
              <br />a Professional
              <br />CONTENT WRITER
            </h1>
            <p className="text-gray-600 text-lg">
            "I'm a passionate content writer with over 3 years of experience in digital marketing and creating SEO-optimized content for the web."
            </p>
            <div className="flex space-x-4">
            <button
  onClick={() => window.location.href = cvFile} // Download the CV when clicked
  className="bg-[#1B4B43] hover:bg-white hover:text-[#1B4B43] hover:border-2 hover:border-[#1B4B43] text-white px-6 py-2 rounded-md transition-all"
>
  Hire Me
</button>

            </div>
          </div>
          <div className="relative">
            <img
              src={pic }
              alt="Professional Content Writer"
              className="rounded-lg w-full h-89"
            />
          </div>
        </div>
      </section>

      <section id="about-us" className="py-20 pb-56 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl ml-9 md:text-4xl font-bold text-[#1B4B43] mb-12">ABOUT MYSELF</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <img
                src={ pick }
                alt="About Me"
                className="rounded-lg w-80 h-80"
              />
            </div>
            <div className="space-y-6">
              <p className="text-gray-600">
              "I have over 3 years of experience in content writing, with a strong focus on creating SEO-friendly articles. During this time, I have contributed to various blogs and websites, refining my skills in writing engaging, well-researched content that resonates with readers. I am dedicated to improving my craft and delivering content that is both accurate and optimized for search engines
              </p>
              <ul className="space-y-4">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-[#1B4B43] rounded-full" />
                  <span>High-quality, well-research web content</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-[#1B4B43] rounded-full" />
                  <span>Keyword-rich and SEO-friendly</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-[#1B4B43] rounded-full" />
                  <span>Multiple revisions (for Standard and Premium Packages)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1B4B43] mb-12">
            WHAT SERVICE DO I PROVIDE
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[
              {
                icon: <BarChart className="w-8 h-8" />,
                title: "Content Marketing",
                items: [
                  "Content Creation",
                  "Creating Social Media Accounts",
                  "Customized for your business",
                  "Help to achieve your goal"
                ]
              },
              {
                icon: <Layout className="w-8 h-8" />,
                title: "Social Media Manage",
                items: [
                  "Schedule your posts",
                  "Design Social Media Posts",
                  "Work with existing content",
                  "Create strategy for engagements"
                ]
              },
              {
                icon: <LineChart className="w-8 h-8" />,
                title: "Website Ranking",
                items: [
                  "Optimized Directory submissions",
                  "Contextual Articles submission",
                  "High DA Backlinks",
                  "High-Quality Domains"
                ]
              },
              {
                icon: <Share2 className="w-8 h-8" />,
                title: "Link Building",
                items: [
                  "Right Mix of No & Do Follow Links",
                  "Google Algorithm Safe Links",
                  "Website Audit",
                  "Keyword Research"
                ]
              }
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-[#1B4B43] mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-[#1B4B43] mb-4">{service.title}</h3>
                <ul className="space-y-2">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="text-gray-600">• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1B4B43] mb-12">
            RECENT PROJECTS
          </h2>
          <div className=" flex flex-row justify-center items-center md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1].map((item) => (
  <div key={item} className="relative group overflow-hidden rounded-lg">
    <img
      src={picl}
      alt={`Project ${item}`}
      className="w-full h-[250px] object-cover transition-transform group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-[#1B4B43] bg-opacity-0 group-hover:bg-opacity-80 transition-all flex items-center justify-center p-4">
      <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity">
        <h3 className="text-white text-xl font-semibold">Digital Marketing </h3>
        <p className="text-white mt-2">    This project focuses on creating impactful digital marketing strategies for social media platforms. It involves content creation, audience engagement, and campaign management to drive brand awareness, increase followers, and boost interactions.</p>
      </div>
    </div>
  </div>
))}
           {[2].map((item) => (
  <div key={item} className="relative group overflow-hidden rounded-lg">
    <img
      src={picg}
      alt={`Project ${item}`}
      className="w-full h-[250px] object-cover transition-transform group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-[#1B4B43] bg-opacity-0 group-hover:bg-opacity-80 transition-all flex items-center justify-center p-4">
      <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity">
        <h3 className="text-white text-xl font-semibold">Social Media Content </h3>
        <p className="text-white mt-2">  This project showcases engaging content created for social media platforms, aimed at building a strong personal brand, attracting followers, and driving interactions. It includes a variety of media like videos, posts, and stories.</p>
      </div>
    </div>
  </div>
))}

          </div>
        </div>
      </section>

      <section id="contact-us" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1B4B43] mb-12">
            CONTACT ME
          </h2>
          <div className="max-w-md mx-auto">
            <form className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1B4B43]"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1B4B43]"
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  rows={5}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1B4B43]"
                />
              </div>
              <button className="w-full bg-[#1B4B43] hover:bg-[#153832] text-white px-6 py-3 rounded-md">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-[#1B4B43] text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <p>© 2024 Texter. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}