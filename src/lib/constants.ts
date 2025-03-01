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

export const themes: Theme[] = [
{
    name:"",
    fontFamily: "",
    fontColor: "",
    backgroundColor: "",
    slideBackgroundColor: "",
    accentColor: "" ,
    gradientBackground : "",
    slideColor: "",
    navbarColor: "",
    type: 'dark',
}
]
   
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
  