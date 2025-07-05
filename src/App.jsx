import Header from './components/Header'
import Hero from './components/Hero'
import WhyGsap from './components/WhyGsap'
import SkillsScroll from './components/SkillsScroll'
import Contact from './components/Contact'

function App() {
  return (
    <>
      <Header />
      <Hero />
      <div className="section-divider" />
      <WhyGsap />
      <div className="section-divider" />
      <SkillsScroll />
      <div className="section-divider" />
      <Contact />
    </>
  )
}

export default App
