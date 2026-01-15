import React, { useState, useEffect } from 'react'
    import { useLocation } from 'react-router-dom'

    export default function Predators() {
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
        <section id="predators">
          <h2>Turtle Predators</h2>
          <p>Turtles face many predators throughout their lives. From eggs to adulthood, they must constantly be on guard.</p>
          <div 
            className="responsive-image-container"
            onMouseEnter={() => setShowCaption(true)}
            onMouseLeave={() => setShowCaption(false)}
          >
            <img 
              src="/images/pages/predators-main.jpg"
              onError={(e) => { e.target.src = '/images/pages/placeholder.svg' }} 
              alt="Turtle predator" 
              className="responsive-image"
            />
            {showCaption && (
              <div className="image-caption">
                Predators include birds, raccoons, and larger fish.
              </div>
            )}
          </div>
          <article>
            <h3 id="who">Who Preys on Turtles?</h3>
            <p>Turtles are vulnerable to predators at every stage of their life. Eggs and hatchlings are especially at risk.</p>
            <ul id="predators-list">
              <li id="egg"><strong>Egg Predators:</strong> Raccoons, birds, and crabs often dig up turtle nests.</li>
              <li id="hatchling"><strong>Hatchling Predators:</strong> Birds, fish, and other small animals prey on baby turtles.</li>
              <li id="adult"><strong>Adult Predators:</strong> Larger animals like sharks and crocodiles hunt adult turtles.</li>
            </ul>
            <p>Understanding turtle predators helps us develop strategies to protect them.</p>
          </article>
        </section>
      )
    }
