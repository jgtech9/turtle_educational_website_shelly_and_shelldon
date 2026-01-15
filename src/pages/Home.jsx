import React, { useEffect } from 'react'
    import { useLocation } from 'react-router-dom'
    import DidYouKnow from '../components/DidYouKnow'

    export default function Home() {
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
        <section id="intro">
          <h2 id="intro">Welcome to Shelly & Shelldon's World of Turtles!</h2>
          <article>
            <h3 id="habitats">Turtle Habitats</h3>
            <p>
              Turtles are some of the most fascinating creatures on Earth. With over 300 species, they inhabit nearly every type of environment—from the deep blue oceans to the dry deserts.
            </p>
            <h3 id="diets">Turtle Diets</h3>
            <p>
              Turtles have varied diets depending on their species. Some are herbivores, while others are omnivores or carnivores.
            </p>
            <h3 id="reproduction">Turtle Reproduction</h3>
            <p>
              Turtles have fascinating reproductive behaviors. Female turtles lay eggs on land, often returning to the same nesting site.
            </p>
          </article>
          <DidYouKnow />
        </section>
      )
    }
