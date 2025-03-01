import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Phone, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSelector from './LanguageSelector';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSelector, setActiveSelector] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const handleSelectorClick = (selector: string) => {
    if (activeSelector === selector) {
      setActiveSelector(null);
    } else {
      setActiveSelector(selector);
    }
  };

  const handleGalleryNavigation = (section: string) => {
    navigate('/gallery', { state: { section } });
    setActiveSelector(null);
    setIsOpen(false);
  };

  const handleServiceNavigation = (serviceId: string) => {
    const element = document.getElementById(serviceId);
    if (element) {
      navigate(`/services#${serviceId}`);
      setTimeout(() => {
        const yOffset = -100;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }, 100);
    } else {
      navigate(`/services#${serviceId}`);
    }
    setActiveSelector(null);
    setIsOpen(false);
  };

  // Contact information that should not be translated
  const contactPhone = '+34 617 286 080';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeSelector && !(event.target as Element).closest('.navbar-selector')) {
        setActiveSelector(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeSelector]);

  const services = [
    'techos',
    'tabiques',
    'registrable',
    'reformas',
    'trasdosados',
    'aislamiento'
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Company Name */}
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-3">
              <img 
                src="/logo011.png" 
                alt="Logo" 
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold text-blue-600" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
                Placas del Sur K.C.I.B
              </span>
            </Link>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            {/* Navigation Links */}
            <Link
              to="/"
              className={`text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition-colors relative ${
                isActive('/') ? 'text-blue-600' : ''
              }`}
            >
              {t('nav.home')}
              {isActive('/') && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>

            <Link
              to="/about"
              className={`text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition-colors relative ${
                isActive('/about') ? 'text-blue-600' : ''
              }`}
            >
              {t('nav.about')}
              {isActive('/about') && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>

            {/* Gallery Dropdown */}
            <div className="relative navbar-selector">
              <button
                onClick={() => handleSelectorClick('gallery')}
                className={`flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition-colors relative ${
                  isActive('/gallery') ? 'text-blue-600' : ''
                }`}
              >
                {t('nav.gallery')}
                <ChevronDown className={`ml-1 w-4 h-4 transform transition-transform ${
                  activeSelector === 'gallery' ? 'rotate-180' : ''
                }`} />
                {isActive('/gallery') && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
              
              <AnimatePresence>
                {activeSelector === 'gallery' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                    dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                  >
                    <button
                      onClick={() => handleGalleryNavigation('photos')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {t('photos')}
                    </button>
                    <button
                      onClick={() => handleGalleryNavigation('videos')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {t('videos')}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Services Dropdown */}
            <div className="relative navbar-selector">
              <button
                onClick={() => handleSelectorClick('services')}
                className={`flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition-colors relative ${
                  isActive('/services') ? 'text-blue-600' : ''
                }`}
              >
                {t('nav.services')}
                <ChevronDown className={`ml-1 w-4 h-4 transform transition-transform ${
                  activeSelector === 'services' ? 'rotate-180' : ''
                }`} />
                {isActive('/services') && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
              
              <AnimatePresence>
                {activeSelector === 'services' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                    dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                  >
                    {services.map((serviceId) => (
                      <button
                        key={serviceId}
                        onClick={() => handleServiceNavigation(serviceId)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        {t(`services.${serviceId}.title`)}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/contact"
              className={`text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md transition-colors relative ${
                isActive('/contact') ? 'text-blue-600' : ''
              }`}
            >
              {t('nav.contact')}
              {isActive('/contact') && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
            
            {/* Phone Number */}
            <a 
              href={`tel:${contactPhone}`}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
            >
              <Phone className="w-4 h-4" />
              <span style={{ unicodeBidi: 'plaintext' }}>{contactPhone}</span>
            </a>

            {/* Language Selector */}
            <LanguageSelector />
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden bg-white"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t('nav.home')}
              </Link>

              <Link
                to="/about"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/about') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t('nav.about')}
              </Link>

              {/* Gallery Mobile */}
              <div className="space-y-1 px-3 py-2">
                <div className="font-medium text-gray-700">{t('nav.gallery')}</div>
                <button
                  onClick={() => handleGalleryNavigation('photos')}
                  className="block w-full text-left pl-4 py-2 text-sm text-gray-600 hover:text-blue-600"
                >
                  {t('photos')}
                </button>
                <button
                  onClick={() => handleGalleryNavigation('videos')}
                  className="block w-full text-left pl-4 py-2 text-sm text-gray-600 hover:text-blue-600"
                >
                  {t('videos')}
                </button>
              </div>

              {/* Services Mobile */}
              <div className="space-y-1 px-3 py-2">
                <div className="font-medium text-gray-700">{t('nav.services')}</div>
                {services.map((serviceId) => (
                  <button
                    key={serviceId}
                    onClick={() => handleServiceNavigation(serviceId)}
                    className="block w-full text-left pl-4 py-2 text-sm text-gray-600 hover:text-blue-600"
                  >
                    {t(`services.${serviceId}.title`)}
                  </button>
                ))}
              </div>

              <Link
                to="/contact"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/contact') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t('nav.contact')}
              </Link>
              
              {/* Phone Number */}
              <a 
                href={`tel:${contactPhone}`}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
                dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
              >
                <Phone className="w-4 h-4" />
                <span style={{ unicodeBidi: 'plaintext' }}>{contactPhone}</span>
              </a>
              
              <div className="px-3 py-2">
                <LanguageSelector />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}