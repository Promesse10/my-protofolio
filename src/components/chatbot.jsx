import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaPaperPlane, FaThumbsUp, FaThumbsDown } from 'react-icons/fa'
import { qaData } from './qaData'

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm AIssistant, an AI chatbot to help with UI/UX and front-end development questions. What's your name?", isBot: true }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [userName, setUserName] = useState('')
  const [showRelatedQuestions, setShowRelatedQuestions] = useState(false)
  const [showReview, setShowReview] = useState(false)
  const [questionCount, setQuestionCount] = useState(0)
  const [showPopup, setShowPopup] = useState(false)
  const chatContainerRef = useRef(null)

  const relatedQuestions = [
    "What is UI/UX design?|UI/UX",
    "What are the key differences between UI and UX design?|UI vs UX",
    "What is responsive design?|responsive",
    "What programming languages are used in front-end development?|front-end languages",
    "What is the DOM?|DOM",
    "What is the difference between HTML and CSS?|HTML vs CSS"
  ]
  const localQuestions = {
    "hi|hello|hey": "Hello! How can I assist you today?",
    "how are you|how r u|how're you": "I'm just a program, so I don't have feelings, but thank you for asking! How can I help you?",
    "goodbye|bye|byee|goodbyee|see you|see ya": "Goodbye! Have a great day! Feel free to reach out again anytime.",
    "who created you|who made you|who built you|who designed you": "I was created by Promesse IRAKOZE, a developer who specializes in UI/UX and front-end development.",
    "what is your name|your name|who are you|what are you called": "I'm AIssistant, a language model designed to assist you with UI/UX and front-end development questions.",
    "can you help me|help me|can u help me|assist me|need help": "Of course! What do you need help with regarding UI/UX or front-end development?",
    "what can you do|your capabilities|what do you do|what r u good at": "I can assist with answering questions about UI/UX design, front-end development, providing explanations, helping with coding, and offering advice in these areas!",
    "where are you from|where u from|your origin|where were you made": "I'm not a physical entity, so I don't have a location. I exist in the cloud and run on servers.",
    "what is ai|what's ai|explain ai|define ai": "AI stands for Artificial Intelligence, which refers to machines or systems that are designed to simulate human intelligence. I'm an AI specialized in UI/UX and front-end development topics.",
    "do you know everything|do u know everything|do you know all|are you all-knowing": "I know a lot about UI/UX and front-end development, but not everything. I can provide knowledge based on what I've been trained on, but I may not have real-time or up-to-date information.",
    "ok|okay|k|kk|sure|fine|alright|all right": "Sure! Let me know what you need assistance with, and I'll do my best to help.",
  
    "what is ui|what's ui|define ui|ui meaning": "UI stands for User Interface, which refers to the design and layout of the interactive elements in a product, such as buttons, menus, and forms.",
    "what is ux|what's ux|define ux|ux meaning": "UX stands for User Experience, which is about how a user interacts with and feels about a product or system. It focuses on usability and satisfaction.",
    "what is frontend|frontend|front end|what's frontend|frontend dev": "Front-end development refers to creating the visual parts of a website or app that users interact with, using technologies like HTML, CSS, and JavaScript.",
    "what is backend|backend|back end|what's backend|backend dev": "Back-end development involves server-side programming, databases, and the logic behind how a website or app functions.",
    "what is react|reactjs|what's react|react framework": "React is a JavaScript library used for building user interfaces. It allows developers to create reusable UI components and efficiently manage application state.",
    "what is ui/ux|ui ux|what's ui/ux|uiux meaning": "UI/UX refers to User Interface and User Experience design, focusing on creating visually appealing and user-friendly products.",
    "what is javascript|javascript|js|what's js": "JavaScript is a programming language used to add interactivity and dynamic content to websites, such as animations, pop-ups, and form validation.",
    "what is html|html|what's html": "HTML stands for HyperText Markup Language. It is the standard language used to create the structure of web pages.",
    "what is css|css|what's css": "CSS stands for Cascading Style Sheets. It is used to style and layout web pages, including colors, fonts, and responsive designs.",
    "what is vite|vitejs|vite framework|what's vite": "Vite is a modern front-end build tool that offers fast development and optimized production builds for web projects.",
    
    "what is responsive design|what's responsive design|define responsive design": "Responsive design is an approach to web design that ensures a website or application adjusts its layout and elements based on the device’s screen size, such as mobile phones, tablets, and desktops, providing an optimal viewing experience.",
    "what programming languages are used in front-end development|front-end languages": "Front-end development typically involves languages like HTML for structuring content, CSS for styling, and JavaScript for adding interactivity. Frameworks like React, Angular, and Vue.js are also commonly used.",
    "what is the dom|what's the dom|define dom": "The DOM (Document Object Model) is a programming interface for web documents. It represents the structure of a webpage as a tree of objects, allowing developers to manipulate and access elements like HTML and CSS dynamically using JavaScript.",
    "what is the difference between html and css|html vs css|html css difference": "HTML (HyperText Markup Language) is used for creating the structure of a webpage, including elements like headings, paragraphs, and links. CSS (Cascading Style Sheets) is used to control the visual appearance of those elements, such as colors, fonts, and layout."
  };
  

  useEffect(() => {
    const lastMessage = messages[messages.length - 1]
    if (lastMessage && !lastMessage.isBot) {
      setIsTyping(true)
      const timer = setTimeout(() => {
        if (!userName) {
          setUserName(lastMessage.text)
          setMessages(prev => [...prev, { text: `Nice to meet you, ${lastMessage.text}! How can I assist you today? Feel free to ask me about UI/UX design or front-end development.`, isBot: true }])
          setShowRelatedQuestions(true)
        } else {
          handleBotResponse(lastMessage.text)
        }
        setIsTyping(false)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [messages])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (questionCount === 5) {
      setShowPopup(true)
      setTimeout(() => setShowPopup(false), 5000)
    }
  }, [questionCount])

  const handleBotResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    let botResponse = '';
    let matchFound = false;

    // Advanced word detection function
    const detectRelevantWords = (text, keywords) => {
      const words = text.toLowerCase().split(/\W+/);
      return keywords.filter(keyword => words.includes(keyword.toLowerCase())).length;
    };

    // Check for local questions and related questions first
    for (const questions of [...Object.keys(localQuestions), ...relatedQuestions]) {
      const questionVariants = questions.split('|');
      if (questionVariants.some(q => lowerCaseMessage.includes(q.toLowerCase()))) {
        botResponse = localQuestions[questions] || qaData[questions.split('|')[0]];
        matchFound = true;
        break;
      }
    }

    // If no match, check qaData with advanced word detection
    if (!matchFound) {
      let bestMatch = { score: 0, response: '' };
      for (const category in qaData) {
        for (const question in qaData[category]) {
          const score = detectRelevantWords(userMessage, question.split(' '));
          if (score > bestMatch.score) {
            bestMatch = { score, response: qaData[category][question] };
          }
        }
      }
      if (bestMatch.score > 0) {
        botResponse = bestMatch.response;
        matchFound = true;
      }
    }

    // If still no match, provide a default response
    if (!matchFound) {
      botResponse = "I'm sorry, I don't have specific information about that topic. You might want to try searching on Google for more information.";
    }

    const googleLinkUrl = `https://www.google.com/search?q=${encodeURIComponent(userMessage)}`;

    setMessages(prev => [...prev, {
      text: botResponse,
      isBot: true,
      googleLink: googleLinkUrl
    }]);

    setQuestionCount(prev => prev + 1)
    setShowReview(true)
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (input.trim() === '') return

    setMessages(prev => [...prev, { text: input, isBot: false }])
    setInput('')
    setShowReview(false)
  }

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleQuestionSelect = (question) => {
    setInput(question.split('|')[0])
    handleSendMessage({ preventDefault: () => {} })
  }

  const handleReview = (isGood) => {
    // Here you can implement the logic to handle the review
    console.log(isGood ? 'Good review' : 'Bad review')
    setShowReview(false)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-4 right-4 w-full sm:w-96 max-w-full sm:max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden flex flex-col z-50 max-h-[90vh] sm:max-h-[600px]"
      >
        <div className="bg-[#00a2e3] text-white p-4 flex justify-between items-center">
          <h3 className="font-bold">AI ssistant </h3>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FaTimes />
          </button>
        </div>
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`${
                  message.isBot ? 'bg-gray-200 dark:bg-gray-700' : 'bg-[#00a2e3] text-white'
                } p-2 rounded-lg max-w-[80%] ${message.isBot ? 'self-start' : 'self-end ml-auto'}`}
              >
                <div>{message.text}</div>
                {message.googleLink && (
                  <div className="mt-2 text-xs">
                    <a href={message.googleLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      Click for more info on Google
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-500 dark:text-gray-400"
            >
              AI is typing...
            </motion.div>
          )}
        </div>
        {showReview && (
          <div className="flex justify-center items-center p-2 bg-blue-100">
            <span className="mr-2">How was the answer?</span>
            <button onClick={() => handleReview(true)} className="mr-2 p-1 bg-green-500 rounded-full">
              <FaThumbsUp className="text-white" />
            </button>
            <button onClick={() => handleReview(false)} className="p-1 bg-red-500 rounded-full">
              <FaThumbsDown className="text-white" />
            </button>
          </div>
        )}
        <form onSubmit={handleSendMessage} className="p-4 bg-gray-100 dark:bg-gray-700 flex relative mt-auto">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1 p-2 rounded-lg border-0 focus:ring-2 focus:ring-[#00a2e3] dark:bg-gray-600 text-black"
            list="related-questions"
          />
          {showRelatedQuestions && (
            <datalist id="related-questions">
              {relatedQuestions.map((question, index) => (
                <option key={index} value={question.split('|')[0]} />
              ))}
            </datalist>
          )}
          <button
            type="submit"
            className="bg-[#00a2e3] text-white p-2 rounded-lg hover:bg-[#0081b3] transition-colors ml-2"
          >
            <FaPaperPlane />
          </button>
        </form>
      </motion.div>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="fixed bottom-20 left-4 bg-white p-2 rounded-lg shadow-md"
        >
          Hi! Can I help you?
        </motion.div>
      )}
      <style jsx>{`
        @media (max-width: 640px) {
          .fixed {
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 0;
          }
        }
      `}</style>
    </>
  )
}

export default Chatbot

