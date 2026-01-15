import React, { useState } from 'react'

export default function ShelleyShelldon() {
  const [showCaption, setShowCaption] = useState(false)

  return (
    <section id="shelley-shelldon">
      <h2>Meet Shelly & Shelldon</h2>
      <p>Our beloved pink-bellied side-neck turtles!</p>
      
      <div 
        className="responsive-image-container"
        onMouseEnter={() => setShowCaption(true)}
        onMouseLeave={() => setShowCaption(false)}
      >
        <img 
          src="/images/pages/shelley-shelldon-main.jpg"
          onError={(e) => { e.target.src = '/images/pages/placeholder.svg' }} 
          alt="Shelly and Shelldon" 
          className="responsive-image"
        />
        {showCaption && (
          <div className="image-caption">
            Our happy pink-bellied side-neck turtles
          </div>
        )}
      </div>

      <article>
        <h3>About Our Turtles</h3>
        <p>Shelly and Shelldon are pink-bellied side-neck turtles (Emydura subglobosa) who bring us endless joy. Here are some fun facts about them:</p>
        <ul>
          <li><strong>Age:</strong> 5 years old</li>
          <li><strong>Favorite Food:</strong> Shrimp and leafy greens</li>
          <li><strong>Personality:</strong> Shelly is curious and active, while Shelldon is more laid-back</li>
          <li><strong>Habitat:</strong> They have a 75-gallon tank with basking area</li>
          <li><strong>Fun Fact:</strong> They get their name from how they tuck their head sideways under their shell</li>
        </ul>
        
        <p>
          <a href="https://www.youtube.com/watch?v=search?q=pink+bellied+side+neck+turtle" target="_blank" rel="noopener noreferrer">Watch a video of pink-bellied side-neck turtles!</a>
          <br />
          <small>(Search YouTube for "pink-bellied side-neck turtle" to find educational videos)</small>
        </p>

        <div className="did-you-know">
          <h3>Did You Know?</h3>
          <p>Pink-bellied side-neck turtles are native to Australia and New Guinea. They're known for their bright pink plastrons (underside of shell) and friendly personalities!</p>
        </div>
      </article>
    </section>
  )
}
