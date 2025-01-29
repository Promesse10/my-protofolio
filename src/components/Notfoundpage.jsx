
import React, { useState, useRef, useEffect } from "react"

function MainComponent() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [windowSize, setWindowSize] = useState("normal");
  const [hoveredDot, setHoveredDot] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleDotClick = (dot) => {
    switch (dot) {
      case "red":
        window.location.href = "/";
        break;
      case "yellow":
        setWindowSize("minimized");
        break;
      case "green":
        setWindowSize(windowSize === "maximized" ? "normal" : "maximized");
        break;
    }
  };
  const getSizeClasses = () => {
    switch (windowSize) {
      case "minimized":
        return "scale-75 origin-top";
      case "maximized":
        return "scale-125 origin-center";
      default:
        return "scale-100";
    }
  };

  return (
    <div className="min-h-screen bg-[#1e2836] flex flex-col items-center justify-center p-4">
      <div
        className={`transform ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        } transition-all duration-1000 flex flex-col items-center`}
      >
        <div
          className={`relative bg-[#2a3444] p-8 rounded-lg border border-[#02a3e4]/30 transition-transform duration-300 ${getSizeClasses()} mb-4`}
        >
          <div className="flex items-center gap-2 mb-4">
            <button
              className="relative w-3 h-3 rounded-full bg-red-500 hover:scale-110 transition-transform duration-200"
              onClick={() => handleDotClick("red")}
              onMouseEnter={() => setHoveredDot("red")}
              onMouseLeave={() => setHoveredDot(null)}
            >
              {hoveredDot === "red" && (
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-white bg-black/75 px-2 py-1 rounded whitespace-nowrap">
                  Close
                </div>
              )}
            </button>
            <button
              className="relative w-3 h-3 rounded-full bg-yellow-500 hover:scale-110 transition-transform duration-200"
              onClick={() => handleDotClick("yellow")}
              onMouseEnter={() => setHoveredDot("yellow")}
              onMouseLeave={() => setHoveredDot(null)}
            >
              {hoveredDot === "yellow" && (
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-white bg-black/75 px-2 py-1 rounded whitespace-nowrap">
                  Minimize
                </div>
              )}
            </button>
            <button
              className="relative w-3 h-3 rounded-full bg-green-500 hover:scale-110 transition-transform duration-200"
              onClick={() => handleDotClick("green")}
              onMouseEnter={() => setHoveredDot("green")}
              onMouseLeave={() => setHoveredDot(null)}
            >
              {hoveredDot === "green" && (
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-white bg-black/75 px-2 py-1 rounded whitespace-nowrap">
                  {windowSize === "maximized" ? "Restore" : "Expand"}
                </div>
              )}
            </button>
          </div>

          <div className="font-mono">
            <span className="text-pink-400">throw new</span>
            <span className="text-yellow-400"> Error</span>
            <span className="text-white">(</span>
            <div className="glitch-wrapper inline-block">
              <span className="text-[#02a3e4] glitch-text text-2xl">'404'</span>
            </div>
            <span className="text-white">);</span>
          </div>

          <div className="mt-8 text-[#02a3e4]/80 font-mono text-sm">
            <span className="error-line">{">"}</span> Oops! The page you're looking for doesn't exist.
          </div>

          <div className="speech-bubble-arrow"></div>
        </div>

        <img
          src="https://ucarecdn.com/47207c19-7c8c-427b-b203-726de3f4d50f/"
          alt="Angry emoji animation"
          className="w-32 h-32 bounce-animation mt-8"
        />

        <div className="text-center mt-6">
          <a
            href="/"
            className="font-mono text-[#02a3e4] hover:text-white transition-colors duration-300"
          >
            <span className="mr-2">{"<"}</span>
            Go Back
            <span className="ml-2">{"/>"}</span>
          </a>
        </div>
      </div>

      <style jsx global>{`
        .glitch-wrapper {
          position: relative;
          display: inline-block;
          padding: 0 8px;
        }

        .glitch-text {
          animation: glitch 3s infinite;
          position: relative;
          display: inline-block;
        }

        .glitch-text::before,
        .glitch-text::after {
          content: '404';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .glitch-text::before {
          animation: glitch-top 3s infinite linear alternate-reverse;
          clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
          -webkit-clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
        }

        .glitch-text::after {
          animation: glitch-bottom 2.7s infinite linear alternate-reverse;
          clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
          -webkit-clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
        }

        .speech-bubble-arrow {
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 20px solid transparent;
          border-right: 20px solid transparent;
          border-top: 20px solid #2a3444;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .bounce-animation {
          animation: bounce 2s ease-in-out infinite;
        }

        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }

        @keyframes glitch-top {
          0% { transform: translate(0); opacity: 1; }
          10% { transform: translate(-2px, -2px); opacity: 0.8; }
          20% { transform: translate(2px, 2px); opacity: 0.9; }
          30% { transform: translate(-2px); opacity: 0.7; }
          40% { transform: translate(2px); opacity: 0.6; }
          50% { transform: translate(0); opacity: 1; }
        }

        @keyframes glitch-bottom {
          0% { transform: translate(0); opacity: 1; }
          10% { transform: translate(2px, 2px); opacity: 0.8; }
          20% { transform: translate(-2px, -2px); opacity: 0.9; }
          30% { transform: translate(2px); opacity: 0.7; }
          40% { transform: translate(-2px); opacity: 0.6; }
          50% { transform: translate(0); opacity: 1; }
        }

        .error-line {
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default MainComponent;