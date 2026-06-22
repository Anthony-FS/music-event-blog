import './App.css'

import NavBar from './components/NavBar'
import {HeroSection, ArticleSection} from './components/LandingPageBody'
import Footer from './components/Footer'


function App() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <HeroSection />
      <ArticleSection />
      <Footer />
    </main>
  )
}

export default App
