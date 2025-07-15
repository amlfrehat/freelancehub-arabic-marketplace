"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'

interface SidebarProps {
  userRole: 'freelancer' | 'client'
  isOpen?: boolean
  onToggle?: (open: boolean) => void
}

export function Sidebar({ userRole, isOpen, onToggle }: SidebarProps) {
  const freelancerLinks = [
    { href: '/dashboard/freelancer', label: 'Dashboard', active: true },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/projects', label: 'Projects' },
    { href: '/earnings', label: 'Earnings' },
    { href: '/messages', label: 'Messages' },
    { href: '/aiassistant', label: 'AI Assistant' },
    { href: '/marketing', label: 'Marketing' },
    { href: '/settings', label: 'Settings' }
  ]

  const clientLinks = [
    { href: '/dashboard/client', label: 'Dashboard', active: true },
    { href: '/search', label: 'Find Freelancers' },
    { href: '/projects', label: 'My Projects' },
    { href: '/favorites', label: 'Favorites' },
    { href: '/messages', label: 'Messages' },
    { href: '/aiassistant', label: 'AI Assistant' },
    { href: '/payments', label: 'Payments' },
    { href: '/settings', label: 'Settings' }
  ]

  const links = userRole === 'freelancer' ? freelancerLinks : clientLinks

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <h2 className="text-lg font-semibold">FreelanceHub</h2>
        <p className="text-sm text-muted-foreground capitalize">{userRole} Panel</p>
      </div>
      
      <Separator />
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>
                <Button
                  variant={link.active ? 'default' : 'ghost'}
                  className="w-full justify-start"
                >
                  {link.label}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4">
        <Separator className="mb-4" />
        <Button variant="outline" className="w-full">
          Logout
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:border-r lg:bg-background">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={onToggle}>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  )
}
