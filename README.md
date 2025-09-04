


# Socio View

## Overview

[Socio View](https://socio-view.vercel.app) is a cutting-edge **social media analytics tool** designed to help users gain actionable insights into their social media performance. With an integrated **AI chatbot**, Socio View provides instant recommendations and analysis, making it an essential tool for content creators, marketers, and businesses. (This project was built for FindCoder X AWS hackathon, Mumbai)

## Features

- **Social Media Analytics**: Detailed analysis of your social media data, including engagement rates, content performance, and trends.
- **AI Chatbot**: Ask questions like "What should I upload to get more engagement?" or "Tell me what to upload," and get instant, data-driven answers.
- **Dynamic Visualizations**: Includes charts, graphs, and comparisons for a clear understanding of your metrics.
- **Interactive Interface**: Intuitive and responsive design for seamless navigation.
- **Live Website**: Explore the tool at [Socio View](https://socio-view.vercel.app).

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and configure it based on the `.env.example` file.

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to the URL displayed in the terminal (usually `http://localhost:5173`).

## Build for Production

To create a production build:

```bash
npm run build
```

The optimized files will be generated in the `dist` folder.

## Project Structure

- **`src/`**: Contains all the source code, including components, pages, and assets.
- **`public/`**: Static files such as images and fonts.
- **`tailwind.config.js`**: Configuration file for Tailwind CSS.
- **`vite.config.js`**: Configuration file for Vite.
- **`.env`**: Environment variables.

## Technologies Used

- **React**: Component-based library for building user interfaces.
- **Vite**: Fast and modern build tool for web projects.
- **Tailwind CSS**: Utility-first framework for efficient styling.
- **AI Integration**: Powered by advanced AI for chatbot functionalities.
- **PostCSS**: For advanced CSS processing.
- **ESLint**: For maintaining code quality.

## Deployment

Socio View is already deployed on **Vercel** and accessible at [Socio View](https://socio-view.vercel.app). 

To deploy your own version:

1. Build the production version:
   ```bash
   npm run build
   ```

2. Deploy the contents of the `dist` folder to your hosting platform.

## Contributing

1. Fork the repository.
2. Create a new branch (`feature/new-feature`).
3. Make your changes.
4. Commit your changes (`git commit -m "Add new feature"`).
5. Push to the branch (`git push origin feature/new-feature`).
6. Open a Pull Request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---
