'use client'

import { useState, useRef, useEffect } from 'react'
import EmojiPicker from 'emoji-picker-react'
import { Send, Paperclip, Smile, MoreVertical, ChevronDown } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import { WelcomeAnimation } from './ welcome-animation'
import { qaData } from './qadata'
import Button from './Button'

function Chatbot({ onClose }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [showRegistration, setShowRegistration] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [attachment, setAttachment] = useState(null)
  const fileInputRef = useRef(null)
  const chatContainerRef = useRef(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleStartChat = () => {
    if (name && isValidEmail(email)) {
      setUserInfo({ name, email })
      setShowRegistration(false)
      setMessages([
        {
          text: `Hi ${name}! I'm UIXpert, an AI chatbot specialized in UI/UX and front-end development. How can I assist you today? Here are some topics I can help with:

1. Responsive design principles
2. CSS frameworks comparison
3. JavaScript frameworks overview
4. UI/UX best practices
5. Front-end performance optimization

Feel free to ask about these or any other UI/UX and front-end related questions!`,
          isBot: true
        }
      ])
    }
  }

  const isValidEmail = (email) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
  };

  const findAnswer = (question) => {
    const lowerQuestion = question.toLowerCase()
    
    // Basic Q&A
    const basicQA = {
      "what is responsive design": "Responsive design is an approach to web design that makes web pages render well on a variety of devices and window or screen sizes. It uses HTML and CSS to resize, hide, shrink, enlarge, or move the content to make it look good on any screen.",
      "what are css frameworks": "CSS frameworks are pre-prepared libraries that are meant to allow for easier, more standards-compliant web design using the Cascading Style Sheets language. Some popular CSS frameworks include Bootstrap, Tailwind CSS, and Foundation.",
      "explain javascript frameworks": "JavaScript frameworks are application frameworks written in JavaScript. They define the entire application design. A JavaScript framework provides the basic foundation, template, and workflow for building JavaScript applications. Some popular JavaScript frameworks include React, Vue, and Angular.",
      "what are ui/ux best practices": "Some UI/UX best practices include: 1) Consistency in design, 2) Clear hierarchy and readability, 3) Responsive design for all devices, 4) Intuitive navigation, 5) Accessibility for all users, 6) Performance optimization, 7) User-centered design approach, and 8) Regular user testing and feedback incorporation.",
      "how to optimize front-end performance": "To optimize front-end performance: 1) Minimize HTTP requests, 2) Compress and minify CSS, JavaScript, and HTML, 3) Optimize images, 4) Use a Content Delivery Network (CDN), 5) Implement browser caching, 6) Use asynchronous loading for CSS and JavaScript files, 7) Reduce server response time, and 8) Prioritize visible content."
    }
    
    // Check basic Q&A first
    for (const q in basicQA) {
      if (lowerQuestion.includes(q)) {
        return basicQA[q]
      }
    }
    
    // If not in basic Q&A, search in qaData
    for (const category in qaData) {
      for (const q in qaData[category]) {
        if (lowerQuestion.includes(q.toLowerCase())) {
          return qaData[category][q]
        }
      }
    }
    
    // If no answer found, return null
    return null
  }

  const handleSendMessage = () => {
    if (!input.trim() && !attachment) return

    const newUserMessage = {
      text: input,
      isBot: false,
      attachment: attachment
    }

    const answer = findAnswer(input)
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(input)}`
    
    const botResponse = {
      text: answer || "I don't have specific information about that. Here's a Google search that might help:",
      isBot: true,
      googleLink: !answer ? googleSearchUrl : null
    }

    setMessages(prev => [...prev, newUserMessage, botResponse])
    setInput('')
    setAttachment(null)
    setShowEmojiPicker(false)
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAttachment(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleEmojiClick = (emojiData) => {
    setInput(prev => prev + emojiData.emoji)
  }

  if (showRegistration) {
    return (
      <div
        className="fixed bottom-4 right-4 w-[400px] p-4 space-y-4 bg-gradient-to-br from-[#1e2836] to-[#2d3748] text-white rounded-lg shadow-xl"
      >
        <WelcomeAnimation onClose={onClose} />
        <div className="space-y-2 text-center">
          <h3 
            className="font-semibold text-xl"
          >
            Welcome to UIXpert Chat Support
          </h3>
          <p 
            className="text-sm text-gray-300"
          >
            Please enter your details to start chatting
          </p>
        </div>
        <div 
          className="space-y-4"
        >
          <input
            placeholder="Your name (required)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
            required
          />
          <input
            type="email"
            placeholder="Your Gmail address (required)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
            required
          />
          <Button 
            className="w-full bg-gradient-to-r from-[#2d3748] to-[#4a5568] hover:opacity-90 text-white" 
            onClick={handleStartChat}
            disabled={!name || !isValidEmail(email)}
          >
            Start Chat
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="w-full shadow-xl overflow-hidden rounded-lg bg-white"
    >
      <div className="bg-gradient-to-r from-[#1e2836] to-[#2d3748] text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
            UI
          </div>
          <div>
            <div className="font-semibold">Chat with UIXpert</div>
            <div className="text-sm">UI/UX & Front-end Expert</div>
            <div className="text-xs text-green-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              Online
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button className="text-white hover:text-white/90 p-1">
            <MoreVertical className="h-5 w-5" />
          </Button>
          <Button className="text-white hover:text-white/90 p-1">
            <ChevronDown className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div 
        ref={chatContainerRef}
        className="h-[300px] overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white"
      >
        <AnimatePresence>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.isBot 
                    ? 'bg-gradient-to-r from-[#1e2836] to-[#2d3748] text-white' 
                    : 'bg-gradient-to-r from-[#2d3748] to-[#4a5568] text-white'
                }`}
              >
                {message.text}
                {message.attachment && (
                  <img 
                    src={message.attachment || "/placeholder.svg"} 
                    alt="Attached file" 
                    className="mt-2 max-w-full rounded" 
                  />
                )}
                {message.googleLink && (
                  <a 
                    href={message.googleLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-2 text-sm text-blue-300 hover:text-blue-200"
                  >
                    Search on Google →
                  </a>
                )}
              </div>
            </div>
          ))}
        </AnimatePresence>
      </div>

      <div className="p-4 border-t bg-white">
        <div className="relative flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your message..."
            className="w-full px-3 py-2 pr-24 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e2836]"
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <div className="absolute right-2 flex items-center gap-1">
            <Button
              className="p-1 hover:bg-gray-100"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <Smile className="h-5 w-5" />
            </Button>
            <Button
              className="p-1 hover:bg-gray-100"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button
              className="p-2 bg-gradient-to-r from-[#1e2836] to-[#2d3748] hover:opacity-90 text-white rounded-full"
              onClick={handleSendMessage}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {showEmojiPicker && (
          <div className="absolute bottom-20 right-4">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>
    </div>
  )
}

export default Chatbot

