
import React, { useState, useEffect } from "react";

function MainComponent() {
  const [message, setMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showScheduler, setShowScheduler] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const suggestionQuestions = [
    "What are your working hours for website design and development?",
    "Do you offer free consultations for web design projects?",
    "What web development and design services do you provide?",
    "How can I schedule a consultation for my website project?",
  ];

  const handleWhatsAppClick = () => {
    const phoneNumber = "+250780114522";
    let finalMessage = message;
    if (selectedDate && selectedTime) {
      finalMessage += `\n\nRequested Meeting Time: ${selectedDate} at ${selectedTime}`;
    }
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handlePhoneClick = () => {
    const phoneNumber = "+250780114522";
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleQuestionClick = (question) => {
    setMessage(question);
  };

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode) {
      setIsDarkMode(storedDarkMode === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

 
  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      <div className={` p-4 md:p-6`}>
        {" "}
        {/*Removed isDarkMode conditional*/}
        <div className="max-w-2xl mx-auto bg-white text-black rounded-2xl shadow-lg overflow-y-auto max-h-[90vh]">
          <div className="p-6 md:p-8">
            <div className="text-center mb-8">
              <h2 className={`text-3xl font-bold mb-2`}>
                {" "}
                {/*Removed isDarkMode conditional*/}
               Let's Talk
              </h2>
              <p className={`text-gray-950`}>
                {" "}
                {/*Removed isDarkMode conditional*/}
                Contact me for more info and project building.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <button
                onClick={handleWhatsAppClick}
                className="flex flex-col items-center p-4 hover:bg-green-50 rounded-lg transition-colors"
              >
                <i className="fab fa-whatsapp text-4xl text-[#02a3e4] mb-2"></i>
                <span className={`text-sm`}> {/*Removed isDarkMode conditional*/} WhatsApp</span>
              </button>

              <button
                onClick={handlePhoneClick}
                className="flex flex-col items-center p-4 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <i className="fas fa-phone-alt text-4xl text-[#02a3e4] mb-2"></i>
                <span className={`text-sm`}> {/*Removed isDarkMode conditional*/}Call Us</span>
              </button>

              <button
                onClick={() => setShowScheduler(!showScheduler)}
                className="flex flex-col items-center p-4 hover:bg-purple-50 rounded-lg transition-colors"
              >
                <i className="fas fa-calendar-alt text-4xl text-[#02a3e4] mb-2"></i>
                <span className={`text-sm`}> {/*Removed isDarkMode conditional*/}Schedule Meeting</span>
              </button>
            </div>

            {showScheduler && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <input
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            <div className="space-y-4">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Type your message here or choose a suggestion:

1. ${suggestionQuestions[0]}
2. ${suggestionQuestions[1]}
3. ${suggestionQuestions[2]}
4. ${suggestionQuestions[3]}`}
                className={`w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-48 text-gray-700`}
              />

              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-[#02a3e4] text-white py-4 rounded-lg hover:bg-[#02a3e3] transition-colors flex items-center justify-center space-x-2 text-lg"
              >
                <i className="fab fa-whatsapp text-xl"></i>
                <span>Send via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainComponent

