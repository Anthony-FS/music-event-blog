import logo from '../assets/logo.svg'

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
    <a href="/" aria-label="Home" className="inline-flex items-center">
      <img src={logo} alt="hh." className="h-10 w-10 sm:h-12 sm:w-12" />
    </a>
  )
}

function NavButton({ href, label, variant }) {
  const variantClassName =
    variant === 'primary'
      ? 'bg-[#28241f] text-white hover:bg-black'
      : 'border border-[#85817b] bg-white text-[#28241f] hover:bg-neutral-100'

  return (
    <a
      href={href}
      className={`inline-flex h-10 min-w-[84px] items-center justify-center rounded-full px-5 text-sm font-semibold leading-none transition-colors focus:outline-none focus:ring-2 focus:ring-[#28241f] focus:ring-offset-2 sm:h-11 sm:min-w-[116px] sm:px-7 ${variantClassName}`}
    >
      {label}
    </a>
  )
}

function NavActions() {
  return (
    <div className="flex shrink-0 items-center gap-2 sm:gap-3">
      {authLinks.map((link) => (
        <NavButton key={link.href} {...link} />
      ))}
    </div>
  )
}

function NavBar() {
  return (
    <header className="w-full border-b border-[#dedbd6] bg-[#faf9f7]">
      <nav
        className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-28"
        aria-label="Main navigation"
      >
        <NavLogo />
        <NavActions />
      </nav>
    </header>
  )
}

export default NavBar
