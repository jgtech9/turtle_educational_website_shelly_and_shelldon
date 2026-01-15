import React from 'react'

    export default function Crafts() {
      return (
        <section id="crafts">
          <h2>Turtle Crafts</h2>
          <p>Get creative with these fun turtle-themed craft ideas!</p>
          
          <div className="craft-grid">
            <div className="craft-item">
              <img 
                src="/images/crafts/paper-plate-turtle.jpg" 
                alt="Paper Plate Turtle Craft" 
                onError={(e) => { e.target.src = '/images/crafts/placeholder.svg' }}
              />
              <h3>Paper Plate Turtle</h3>
              <p>Create a cute turtle using a paper plate, paint, and some construction paper.</p>
              <a href="https://www.pinterest.com/search/pins/?q=paper%20plate%20turtle%20craft" target="_blank" rel="noopener noreferrer">Find Instructions on Pinterest</a>
            </div>
            <div className="craft-item">
              <img 
                src="/images/crafts/handprint-turtle.jpg" 
                alt="Handprint Turtle Craft" 
                onError={(e) => { e.target.src = '/images/crafts/placeholder.svg' }}
              />
              <h3>Handprint Turtle</h3>
              <p>Make a memorable turtle using your handprint and some paint.</p>
              <a href="https://www.pinterest.com/search/pins/?q=handprint%20turtle%20craft" target="_blank" rel="noopener noreferrer">Find Instructions on Pinterest</a>
            </div>
            <div className="craft-item">
              <img 
                src="/images/crafts/origami-turtle.jpg" 
                alt="Origami Turtle Craft" 
                onError={(e) => { e.target.src = '/images/crafts/placeholder.svg' }}
              />
              <h3>Origami Turtle</h3>
              <p>Try your hand at folding an origami turtle with some colorful paper.</p>
              <a href="https://www.youtube.com/results?search_query=origami+turtle+tutorial" target="_blank" rel="noopener noreferrer">Find Tutorial on YouTube</a>
            </div>
          </div>
        </section>
      )
    }
