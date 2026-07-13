import { Link } from 'react-router-dom'

import Footer from '../components/layout/Footer'
import NavBar from '../components/layout/NavBar'

function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <NavBar />

      <section className="flex flex-1 items-center justify-center px-5 py-16">
        <div className="max-w-md text-center">
          <p className="text-sm font-semibold text-[#75716b]">404</p>
          <h1 className="mt-3 text-4xl font-bold text-[#28241f]">
            Page not found
          </h1>
          <p className="mt-4 text-sm font-medium leading-6 text-[#75716b]">
            The page you are looking for does not exist or may have been moved.
          </p>

          <Link
            to="/"
            className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-[#28241f] px-7 text-sm font-semibold text-white no-underline"
          >
            Home page
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default NotFoundPage
