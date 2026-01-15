import React, { useState, useEffect } from 'react'
    import { useLocation } from 'react-router-dom'

    export default function Protections() {
      const [showCaption, setShowCaption] = useState(false)
      const location = useLocation()

      useEffect(() => {
        if (location.state?.scrollTo) {
          const element = document.getElementById(location.state.scrollTo)
          if (element) {
            setTimeout(() => {
              element.scrollIntoView({ behavior: 'smooth' })
            }, 100)
          }
        }
      }, [location.state])

      return (
        <section id="protections">
          <h2>Turtle Protections</h2>
          <p>Many turtle species are protected by conservation laws. These protections help ensure their survival.</p>
          <div 
            className="responsive-image-container"
            onMouseEnter={() => setShowCaption(true)}
            onMouseLeave={() => setShowCaption(false)}
          >
            <img 
              src="/images/pages/protections-main.jpg"
              onError={(e) => { e.target.src = '/images/pages/placeholder.svg' }} 
              alt="Protected turtle" 
              className="responsive-image"
            />
            {showCaption && (
              <div className="image-caption">
                Many turtle species are protected by conservation laws.
              </div>
            )}
          </div>
          <article>
            <h3 id="how-protected">How Are Turtles Protected?</h3>
            <p>Turtles face many threats, including habitat loss and poaching. Conservation efforts aim to protect them.</p>
            <ul id="protections-list">
              <li id="laws"><strong>Laws:</strong> Many countries have laws protecting turtles and their habitats.</li>
              <li id="sanctuaries"><strong>Sanctuaries:</strong> Protected areas provide safe environments for turtles.</li>
              <li id="education"><strong>Education:</strong> Raising awareness helps reduce threats to turtles.</li>
            </ul>
            <p>Supporting conservation efforts is key to protecting turtles for future generations.</p>
          </article>
        </section>
      )
    }
