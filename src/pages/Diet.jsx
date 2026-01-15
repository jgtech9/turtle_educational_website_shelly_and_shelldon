import React, { useState, useEffect } from 'react'
    import { useLocation } from 'react-router-dom'

    export default function Diet() {
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
        <section id="diet">
          <h2>Turtle Diets</h2>
          <p>Turtles have varied diets depending on their species. Some are herbivores, while others are omnivores or carnivores.</p>
          <div 
            className="responsive-image-container"
            onMouseEnter={() => setShowCaption(true)}
            onMouseLeave={() => setShowCaption(false)}
          >
            <img 
              src="/images/pages/diet-main.jpg" 
              alt="Turtle eating" 
              className="responsive-image"
              onError={(e) => { e.target.src = '/images/pages/placeholder.svg' }}
            />
            {showCaption && (
              <div className="image-caption">
                Some turtles are herbivores, while others are omnivores or carnivores.
              </div>
            )}
          </div>
          <article>
            <h3 id="what">What Do Turtles Eat?</h3>
            <p>Turtles have diverse diets based on their species and habitat. Sea turtles often eat jellyfish and seaweed, while land turtles prefer plants and insects.</p>
            <ul id="diet-list">
              <li id="herbivores"><strong>Herbivores:</strong> Eat plants, fruits, and vegetables.</li>
              <li id="omnivores"><strong>Omnivores:</strong> Consume both plants and small animals.</li>
              <li id="carnivores"><strong>Carnivores:</strong> Feed on fish, insects, and other small creatures.</li>
            </ul>
            <p>A balanced diet is essential for a turtle's health and longevity.</p>
          </article>
        </section>
      )
    }
