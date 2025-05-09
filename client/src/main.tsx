import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add title and meta description for SEO
document.title = "Surprise Ideas Generator - AI-Powered Creative Ideas";
const metaDescription = document.createElement("meta");
metaDescription.name = "description";
metaDescription.content = "Generate creative and personalized surprise ideas for anyone with our AI-powered tool. Simply enter a prompt and get unique suggestions instantly.";
document.head.appendChild(metaDescription);

// Open Graph tags for better social sharing
const ogTitle = document.createElement("meta");
ogTitle.property = "og:title";
ogTitle.content = "Surprise Ideas Generator - AI-Powered Creative Ideas";
document.head.appendChild(ogTitle);

const ogDescription = document.createElement("meta");
ogDescription.property = "og:description";
ogDescription.content = "Generate creative and personalized surprise ideas for anyone with our AI-powered tool. Simply enter a prompt and get unique suggestions instantly.";
document.head.appendChild(ogDescription);

const ogType = document.createElement("meta");
ogType.property = "og:type";
ogType.content = "website";
document.head.appendChild(ogType);

createRoot(document.getElementById("root")!).render(<App />);
