# Personal Portfolio Website

A modern, responsive personal portfolio website built with Next.js, Tailwind CSS, and React. Features a clean design with light/dark mode toggle, smooth scrolling navigation, and fully responsive layout.

## 🚀 Features

- **Modern Design**: Clean, minimalist design inspired by contemporary web design trends
- **Responsive Layout**: Fully responsive across all device sizes
- **Dark/Light Mode**: Toggle between dark and light themes with smooth transitions
- **Smooth Scrolling**: Navigation with smooth scrolling to sections
- **Interactive Elements**: Hover effects, animations, and interactive components
- **Optimized Performance**: Next.js optimization with Image component and font optimization
- **SEO Friendly**: Meta tags and semantic HTML structure
- **Accessible**: ARIA labels and keyboard navigation support

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Fonts**: Inter (via next/font)
- **Theme**: next-themes for dark mode
- **Deployment**: Vercel (recommended)

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   cd personal-website
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎨 Customization

### Personal Information

Update the following files with your personal information:

1. **app/layout.js**: Update metadata (title, description, etc.)
2. **components/Header.js**: Update your name in the header
3. **components/Hero.js**: Update bio, social links, and profile picture
4. **components/Projects.js**: Add your actual projects
5. **components/About.js**: Update your background and skills
6. **components/Contact.js**: Update contact information
7. **components/Footer.js**: Update social links and copyright

### Profile Picture

Replace the placeholder image in `components/Hero.js` with your own profile picture. You can:

- Use a local image in the `public` folder
- Use an external image URL
- Use a service like Unsplash or your own hosted image

### Projects

Update the projects array in `components/Projects.js` with your actual projects:

```javascript
const projects = [
  {
    id: 1,
    title: "Your Project Title",
    description: "Project description...",
    image: "/path/to/project-image.jpg",
    technologies: ["React", "Node.js", "MongoDB"],
    liveUrl: "https://your-project.com",
    githubUrl: "https://github.com/yourusername/project",
    featured: true,
  },
  // Add more projects...
];
```

### Colors and Styling

Customize the color scheme in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    // Update primary colors
  },
  accent: {
    // Update accent colors
  }
}
```

### Contact Form

The contact form is currently static. To make it functional, you can:

- Use a service like Formspree, Netlify Forms, or Vercel Forms
- Add your own backend API endpoint
- Use a third-party service like EmailJS

## 📱 Sections

The website includes the following sections:

1. **Header**: Navigation with theme toggle and hire me button
2. **Hero**: Introduction with profile picture and social links
3. **Projects**: Showcase of your work with live demo and code links
4. **About**: Background, skills, and technologies
5. **Contact**: Contact information and form
6. **Footer**: Social links and copyright

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on each push

### Other Platforms

The website can be deployed on any platform that supports Next.js:

- Netlify
- Railway
- Digital Ocean
- AWS Amplify

## 📄 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

Feel free to fork this project and customize it for your own use. If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙋‍♂️ Support

If you have any questions or need help customizing the website, feel free to reach out or open an issue in the repository.

---

**Happy coding!** 🚀
