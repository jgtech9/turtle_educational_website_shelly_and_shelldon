import React, { useState } from 'react'

    export default function Behavior() {
      const [showCaption, setShowCaption] = useState(false)

      return (
        <section id="behavior">
          <h2>Turtle Behavior</h2>
          <p>Turtles exhibit unique behaviors that help them survive in their environments.</p>
          <div 
            className="responsive-image-container"
            onMouseEnter={() => setShowCaption(true)}
            onMouseLeave={() => setShowCaption(false)}
          >
            <img 
              src="/images/pages/behavior-main.jpg"
              onError={(e) => { e.target.src = '/images/pages/placeholder.svg' }} 
              alt="Turtle behavior" 
              className="responsive-image"
            />
            {showCaption && (
              <div className="image-caption">
                Turtles are known for their slow movements and long migrations.
              </div>
            )}
          </div>
          <article>
            <h3>What Are Some Turtle Behaviors?</h3>
            <p>Turtles have fascinating behaviors that vary by species and habitat.</p>
            <ul>
              <li><strong>Migration:</strong> Sea turtles travel thousands of miles to nesting sites.</li>
              <li><strong>Basking:</strong> Many turtles sunbathe to regulate their body temperature.</li>
              <li><strong>Hibernation:</strong> Some turtles hibernate during cold months.</li>
            </ul>
            <p>Understanding turtle behavior helps us appreciate their unique adaptations.</p>
          </article>
        </section>
      )
    }
