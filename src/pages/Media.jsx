import React from 'react'

    export default function Media() {
      return (
        <section id="media">
          <h2>Turtle Media</h2>
          <p>Explore our collection of turtle-related media, including images and videos.</p>
          
          <div className="media-grid">
            <div className="media-item">
              <img 
                src="/images/media/sea-turtle-1.jpg" 
                alt="Sea turtle swimming" 
                onError={(e) => { e.target.src = '/images/media/placeholder.svg' }}
              />
              <p>Sea Turtle Swimming</p>
            </div>
            <div className="media-item">
              <img 
                src="/images/media/painted-turtle-1.jpg" 
                alt="Painted turtle" 
                onError={(e) => { e.target.src = '/images/media/placeholder.svg' }}
              />
              <p>Colorful Painted Turtle</p>
            </div>
            <div className="media-item">
              <img 
                src="/images/media/nesting-beach-1.jpg" 
                alt="Turtle nesting beach" 
                onError={(e) => { e.target.src = '/images/media/placeholder.svg' }}
              />
              <p>Turtle Nesting Beach</p>
            </div>
            <div className="media-item">
              <iframe 
                width="300" 
                height="200" 
                src="https://www.youtube.com/embed/9Rq-h8s1yR0" 
                title="Sea Turtle Life Cycle - Educational Video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
              <p>Sea Turtle Life Cycle</p>
            </div>
            <div className="media-item">
              <iframe 
                width="300" 
                height="200" 
                src="https://www.youtube.com/embed/oqRioplPx_g" 
                title="Turtle Habitats and Adaptations" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
              <p>Turtle Habitats</p>
            </div>
          </div>
        </section>
      )
    }
