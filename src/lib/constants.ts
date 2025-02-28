import { Home, LayoutTemplate, Settings, Trash } from "lucide-react";

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

export const containerVarients = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        }
    }
}