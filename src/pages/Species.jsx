import React, { useState } from 'react'

    export default function Species() {
      const [showCaption, setShowCaption] = useState(false)

      return (
        <section id="species">
          <h2>Turtle Species</h2>
          <p>There are over 300 species of turtles worldwide, each with unique characteristics.</p>
          <div 
            className="responsive-image-container"
            onMouseEnter={() => setShowCaption(true)}
            onMouseLeave={() => setShowCaption(false)}
          >
            <img 
              src="/images/pages/species-main.jpg"
              onError={(e) => { e.target.src = '/images/pages/placeholder.svg' }} 
              alt="Different turtle species" 
              className="responsive-image"
            />
            {showCaption && (
              <div className="image-caption">
                There are over 300 species of turtles worldwide.
              </div>
            )}
          </div>
          <article>
            <h3>What Are Some Turtle Species?</h3>
            <p>Turtles come in many shapes and sizes, from tiny box turtles to massive sea turtles.</p>
            <ul>
              <li><strong>Sea Turtles:</strong> Include the green sea turtle and leatherback.</li>
              <li><strong>Freshwater Turtles:</strong> Such as the red-eared slider and painted turtle.</li>
              <li><strong>Land Turtles:</strong> Like the Galapagos tortoise and box turtle.</li>
            </ul>
            <p>Each species plays a vital role in its ecosystem.</p>
          </article>
        </section>
      )
    }
