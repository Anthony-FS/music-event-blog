import { Cat, Earth, Link } from 'lucide-react'

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/anthonyfungesmith', icon: Link },
  { label: 'GitHub', href: 'https://github.com/Anthony-FS', icon: Cat },
  { label: 'Google', href: 'https://www.google.com/', icon: Earth },
]

function Footer() {
  return (
    <footer className="w-full bg-[#f5f4f2]">
      <div className="mx-auto flex min-h-[118px] max-w-7xl flex-col justify-center gap-8 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-10 lg:px-28">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-start">
          <span className="text-sm font-medium text-[#28241f]">Get in touch</span>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                title={label}
                className="!text-black visited:!text-black transition-colors hover:!text-black focus:outline-none focus:ring-2 focus:ring-[#12b379]"
              >
                <Icon size={20} strokeWidth={2.5} />
              </a>
            ))}
          </div>
        </div>

        <a
          href="/"
          className="self-center text-sm font-medium !text-black visited:!text-black underline underline-offset-4 transition-colors hover:!text-black sm:self-auto"
        >
          Home page
        </a>
      </div>
    </footer>
  )
}

export default Footer
