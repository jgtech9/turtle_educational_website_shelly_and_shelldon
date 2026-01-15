import React, { useState } from 'react'

const DidYouKnow = () => {
  const turtleFacts = [
    "Turtles have been around for over 200 million years!",
    "Some turtles can hold their breath for up to 5 hours.",
    "Sea turtles can travel thousands of miles during migration.",
    "The largest turtle is the leatherback, which can weigh over 2,000 pounds!",
    "Turtles don't have teeth—they use their beaks to eat.",
    "A group of turtles is called a 'bale' or a 'dule.'",
    "Turtles can live for over 100 years.",
    "Some turtles can hibernate underwater for months.",
    "Turtles are cold-blooded and rely on their environment to regulate their body temperature.",
    "The gender of baby turtles is determined by the temperature of the sand where the eggs are laid.",
    "Turtles have excellent night vision due to a high number of rod cells in their eyes.",
    "Some turtle species can produce sounds to communicate with each other.",
    "The shell of a turtle is made up of over 50 bones fused together.",
    "Turtles can recognize their owners and may even come when called.",
    "Some turtles can swim at speeds up to 22 mph (35 km/h).",
    "Turtles have a special gland that helps them remove excess salt from their bodies.",
    "The oldest known turtle lived to be 188 years old.",
    "Turtles can see in color and have good underwater vision.",
    "Some turtles can survive for months without food or water.",
    "Turtles have a strong sense of smell, which helps them find food.",
    "The smallest turtle species is the speckled padloper tortoise, measuring just 3-4 inches.",
    "Turtles can feel touch through their shells.",
    "Some turtles can change their shell color to blend with their environment.",
    "Turtles have been to space! Two tortoises orbited the moon in 1968.",
    "The green sea turtle gets its name from the green color of its fat, not its shell.",
    "Turtles can retract their heads in three different ways depending on the species.",
    "Some turtles can produce a foul-smelling liquid to deter predators.",
    "Turtles have been found to have excellent memory and navigation skills.",
    "The temperature of a turtle's nest determines the sex of the hatchlings.",
    "Some turtles can absorb oxygen through their skin while hibernating underwater."
  ]

  const [currentFact, setCurrentFact] = useState(turtleFacts[0])

  const getRandomFact = () => {
    const randomIndex = Math.floor(Math.random() * turtleFacts.length)
    setCurrentFact(turtleFacts[randomIndex])
  }

  return (
    <div className="did-you-know">
      <h3>Did You Know?</h3>
      <p>{currentFact}</p>
      <button onClick={getRandomFact} className="fact-button">
        Show Another Fact
      </button>
    </div>
  )
}

export default DidYouKnow
