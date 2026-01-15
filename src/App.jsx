import React, { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import './App.css'
import { searchContent } from './data/searchContent'
import AmazonAd from './components/AmazonAd'
import Home from './pages/Home'
import Habitat from './pages/Habitat'
import Diet from './pages/Diet'
import Reproduction from './pages/Reproduction'
import Predators from './pages/Predators'
import Lifespan from './pages/Lifespan'
import Protections from './pages/Protections'
import Behavior from './pages/Behavior'
import Anatomy from './pages/Anatomy'
import Species from './pages/Species'
import PhysicalDifferences from './pages/PhysicalDifferences'
import EcosystemImportance from './pages/EcosystemImportance'
import Help from './pages/Help'
import Media from './pages/Media'
import Crafts from './pages/Crafts'
import Contact from './pages/Contact'
import ShelleyShelldon from './pages/ShelleyShelldon'
import Club from './pages/Club'

const categories = [
  { id: 'home', name: 'Home', path: '/' },
  { id: 'shelley-shelldon', name: 'Shelly & Shelldon', path: '/shelley-shelldon' },
  { id: 'habitat', name: 'Habitat', path: '/habitat' },
  { id: 'diet', name: 'Diet', path: '/diet' },
  { id: 'reproduction', name: 'Reproduction', path: '/reproduction' },
  { id: 'predators', name: 'Predators', path: '/predators' },
  { id: 'lifespan', name: 'Lifespan', path: '/lifespan' },
  { id: 'protections', name: 'Protections', path: '/protections' },
  { id: 'behavior', name: 'Behavior', path: '/behavior' },
  { id: 'anatomy', name: 'Anatomy', path: '/anatomy' },
  { id: 'species', name: 'Species', path: '/species' },
  { id: 'physical-differences', name: 'Physical Differences', path: '/physical-differences' },
  { id: 'ecosystem-importance', name: 'Ecosystem Importance', path: '/ecosystem-importance' },
  { id: 'help', name: 'How to Help', path: '/help' },
  { id: 'contact', name: 'Contact', path: '/contact' },
  { id: 'club', name: 'Turtle World Club', path: '/club' }
]

function App() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const navigate = useNavigate()

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  useEffect(() => {
    const body = document.body
    if (isDarkMode) {
      body.style.backgroundColor = '#333'
      body.style.color = '#f5f5f5'
    } else {
      body.style.backgroundColor = '#f0f8f0'
      body.style.color = '#333'
    }
  }, [isDarkMode])

  const handleSearch = (query) => {
    setSearchQuery(query)
    if (query.length > 2) {
      const results = Object.entries(searchContent)
        .flatMap(([key, content]) => {
          const matches = []
          
          // Check title
          if (content.title.toLowerCase().includes(query.toLowerCase())) {
             matches.push({
                id: `${key}-title`,
                title: content.title,
                excerpt: content.content.substring(0, 100) + '...',
                path: content.path,
                type: 'title',
                scrollTo: null,
                category: key
              })
          }

          // Check content
          if (content.content.toLowerCase().includes(query.toLowerCase())) {
             matches.push({
                id: `${key}-content`,
                title: content.title,
                excerpt: content.content.substring(0, 100) + '...',
                path: content.path,
                type: 'content',
                scrollTo: null,
                category: key
              })
          }

          // Check headings
          content.headings.forEach(heading => {
            if (heading.text.toLowerCase().includes(query.toLowerCase())) {
              matches.push({
                id: `${key}-heading-${heading.id}`,
                title: heading.text,
                excerpt: `From ${content.title}`,
                path: content.path,
                type: 'heading',
                scrollTo: heading.id,
                category: key
              })
            }
          })

          return matches
        })
        .sort((a, b) => {
          const priority = { title: 1, heading: 2, content: 3 }
          return priority[a.type] - priority[b.type]
        })

      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }

  const handleSearchResultClick = (result) => {
    setSearchResults([])
    setSearchQuery('')
    
    // Navigate to the page with scrollTo in state
    navigate(result.path, {
      state: { scrollTo: result.scrollTo, category: result.category }
    })
  }

  const dropdownStyle = {
    position: 'absolute',
    background: isDarkMode ? '#333' : '#fff',
    minWidth: '200px',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
    zIndex: 1,
    right: 0,
    animation: 'fadeIn 0.3s ease-in-out',
    display: isDropdownOpen ? 'block' : 'none'
  }

  const dropdownItemStyle = {
    color: isDarkMode ? '#f5f5f5' : '#333',
    padding: '12px 16px',
    textDecoration: 'none',
    display: 'block',
    transition: 'background-color 0.3s',
    fontFamily: 'var(--font-body)'
  }

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <header className="header">
        <div className="header-title-container">
            <img 
            src="/images/header/turtle-icon.svg" 
            alt="Turtle icon" 
            className="header-icon"
          />
          <Link to="/" className="header-title">
            <h1>Turtle World</h1>
          </Link>
        </div>
        <div className="header-controls">
          <button 
            className="theme-toggle"
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? '🌞' : '🌙'}
          </button>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search articles..."
              className="search-bar"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.map(result => (
                  <div
                    key={result.id}
                    className="search-result-item"
                    onClick={() => handleSearchResultClick(result)}
                  >
                    <strong>{result.title}</strong>
                    {result.type === 'heading' && (
                      <span style={{ fontSize: '0.8em', color: '#666' }}>
                        {' '}(Heading)
                      </span>
                    )}
                    <p>{result.excerpt}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <nav className="nav">
            <div 
              className="dropdown"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="dropdown-button">
                Categories <span className="arrow">▼</span>
              </button>
              <div style={dropdownStyle}>
                {categories.map(category => (
                  <Link
                    key={category.id}
                    to={category.path}
                    style={dropdownItemStyle}
                    onMouseEnter={(e) => e.target.style.backgroundColor = isDarkMode ? '#444' : '#f0f0f0'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </header>

      <main>
        <div className="sidebar">
          <AmazonAd adSlotId={1} />
          <AmazonAd adSlotId={2} />
        </div>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shelley-shelldon" element={<ShelleyShelldon />} />
            <Route path="/habitat" element={<Habitat />} />
            <Route path="/diet" element={<Diet />} />
            <Route path="/reproduction" element={<Reproduction />} />
            <Route path="/predators" element={<Predators />} />
            <Route path="/lifespan" element={<Lifespan />} />
            <Route path="/protections" element={<Protections />} />
            <Route path="/behavior" element={<Behavior />} />
            <Route path="/anatomy" element={<Anatomy />} />
            <Route path="/species" element={<Species />} />
            <Route path="/physical-differences" element={<PhysicalDifferences />} />
            <Route path="/ecosystem-importance" element={<EcosystemImportance />} />
            <Route path="/help" element={<Help />} />
            <Route path="/media" element={<Media />} />
            <Route path="/crafts" element={<Crafts />} />
            <Route path="/club" element={<Club />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>Explore more about turtles and how you can help protect them!</p>
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/help">How to Help</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
          <p className="footer-copyright">© 2023 Turtle World. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
