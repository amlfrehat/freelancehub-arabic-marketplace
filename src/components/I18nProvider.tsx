"use client"

import { useState, useEffect, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { I18nContext, Locale, getTranslation, locales, defaultLocale } from '@/lib/i18n'

interface I18nProviderProps {
  children: ReactNode
  locale: Locale
}

export function I18nProvider({ children, locale }: I18nProviderProps) {
  const [translations, setTranslations] = useState<Record<string, any>>({})
  const [currentLocale, setCurrentLocale] = useState<Locale>(locale)
  const router = useRouter()
  const pathname = usePathname()

  // Load translations
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const translationPromises = locales.map(async (loc) => {
          const response = await fetch(`/locales/${loc}/common.json`)
          const data = await response.json()
          return [loc, data]
        })

        const translationEntries = await Promise.all(translationPromises)
        const translationsObj = Object.fromEntries(translationEntries)
        setTranslations(translationsObj)
      } catch (error) {
        console.error('Failed to load translations:', error)
      }
    }

    loadTranslations()
  }, [])

  const t = (key: string): string => {
    return getTranslation(currentLocale, key, translations)
  }

  const changeLocale = (newLocale: Locale) => {
    setCurrentLocale(newLocale)
    
    // Update URL with new locale
    const segments = pathname.split('/')
    segments[1] = newLocale // Replace the locale segment
    const newPath = segments.join('/')
    
    router.push(newPath)
  }

  const contextValue = {
    locale: currentLocale,
    t,
    changeLocale,
  }

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  )
}
