const path = require('path')

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar', 'he'],
    localeDetection: true,
  },
  localePath: path.resolve('./public/locales'),
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  
  // Configure namespace loading
  ns: ['common', 'auth', 'dashboard'],
  defaultNS: 'common',
  
  // Fallback configuration
  fallbackLng: {
    'ar': ['en'],
    'he': ['en'],
    'default': ['en']
  },
  
  // Debug in development
  debug: process.env.NODE_ENV === 'development',
  
  // Interpolation options
  interpolation: {
    escapeValue: false, // React already does escaping
  },
  
  // React options
  react: {
    useSuspense: false,
  },
  
  // Server-side rendering options
  serializeConfig: false,
  use: [],
}
