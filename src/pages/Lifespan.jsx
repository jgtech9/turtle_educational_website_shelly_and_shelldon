import React, { useState, useEffect } from 'react'
    import { useLocation } from 'react-router-dom'

    export default function Lifespan() {
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
        <section id="lifespan">
          <h2>Turtle Lifespan</h2>
          <p>Turtles are known for their long lifespans. Some species can live for over 100 years!</p>
          <div 
            className="responsive-image-container"
            onMouseEnter={() => setShowCaption(true)}
            onMouseLeave={() => setShowCaption(false)}
          >
            <img 
              src="/images/pages/lifespan-main.jpg"
              onError={(e) => { e.target.src = '/images/pages/placeholder.svg' }} 
              alt="Old turtle" 
              className="responsive-image"
            />
            {showCaption && (
              <div className="image-caption">
                Some turtles can live for over 100 years!
              </div>
            )}
          </div>
          <article>
            <h3 id="how-long">How Long Do Turtles Live?</h3>
            <p>Turtles are among the longest-living animals on Earth. Their lifespan varies by species and environment.</p>
            <ul id="lifespan-list">
              <li id="sea-turtles"><strong>Sea Turtles:</strong> Can live up to 80 years or more.</li>
              <li id="land-turtles"><strong>Land Turtles:</strong> Some species, like the Galapagos tortoise, can live over 100 years.</li>
              <li id="freshwater-turtles"><strong>Freshwater Turtles:</strong> Typically live 20-40 years in the wild.</li>
            </ul>
            <p>Proper care and protection can help turtles reach their full lifespan potential.</p>
          </article>
        </section>
      )
    }
