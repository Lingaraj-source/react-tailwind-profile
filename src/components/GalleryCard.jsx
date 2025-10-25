import { useState } from 'react';
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi';
import { FiPlus, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
// --- Import motion and AnimatePresence ---
import { motion, AnimatePresence } from 'framer-motion';

const GalleryCard = () => {
  const singleImageUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFpbnRpbmd8ZW58MHx8MHx8fDA%3D&w=1000&q=80';

  const initialImages = [
    singleImageUrl, singleImageUrl, singleImageUrl, // Page 1
    singleImageUrl, singleImageUrl, singleImageUrl, // Page 2
  ];

  const [images, setImages] = useState(initialImages);
  const [currentPage, setCurrentPage] = useState(0);
  const imagesPerPage = 3;

  // --- This logic is updated to handle direction ---
  const [direction, setDirection] = useState(0);

  const displayedImages = images.slice(
    currentPage * imagesPerPage,
    (currentPage + 1) * imagesPerPage
  );

  const canGoPrev = currentPage > 0;
  const canGoNext = (currentPage + 1) * imagesPerPage < images.length;

  const goToNextPage = () => {
    if (canGoNext) {
      setDirection(1); // Set direction to "right"
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (canGoPrev) {
      setDirection(-1); // Set direction to "left"
      setCurrentPage(currentPage - 1);
    }
  };

  const addImage = () => {
    setImages([...images, singleImageUrl]);
  };

  // --- This object defines the sliding animation ---
  const slideVariants = {
    hidden: (direction) => ({
      opacity: 0,
      x: direction > 0 ? 100 : -100, // Slide in from right or left
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    exit: (direction) => ({
      opacity: 0,
      x: direction > 0 ? -100 : 100, // Slide out to right or left
      transition: { duration: 0.3, ease: 'easeIn' }
    }),
  };

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 backdrop-blur-lg shadow-2xl overflow-hidden">
      <header className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <HiOutlineQuestionMarkCircle className="text-slate-500 w-6 h-6" />
          <h2 className="font-medium text-white">Gallery</h2>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={addImage}
            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 rounded-lg py-2 px-4 text-sm font-medium text-white transition-colors"
          >
            <FiPlus />
            Add Image
          </button>
          <div className="flex gap-1">
            <button 
              onClick={goToPrevPage}
              disabled={!canGoPrev}
              className="bg-slate-700/50 p-2 rounded-lg hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiArrowLeft className="text-slate-300" />
            </button>
            <button 
              onClick={goToNextPage}
              disabled={!canGoNext}
              className="bg-slate-700/50 p-2 rounded-lg hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiArrowRight className="text-slate-300" />
            </button>
          </div>
        </div>
      </header>

      {/* --- This is the animation wrapper --- */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentPage} // This is crucial for re-animating
          variants={slideVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={direction} // Pass direction to variants
          className="grid grid-cols-3 gap-4"
        >
          {displayedImages.map((src, index) => (
            // --- Hover effect added here ---
            <div 
              key={index} 
              className="rounded-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105"
            >
              <img 
                src={src} 
                alt={`gallery item ${index + 1}`} 
                className="w-full h-full object-cover" 
              />
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default GalleryCard;