"use client"

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Moon, Sun, Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const NavItems = () => (
    <>
      <Link href="/" className="hover:text-primary transition-colors">
        Home
      </Link>
      <Link href="/about" className="hover:text-primary transition-colors">
        About
      </Link>
      <div className="flex items-center space-x-2">
        <span className="sr-only">Toggle theme</span>
        <Switch
          checked={theme === 'dark'}
          onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle dark mode"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Switch>
      </div>
    </>
  )

  return (
    <header className="py-4 md:py-6 border-b">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-xl md:text-2xl font-bold">
          My Blog
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <NavItems />
        </nav>
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <nav className="flex flex-col space-y-4">
              <NavItems />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}