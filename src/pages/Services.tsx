import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import QuoteModal from '../components/QuoteModal';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const services = [
  {
    id: 'techos',
    images: [
      '/techos1.jpeg',
      '/techos2.jpeg',
      '/techos3.jpeg',
      '/techos4.jpeg',
      '/techos5.jpeg'
    ]
  },
  {
    id: 'tabiques',
    images: [
      '/tabiques1.jpeg',
      '/tabiques2.jpeg',
      '/tabiques3.jpeg',
      '/tabiques4.jpeg',
      '/tabiques5.jpeg'
    ]
  },
  {
    id: 'registrable',
    images: [
      '/techo2.jpeg',
      '/techo3.jpeg',
      '/techo4.jpeg',
      '/techo5.jpeg',
      '/techo6.jpeg'
    ]
  },
  {
    id: 'reformas',
    images: [
      '/reformas1.jpg',
      '/reformas2.jpg',
      '/reformas3.jpg',
      '/reformas4.jpg',
      '/reformas5.jpg'
    ]
  },
  {
    id: 'trasdosados',
    images: [
      '/trasdosados1.jpeg',
      '/trasdosados2.jpeg',
      '/trasdosados3.jpeg',
      '/trasdosados4.jpeg',
      '/trasdosados5.jpeg'
    ]
  },
  {
    id: 'aislamiento',
    images: [
      '/aislamiento-1.jpg',
      '/aislamiento-2.jpg',
      '/aislamiento-3.jpg',
      '/aislamiento-4.jpg',
      '/aislamiento-5.jpg'
    ]
  }
];

const ServiceCard = ({ service, isActive }: { service: any; isActive: boolean }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isActive) {
      setIsExpanded(false);
    }
  }, [isActive]);

  useEffect(() => {
    if (service.images && isActive) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % service.images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [service.images, isActive]);

  const handleServiceClick = (e: React.MouseEvent) => {
    // Vérifier si le clic provient d'un élément de formulaire
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'BUTTON') {
      e.stopPropagation();
      return;
    }
    navigate(`/services#${service.id}`);
  };

  const handleQuoteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsQuoteModalOpen(true);
  };

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <motion.div
        id={service.id}
        className="bg-white rounded-xl shadow-xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        onClick={handleServiceClick}
      >
        <motion.div
          className="relative h-64 overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={service.images ? service.images[currentImageIndex] : service.image}
            alt={t(`services.${service.id}.title`)}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-bold text-white mb-2" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
                {t(`services.${service.id}.title`)}
              </h3>
              <p className="text-white/90 text-sm" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
                {t(`services.${service.id}.shortDesc`)}
              </p>
            </div>
          </div>
        </motion.div>
        
        <div className="p-6" onClick={e => e.stopPropagation()}>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="text-gray-600 whitespace-pre-line"
                dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
              >
                {t(`services.${service.id}.fullDesc`)}
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleQuoteClick}
                  className="mt-6 w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t('services.requestQuote')}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={handleExpandClick}
            className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
          >
            {isExpanded ? (
              <>
                {t('readLess')}
                <ChevronUp className="w-5 h-5" />
              </>
            ) : (
              <>
                {t('readMore')}
                <ChevronDown className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </div>
      </motion.div>

      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        serviceType={service.id}
      />
    </>
  );
};

export default function Services() {
  const location = useLocation();
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && services.some(service => service.id === hash)) {
      setActiveServiceId(hash);
      const serviceIndex = services.findIndex(service => service.id === hash);
      if (swiperInstance && serviceIndex !== -1) {
        swiperInstance.slideTo(serviceIndex);
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            const yOffset = -100;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 300);
      }
    }
  }, [location.hash, swiperInstance]);

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
            {t('services.title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          loop={false}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="w-full pb-16"
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => {
            const service = services[swiper.realIndex];
            setActiveServiceId(service.id);
          }}
        >
          {services.map((service) => (
            <SwiperSlide key={service.id} className="max-w-3xl">
              <ServiceCard 
                service={service} 
                isActive={service.id === activeServiceId}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}