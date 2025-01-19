import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ title, description, link, category }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="w-full h-64 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      initial={false}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.6, type: 'spring' }}
      style={{ perspective: 1000 }}
    >
      <div className="w-full h-full relative">
        <div
          className={`absolute w-full h-full backface-hidden ${
            isFlipped ? 'hidden' : ''
          }`}
        >
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-lg p-6 flex flex-col justify-between">
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-sm">{category}</p>
          </div>
        </div>
        <div
          className={`absolute w-full h-full backface-hidden ${
            isFlipped ? '' : 'hidden'
          }`}
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="w-full h-full bg-gray-300 dark:bg-gray-600 rounded-lg p-6 flex flex-col justify-between">
            <p>{description}</p>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#00a2e3] text-white rounded text-center"
            >
              View Project
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

