// Search content index for all pages
// This structure enables the search functionality across the site

export const searchContent = {
  home: {
    title: 'Welcome to Turtle World!',
    path: '/',
    content: 'Turtles are some of the most fascinating creatures on Earth. With over 300 species, they inhabit nearly every type of environment—from the deep blue oceans to the dry deserts. Turtles have varied diets depending on their species. Some are herbivores, while others are omnivores or carnivores. Turtles have fascinating reproductive behaviors. Female turtles lay eggs on land, often returning to the same nesting site.',
    headings: [
      { id: 'intro', text: 'Welcome to Turtle World!' },
      { id: 'habitats', text: 'Turtle Habitats' },
      { id: 'diets', text: 'Turtle Diets' },
      { id: 'reproduction', text: 'Turtle Reproduction' }
    ]
  },
  'shelley-shelldon': {
    title: 'Meet Shelly & Shelldon',
    path: '/shelley-shelldon',
    content: 'Our beloved pink-bellied side-neck turtles! Shelly and Shelldon are pink-bellied side-neck turtles (Emydura subglobosa) who bring us endless joy. They are 5 years old, love shrimp and leafy greens. Shelly is curious and active, while Shelldon is more laid-back. They have a 75-gallon tank with basking area. Pink-bellied side-neck turtles are native to Australia and New Guinea. They are known for their bright pink plastrons (underside of shell) and friendly personalities!',
    headings: [
      { id: 'shelley-shelldon', text: 'Meet Shelly & Shelldon' },
      { id: 'about', text: 'About Our Turtles' }
    ]
  },
  habitat: {
    title: 'Where Do Turtles Live?',
    path: '/habitat',
    content: 'Turtles can be found in almost every type of environment. Sea turtles live in warm and temperate oceans worldwide. Freshwater turtles live in ponds, lakes, and rivers. Land turtles prefer dry environments like deserts and grasslands.',
    headings: [
      { id: 'where', text: 'Where Do Turtles Live?' },
      { id: 'sea', text: 'Sea Turtle Habitats' },
      { id: 'freshwater', text: 'Freshwater Turtle Habitats' },
      { id: 'land', text: 'Land Turtle Habitats' }
    ]
  },
  diet: {
    title: 'Turtle Diets',
    path: '/diet',
    content: 'Turtles have varied diets depending on their species. Some are herbivores, while others are omnivores or carnivores. Turtles have diverse diets based on their species and habitat. Sea turtles often eat jellyfish and seaweed, while land turtles prefer plants and insects. Herbivores eat plants, fruits, and vegetables. Omnivores consume both plants and small animals. Carnivores feed on fish, insects, and other small creatures. A balanced diet is essential for a turtle\'s health and longevity.',
    headings: [
      { id: 'diet', text: 'Turtle Diets' },
      { id: 'what', text: 'What Do Turtles Eat?' },
      { id: 'diet-list', text: 'Diet Types' },
      { id: 'herbivores', text: 'Herbivores' },
      { id: 'omnivores', text: 'Omnivores' },
      { id: 'carnivores', text: 'Carnivores' }
    ]
  },
  reproduction: {
    title: 'Turtle Reproduction',
    path: '/reproduction',
    content: 'Turtles have fascinating reproductive behaviors. Female turtles lay eggs on land, often returning to the same nesting site. Turtles reproduce by laying eggs. After mating, female turtles dig nests in the sand or soil to lay their eggs. The eggs hatch after a few months, and the baby turtles make their way to the water. Females return to the same beach or area to lay eggs. Clutches can range from a few to over 100 eggs. Baby turtles face many predators as they journey to the water. Protecting nesting sites is crucial for the survival of turtle populations.',
    headings: [
      { id: 'reproduction', text: 'Turtle Reproduction' },
      { id: 'how', text: 'How Do Turtles Reproduce?' },
      { id: 'reproduction-list', text: 'Reproduction Process' },
      { id: 'nesting', text: 'Nesting' },
      { id: 'eggs', text: 'Eggs' },
      { id: 'hatchlings', text: 'Hatchlings' }
    ]
  },
  predators: {
    title: 'Turtle Predators',
    path: '/predators',
    content: 'Turtles face many predators throughout their lives. From eggs to adulthood, they must constantly be on guard. Turtles are vulnerable to predators at every stage of their life. Eggs and hatchlings are especially at risk. Predators include birds, raccoons, and larger fish. Raccoons, birds, and crabs often dig up turtle nests. Birds, fish, and other small animals prey on baby turtles. Larger animals like sharks and crocodiles hunt adult turtles. Understanding turtle predators helps us develop strategies to protect them.',
    headings: [
      { id: 'predators', text: 'Turtle Predators' },
      { id: 'who', text: 'Who Preys on Turtles?' },
      { id: 'predators-list', text: 'Predator Types' },
      { id: 'egg', text: 'Egg Predators' },
      { id: 'hatchling', text: 'Hatchling Predators' },
      { id: 'adult', text: 'Adult Predators' }
    ]
  },
  lifespan: {
    title: 'Turtle Lifespan',
    path: '/lifespan',
    content: 'Turtles are known for their long lifespans. Some species can live for over 100 years! Turtles are among the longest-living animals on Earth. Their lifespan varies by species and environment. Sea turtles can live up to 80 years or more. Some species, like the Galapagos tortoise, can live over 100 years. Freshwater turtles typically live 20-40 years in the wild. Proper care and protection can help turtles reach their full lifespan potential.',
    headings: [
      { id: 'lifespan', text: 'Turtle Lifespan' },
      { id: 'how-long', text: 'How Long Do Turtles Live?' },
      { id: 'lifespan-list', text: 'Lifespan by Type' },
      { id: 'sea-turtles', text: 'Sea Turtles' },
      { id: 'land-turtles', text: 'Land Turtles' },
      { id: 'freshwater-turtles', text: 'Freshwater Turtles' }
    ]
  },
  protections: {
    title: 'Turtle Protections',
    path: '/protections',
    content: 'Many turtle species are protected by conservation laws. These protections help ensure their survival. Turtles face many threats, including habitat loss and poaching. Conservation efforts aim to protect them. Many countries have laws protecting turtles and their habitats. Protected areas provide safe environments for turtles. Raising awareness helps reduce threats to turtles. Supporting conservation efforts is key to protecting turtles for future generations.',
    headings: [
      { id: 'protections', text: 'Turtle Protections' },
      { id: 'how-protected', text: 'How Are Turtles Protected?' },
      { id: 'protections-list', text: 'Protection Methods' },
      { id: 'laws', text: 'Laws' },
      { id: 'sanctuaries', text: 'Sanctuaries' },
      { id: 'education', text: 'Education' }
    ]
  },
  behavior: {
    title: 'Turtle Behavior',
    path: '/behavior',
    content: 'Turtles exhibit unique behaviors that help them survive in their environments. Turtles are known for their slow movements and long migrations. Turtles have fascinating behaviors that vary by species and habitat. Sea turtles travel thousands of miles to nesting sites. Many turtles sunbathe to regulate their body temperature. Some turtles hibernate during cold months. Understanding turtle behavior helps us appreciate their unique adaptations.',
    headings: [
      { id: 'behavior', text: 'Turtle Behavior' },
      { id: 'behaviors', text: 'What Are Some Turtle Behaviors?' }
    ]
  },
  anatomy: {
    title: 'Turtle Anatomy',
    path: '/anatomy',
    content: 'Turtles have a unique anatomy that sets them apart from other animals. Turtles are known for their shells, which are part of their skeleton. Their anatomy is adapted for their environment. The shell is made of bone and cartilage, providing protection. Limbs are adapted for swimming, walking, or digging. The beak is used for eating, with no teeth in most species. Turtle anatomy is a marvel of evolution, perfectly suited to their lifestyle.',
    headings: [
      { id: 'anatomy', text: 'Turtle Anatomy' },
      { id: 'unique', text: 'What Makes Turtles Unique?' }
    ]
  },
  species: {
    title: 'Turtle Species',
    path: '/species',
    content: 'There are over 300 species of turtles worldwide, each with unique characteristics. Turtles come in many shapes and sizes, from tiny box turtles to massive sea turtles. Sea turtles include the green sea turtle and leatherback. Freshwater turtles include the red-eared slider and painted turtle. Land turtles include the Galapagos tortoise and box turtle. Each species plays a vital role in its ecosystem.',
    headings: [
      { id: 'species', text: 'Turtle Species' },
      { id: 'species-list', text: 'What Are Some Turtle Species?' }
    ]
  },
  'physical-differences': {
    title: 'Physical Differences',
    path: '/physical-differences',
    content: 'Turtles vary in size, shape, and color depending on their species and habitat. Turtles have evolved unique physical traits to adapt to their environments. Size ranges from a few inches to over 6 feet in length. Shell shape varies from flat for swimming to domed for protection. Coloration helps with camouflage in their habitat. These differences make each turtle species uniquely suited to its environment.',
    headings: [
      { id: 'physical-differences', text: 'Physical Differences' },
      { id: 'differences', text: 'How Do Turtles Differ Physically?' }
    ]
  },
  'ecosystem-importance': {
    title: 'Ecosystem Importance',
    path: '/ecosystem-importance',
    content: 'Turtles play a crucial role in maintaining healthy ecosystems. Turtles contribute to their ecosystems in many ways, from controlling prey populations to maintaining habitats. Turtles help keep populations of jellyfish and other prey in check. Their movements help aerate soil and water. Turtles are an important part of the food chain. Protecting turtles ensures the health of their ecosystems.',
    headings: [
      { id: 'ecosystem-importance', text: 'Ecosystem Importance' },
      { id: 'importance', text: 'Why Are Turtles Important?' }
    ]
  },
  help: {
    title: 'How You Can Help Protect Turtles',
    path: '/help',
    content: 'Reduce plastic use to prevent ocean pollution. Support organizations that protect turtle habitats. Spread awareness about the importance of turtles. Support turtle conservation organizations including Sea Turtle Status, Turtle Conservancy, WWF Sea Turtle Conservation, Sea Turtle.org, Sea Turtle Conservancy, and Turtle Survival Alliance.',
    headings: [
      { id: 'help', text: 'How You Can Help Protect Turtles' },
      { id: 'organizations', text: 'Support Turtle Conservation Organizations:' }
    ]
  },
  media: {
    title: 'Turtle Media',
    path: '/media',
    content: 'Explore our collection of turtle-related media, including images and videos of turtles in their natural habitats.',
    headings: [
      { id: 'media', text: 'Turtle Media' }
    ]
  },
  crafts: {
    title: 'Turtle Crafts',
    path: '/crafts',
    content: 'Get creative with these fun turtle-themed craft ideas! Create a cute turtle using a paper plate, paint, and construction paper. Make a memorable turtle using your handprint and paint. Try your hand at folding an origami turtle with colorful paper.',
    headings: [
      { id: 'crafts', text: 'Turtle Crafts' }
    ]
  },
  contact: {
    title: 'Contact Us',
    path: '/contact',
    content: 'Have questions or suggestions? Reach out to us! We would love to hear from you.',
    headings: [
      { id: 'contact', text: 'Contact Us' }
    ]
  },
  club: {
    title: 'Turtle World Club',
    path: '/club',
    content: 'Join the Turtle World Club! Sign up to receive emails and notifications about good turtle news and updates.',
    headings: [
      { id: 'club', text: 'Join the Turtle World Club!' }
    ]
  }
}
