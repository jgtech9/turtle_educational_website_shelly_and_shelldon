import React, { useEffect } from 'react'
    import { useLocation } from 'react-router-dom'

    export default function Habitat() {
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
        <section id="habitat">
          <h2 id="where">Where Do Turtles Live?</h2>
          <p>Turtles can be found in almost every type of environment.</p>
          <div className="responsive-image-container">
            <img 
              src="/images/pages/habitat-main.jpg" 
              alt="Turtle habitats" 
              className="responsive-image"
              onError={(e) => { e.target.src = '/images/pages/placeholder.svg' }}
            />
          </div>
          <article>
            <h3 id="sea">Sea Turtle Habitats</h3>
            <p>Sea turtles live in warm and temperate oceans worldwide.</p>
            <h3 id="freshwater">Freshwater Turtle Habitats</h3>
            <p>Freshwater turtles live in ponds, lakes, and rivers.</p>
            <h3 id="land">Land Turtle Habitats</h3>
            <p>Land turtles prefer dry environments like deserts and grasslands.</p>
          </article>
        </section>
      )
    }
