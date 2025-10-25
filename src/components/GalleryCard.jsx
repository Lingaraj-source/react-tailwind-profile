import { useState } from 'react';
import { HiOutlineQuestionMarkCircle, HiViewGrid } from 'react-icons/hi';
import { FiPlus, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import myImage from '../images/image1.jpg'; 

const GalleryCard = () => {
  const singleImageUrl = myImage;

  const initialImages = [
    singleImageUrl, singleImageUrl, singleImageUrl,
    singleImageUrl, singleImageUrl, singleImageUrl,
  ];

  const [images, setImages] = useState(initialImages);
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const imagesPerPage = 3;

  const displayedImages = images.slice(
    currentPage * imagesPerPage,
    (currentPage + 1) * imagesPerPage
  );

  const canGoPrev = currentPage > 0;
  const canGoNext = (currentPage + 1) * imagesPerPage < images.length;

  const goToNextPage = () => {
    if (canGoNext) {
      setDirection(1);
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (canGoPrev) {
      setDirection(-1);
      setCurrentPage(currentPage - 1);
    }
  };

  const addImage = () => {
    setImages([...images, singleImageUrl]);
  };

  const slideVariants = {
    hidden: (direction) => ({ opacity: 0, x: direction > 0 ? 100 : -100 }),
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: (direction) => ({ opacity: 0, x: direction > 0 ? -100 : 100, transition: { duration: 0.3, ease: 'easeIn' } }),
  };

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 backdrop-blur-lg shadow-2xl overflow-hidden">
      {/* --- HEADER --- */}
      <header className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          {/* --- Question Mark Button --- */}
          <button className="bg-gray-900/70 rounded-full p-1.5 text-slate-400 hover:text-white hover:bg-gray-800 transition-colors">
            <HiOutlineQuestionMarkCircle className="w-5 h-5" />
          </button>
          {/* --- Gallery Pill --- */}
          <div className="bg-gray-900 text-white py-2 px-5 rounded-full text-sm font-medium shadow-md">
            Gallery
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* --- Add Image Button --- */}
          <button 
            onClick={addImage}
            className="flex items-center gap-2 bg-slate-300 hover:bg-slate-200 text-gray-900 rounded-lg py-2 px-4 text-sm font-medium transition-colors"
          >
            <FiPlus className="w-4 h-4" />
            Add Image
          </button>
          {/* --- Arrow Buttons --- */}
          <div className="flex gap-2">
            <button 
              onClick={goToPrevPage}
              disabled={!canGoPrev}
              className="bg-gray-900/70 p-2.5 rounded-full text-slate-300 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiArrowLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={goToNextPage}
              disabled={!canGoNext}
              className="bg-gray-900/70 p-2.5 rounded-full text-slate-300 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* --- BODY --- */}
      <div className="flex gap-4">
        {/* --- Grid Icon --- */}
        <div className="text-slate-500 pt-1">
          <HiViewGrid className="w-5 h-5" />
        </div>
        
        {/* --- Gallery Grid --- */}
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentPage}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={direction}
            className="grid grid-cols-3 gap-4 w-full"
          >
            {displayedImages.map((src, index) => (
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
    </div>
  );
};

export default GalleryCard;