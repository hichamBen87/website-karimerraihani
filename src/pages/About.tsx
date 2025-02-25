import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MessageCircle, Facebook } from 'lucide-react';

export default function About() {
  const [showMore, setShowMore] = useState(false);
  const { t } = useTranslation();

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/34617286080', '_blank');
  };

  const openFacebook = () => {
    window.open(t('about.karim.social.facebook'), '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 md:px-12 lg:px-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600">{t('about.title')}</h1>
        <p className="text-xl text-gray-600 mt-4">
          {t('about.subtitle')}
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center bg-white shadow-lg rounded-lg p-6 md:p-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t('about.mainTitle')}
          </h2>

          <p className="text-gray-700">
            {t('about.description.main')}
          </p>

          <p className="text-gray-700 mt-4">
            {t('about.description.specialization')}
          </p>

          <AnimatePresence>
            {showMore && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-gray-700 mt-4">
                  <strong>{t('about.team.title')}</strong>
                  <br />
                  {t('about.team.description')}
                </p>

                <p className="text-gray-700 mt-4">
                  {t('about.team.commitment')}
                </p>

                <p className="text-gray-700 mt-4">
                  <strong>{t('about.services.title')}</strong>
                  <br />
                  {t('about.services.intro')}
                </p>

                <ul className="list-disc pl-6 text-gray-700 mt-2">
                  <li>{t('about.services.spaces.residential')}</li>
                  <li>{t('about.services.spaces.commercial')}</li>
                  <li>{t('about.services.spaces.industrial')}</li>
                </ul>

                <p className="text-gray-700 mt-4">
                  {t('about.services.highlight')}
                </p>

                <p className="text-gray-700 mt-4">
                  <strong>{t('about.quote.title')}</strong>
                  <br />
                  {t('about.quote.description')}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-center mt-6">
            <button
              onClick={toggleShowMore}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              {showMore ? t('readLess') : t('readMore')}
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative w-full h-80 md:h-full"
        >
          <img
            src="/abdo.JPG"
            alt={t('about.karim.name')}
            className="w-full h-full object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-70 text-white p-4 rounded">
            <p className="font-semibold">{t('about.karim.name')}</p>
            <p>{t('about.karim.age')}</p>
            <p className="mt-2">{t('about.karim.experience')}</p>
            <div className="mt-2 flex space-x-4">
              <button
                onClick={openFacebook}
                className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
              >
                <Facebook className="w-5 h-5 mr-2" />
                Facebook
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Boutons flottants */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={openFacebook}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <Facebook className="w-6 h-6" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={openWhatsApp}
          className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors"
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  );
}