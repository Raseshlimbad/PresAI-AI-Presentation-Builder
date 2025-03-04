import { Home, LayoutTemplate, Settings, Trash } from "lucide-react";
import { Theme } from "./types";

export const data = {
    user: {
        name: 'Shadcn',
        email: 'shed@example.com',
        avatar: '/avatars/shadcn.png',
    },
    navItems: [
        {
            title: 'Home',
            url: '/dashboard',
            icon: Home
        },
        {
            title: 'Templates',
            url: '/templates',
            icon: LayoutTemplate
        },
        {
            title: 'Trash',
            url: '/trash',
            icon: Trash
        },
        {
            title: 'Settings',
            url: '/settings',
            icon: Settings
        },
    ]
}

export const containerVariants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        }
    }
}

export const itemVariants = {
    hidden: {y:20, opacity: 0},
    visible: {
        y:0,
        opacity: 1,
        transition: {
            type:'spring',
            stiffness: 100,
        }
    }
}

// export const themes: Theme[] = [
// {
//     name:"",
//     fontFamily: "",
//     fontColor: "",
//     backgroundColor: "",
//     slideBackgroundColor: "",
//     accentColor: "" ,
//     gradientBackground : "",
//     slideColor: "",
//     navbarColor: "",
//     type: 'dark',
// }
// ]

export const themes: Theme[] = [
    {
      name: "Midnight Blue",
      fontFamily: "Arial, sans-serif",
      fontColor: "#FFFFFF",
      backgroundColor: "#1B1F3B",
      slideBackgroundColor: "#2A2D4A",
      accentColor: "#4C5BCE",
      gradientBackground: "linear-gradient(135deg, #1B1F3B, #4C5BCE)",
      slideColor: "#2A2D4A",
      navbarColor: "#23284D",
      type: "dark",
    },
    {
      name: "Sunset Glow",
      fontFamily: "Poppins, sans-serif",
      fontColor: "#2D2D2D",
      backgroundColor: "#FFD166",
      slideBackgroundColor: "#FFA45B",
      accentColor: "#FF5733",
      gradientBackground: "linear-gradient(135deg, #FFD166, #FF5733)",
      slideColor: "#FFA45B",
      navbarColor: "#E67E22",
      type: "light",
    },
    {
      name: "Emerald Dream",
      fontFamily: "Roboto, sans-serif",
      fontColor: "#FFFFFF",
      backgroundColor: "#004D40",
      slideBackgroundColor: "#00796B",
      accentColor: "#26A69A",
      gradientBackground: "linear-gradient(135deg, #004D40, #26A69A)",
      slideColor: "#00796B",
      navbarColor: "#004D40",
      type: "dark",
    },
    {
      name: "Cherry Blossom",
      fontFamily: "Georgia, serif",
      fontColor: "#3D3D3D",
      backgroundColor: "#FFC1E3",
      slideBackgroundColor: "#FF9EBB",
      accentColor: "#FF6F91",
      gradientBackground: "linear-gradient(135deg, #FFC1E3, #FF6F91)",
      slideColor: "#FF9EBB",
      navbarColor: "#FF6F91",
      type: "light",
    },
    {
      name: "Cyber Neon",
      fontFamily: "Courier New, monospace",
      fontColor: "#0FF0FC",
      backgroundColor: "#050505",
      slideBackgroundColor: "#101010",
      accentColor: "#00F5D4",
      gradientBackground: "linear-gradient(135deg, #050505, #00F5D4)",
      slideColor: "#101010",
      navbarColor: "#080808",
      type: "dark",
    },
    {
      name: "Forest Mist",
      fontFamily: "Lora, serif",
      fontColor: "#2E2E2E",
      backgroundColor: "#D4E157",
      slideBackgroundColor: "#A5D6A7",
      accentColor: "#43A047",
      gradientBackground: "linear-gradient(135deg, #D4E157, #43A047)",
      slideColor: "#A5D6A7",
      navbarColor: "#7CB342",
      type: "light",
    },
    {
      name: "Dark Mode Pro",
      fontFamily: "Montserrat, sans-serif",
      fontColor: "#F5F5F5",
      backgroundColor: "#121212",
      slideBackgroundColor: "#1E1E1E",
      accentColor: "#BB86FC",
      gradientBackground: "linear-gradient(135deg, #121212, #BB86FC)",
      slideColor: "#1E1E1E",
      navbarColor: "#1A1A1A",
      type: "dark",
    },
    {
      name: "Ocean Breeze",
      fontFamily: "Open Sans, sans-serif",
      fontColor: "#025E73",
      backgroundColor: "#B2EBF2",
      slideBackgroundColor: "#80DEEA",
      accentColor: "#0288D1",
      gradientBackground: "linear-gradient(135deg, #B2EBF2, #0288D1)",
      slideColor: "#80DEEA",
      navbarColor: "#0097A7",
      type: "light",
    },
    {
      name: "Royal Gold",
      fontFamily: "Playfair Display, serif",
      fontColor: "#D4AF37",
      backgroundColor: "#1A1A1A",
      slideBackgroundColor: "#333333",
      accentColor: "#FFD700",
      gradientBackground: "linear-gradient(135deg, #1A1A1A, #FFD700)",
      slideColor: "#333333",
      navbarColor: "#2C2C2C",
      type: "dark",
    },
    {
      name: "Lavender Fields",
      fontFamily: "Nunito, sans-serif",
      fontColor: "#5D4157",
      backgroundColor: "#E6E6FA",
      slideBackgroundColor: "#D8BFD8",
      accentColor: "#8A2BE2",
      gradientBackground: "linear-gradient(135deg, #E6E6FA, #8A2BE2)",
      slideColor: "#D8BFD8",
      navbarColor: "#9370DB",
      type: "light",
    },
  ];
  
   
export const CreatePageCard = [
    {
      title: 'Use a',
      highlightedText: 'Template',
      description: 'Write a prompt and leave everything else for us to handle',
      type: 'template',
    },
    {
      title: 'Generate with',
      highlightedText: 'Creative AI',
      description: 'Write a prompt and leave everything else for us to handle',
      type: 'creative-ai',
      highlight: true,
    },
    {
      title: 'Start from',
      highlightedText: 'Scratch',
      description: 'Write a prompt and leave everything else for us to handle',
      type: 'create-scratch',
    },
  ];
  