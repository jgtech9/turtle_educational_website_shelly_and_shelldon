import React, { useState } from 'react'

    export default function EcosystemImportance() {
      const [showCaption, setShowCaption] = useState(false)

      return (
        <section id="ecosystem-importance">
          <h2>Ecosystem Importance</h2>
          <p>Turtles play a crucial role in maintaining healthy ecosystems.</p>
          <div 
            className="responsive-image-container"
            onMouseEnter={() => setShowCaption(true)}
            onMouseLeave={() => setShowCaption(false)}
          >
            <img 
              src="/images/pages/ecosystem-importance-main.jpg"
              onError={(e) => { e.target.src = '/images/pages/placeholder.svg' }} 
              alt="Turtle in ecosystem" 
              className="responsive-image"
            />
            {showCaption && (
              <div className="image-caption">
                Turtles help maintain healthy ecosystems by controlling prey populations.
              </div>
            )}
          </div>
          <article>
            <h3>Why Are Turtles Important?</h3>
            <p>Turtles contribute to their ecosystems in many ways, from controlling prey populations to maintaining habitats.</p>
            <ul>
              <li><strong>Prey Control:</strong> Turtles help keep populations of jellyfish and other prey in check.</li>
              <li><strong>Habitat Maintenance:</strong> Their movements help aerate soil and water.</li>
              <li><strong>Food Source:</strong> Turtles are an important part of the food chain.</li>
            </ul>
            <p>Protecting turtles ensures the health of their ecosystems.</p>
          </article>
        </section>
      )
    }
