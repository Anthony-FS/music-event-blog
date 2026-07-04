import { useState } from 'react'
import { Link } from 'react-router-dom'

import logo from '../assets/icons/logo.svg'
import sandwichMenu from '../assets/icons/Sandwich_menu.svg'

const authLinks = [
  {
    label: 'Log in',
    href: '/login',
    variant: 'secondary',
  },
  {
    label: 'Sign up',
    href: '/signup',
    variant: 'primary',
  },
]

function NavLogo() {
  return (
    <Link to="/" aria-label="Home" className="inline-flex items-center">
      <img src={logo} alt="hh." className="h-10 w-10 sm:h-12 sm:w-12" />
    </Link>
  )
}

function NavButton({ href, label, variant, onClick, className = '' }) {
  const variantClassName =
    variant === 'primary'
      ? 'bg-[#28241f] text-white hover:bg-black'
      : 'border border-[#85817b] bg-white text-[#28241f] hover:bg-neutral-100'

  return (
    <Link
      to={href}
      onClick={onClick}
      className={`inline-flex h-10 min-w-[84px] items-center justify-center rounded-full px-5 text-sm font-semibold leading-none transition-colors focus:outline-none focus:ring-2 focus:ring-[#28241f] focus:ring-offset-2 sm:h-11 sm:min-w-[116px] sm:px-7 ${variantClassName} ${className}`}
    >
      {label}
    </Link>
  )
}

function NavActions() {
  return (
    <div className="hidden shrink-0 items-center gap-2 sm:flex sm:gap-3">
      {authLinks.map((link) => (
        <NavButton key={link.href} {...link} />
      ))}
    </div>
  )
}

function MobileMenuButton({ isOpen, onClick }) {
  return (
    <button
      type="button"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-[#eeece8] focus:outline-none focus:ring-2 focus:ring-[#28241f] focus:ring-offset-2 sm:hidden"
      aria-label="Open navigation menu"
      aria-expanded={isOpen}
      aria-controls="mobile-nav-menu"
      onClick={onClick}
    >
      <img src={sandwichMenu} alt="" className="h-3 w-[18px]" aria-hidden="true" />
    </button>
  )
}

function MobileNavMenu({ isOpen, onLinkClick }) {
  if (!isOpen) {
    return null
  }

  return (
    <div
      id="mobile-nav-menu"
      className="border-t border-[#dedbd6] bg-[#faf9f7] px-5 py-4 sm:hidden"
    >
      <div className="flex flex-col gap-3">
        {authLinks.map((link) => (
          <NavButton
            key={link.href}
            {...link}
            onClick={onLinkClick}
            className="w-full"
          />
        ))}
      </div>
    </div>
  )
}

function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  function handleMobileMenuToggle() {
    setIsMobileMenuOpen((currentValue) => !currentValue)
  }

  function handleMobileMenuClose() {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="w-full border-b border-[#dedbd6] bg-[#faf9f7]">
      <nav
        className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-28"
        aria-label="Main navigation"
      >
        <NavLogo />
        <NavActions />
        <MobileMenuButton
          isOpen={isMobileMenuOpen}
          onClick={handleMobileMenuToggle}
        />
      </nav>
      <MobileNavMenu
        isOpen={isMobileMenuOpen}
        onLinkClick={handleMobileMenuClose}
      />
    </header>
  )
}

export default NavBar
