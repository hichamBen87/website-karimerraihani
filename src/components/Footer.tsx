import React from 'react';
import { Phone, Mail, Linkedin, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  // Contact information that should not be translated
  const contactInfo = {
    phone: '+34 617 286 080',
    email: 'placasdelsur80@gmail.com',
    linkedin: 'https://linkedin.com/company/techospladuraz',
    whatsapp: 'https://wa.me/34617286080'
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Contact Info - Not translated */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-6">{t('footer.contact')}</h3>
            <div className="space-y-4">
              <a href={`tel:${contactInfo.phone}`} className="flex items-center space-x-3 hover:text-blue-400 transition-colors">
                <Phone className="w-5 h-5" />
                <span style={{ unicodeBidi: 'plaintext' }}>{contactInfo.phone}</span>
              </a>
              <a href={`mailto:${contactInfo.email}`} className="flex items-center space-x-3 hover:text-blue-400 transition-colors">
                <Mail className="w-5 h-5" />
                <span>{contactInfo.email}</span>
              </a>
              <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 hover:text-blue-400 transition-colors">
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
              <a href={contactInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 hover:text-blue-400 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </motion.div>

          {/* Services - Translated */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4">{t('footer.services.title')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#techos" className="hover:text-blue-400 transition-colors">
                  {t('services.techos.title')}
                </a>
              </li>
              <li>
                <a href="#tabiques" className="hover:text-blue-400 transition-colors">
                  {t('services.tabiques.title')}
                </a>
              </li>
              <li>
                <a href="#registrable" className="hover:text-blue-400 transition-colors">
                  {t('services.registrable.title')}
                </a>
              </li>
              <li>
                <a href="#reformas" className="hover:text-blue-400 transition-colors">
                  {t('services.reformas.title')}
                </a>
              </li>
              <li>
                <a href="#trasdosados" className="hover:text-blue-400 transition-colors">
                  {t('services.trasdosados.title')}
                </a>
              </li>
              <li>
                <a href="#aislamiento" className="hover:text-blue-400 transition-colors">
                  {t('services.aislamiento.title')}
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center items-center"
          >
            <img 
              src="/logo011.png" 
              alt="Logo" 
              className="w-full max-w-[300px] h-auto"
            />
          </motion.div>
        </div>

        {/* Bottom Bar - Partially translated */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Placas del Sur K.C.I.B. {t('footer.rights')}
            </p>
            <a
              href="https://www.benjabrou-hicham.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 text-sm hover:text-blue-400 transition-colors mt-4 md:mt-0"
            >
              {t('footer.developed')} www.benjabrou-hicham.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}