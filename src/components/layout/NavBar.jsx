import { useState } from 'react'
import { Link } from 'react-router-dom'

import expandDownIcon from '../../assets/icons/Expand_down_light.svg'
import fileIcon from '../../assets/icons/File_light.svg'
import logo from '../../assets/icons/logo.svg'
import outIcon from '../../assets/icons/Out_light.svg'
import refreshIcon from '../../assets/icons/Refresh_light.svg'
import sandwichMenu from '../../assets/icons/Sandwich_menu.svg'
import userIcon from '../../assets/icons/User_duotone.svg'
import NotificationMenu from '../admin/NotificationMenu'
import useMember from '../../hooks/useMember'
import { DEFAULT_MEMBER_AVATAR_URL } from '../../lib/avatar'

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
      <img src={logo} alt="meb" className="h-12 w-16 sm:h-14 sm:w-20" />
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

function MemberActions({ member, onLogOut }) {
  const [isMemberMenuOpen, setIsMemberMenuOpen] = useState(false)
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false)
  const isAdmin = member?.role === 'admin'

  function handleNotificationMenuToggle() {
    setIsNotificationMenuOpen((currentValue) => !currentValue)
    setIsMemberMenuOpen(false)
  }

  function handleMemberMenuToggle(event) {
    event.preventDefault()
    setIsMemberMenuOpen((currentValue) => !currentValue)
    setIsNotificationMenuOpen(false)
  }

  function handleLogOutClick() {
    setIsMemberMenuOpen(false)
    onLogOut()
  }

  return (
    <div className="relative flex shrink-0 items-center gap-3">
      <NotificationMenu
        isOpen={isNotificationMenuOpen}
        onToggle={handleNotificationMenuToggle}
      />

      <div className="relative flex h-9 items-center">
        <button
          type="button"
          className="inline-flex h-9 items-center gap-2 rounded-full bg-transparent px-0 py-0 leading-none"
          aria-label="Member menu"
          aria-expanded={isMemberMenuOpen}
          aria-controls="member-menu"
          onClick={handleMemberMenuToggle}
        >
          <img
            src={member?.avatarUrl || DEFAULT_MEMBER_AVATAR_URL}
            alt=""
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="hidden max-w-[120px] truncate text-xs font-medium leading-none text-[#28241f] sm:inline">
            {member?.name ?? 'Member'}
          </span>
          <img
            src={expandDownIcon}
            alt=""
            className="hidden h-3 w-3 shrink-0 sm:block"
            aria-hidden="true"
          />
        </button>

        {isMemberMenuOpen && (
          <div
            id="member-menu"
            className="absolute right-0 top-[calc(100%+0.75rem)] z-50 flex w-[230px] flex-col items-stretch overflow-hidden rounded-lg border border-[#dedbd6] bg-white py-2 text-left shadow-lg"
          >
            <MemberMenuItem
              icon={userIcon}
              label="Profile"
              href="/member-management"
              onClick={() => setIsMemberMenuOpen(false)}
            />
            <MemberMenuItem
              icon={refreshIcon}
              label="Reset password"
              href="/member-management/reset-password"
              onClick={() => setIsMemberMenuOpen(false)}
            />
            {isAdmin && (
              <MemberMenuItem
                icon={fileIcon}
                label="Admin panel"
                href="/admin"
                onClick={() => setIsMemberMenuOpen(false)}
              />
            )}
            <div className="my-1 h-px bg-[#dedbd6]" />
            <MemberMenuItem
              icon={outIcon}
              label="Log out"
              onClick={handleLogOutClick}
            />
          </div>
        )}
      </div>
    </div>
  )
}

function MemberMenuItem({ icon, label, href, onClick }) {
  const className =
    'flex! w-full items-center justify-start! gap-4 px-4 py-3 text-left! text-base font-semibold whitespace-nowrap text-[#43403b]! no-underline! transition-colors visited:text-[#43403b]! hover:bg-[#f6f5f2] hover:text-[#43403b]!'
  const content = (
    <>
      <img src={icon} alt="" className="h-5 w-5" aria-hidden="true" />
      <span>{label}</span>
    </>
  )

  if (href) {
    return (
      <Link to={href} onClick={onClick} className={className}>
        {content}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {content}
    </button>
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
  const { member, isLoggedIn, logOut } = useMember()

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
        {isLoggedIn ? (
          <MemberActions member={member} onLogOut={logOut} />
        ) : (
          <>
            <NavActions />
            <MobileMenuButton
              isOpen={isMobileMenuOpen}
              onClick={handleMobileMenuToggle}
            />
          </>
        )}
      </nav>
      {!isLoggedIn && (
        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onLinkClick={handleMobileMenuClose}
        />
      )}
    </header>
  )
}

export default NavBar
