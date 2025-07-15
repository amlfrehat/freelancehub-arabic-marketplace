"use client"

import { useTranslation } from 'next-i18next'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function WelcomeSection() {
  const { t } = useTranslation('common')

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="text-center space-y-6">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
          {t('welcome')} to{' '}
          <span className="text-primary">{t('freelancehub')}</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t('description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/register?role=client">
            <Button size="lg" className="w-full sm:w-auto">
              {t('hire_freelancers')}
            </Button>
          </Link>
          <Link href="/auth/register?role=freelancer">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              {t('start_freelancing')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
