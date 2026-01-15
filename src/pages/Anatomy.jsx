import React, { useState } from 'react'

    export default function Anatomy() {
      const [showCaption, setShowCaption] = useState(false)

      return (
        <section id="anatomy">
          <h2>Turtle Anatomy</h2>
          <p>Turtles have a unique anatomy that sets them apart from other animals.</p>
          <div 
            className="responsive-image-container"
            onMouseEnter={() => setShowCaption(true)}
            onMouseLeave={() => setShowCaption(false)}
          >
            <img 
              src="/images/pages/anatomy-main.jpg"
              onError={(e) => { e.target.src = '/images/pages/placeholder.svg' }} 
              alt="Turtle anatomy" 
              className="responsive-image"
            />
            {showCaption && (
              <div className="image-caption">
                Turtles have a unique shell that protects their body.
              </div>
            )}
          </div>
          <article>
            <h3>What Makes Turtles Unique?</h3>
            <p>Turtles are known for their shells, which are part of their skeleton. Their anatomy is adapted for their environment.</p>
            <ul>
              <li><strong>Shell:</strong> Made of bone and cartilage, it provides protection.</li>
              <li><strong>Limbs:</strong> Adapted for swimming, walking, or digging.</li>
              <li><strong>Beak:</strong> Used for eating, with no teeth in most species.</li>
            </ul>
            <p>Turtle anatomy is a marvel of evolution, perfectly suited to their lifestyle.</p>
          </article>
        </section>
      )
    }
