import './App.css'

import NavBar from './components/NavBar'
import {HeroSection, ArticleSection} from './components/LandingPageBody'


function App() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <HeroSection />
      <ArticleSection />
    </main>
  )
}

export default App
