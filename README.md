# Turtle World - Educational Website

An educational React-based website dedicated to teaching about turtles, their habitats, behaviors, and conservation efforts.

## Project Overview

Turtle World is a single-page application (SPA) built with React and Vite, featuring comprehensive educational content about turtles. The site includes 17 informative pages covering various aspects of turtle biology, ecology, and conservation, along with interactive features like a dark mode, search functionality, and community engagement tools.

## Technologies Used

- **React 18.2.0** - UI library
- **React Router DOM 7.1.3** - Client-side routing
- **Vite 4.5.7** - Build tool and development server
- **CSS3** - Styling with CSS variables and animations
- **Google Fonts** - Fredoka One (headings) and Comic Neue (body text)

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone or download the project
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port Vite assigns).

### Building for Production

Create an optimized production build:
```bash
npm run build
```

The build output will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## Project Structure

```
turtle_educational_website/
├── index.html                 # Entry HTML file (Vite root)
├── package.json              # Dependencies and scripts
├── vercel.json               # Vercel configuration for React Router
├── api/                      # Vercel serverless functions
│   ├── send-feedback.js     # Feedback form API with rate limiting
│   └── send-feedback-redis.js  # Redis-based rate limiting (optional)
├── public/
│   └── turtle.jpg            # Static assets
├── src/
│   ├── main.jsx              # Application entry point
│   ├── App.jsx               # Main app component with routing
│   ├── App.css               # Main application styles
│   ├── index.css             # Global styles
│   ├── data/
│   │   └── searchContent.js  # Search index data
│   ├── components/
│   │   ├── DidYouKnow.jsx    # Random turtle facts component
│   │   ├── FeedbackForm.jsx  # Contact form component (with email)
│   │   └── AmazonAd.jsx      # Amazon Native Shopping Ads component
│   └── pages/
│       ├── Home.jsx          # Landing page
│       ├── Habitat.jsx       # Turtle habitats
│       ├── Diet.jsx          # Turtle diets
│       ├── Reproduction.jsx  # Reproduction information
│       ├── Predators.jsx     # Natural predators
│       ├── Lifespan.jsx      # Turtle lifespans
│       ├── Protections.jsx   # Conservation protections
│       ├── Behavior.jsx      # Turtle behaviors
│       ├── Anatomy.jsx       # Physical anatomy
│       ├── Species.jsx       # Different species
│       ├── PhysicalDifferences.jsx
│       ├── EcosystemImportance.jsx
│       ├── Help.jsx          # How to help turtles
│       ├── Media.jsx         # Media gallery
│       ├── Crafts.jsx        # Educational crafts
│       ├── Contact.jsx       # Contact page
│       ├── Club.jsx          # Turtle World Club signup
│       └── ShelleyShelldon.jsx  # Featured turtles
├── aws-deploy.sh             # AWS deployment script (Linux/Mac)
├── aws-deploy.ps1            # AWS deployment script (Windows)
├── vite.config.js            # Vite build configuration
├── deploy-aws.md             # AWS deployment guide
├── FEEDBACK_FORM_SETUP.md    # Feedback form email setup guide
├── RATE_LIMITING_SETUP.md    # Rate limiting configuration guide
├── AMAZON_ADS_SETUP.md       # Amazon ads integration guide
├── README.md                 # This file
└── ANALYSIS.md               # Project analysis and recommendations
```

## Features

### Navigation
- **Header Navigation** - Dropdown menu with all page categories
- **Search Functionality** - Search across page content (fully functional)
- **Dark Mode Toggle** - Switch between light and dark themes
- **Responsive Design** - Works on various screen sizes

### Pages
- 17 educational pages covering comprehensive turtle information
- Interactive components (DidYouKnow, FeedbackForm)
- Media gallery with images and videos
- Craft ideas for educational activities

### Interactive Features
- **Turtle World Club** - Signup form using localStorage
- **Feedback Form** - Fully functional contact form with email delivery via Resend API
- **Rate Limiting** - Built-in protection against form abuse (3 submissions/hour per IP)
- **Dark Mode** - Persistent theme toggle
- **Random Facts** - Interactive "Did You Know?" component
- **Amazon Ads** - Ready for Amazon Native Shopping Ads integration

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Responsive design supports mobile devices

## Deployment

### AWS Deployment

This project is configured for deployment to AWS using S3 and CloudFront. See [deploy-aws.md](deploy-aws.md) for detailed deployment instructions.

**Quick Deploy:**
1. Configure your AWS credentials: `aws configure`
2. Update deployment scripts with your bucket name and CloudFront distribution ID
3. Run the deployment script:
   - **Linux/Mac**: `./aws-deploy.sh`
   - **Windows**: `.\aws-deploy.ps1`

**Deployment Files:**
- `aws-deploy.sh` - Deployment script for Linux/Mac
- `aws-deploy.ps1` - Deployment script for Windows
- `vite.config.js` - Build configuration
- `deploy-aws.md` - Complete deployment guide

### Vercel Deployment (Recommended)

This project is configured for deployment to Vercel with:
- ✅ React Router support (`vercel.json`)
- ✅ Serverless API functions for feedback form
- ✅ Email functionality via Resend
- ✅ Rate limiting protection

**Quick Deploy to Vercel:**

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Configure environment variables (see [FEEDBACK_FORM_SETUP.md](FEEDBACK_FORM_SETUP.md)):
   - `RESEND_API_KEY` - Your Resend API key
   - `FEEDBACK_EMAIL` - Your Gmail address
   - `EMAIL_FROM_DOMAIN` - Your domain (optional)
   - `RATE_LIMIT_MAX` - Max submissions per window (optional, default: 3)
   - `RATE_LIMIT_WINDOW` - Time window in seconds (optional, default: 3600)
4. Deploy!

**Setup Guides:**
- [FEEDBACK_FORM_SETUP.md](FEEDBACK_FORM_SETUP.md) - Email configuration
- [RATE_LIMITING_SETUP.md](RATE_LIMITING_SETUP.md) - Rate limiting setup
- [AMAZON_ADS_SETUP.md](AMAZON_ADS_SETUP.md) - Amazon ads integration

### Other Deployment Options

The built application in the `dist/` folder can be deployed to any static hosting service:
- Netlify
- GitHub Pages
- Any web server capable of serving static files

**Note:** For feedback form email functionality, you'll need serverless functions (Vercel, Netlify Functions, or AWS Lambda).

## Notes

- ✅ Search functionality is fully implemented and functional
- ✅ Feedback form sends emails via Resend API (see [FEEDBACK_FORM_SETUP.md](FEEDBACK_FORM_SETUP.md))
- ✅ Rate limiting protects against form abuse (3 submissions/hour per IP)
- ✅ Vercel deployment configured with React Router support
- ⚠️ Club signup uses localStorage (client-side only)
- ⚠️ Images and ads use placeholder URLs - replace with actual content
- See [ANALYSIS.md](ANALYSIS.md) for detailed feedback and recommendations

## License

This project appears to be an educational project. Check with the project owner for licensing details.
