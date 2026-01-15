import React, { useState } from 'react'

    export default function PhysicalDifferences() {
      const [showCaption, setShowCaption] = useState(false)

      return (
        <section id="physical-differences">
          <h2>Physical Differences</h2>
          <p>Turtles vary in size, shape, and color depending on their species and habitat.</p>
          <div 
            className="responsive-image-container"
            onMouseEnter={() => setShowCaption(true)}
            onMouseLeave={() => setShowCaption(false)}
          >
            <img 
              src="/images/pages/physical-differences-main.jpg"
              onError={(e) => { e.target.src = '/images/pages/placeholder.svg' }} 
              alt="Turtle physical differences" 
              className="responsive-image"
            />
            {showCaption && (
              <div className="image-caption">
                Turtles vary in size, shell shape, and coloration.
              </div>
            )}
          </div>
          <article>
            <h3>How Do Turtles Differ Physically?</h3>
            <p>Turtles have evolved unique physical traits to adapt to their environments.</p>
            <ul>
              <li><strong>Size:</strong> Ranges from a few inches to over 6 feet in length.</li>
              <li><strong>Shell Shape:</strong> Flat for swimming or domed for protection.</li>
              <li><strong>Coloration:</strong> Helps with camouflage in their habitat.</li>
            </ul>
            <p>These differences make each turtle species uniquely suited to its environment.</p>
          </article>
        </section>
      )
    }
