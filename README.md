# Lake Web Agency

A modern, animated web agency website built with React for **Lekhan Karumbaiah K.T.** featuring full-stack development, SEO management, and content management services.

## Features

- 🎨 **Modern Design**: Black theme with cyan and bright color accents
- ✨ **Smooth Animations**: Powered by Framer Motion for engaging user experience
- 📱 **Responsive**: Fully responsive design for all devices
- 📧 **Booking System**: Integrated booking form with email validation
- 🚀 **Services Showcase**: 
  - Full Stack Website Development
  - Website Burning
  - SEO Management
  - Content Management
- 📱 **Social Integration**: Instagram link in footer
- 🎯 **SEO Optimized**: Proper meta tags and semantic HTML

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Email Configuration

The booking form uses EmailJS to send emails. To configure:

1. Sign up for a free account at [EmailJS](https://www.emailjs.com/)
2. Create an email service
3. Create an email template
4. Update the following in `src/components/Booking.js`:
   - Replace `YOUR_SERVICE_ID` with your EmailJS service ID
   - Replace `YOUR_TEMPLATE_ID` with your EmailJS template ID
   - Replace `YOUR_PUBLIC_KEY` with your EmailJS public key

## Customization

### Update Instagram Link

Edit `src/components/Footer.js` and replace the Instagram URL:
```jsx
href="https://instagram.com/your_instagram_handle"
```

### Update Contact Information

Edit contact details in `src/components/Footer.js`:
- Email
- Phone
- Address

### Color Scheme

Colors are defined in `src/index.css` using CSS variables:
- `--primary-black`: Main black background
- `--cyan`: Primary accent color
- `--bright-blue`: Secondary accent
- `--bright-purple`: Tertiary accent

## Project Structure

```
lick-laki-agency/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Hero.js
│   │   ├── Services.js
│   │   ├── Booking.js
│   │   └── Footer.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Technologies Used

- **React** - UI library
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **EmailJS** - Email service integration
- **CSS3** - Styling with custom animations

## License

© 2024 Lake Web Agency. All rights reserved.
Owner: Lekhan Karumbaiah K.T.









