import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Breadcrumb() {
  const location = useLocation();
  const { t } = useTranslation();
  
  const pathnames = location.pathname.split('/').filter((x) => x);
  
  // Get the section from location state (for gallery)
  const state = location.state as { section?: string };
  
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-100 py-2 px-4 mb-6"
    >
      <div className="max-w-7xl mx-auto flex items-center text-sm">
        <Link 
          to="/" 
          className="text-gray-600 hover:text-blue-600 transition-colors flex items-center"
        >
          <Home className="w-4 h-4 mr-1" />
          {t('nav.home')}
        </Link>
        
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          
          let translationKey = `nav.${name}`;
          let displayName = t(translationKey);
          
          // If we're in gallery and have a section
          if (name === 'gallery' && state?.section) {
            displayName = `${t('nav.gallery')} - ${t(`gallery.${state.section}`)}`;
          }
          
          return (
            <React.Fragment key={name}>
              <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
              {isLast ? (
                <span className="text-blue-600 font-medium">
                  {displayName}
                </span>
              ) : (
                <Link
                  to={routeTo}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {displayName}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </motion.nav>
  );
}