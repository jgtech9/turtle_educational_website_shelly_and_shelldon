import React, { useState, useEffect } from 'react'
    import { useLocation } from 'react-router-dom'

    export default function Reproduction() {
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
        <section id="reproduction">
          <h2>Turtle Reproduction</h2>
          <p>Turtles have fascinating reproductive behaviors. Female turtles lay eggs on land, often returning to the same nesting site.</p>
          <div 
            className="responsive-image-container"
            onMouseEnter={() => setShowCaption(true)}
            onMouseLeave={() => setShowCaption(false)}
          >
            <img 
              src="/images/pages/reproduction-main.jpg"
              onError={(e) => { e.target.src = '/images/pages/placeholder.svg' }} 
              alt="Turtle eggs" 
              className="responsive-image"
            />
            {showCaption && (
              <div className="image-caption">
                Female turtles lay eggs on land, often returning to the same nesting site.
              </div>
            )}
          </div>
          <article>
            <h3 id="how">How Do Turtles Reproduce?</h3>
            <p>Turtles reproduce by laying eggs. After mating, female turtles dig nests in the sand or soil to lay their eggs. The eggs hatch after a few months, and the baby turtles make their way to the water.</p>
            <ul id="reproduction-list">
              <li id="nesting"><strong>Nesting:</strong> Females return to the same beach or area to lay eggs.</li>
              <li id="eggs"><strong>Eggs:</strong> Clutches can range from a few to over 100 eggs.</li>
              <li id="hatchlings"><strong>Hatchlings:</strong> Baby turtles face many predators as they journey to the water.</li>
            </ul>
            <p>Protecting nesting sites is crucial for the survival of turtle populations.</p>
          </article>
        </section>
      )
    }
