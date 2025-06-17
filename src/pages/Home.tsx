import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Building2, Hammer, PaintBucket, Star, Clock, Award, ThumbsUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Testimonials from '../components/Testimonials';
import QuoteModal from '../components/QuoteModal';

export default function Home() {
  const { t } = useTranslation();
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const services = [
    {
      icon: Building2,
      title: t('home.services.list.pladur'),
      desc: t(''),
      image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1470&auto=format&fit=crop'
    },
    {
      icon: PaintBucket,
      title: t('home.services.list.renovation'),
      desc: t(''),
      image: 'https://images.unsplash.com/photo-1534237710431-e2fc698436d0?q=80&w=1470&auto=format&fit=crop'
    },
    {
      icon: Hammer,
      title: t('home.services.list.floors'),
      desc: t(''),
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1469&auto=format&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://example.com/construction-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <motion.div
              ref={heroRef}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              variants={fadeInUpVariants}
              transition={{ duration: 0.6 }}
              className="w-full flex flex-col md:flex-row items-center justify-between gap-12"
            >
              {/* Texte Hero */}
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                  {t('home.hero.title')}
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-200">
                  {t('home.hero.subtitle')}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  {t('home.hero.cta')}
                </motion.button>
              </div>

              {/* Logo agrandi */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-full max-w-lg lg:max-w-xl flex-shrink-0"
              >
                <img
                  src="/logo3.jpg"
                  alt="Placas del Sur K.C.I.B"
                  className="w-full h-auto object-contain"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">{t('home.services.title')}</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUpVariants}
                transition={{ delay: index * 0.2 }}
                className="group relative overflow-hidden rounded-xl bg-gray-50 hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-8">
                  <div className="inline-block p-4 bg-blue-100 rounded-full mb-6">
                    <service.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-gray-600">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">{t('home.why.title')}</h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Star, title: t('home.why.quality') },
              { icon: Clock, title: t('home.why.experience') },
              { icon: Award, title: t('home.why.experience') },
              { icon: ThumbsUp, title: t('home.why.satisfaction') }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUpVariants}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="inline-block p-4 bg-blue-100 rounded-full mb-6">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              {t('home.cta.title')}
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              {t('home.cta.subtitle')}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsQuoteModalOpen(true)}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {t('home.cta.button')}
            </motion.button>
          </motion.div>
        </div>
      </section>

      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </div>
  );
}