import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType?: string;
}

export default function QuoteModal({ isOpen, onClose, serviceType }: QuoteModalProps) {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    to_name: 'Placas del Sur',
    from_name: '',
    from_email: '',
    phone: '',
    address: '',
    message: '',
    service_type: serviceType || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const getServiceName = (serviceId: string) => {
    const services = ['techos', 'tabiques', 'registrable', 'reformas', 'trasdosados', 'aislamiento'];
    if (!services.includes(serviceId)) return '';
    return t(`services.${serviceId}.title`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const emailData = {
        ...formData,
        service_type: formData.service_type ? 
          `${getServiceName(formData.service_type)} (${formData.service_type})` : 
          'Non spécifié'
      };

      const response = await emailjs.send(
        'service_vs4hkfl',
        'template_jsq9wzj',
        emailData,
        '9RBQHeLUk_ODWaaXK'
      );

      if (response.status === 200) {
        setSubmitStatus('success');
        setTimeout(() => {
          onClose();
          setFormData({
            to_name: 'Placas del Sur',
            from_name: '',
            from_email: '',
            phone: '',
            address: '',
            message: '',
            service_type: serviceType || ''
          });
          setFocusedField(null);
          setSubmitStatus('idle');
        }, 2000);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const getInputClassName = (fieldName: string) => {
    return `mt-1 block w-full px-3 py-2 bg-white border rounded-md shadow-sm transition-all duration-200 
      ${focusedField === fieldName 
        ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-50' 
        : 'border-gray-300 hover:border-gray-400'
      } 
      focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
      placeholder-gray-400`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6"
            onClick={e => e.stopPropagation()}
            dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {t('services.requestQuote')}
                {serviceType && (
                  <span className="block text-sm font-normal text-gray-600 mt-1">
                    {getServiceName(serviceType)}
                  </span>
                )}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="from_name" className="block text-sm font-medium text-gray-700">
                  {t('contact.form.name')} *
                </label>
                <input
                  type="text"
                  id="from_name"
                  name="from_name"
                  required
                  value={formData.from_name}
                  onChange={handleChange}
                  onFocus={() => handleFocus('from_name')}
                  onBlur={handleBlur}
                  placeholder={t('name')}
                  className={getInputClassName('from_name')}
                  autoComplete="name"
                />
              </div>

              <div>
                <label htmlFor="from_email" className="block text-sm font-medium text-gray-700">
                  {t('email')} *
                </label>
                <input
                  type="email"
                  id="from_email"
                  name="from_email"
                  required
                  value={formData.from_email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('from_email')}
                  onBlur={handleBlur}
                  placeholder={t('email')}
                  className={getInputClassName('from_email')}
                  autoComplete="email"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  {t('contact.form.phone')} *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => handleFocus('phone')}
                  onBlur={handleBlur}
                  placeholder={t('phone')}
                  className={getInputClassName('phone')}
                  autoComplete="tel"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  {t('contact.form.address')}
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  onFocus={() => handleFocus('address')}
                  onBlur={handleBlur}
                  placeholder={t('address')}
                  className={getInputClassName('address')}
                  autoComplete="street-address"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  {t('message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={handleBlur}
                  placeholder={t('message')}
                  className={`${getInputClassName('message')} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-md text-white font-medium transition-all duration-200 
                  ${isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : submitStatus === 'success'
                    ? 'bg-green-600 hover:bg-green-700'
                    : submitStatus === 'error'
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                  }
                  transform hover:scale-[1.02] active:scale-[0.98]`}
              >
                {isSubmitting
                  ? t('sending')
                  : submitStatus === 'success'
                  ? t('sent')
                  : submitStatus === 'error'
                  ? t('error')
                  : t('submit')}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}