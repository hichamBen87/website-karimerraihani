import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Video, Play, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Gallery() {
  const { t } = useTranslation();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Set active tab based on navigation state
  React.useEffect(() => {
    const state = location.state as { section?: string };
    if (state?.section === 'videos') {
      setActiveTab('videos');
    } else if (state?.section === 'photos') {
      setActiveTab('photos');
    }
  }, [location.state]);

  const photos = [
    '/pladur1.jpg',
    '/pladur2.jpg',
    '/pladur4.jpg',
    '/pladur5.jpg',
    '/pladur6.jpg',
    '/pladur7.jpg',
    '/pladur8.jpg',
    '/pladur9.jpg',
    '/pladur10.jpg',
    '/pladur11.jpg',
    '/pladur12.jpg',
    '/pladur13.jpg',
    '/pladur14.jpg',
    '/pladur15.jpg',
    '/pladur16.jpg',
    '/pladur17.jpg',
    '/pladur18.jpg',
    '/pladur19.jpg',
    '/pladur20.jpg',
    '/pladur21.jpg',
    '/pladur22.jpg',
    '/pladur23.jpg',
    '/pladur24.jpg',
    '/pladur25.jpg',
    '/pladur26.jpg'
  ];

  const videos = [
    {
      src: '/pladur30.mp4',
      thumbnail: '/pladur1.jpg',
      title: 'Installation de Pladur'
    },
    {
      src: '/pladur32.mp4',
      thumbnail: '/pladur4.jpg',
      title: 'Acabados Perfectos'
    },
    {
      src: '/pladur34.mp4',
      thumbnail: '/pladur6.jpg',
      title: 'Techos y Paredes'
    },
    {
      src: '/pladur35.mp4',
      thumbnail: '/pladur7.jpg',
      title: 'Proyectos Especiales'
    }
  ];

  const handleVideoClick = (videoSrc: string) => {
    const video = document.createElement('video');
    video.src = videoSrc;
    video.className = 'fixed inset-0 w-full h-full object-contain z-50 bg-black';
    video.controls = true;
    video.autoplay = true;

    const container = document.createElement('div');
    container.className = 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50';
    
    container.addEventListener('click', (e) => {
      if (e.target === container) {
        document.body.removeChild(container);
      }
    });

    container.appendChild(video);
    document.body.appendChild(container);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12">{t('nav.gallery')}</h1>
        
        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-white">
            <button
              onClick={() => setActiveTab('photos')}
              className={`flex items-center px-6 py-3 rounded-md ${
                activeTab === 'photos'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Image className="w-5 h-5 mr-2" />
              {t('gallery.photos')}
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex items-center px-6 py-3 rounded-md ${
                activeTab === 'videos'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Video className="w-5 h-5 mr-2" />
              {t('gallery.videos')}
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'photos' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {photos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="aspect-square relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
                onClick={() => setSelectedImage(photo)}
              >
                <img
                  src={photo}
                  alt={`Réalisation ${index + 1}`}
                  className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group cursor-pointer"
                onClick={() => handleVideoClick(video.src)}
              >
                <div className="aspect-video relative overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 rounded-full bg-white bg-opacity-90 flex items-center justify-center"
                    >
                      <Play className="w-8 h-8 text-blue-600 ml-1" />
                    </motion.div>
                  </div>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-gray-800">{video.title}</h3>
              </motion.div>
            ))}
          </div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <button
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={selectedImage}
                alt="Vue agrandie"
                className="max-w-full max-h-[90vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}