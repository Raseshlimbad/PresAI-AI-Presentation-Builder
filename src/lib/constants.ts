import { Home, LayoutTemplate, Settings, Trash } from "lucide-react";
import {
  Category,
  ComponentGroup,
  LayoutGroup,
  Template,
  Theme,
} from "./types";
import {
  BlankCard,
  AccentLeft,
  AccentRight,
  ImageAndText,
  TextAndImage,
  TwoColumns,
  ThreeColumns,
  TwoColumnsWithHeadings,
  ThreeColumnsWithHeadings,
  FourColumns,
  TwoImageColumns,
  FourImageColumns,
  ThreeImageColumns,
} from "@/lib/slideLayouts";
import {
  BlankCardIcon,
  FourColumnsIcon,
  FourImageColumnsIcon,
  ImageAndTextIcon,
  TextAndImageIcon,
  ThreeColumnsIcon,
  ThreeColumnsWithHeadingsIcon,
  ThreeImageColumnsIcon,
  TwoColumnsIcon,
  TwoColumnsWithHeadingsIcon,
  TwoImageColumnsIcon,
} from "./IconsComponent";
import {
  BulletListComponent,
  CalloutBoxComponent,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  NumberedListComponent,
  Paragraph,
  ResizableColumn,
  Table,
  Title,
  TodoListComponent,
} from "./slideCompoennts";
import { v4 as uuidv4 } from "uuid";

// Data for the dashboard
export const data = {
  user: {
    name: "Shadcn",
    email: "shed@example.com",
    avatar: "/avatars/shadcn.png",
  },
  navItems: [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Templates",
      url: "/templates",
      icon: LayoutTemplate,
    },
    {
      title: "Trash",
      url: "/trash",
      icon: Trash,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
};

// Container Variants
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Item Variants
export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

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

// Themes data 2
// export const themes: Theme[] = [
//   {
//     name: "Celestial Night",
//     fontFamily: "Merriweather, serif",
//     fontColor: "#E0E0E0",
//     backgroundColor: "#0D1B2A",
//     slideBackgroundColor: "#1B263B",
//     accentColor: "#415A77",
//     gradientBackground: "linear-gradient(135deg, #0D1B2A, #415A77)",
//     slideColor: "#1B263B",
//     navbarColor: "#0F1626",
//     type: "dark",
//   },
//   {
//     name: "Autumn Harvest",
//     fontFamily: "Lora, serif",
//     fontColor: "#5A3222",
//     backgroundColor: "#FFEDD5",
//     slideBackgroundColor: "#F4A261",
//     accentColor: "#E76F51",
//     gradientBackground: "linear-gradient(135deg, #FFEDD5, #E76F51)",
//     slideColor: "#F4A261",
//     navbarColor: "#E07A5F",
//     type: "light",
//   },
//   // {
//   //   name: "Electric Purple",
//   //   fontFamily: "Oswald, sans-serif",
//   //   fontColor: "#F8F8F8",
//   //   backgroundColor: "#3B0086",
//   //   slideBackgroundColor: "#5D00B6",
//   //   accentColor: "#9900FF",
//   //   gradientBackground: "linear-gradient(135deg, #3B0086, #9900FF)",
//   //   slideColor: "#5D00B6",
//   //   navbarColor: "#28004D",
//   //   type: "dark",
//   // },
//   {
//     name: "Serene Pastel",
//     fontFamily: "Quicksand, sans-serif",
//     fontColor: "#3A3A3A",
//     backgroundColor: "#FFFAF0",
//     slideBackgroundColor: "#FFE4E1",
//     accentColor: "#FFB6C1",
//     gradientBackground: "linear-gradient(135deg, #FFFAF0, #FFB6C1)",
//     slideColor: "#FFE4E1",
//     navbarColor: "#FFC0CB",
//     type: "light",
//   },
//   {
//     name: "Stormy Sky",
//     fontFamily: "Raleway, sans-serif",
//     fontColor: "#D3D3D3",
//     backgroundColor: "#1E1E24",
//     slideBackgroundColor: "#2C2C34",
//     accentColor: "#4A4E69",
//     gradientBackground: "linear-gradient(135deg, #1E1E24, #4A4E69)",
//     slideColor: "#2C2C34",
//     navbarColor: "#3C3F58",
//     type: "dark",
//   },
//   {
//     name: "Golden Sand",
//     fontFamily: "Playfair Display, serif",
//     fontColor: "#5B3E31",
//     backgroundColor: "#F5DEB3",
//     slideBackgroundColor: "#E3B778",
//     accentColor: "#D89B5E",
//     gradientBackground: "linear-gradient(135deg, #F5DEB3, #D89B5E)",
//     slideColor: "#E3B778",
//     navbarColor: "#C68E55",
//     type: "light",
//   },
//   // {
//   //   name: "Crimson Velvet",
//   //   fontFamily: "Poppins, sans-serif",
//   //   fontColor: "#F5F5F5",
//   //   backgroundColor: "#7D0A0A",
//   //   slideBackgroundColor: "#9A1818",
//   //   accentColor: "#D72638",
//   //   gradientBackground: "linear-gradient(135deg, #7D0A0A, #D72638)",
//   //   slideColor: "#9A1818",
//   //   navbarColor: "#5A0808",
//   //   type: "dark",
//   // },
//   {
//     name: "Arctic Ice",
//     fontFamily: "Roboto, sans-serif",
//     fontColor: "#00334E",
//     backgroundColor: "#E0F7FA",
//     slideBackgroundColor: "#B3E5FC",
//     accentColor: "#03A9F4",
//     gradientBackground: "linear-gradient(135deg, #E0F7FA, #03A9F4)",
//     slideColor: "#B3E5FC",
//     navbarColor: "#0288D1",
//     type: "light",
//   },
//   {
//     name: "Neon Matrix",
//     fontFamily: "Source Code Pro, monospace",
//     fontColor: "#00FF41",
//     backgroundColor: "#000000",
//     slideBackgroundColor: "#1A1A1A",
//     accentColor: "#33FF66",
//     gradientBackground: "linear-gradient(135deg, #000000, #33FF66)",
//     slideColor: "#1A1A1A",
//     navbarColor: "#0D0D0D",
//     type: "dark",
//   },
//   {
//     name: "Sakura Petal",
//     fontFamily: "Cormorant Garamond, serif",
//     fontColor: "#8B5A2B",
//     backgroundColor: "#FCE4EC",
//     slideBackgroundColor: "#F8BBD0",
//     accentColor: "#EC407A",
//     gradientBackground: "linear-gradient(135deg, #FCE4EC, #EC407A)",
//     slideColor: "#F8BBD0",
//     navbarColor: "#D81B60",
//     type: "light",
//   },
//   {
//     name: "Futuristic Cyan",
//     fontFamily: "Exo, sans-serif",
//     fontColor: "#FFFFFF",
//     backgroundColor: "#012E40",
//     slideBackgroundColor: "#025E73",
//     accentColor: "#00CED1",
//     gradientBackground: "linear-gradient(135deg, #012E40, #00CED1)",
//     slideColor: "#025E73",
//     navbarColor: "#013A4A",
//     type: "dark",
//   },
//   {
//     name: "Desert Mirage",
//     fontFamily: "Lato, sans-serif",
//     fontColor: "#784F32",
//     backgroundColor: "#F5E1A4",
//     slideBackgroundColor: "#E4C580",
//     accentColor: "#D4A373",
//     gradientBackground: "linear-gradient(135deg, #F5E1A4, #D4A373)",
//     slideColor: "#E4C580",
//     navbarColor: "#C19A6B",
//     type: "light",
//   },
//   {
//     name: "Midnight Teal",
//     fontFamily: "Bebas Neue, sans-serif",
//     fontColor: "#E8E8E8",
//     backgroundColor: "#002F2F",
//     slideBackgroundColor: "#004D4D",
//     accentColor: "#26C6DA",
//     gradientBackground: "linear-gradient(135deg, #002F2F, #26C6DA)",
//     slideColor: "#004D4D",
//     navbarColor: "#003838",
//     type: "dark",
//   },
//   {
//     name: "Citrus Punch",
//     fontFamily: "Ubuntu, sans-serif",
//     fontColor: "#5A3E21",
//     backgroundColor: "#FFF176",
//     slideBackgroundColor: "#FFCC80",
//     accentColor: "#FF9800",
//     gradientBackground: "linear-gradient(135deg, #FFF176, #FF9800)",
//     slideColor: "#FFCC80",
//     navbarColor: "#F57C00",
//     type: "light",
//   },
//   {
//     name: "Obsidian Shadow",
//     fontFamily: "Inter, sans-serif",
//     fontColor: "#FFFFFF",
//     backgroundColor: "#111111",
//     slideBackgroundColor: "#222222",
//     accentColor: "#757575",
//     gradientBackground: "linear-gradient(135deg, #111111, #757575)",
//     slideColor: "#222222",
//     navbarColor: "#1A1A1A",
//     type: "dark",
//   },
//   {
//     name: "Velvet Rose",
//     fontFamily: "Dancing Script, cursive",
//     fontColor: "#5D1E1E",
//     backgroundColor: "#FFDFDF",
//     slideBackgroundColor: "#FFB3B3",
//     accentColor: "#E57373",
//     gradientBackground: "linear-gradient(135deg, #FFDFDF, #E57373)",
//     slideColor: "#FFB3B3",
//     navbarColor: "#D32F2F",
//     type: "light",
//   },
//   {
//     name: "Peach Bloom",
//     fontFamily: "Merriweather, serif",
//     fontColor: "#5A3E36",
//     backgroundColor: "#FFE5D9",
//     slideBackgroundColor: "#FFCAB1",
//     accentColor: "#FF8A65",
//     gradientBackground: "linear-gradient(135deg, #FFE5D9, #FF8A65)",
//     slideColor: "#FFCAB1",
//     navbarColor: "#E57373",
//     type: "light",
//   },
//   {
//     name: "Misty Lavender",
//     fontFamily: "Lora, serif",
//     fontColor: "#4A3753",
//     backgroundColor: "#E6E6FA",
//     slideBackgroundColor: "#D8BFD8",
//     accentColor: "#A370B5",
//     gradientBackground: "linear-gradient(135deg, #E6E6FA, #A370B5)",
//     slideColor: "#D8BFD8",
//     navbarColor: "#9370DB",
//     type: "light",
//   },
//   {
//     name: "Muted Ocean",
//     fontFamily: "Poppins, sans-serif",
//     fontColor: "#2C4A52",
//     backgroundColor: "#BFD8D2",
//     slideBackgroundColor: "#9DB4C0",
//     accentColor: "#6B9080",
//     gradientBackground: "linear-gradient(135deg, #BFD8D2, #6B9080)",
//     slideColor: "#9DB4C0",
//     navbarColor: "#52796F",
//     type: "light",
//   },
//   {
//     name: "Vintage Rose",
//     fontFamily: "Playfair Display, serif",
//     fontColor: "#5A2E2E",
//     backgroundColor: "#F4D3D3",
//     slideBackgroundColor: "#E8A9A9",
//     accentColor: "#C08497",
//     gradientBackground: "linear-gradient(135deg, #F4D3D3, #C08497)",
//     slideColor: "#E8A9A9",
//     navbarColor: "#A56A6A",
//     type: "light",
//   },
//   {
//     name: "Deep Plum",
//     fontFamily: "Raleway, sans-serif",
//     fontColor: "#E0E0E0",
//     backgroundColor: "#3A0B42",
//     slideBackgroundColor: "#55286F",
//     accentColor: "#764BA2",
//     gradientBackground: "linear-gradient(135deg, #3A0B42, #764BA2)",
//     slideColor: "#55286F",
//     navbarColor: "#2C0D44",
//     type: "dark",
//   },
//   {
//     name: "Obsidian Night",
//     fontFamily: "Montserrat, sans-serif",
//     fontColor: "#E0E0E0",
//     backgroundColor: "#121212",
//     slideBackgroundColor: "#1A1A1A",
//     accentColor: "#FF4500",
//     gradientBackground: "linear-gradient(135deg, #121212, #FF4500)",
//     slideColor: "#1A1A1A",
//     navbarColor: "#191919",
//     type: "dark",
//   },
//   {
//     name: "Shadow Emerald",
//     fontFamily: "Poppins, sans-serif",
//     fontColor: "#C8E6C9",
//     backgroundColor: "#102820",
//     slideBackgroundColor: "#1B3A30",
//     accentColor: "#4CAF50",
//     gradientBackground: "linear-gradient(135deg, #102820, #4CAF50)",
//     slideColor: "#1B3A30",
//     navbarColor: "#0F261D",
//     type: "dark",
//   },
//   {
//     name: "Cosmic Purple",
//     fontFamily: "Raleway, sans-serif",
//     fontColor: "#E0C3FC",
//     backgroundColor: "#2A0845",
//     slideBackgroundColor: "#3B0973",
//     accentColor: "#BB86FC",
//     gradientBackground: "linear-gradient(135deg, #2A0845, #BB86FC)",
//     slideColor: "#3B0973",
//     navbarColor: "#25073A",
//     type: "dark",
//   },
//   {
//     name: "Steel Noir",
//     fontFamily: "Roboto, sans-serif",
//     fontColor: "#D1D1D1",
//     backgroundColor: "#1C1C1C",
//     slideBackgroundColor: "#2B2B2B",
//     accentColor: "#FF6F61",
//     gradientBackground: "linear-gradient(135deg, #1C1C1C, #FF6F61)",
//     slideColor: "#2B2B2B",
//     navbarColor: "#232323",
//     type: "dark",
//   },
//   {
//     name: "Nebula Blue",
//     fontFamily: "Lato, sans-serif",
//     fontColor: "#A7C7E7",
//     backgroundColor: "#040D21",
//     slideBackgroundColor: "#102A43",
//     accentColor: "#1E90FF",
//     gradientBackground: "linear-gradient(135deg, #040D21, #1E90FF)",
//     slideColor: "#102A43",
//     navbarColor: "#081A31",
//     type: "dark",
//   },
//   {
//     name: "Minimal Mono",
//     fontFamily: "Inter, sans-serif",
//     fontColor: "#222222", // Dark gray for readability
//     backgroundColor: "#F5F5F5", // Soft white for a clean look
//     slideBackgroundColor: "#EAEAEA", // Slightly darker gray for subtle contrast
//     accentColor: "#000000", // Pure black for sharp highlights
//     gradientBackground: "linear-gradient(135deg, #F5F5F5, #EAEAEA)", // Soft gradient for smoothness
//     slideColor: "#EAEAEA",
//     navbarColor: "#DCDCDC", // Light gray for a cohesive appearance
//     type: "light",
//   },
// ];

// Create Page Card
export const CreatePageCard = [
  {
    title: "Use a",
    highlightedText: "Template",
    description: "Write a prompt and leave everything else for us to handle",
    type: "template",
  },
  {
    title: "Generate with",
    highlightedText: "Creative AI",
    description: "Write a prompt and leave everything else for us to handle",
    type: "creative-ai",
    highlight: true,
  },
  {
    title: "Start from",
    highlightedText: "Scratch",
    description: "Write a prompt and leave everything else for us to handle",
    type: "create-scratch",
  },
];

export const layouts: LayoutGroup[] = [
  {
    name: "Basic",
    layouts: [
      {
        name: "Blank card",
        icon: BlankCardIcon,
        type: "layout",
        layoutType: "blank-card",
        component: BlankCard,
      },
      {
        name: "Image and text",
        icon: ImageAndTextIcon,
        type: "layout",
        layoutType: "imageAndText",
        component: ImageAndText,
      },
      {
        name: "Text and image",
        icon: TextAndImageIcon,
        type: "layout",
        layoutType: "textAndImage",
        component: TextAndImage,
      },
      {
        name: "Two Columns",
        icon: TwoColumnsIcon,
        type: "layout",
        layoutType: "twoColumns",
        component: TwoColumns,
      },
      {
        name: "Two Columns with headings",
        icon: TwoColumnsWithHeadingsIcon,
        type: "layout",
        layoutType: "twoColumnsWithHeadings",
        component: TwoColumnsWithHeadings,
      },
      {
        name: "Three Columns",
        icon: ThreeColumnsIcon,
        type: "layout",
        layoutType: "threeColumns",
        component: ThreeColumns,
      },
      {
        name: "Three Columns with headings",
        icon: ThreeColumnsWithHeadingsIcon,
        type: "layout",
        layoutType: "threeColumnsWithHeadings",
        component: ThreeColumnsWithHeadings,
      },

      {
        name: "Four Columns",
        icon: FourColumnsIcon,
        type: "layout",
        layoutType: "fourColumns",
        component: FourColumns,
      },
    ],
  },

  {
    name: "Card layouts",
    layouts: [
      {
        name: "Accent left",
        icon: ImageAndTextIcon,
        type: "layout",
        layoutType: "accentLeft",
        component: AccentLeft,
      },
      {
        name: "Accent right",
        icon: TextAndImageIcon,
        type: "layout",
        layoutType: "accentRight",
        component: AccentRight,
      },
    ],
  },

  {
    name: "Images",
    layouts: [
      {
        name: "2 images columns",
        icon: TwoImageColumnsIcon,
        type: "layout",
        layoutType: "twoImageColumns",
        component: TwoImageColumns,
      },
      {
        name: "3 images columns",
        icon: ThreeImageColumnsIcon,
        type: "layout",
        layoutType: "threeImageColumns",
        component: ThreeImageColumns,
      },
      {
        name: "4 images columns",
        icon: FourImageColumnsIcon,
        type: "layout",
        layoutType: "fourImageColumns",
        component: FourImageColumns,
      },
    ],
  },
];

export const component: ComponentGroup[] = [
  {
    name: "Text",
    components: [
      {
        name: "Title",
        icon: "T",
        type: "component",
        component: Title,
        componentType: "title",
      },
      {
        componentType: "heading1",
        name: "Heading 1",
        type: "component",
        component: Heading1,
        icon: "H1",
      },
      {
        componentType: "heading2",
        name: "Heading 2",
        type: "component",
        component: Heading2,
        icon: "H2",
      },
      {
        componentType: "heading3",
        name: "Heading 3",
        type: "component",
        component: Heading3,
        icon: "H3",
      },
      {
        componentType: "heading4",
        name: "Heading 4",
        type: "component",
        component: Heading4,
        icon: "H4",
      },

      {
        componentType: "paragraph",
        name: "Paragraph",
        type: "component",
        component: Paragraph,
        icon: "Paragraph",
      },
    ],
  },

  {
    name: "Tables",
    components: [
      {
        componentType: "table2x2",
        name: "2×2 table",
        type: "component",
        component: { ...Table, initialColumns: 2, initialRows: 2 },
        icon: "⊞",
      },
      {
        componentType: "table3x3",
        name: "3×3 table",
        type: "component",
        component: { ...Table, initialColumns: 3, initialRows: 3 },
        icon: "⊞",
      },
      {
        componentType: "table4x4",
        name: "4×4 table",
        type: "component",
        component: { ...Table, initialColumns: 4, initialRows: 4 },
        icon: "⊞",
      },
    ],
  },

  {
    name: "Lists",
    components: [
      {
        componentType: "bulletList",
        name: "Bulleted list",
        type: "component",
        component: BulletListComponent,
        icon: "•",
      },
      {
        componentType: "numberedList",
        name: "Numbered list",
        type: "component",
        component: NumberedListComponent,
        icon: "1.",
      },
      {
        componentType: "todoList",
        name: "Todo list",
        type: "component",
        component: TodoListComponent,
        icon: "☐",
      },
    ],
  },
  {
    name: "Callouts",
    components: [
      {
        componentType: "note",
        name: "Note box",
        type: "component",
        component: { ...CalloutBoxComponent, callOutType: "note" },
        icon: "📝",
      },
      {
        componentType: "info",
        name: "Info box",
        type: "component",
        component: { ...CalloutBoxComponent, callOutType: "info" },
        icon: "ℹ",
      },
      {
        componentType: "warning",
        name: "Warning box",
        type: "component",
        component: { ...CalloutBoxComponent, callOutType: "warning" },
        icon: "⚠",
      },
      {
        componentType: "caution",
        name: "Caution box",
        type: "component",
        component: { ...CalloutBoxComponent, callOutType: "caution" },
        icon: "!",
      },
      {
        componentType: "success",
        name: "Success box",
        type: "component",
        component: { ...CalloutBoxComponent, callOutType: "success" },
        icon: "✓",
      },
      {
        componentType: "question",
        name: "Question box",
        type: "component",
        component: { ...CalloutBoxComponent, callOutType: "question" },
        icon: "?",
      },
    ],
  },

  {
    name: "Columns",
    components: [
      {
        componentType: "resizableColumns",
        name: "2x2 Column",
        type: "component",
        component: ResizableColumn,
        icon: "⊞",
      },
    ],
  },
];

// Themes
// export const themes: Theme[] = [
//   {
//     name: "Default",
//     fontFamily: "'Inter', sans-serif",
//     fontColor: "#000000",
//     backgroundColor: "#f0f0f0",
//     slideBackgroundColor: "#ffffff",
//     accentColor: "#3b82f6",
//     navbarColor: "#ffffff",
//     sidebarColor: "#f0f0f0",
//     type: "light",
//   },
//   {
//     name: "Dark Elegance",
//     fontFamily: "'Playfair Display', serif",
//     fontColor: "#ffffff",
//     backgroundColor: "#1a1a1a",
//     slideBackgroundColor: "#2c2c2c",
//     accentColor: "#ffd700",
//     gradientBackground: "linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%)",
//     navbarColor: "#2c2c2c",
//     sidebarColor: "#1a1a1a",
//     type: "dark",
//   },
//   {
//     name: "Nature Fresh",
//     fontFamily: "'Montserrat', sans-serif",
//     fontColor: "#1b4332",
//     backgroundColor: "#e8f5e9",
//     slideBackgroundColor: "#ffffff",
//     accentColor: "#4caf50",
//     gradientBackground: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)",
//     navbarColor: "#c8e6c9",
//     sidebarColor: "#e8f5e9",
//     type: "light",
//   },
//   {
//     name: "Tech Vibrant",
//     fontFamily: "'Roboto', sans-serif",
//     fontColor: "#ffffff",
//     backgroundColor: "#2c3e50",
//     slideBackgroundColor: "#34495e",
//     accentColor: "#e74c3c",
//     gradientBackground: "linear-gradient(135deg, #3498db 0%, #2c3e50 100%)",
//     navbarColor: "#34495e",
//     sidebarColor: "#2c3e50",
//     type: "dark",
//   },
//   {
//     name: "Pastel Dream",
//     fontFamily: "'Lato', sans-serif",
//     fontColor: "#4a4e69",
//     backgroundColor: "#f7e8e8",
//     slideBackgroundColor: "#ffffff",
//     accentColor: "#b5838d",
//     gradientBackground: "linear-gradient(135deg, #f7e8e8 0%, #e5cece 100%)",
//     navbarColor: "#e5cece",
//     sidebarColor: "#f7e8e8",
//     type: "light",
//   },
//   {
//     name: "Ocean Breeze",
//     fontFamily: "'Open Sans', sans-serif",
//     fontColor: "#f0f8ff",
//     backgroundColor: "#0077be",
//     slideBackgroundColor: "#ffffff",
//     accentColor: "#00a86b",
//     gradientBackground: "linear-gradient(135deg, #0077be 0%, #00a86b 100%)",
//     navbarColor: "#0077be",
//     sidebarColor: "#005c8f",
//     type: "dark",
//   },
//   {
//     name: "Sunset Glow",
//     fontFamily: "'Merriweather', serif",
//     fontColor: "#3d3d3d",
//     backgroundColor: "#ffd700",
//     slideBackgroundColor: "#ffffff",
//     accentColor: "#ff6b6b",
//     gradientBackground: "linear-gradient(135deg, #ffd700 0%, #ff6b6b 100%)",
//     navbarColor: "#ff6b6b",
//     sidebarColor: "#ffd700",
//     type: "light",
//   },
//   {
//     name: "Minimalist Mono",
//     fontFamily: "'IBM Plex Mono', monospace",
//     fontColor: "#000000",
//     backgroundColor: "#ffffff",
//     slideBackgroundColor: "#f5f5f5",
//     accentColor: "#000000",
//     navbarColor: "#f5f5f5",
//     sidebarColor: "#ffffff",
//     type: "light",
//   },
//   {
//     name: "Neon Nights",
//     fontFamily: "'Orbitron', sans-serif",
//     fontColor: "#ffffff",
//     backgroundColor: "#000000",
//     slideBackgroundColor: "#1a1a1a",
//     accentColor: "#00ff00",
//     gradientBackground: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
//     navbarColor: "#1a1a1a",
//     sidebarColor: "#000000",
//     type: "dark",
//   },
//   {
//     name: "Earthy Tones",
//     fontFamily: "'Nunito', sans-serif",
//     fontColor: "#3d3d3d",
//     backgroundColor: "#d7ccc8",
//     slideBackgroundColor: "#f5f5f5",
//     accentColor: "#795548",
//     gradientBackground: "linear-gradient(135deg, #d7ccc8 0%, #a1887f 100%)",
//     navbarColor: "#a1887f",
//     sidebarColor: "#d7ccc8",
//     type: "light",
//   },
//   {
//     name: "Retro Pop",
//     fontFamily: "'Pacifico', cursive",
//     fontColor: "#1a1a1a",
//     backgroundColor: "#ff4081",
//     slideBackgroundColor: "#ffffff",
//     accentColor: "#ffeb3b",
//     gradientBackground: "linear-gradient(135deg, #ff4081 0%, #ffeb3b 100%)",
//     navbarColor: "#ff4081",
//     sidebarColor: "#c60055",
//     type: "dark",
//   },
//   {
//     name: "Zen Garden",
//     fontFamily: "'Noto Serif JP', serif",
//     fontColor: "#2f3e46",
//     backgroundColor: "#f1f8e9",
//     slideBackgroundColor: "#ffffff",
//     accentColor: "#558b2f",
//     gradientBackground: "linear-gradient(135deg, #f1f8e9 0%, #dcedc8 100%)",
//     navbarColor: "#dcedc8",
//     sidebarColor: "#f1f8e9",
//     type: "light",
//   },
//   {
//     name: "Arctic Frost",
//     fontFamily: "'Quicksand', sans-serif",
//     fontColor: "#2c3e50",
//     backgroundColor: "#e0f7fa",
//     slideBackgroundColor: "#ffffff",
//     accentColor: "#00bcd4",
//     gradientBackground: "linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)",
//     navbarColor: "#b2ebf2",
//     sidebarColor: "#e0f7fa",
//     type: "light",
//   },
//   {
//     name: "Vintage Warmth",
//     fontFamily: "'Libre Baskerville', serif",
//     fontColor: "#4a4a4a",
//     backgroundColor: "#ffecb3",
//     slideBackgroundColor: "#ffffff",
//     accentColor: "#ff6f00",
//     gradientBackground: "linear-gradient(135deg, #ffecb3 0%, #ffe082 100%)",
//     navbarColor: "#ffe082",
//     sidebarColor: "#ffecb3",
//     type: "light",
//   },
//   {
//     name: "Cosmic Delight",
//     fontFamily: "'Space Grotesk', sans-serif",
//     fontColor: "#ffffff",
//     backgroundColor: "#311b92",
//     slideBackgroundColor: "#4527a0",
//     accentColor: "#7c4dff",
//     gradientBackground: "linear-gradient(135deg, #311b92 0%, #4527a0 100%)",
//     navbarColor: "#4527a0",
//     sidebarColor: "#311b92",
//     type: "dark",
//   },
//   {
//     name: "Midnight Bloom",
//     fontFamily: "'Poppins', sans-serif",
//     fontColor: "#ffffff",
//     backgroundColor: "#1a1b41",
//     slideBackgroundColor: "#292a5d",
//     accentColor: "#f72585",
//     gradientBackground: "linear-gradient(135deg, #1a1b41 0%, #292a5d 100%)",
//     navbarColor: "#292a5d",
//     sidebarColor: "#1a1b41",
//     type: "dark",
//   },
//   {
//     name: "Coral Sunset",
//     fontFamily: "'Raleway', sans-serif",
//     fontColor: "#33272a",
//     backgroundColor: "#feeafa",
//     slideBackgroundColor: "#ffffff",
//     accentColor: "#ff9a8b",
//     gradientBackground: "linear-gradient(135deg, #feeafa 0%, #ff9a8b 100%)",
//     navbarColor: "#feeafa",
//     sidebarColor: "#fff0f5",
//     type: "light",
//   },
//   {
//     name: "Emerald City",
//     fontFamily: "'Montserrat', sans-serif",
//     fontColor: "#ffffff",
//     backgroundColor: "#064e3b",
//     slideBackgroundColor: "#065f46",
//     accentColor: "#34d399",
//     gradientBackground: "linear-gradient(135deg, #064e3b 0%, #065f46 100%)",
//     navbarColor: "#065f46",
//     sidebarColor: "#064e3b",
//     type: "dark",
//   },
//   {
//     name: "Lavender Mist",
//     fontFamily: "'Nunito', sans-serif",
//     fontColor: "#4a4e69",
//     backgroundColor: "#f3e8ff",
//     slideBackgroundColor: "#ffffff",
//     accentColor: "#9f7aea",
//     gradientBackground: "linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)",
//     navbarColor: "#e9d5ff",
//     sidebarColor: "#f3e8ff",
//     type: "light",
//   },
//   {
//     name: "Golden Hour",
//     fontFamily: "'Source Sans Pro', sans-serif",
//     fontColor: "#3d3d3d",
//     backgroundColor: "#fef3c7",
//     slideBackgroundColor: "#ffffff",
//     accentColor: "#f59e0b",
//     gradientBackground: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
//     navbarColor: "#fde68a",
//     sidebarColor: "#fef3c7",
//     type: "light",
//   },
//   {
//     name: "Arctic Aurora",
//     fontFamily: "'Roboto', sans-serif",
//     fontColor: "#e2e8f0",
//     backgroundColor: "#0f172a",
//     slideBackgroundColor: "#1e293b",
//     accentColor: "#38bdf8",
//     gradientBackground: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
//     navbarColor: "#1e293b",
//     sidebarColor: "#0f172a",
//     type: "dark",
//   },
//   {
//     name: "Sakura Blossom",
//     fontFamily: "'Noto Sans JP', sans-serif",
//     fontColor: "#5d576b",
//     backgroundColor: "#fff5f5",
//     slideBackgroundColor: "#ffffff",
//     accentColor: "#f687b3",
//     gradientBackground: "linear-gradient(135deg, #fff5f5 0%, #fed7e2 100%)",
//     navbarColor: "#fed7e2",
//     sidebarColor: "#fff5f5",
//     type: "light",
//   },
//   {
//     name: "Urban Jungle",
//     fontFamily: "'Karla', sans-serif",
//     fontColor: "#2d3748",
//     backgroundColor: "#e6fffa",
//     slideBackgroundColor: "#ffffff",
//     accentColor: "#2c7a7b",
//     gradientBackground: "linear-gradient(135deg, #e6fffa 0%, #b2f5ea 100%)",
//     navbarColor: "#b2f5ea",
//     sidebarColor: "#e6fffa",
//     type: "light",
//   },
//   {
//     name: "Cosmic Latte",
//     fontFamily: "'Work Sans', sans-serif",
//     fontColor: "#3d3d3d",
//     backgroundColor: "#fff8e1",
//     slideBackgroundColor: "#ffffff",
//     accentColor: "#d97706",
//     gradientBackground: "linear-gradient(135deg, #fff8e1 0%, #fef3c7 100%)",
//     navbarColor: "#fef3c7",
//     sidebarColor: "#fff8e1",
//     type: "light",
//   },
//   {
//     name: "Neon Cyberpunk",
//     fontFamily: "'Rajdhani', sans-serif",
//     fontColor: "#ffffff",
//     backgroundColor: "#09090b",
//     slideBackgroundColor: "#18181b",
//     accentColor: "#22d3ee",
//     gradientBackground: "linear-gradient(135deg, #09090b 0%, #18181b 100%)",
//     navbarColor: "#18181b",
//     sidebarColor: "#09090b",
//     type: "dark",
//   },
// ];

export const themes: Theme[] = [
  {
    name: "Default",
    fontFamily: "'Inter', sans-serif",
    fontColor: "#000000",
    backgroundColor: "#f0f0f0",
    slideBackgroundColor: "#ffffff",
    accentColor: "#3b82f6",
    navbarColor: "#ffffff",
    sidebarColor: "#f0f0f0",
    type: "light",
    category: { id: "business", name: "Business" },
  },
  {
    name: "Default Dark",
    fontFamily: "'Inter', sans-serif",
    fontColor: "#e0e0e0",
    backgroundColor: "#171717",
    slideBackgroundColor: "#242424",
    accentColor: "#4f96ff",
    navbarColor: "#242424",
    sidebarColor: "#171717",
    type: "dark",
    category: { id: "business", name: "Business" },
  },
  {
    name: "Corporate Blue",
    fontFamily: "'Roboto', sans-serif",
    fontColor: "#333333",
    backgroundColor: "#e8f1f8",
    slideBackgroundColor: "#ffffff",
    accentColor: "#0a66c2",
    navbarColor: "#ffffff",
    sidebarColor: "#e8f1f8",
    type: "light",
    category: { id: "business", name: "Business" },
  },
  {
    name: "Corporate Blue Dark",
    fontFamily: "'Roboto', sans-serif",
    fontColor: "#e0e0e0",
    backgroundColor: "#0e1b2b",
    slideBackgroundColor: "#1a2c42",
    accentColor: "#3a85dd",
    navbarColor: "#1a2c42",
    sidebarColor: "#0e1b2b",
    type: "dark",
    category: { id: "business", name: "Business" },
  },
  {
    name: "Painterly",
    fontFamily: "'Playfair Display', serif",
    fontColor: "#333333",
    backgroundColor: "#f8f5f0",
    slideBackgroundColor: "#ffffff",
    accentColor: "#e07a5f",
    navbarColor: "#ffffff",
    sidebarColor: "#f8f5f0",
    type: "light",
    category: { id: "creative", name: "Creative" },
  },
  {
    name: "Painterly Dark",
    fontFamily: "'Playfair Display', serif",
    fontColor: "#e0e0e0",
    backgroundColor: "#2a2520",
    slideBackgroundColor: "#352f2a",
    accentColor: "#f28b6e",
    navbarColor: "#352f2a",
    sidebarColor: "#2a2520",
    type: "dark",
    category: { id: "creative", name: "Creative" },
  },
  {
    name: "Studio",
    fontFamily: "'Montserrat', sans-serif",
    fontColor: "#333333",
    backgroundColor: "#f5f0ff",
    slideBackgroundColor: "#ffffff",
    accentColor: "#9b5de5",
    navbarColor: "#ffffff",
    sidebarColor: "#f5f0ff",
    type: "light",
    category: { id: "creative", name: "Creative" },
  },
  {
    name: "Studio Dark",
    fontFamily: "'Montserrat', sans-serif",
    fontColor: "#e0e0e0",
    backgroundColor: "#1e1629",
    slideBackgroundColor: "#2b2040",
    accentColor: "#b77aff",
    navbarColor: "#2b2040",
    sidebarColor: "#1e1629",
    type: "dark",
    category: { id: "creative", name: "Creative" },
  },
  {
    name: "Analytics",
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontColor: "#333333",
    backgroundColor: "#edf2fb",
    slideBackgroundColor: "#ffffff",
    accentColor: "#4361ee",
    navbarColor: "#ffffff",
    sidebarColor: "#edf2fb",
    type: "light",
    category: { id: "data", name: "Data" },
  },
  {
    name: "Analytics Dark",
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontColor: "#e0e0e0",
    backgroundColor: "#121b2f",
    slideBackgroundColor: "#1c2942",
    accentColor: "#5c7cff",
    navbarColor: "#1c2942",
    sidebarColor: "#121b2f",
    type: "dark",
    category: { id: "data", name: "Data" },
  },
  {
    name: "Metrics",
    fontFamily: "'Roboto Mono', monospace",
    fontColor: "#333333",
    backgroundColor: "#e6f4f1",
    slideBackgroundColor: "#ffffff",
    accentColor: "#00b4d8",
    navbarColor: "#ffffff",
    sidebarColor: "#e6f4f1",
    type: "light",
    category: { id: "data", name: "Data" },
  },
  {
    name: "Metrics Dark",
    fontFamily: "'Roboto Mono', monospace",
    fontColor: "#e0e0e0",
    backgroundColor: "#0a2328",
    slideBackgroundColor: "#123440",
    accentColor: "#48cae4",
    navbarColor: "#123440",
    sidebarColor: "#0a2328",
    type: "dark",
    category: { id: "data", name: "Data" },
  },
  {
    name: "Mono",
    fontFamily: "'Work Sans', sans-serif",
    fontColor: "#333333",
    backgroundColor: "#f5f5f5",
    slideBackgroundColor: "#ffffff",
    accentColor: "#424242",
    navbarColor: "#ffffff",
    sidebarColor: "#f5f5f5",
    type: "light",
    category: { id: "minimalist", name: "Minimalist" },
  },
  {
    name: "Mono Dark",
    fontFamily: "'Work Sans', sans-serif",
    fontColor: "#e0e0e0",
    backgroundColor: "#1a1a1a",
    slideBackgroundColor: "#262626",
    accentColor: "#9e9e9e",
    navbarColor: "#262626",
    sidebarColor: "#1a1a1a",
    type: "dark",
    category: { id: "minimalist", name: "Minimalist" },
  },
  {
    name: "Zen",
    fontFamily: "'Karla', sans-serif",
    fontColor: "#333333",
    backgroundColor: "#f0f0f0",
    slideBackgroundColor: "#ffffff",
    accentColor: "#a7a7a7",
    navbarColor: "#ffffff",
    sidebarColor: "#f0f0f0",
    type: "light",
    category: { id: "minimalist", name: "Minimalist" },
  },
  {
    name: "Zen Dark",
    fontFamily: "'Karla', sans-serif",
    fontColor: "#e0e0e0",
    backgroundColor: "#1c1c1c",
    slideBackgroundColor: "#2a2a2a",
    accentColor: "#b3b3b3",
    navbarColor: "#2a2a2a",
    sidebarColor: "#1c1c1c",
    type: "dark",
    category: { id: "minimalist", name: "Minimalist" },
  },
  {
    name: "Scholar",
    fontFamily: "'Merriweather', serif",
    fontColor: "#333333",
    backgroundColor: "#f0f7f4",
    slideBackgroundColor: "#ffffff",
    accentColor: "#3a7d44",
    navbarColor: "#ffffff",
    sidebarColor: "#f0f7f4",
    type: "light",
    category: { id: "study", name: "Study" },
  },
  {
    name: "Scholar Dark",
    fontFamily: "'Merriweather', serif",
    fontColor: "#e0e0e0",
    backgroundColor: "#1a2620",
    slideBackgroundColor: "#243731",
    accentColor: "#4c9a5a",
    navbarColor: "#243731",
    sidebarColor: "#1a2620",
    type: "dark",
    category: { id: "study", name: "Study" },
  },
  {
    name: "Campus",
    fontFamily: "'Lora', serif",
    fontColor: "#333333",
    backgroundColor: "#f5f1e8",
    slideBackgroundColor: "#ffffff",
    accentColor: "#8c6d62",
    navbarColor: "#ffffff",
    sidebarColor: "#f5f1e8",
    type: "light",
    category: { id: "study", name: "Study" },
  },
  {
    name: "Campus Dark",
    fontFamily: "'Lora', serif",
    fontColor: "#e0e0e0",
    backgroundColor: "#22201c",
    slideBackgroundColor: "#302e29",
    accentColor: "#a38073",
    navbarColor: "#302e29",
    sidebarColor: "#22201c",
    type: "dark",
    category: { id: "study", name: "Study" },
  },
];

// Templates
// export const templates = [
//   // ===========================
//   //  Modern Business
//   // ===========================
//   {
//     id: uuidv4(),
//     name: "Modern Business",
//     theme: "Professional",
//     slides: [
//       {
//         id: uuidv4(),
//         slideName: "Title Slide",
//         type: "blank-card",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "title",
//               content: "Modern Business Presentation",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "Presented by [Your Name]",
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "Introduction",
//         type: "textAndImage",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "heading1",
//               content: "Introduction",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content:
//                 "This presentation covers the key aspects of our business model.",
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "Key Services",
//         type: "threeColumnsWithHeadings",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "heading2",
//               content: "Our Services",
//             },
//             {
//               id: uuidv4(),
//               type: "resizable-column",
//               content: [
//                 {
//                   id: uuidv4(),
//                   type: "heading3",
//                   content: "Consulting",
//                 },
//                 {
//                   id: uuidv4(),
//                   type: "paragraph",
//                   content: "We provide expert business consulting services.",
//                 },
//               ],
//             },
//             {
//               id: uuidv4(),
//               type: "resizable-column",
//               content: [
//                 {
//                   id: uuidv4(),
//                   type: "heading3",
//                   content: "Marketing",
//                 },
//                 {
//                   id: uuidv4(),
//                   type: "paragraph",
//                   content: "Tailored marketing strategies for your business.",
//                 },
//               ],
//             },
//             {
//               id: uuidv4(),
//               type: "resizable-column",
//               content: [
//                 {
//                   id: uuidv4(),
//                   type: "heading3",
//                   content: "Development",
//                 },
//                 {
//                   id: uuidv4(),
//                   type: "paragraph",
//                   content: "High-quality software development solutions.",
//                 },
//               ],
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "Closing Slide",
//         type: "accentLeft",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "title",
//               content: "Thank You",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "We appreciate your time and attention.",
//             },
//           ],
//         },
//       },
//     ],
//   },
//   // ===========================
//   //  Modern Business
//   // ===========================
//   {
//     id: uuidv4(),
//     name: "C  ",
//     theme: "Dark Theme",
//     slides: [
//       {
//         id: uuidv4(),
//         slideName: "Cover Page",
//         type: "blank-card",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "title",
//               content: "Creative Portfolio",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "Designed by [Your Name]",
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "About Me",
//         type: "textAndImage",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "heading1",
//               content: "About Me",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content:
//                 "I am a creative designer specializing in web and branding.",
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "Portfolio Showcase",
//         type: "threeImageColumns",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "image",
//               content: "https://source.unsplash.com/random/300x300",
//               alt: "Project 1",
//             },
//             {
//               id: uuidv4(),
//               type: "image",
//               content: "https://source.unsplash.com/random/301x301",
//               alt: "Project 2",
//             },
//             {
//               id: uuidv4(),
//               type: "image",
//               content: "https://source.unsplash.com/random/302x302",
//               alt: "Project 3",
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "Contact",
//         type: "accentRight",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "heading1",
//               content: "Get In Touch",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "Email: your@email.com",
//             },
//           ],
//         },
//       },
//     ],
//   },
//   // ===========================
//   //  Minimalist Presentation
//   // ===========================
//   {
//     id: uuidv4(),
//     name: "Minimalist Presentation",
//     theme: "Minimal Theme",
//     slides: [
//       {
//         id: uuidv4(),
//         slideName: "Welcome Slide",
//         type: "blank-card",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "title",
//               content: "Welcome",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "A minimalist approach to presentations.",
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "Agenda",
//         type: "twoColumns",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "heading2",
//               content: "Agenda",
//             },
//             {
//               id: uuidv4(),
//               type: "bulletList",
//               content: [
//                 "Introduction",
//                 "Project Overview",
//                 "Future Goals",
//                 "Conclusion",
//               ],
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "Conclusion",
//         type: "accentLeft",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "title",
//               content: "Thank You",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "We appreciate your time.",
//             },
//           ],
//         },
//       },
//     ],
//   },
//   // ===========================
//   //  Startup Pitch Deck
//   // ===========================

//   {
//     id: uuidv4(),
//     name: "Startup Pitch Deck",
//     theme: "Professional",
//     slides: [
//       {
//         id: uuidv4(),
//         slideName: "Welcome Slide",
//         type: "blank-card",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "title",
//               content: "Startup Pitch Deck",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "Revolutionizing the future of technology.",
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "Problem Statement",
//         type: "textAndImage",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "heading1",
//               content: "The Problem",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content:
//                 "Businesses struggle with inefficient operations and high costs.",
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "Our Solution",
//         type: "imageAndText",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "heading1",
//               content: "Our Solution",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content:
//                 "We provide an AI-powered platform to streamline operations.",
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "Market Opportunity",
//         type: "threeColumns",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "heading2",
//               content: "Market Size",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "$500 Billion Industry",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "Growing 20% year-over-year",
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "Business Model",
//         type: "twoColumnsWithHeadings",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "heading2",
//               content: "Revenue Streams",
//             },
//             {
//               id: uuidv4(),
//               type: "bulletList",
//               content: [
//                 "Subscription-based model",
//                 "One-time software license",
//                 "Enterprise customization",
//               ],
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "Closing Slide",
//         type: "accentLeft",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "title",
//               content: "Thank You!",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "Let's revolutionize the future together.",
//             },
//           ],
//         },
//       },
//     ],
//   },

//   // ===========================
//   //  Product Launch Presentation
//   // ===========================
//   {
//     id: uuidv4(),
//     name: "Product Launch Presentation",
//     theme: "Creative",
//     slides: [
//       {
//         id: uuidv4(),
//         slideName: "Launch Slide",
//         type: "blank-card",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "title",
//               content: "Introducing Our New Product",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "The future of technology begins now.",
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "Product Features",
//         type: "threeColumnsWithHeadings",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "heading3",
//               content: "Feature 1",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "AI-powered automation.",
//             },
//             {
//               id: uuidv4(),
//               type: "heading3",
//               content: "Feature 2",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "Cloud-based infrastructure.",
//             },
//             {
//               id: uuidv4(),
//               type: "heading3",
//               content: "Feature 3",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "Highly customizable.",
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "Product Showcase",
//         type: "threeImageColumns",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "image",
//               content: "https://source.unsplash.com/random/300x300",
//               alt: "Feature Image 1",
//             },
//             {
//               id: uuidv4(),
//               type: "image",
//               content: "https://source.unsplash.com/random/301x301",
//               alt: "Feature Image 2",
//             },
//             {
//               id: uuidv4(),
//               type: "image",
//               content: "https://source.unsplash.com/random/302x302",
//               alt: "Feature Image 3",
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "Pricing",
//         type: "twoColumns",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "heading2",
//               content: "Pricing Plans",
//             },
//             {
//               id: uuidv4(),
//               type: "bulletList",
//               content: [
//                 "Basic - $10/month",
//                 "Pro - $25/month",
//                 "Enterprise - $50/month",
//               ],
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "Closing Slide",
//         type: "accentRight",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "title",
//               content: "Thank You for Joining Us!",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "Experience the future of technology.",
//             },
//           ],
//         },
//       },
//     ],
//   },

//   // ===========================
//   //  Company Profile Presentation
//   // ===========================
//   {
//     id: uuidv4(),
//     name: "Company Profile",
//     theme: "Corporate",
//     slides: [
//       {
//         id: uuidv4(),
//         slideName: "Company Overview",
//         type: "blank-card",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "title",
//               content: "Company Profile",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "Your trusted technology partner.",
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "Our Mission",
//         type: "textAndImage",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "heading2",
//               content: "Our Mission",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "To drive innovation through technology.",
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "Our Services",
//         type: "threeColumnsWithHeadings",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "heading3",
//               content: "Consulting",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "We provide expert technology consultation.",
//             },
//             {
//               id: uuidv4(),
//               type: "heading3",
//               content: "Development",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "We build scalable solutions.",
//             },
//           ],
//         },
//       },
//     ],
//   },
//   // ===========================
//   //  Educational Presentation
//   // ===========================
//   {
//     id: uuidv4(),
//     name: "Educational Presentation",
//     theme: "Minimal",
//     slides: [
//       {
//         id: uuidv4(),
//         slideName: "Welcome Slide",
//         type: "blank-card",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "title",
//               content: "Welcome to the Course",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "Let's dive into today's lesson.",
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "Course Overview",
//         type: "textAndImage",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "heading1",
//               content: "Course Overview",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "In this course, you will learn:",
//             },
//             {
//               id: uuidv4(),
//               type: "bulletList",
//               content: [
//                 "The basics of programming",
//                 "How to build a web app",
//                 "Understanding APIs and Databases",
//               ],
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "Key Topics",
//         type: "threeColumnsWithHeadings",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "heading3",
//               content: "Topic 1",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "Understanding HTML, CSS, JS",
//             },
//             {
//               id: uuidv4(),
//               type: "heading3",
//               content: "Topic 2",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "Backend Development with Node.js",
//             },
//             {
//               id: uuidv4(),
//               type: "heading3",
//               content: "Topic 3",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "Building Full-Stack Apps",
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "Q&A Session",
//         type: "question",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "heading2",
//               content: "Any Questions?",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "Feel free to ask your questions.",
//             },
//           ],
//         },
//       },
//     ],
//   },

//   // ===========================
//   //  Marketing Strategy Deck
//   // ===========================
//   {
//     id: uuidv4(),
//     name: "Marketing Strategy Deck",
//     theme: "Creative",
//     slides: [
//       {
//         id: uuidv4(),
//         slideName: "Introduction",
//         type: "blank-card",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "title",
//               content: "Marketing Strategy 2025",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "Our plan to scale revenue by 50%.",
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "Target Audience",
//         type: "textAndImage",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "heading2",
//               content: "Who is our target?",
//             },
//             {
//               id: uuidv4(),
//               type: "bulletList",
//               content: [
//                 "Small to Medium Businesses",
//                 "E-commerce Owners",
//                 "Freelancers & Creators",
//               ],
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "Marketing Channels",
//         type: "twoColumns",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "heading2",
//               content: "Primary Channels",
//             },
//             {
//               id: uuidv4(),
//               type: "bulletList",
//               content: [
//                 "Google Ads",
//                 "Social Media Marketing",
//                 "Influencer Partnerships",
//               ],
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "Revenue Forecast",
//         type: "twoColumnsWithHeadings",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "heading3",
//               content: "2025 Revenue",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "$10 Million Projected Revenue",
//             },
//             {
//               id: uuidv4(),
//               type: "heading3",
//               content: "Profit Margin",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "30% Profit Margin Target",
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "Thank You Slide",
//         type: "accentRight",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "title",
//               content: "Thank You!",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "Let's make this strategy a success.",
//             },
//           ],
//         },
//       },
//     ],
//   },

//   // ===========================
//   //  Annual Business Report
//   // ===========================
//   {
//     id: uuidv4(),
//     name: "Annual Business Report",
//     theme: "Professional",
//     slides: [
//       {
//         id: uuidv4(),
//         slideName: "Annual Report Cover",
//         type: "blank-card",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "title",
//               content: "Annual Business Report 2025",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "A look at our performance in the past year.",
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "Financial Overview",
//         type: "twoColumns",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "heading2",
//               content: "Revenue & Expenses",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "Revenue: $50 Million",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "Expenses: $30 Million",
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "Growth Metrics",
//         type: "threeColumns",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "heading3",
//               content: "User Growth",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "50% increase in users.",
//             },
//             {
//               id: uuidv4(),
//               type: "heading3",
//               content: "Revenue Growth",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "20% increase in revenue.",
//             },
//             {
//               id: uuidv4(),
//               type: "heading3",
//               content: "Profit Margin",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "30% profit margin achieved.",
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "Future Roadmap",
//         type: "todoList",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "heading2",
//               content: "Goals for 2026",
//             },
//             {
//               id: uuidv4(),
//               type: "bulletList",
//               content: [
//                 "Expand to 10 new countries",
//                 "Achieve $100 Million Revenue",
//                 "Increase customer retention by 20%",
//               ],
//             },
//           ],
//         },
//       },
//     ],
//   },
//   // ===========================
//   //  Product Launch Presentation
//   // ===========================
//   {
//     id: uuidv4(),
//     name: "Product Launch Presentation",
//     theme: "Modern",
//     slides: [
//       {
//         id: uuidv4(),
//         slideName: "Product Introduction",
//         type: "imageAndText",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "title",
//               content: "Introducing Our New Product",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "A game-changing product designed for you.",
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "Product Features",
//         type: "threeColumnsWithHeadings",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "heading3",
//               content: "Feature 1",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "Description of Feature 1.",
//             },
//             {
//               id: uuidv4(),
//               type: "heading3",
//               content: "Feature 2",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "Description of Feature 2.",
//             },
//             {
//               id: uuidv4(),
//               type: "heading3",
//               content: "Feature 3",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "Description of Feature 3.",
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "Product Benefits",
//         type: "bulletList",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "heading2",
//               content: "Why Choose This Product?",
//             },
//             {
//               id: uuidv4(),
//               type: "bulletList",
//               content: [
//                 "Solves a major problem",
//                 "User-friendly and innovative",
//                 "Affordable pricing",
//                 "High customer satisfaction",
//               ],
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "Pricing Plans",
//         type: "twoColumnsWithHeadings",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "heading3",
//               content: "Basic Plan",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "$99/month",
//             },
//             {
//               id: uuidv4(),
//               type: "heading3",
//               content: "Pro Plan",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "$199/month",
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "Thank You",
//         type: "accentRight",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "title",
//               content: "Thank You!",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "We can't wait for you to try our product.",
//             },
//           ],
//         },
//       },
//     ],
//   },

//   // ===========================
//   //  Startup Pitch Deck
//   // ===========================
//   {
//     id: uuidv4(),
//     name: "Startup Pitch Deck",
//     theme: "Creative",
//     slides: [
//       {
//         id: uuidv4(),
//         slideName: "Company Overview",
//         type: "textAndImage",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "title",
//               content: "Our Startup Vision",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "Building innovative solutions for the future.",
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "Problem Statement",
//         type: "twoColumns",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "heading2",
//               content: "The Problem",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "Current market gaps causing inefficiencies.",
//             },
//             {
//               id: uuidv4(),
//               type: "heading2",
//               content: "Our Solution",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "We solve it through innovative technology.",
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "Market Opportunity",
//         type: "twoColumnsWithHeadings",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "heading3",
//               content: "Market Size",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "$50 Billion Opportunity",
//             },
//             {
//               id: uuidv4(),
//               type: "heading3",
//               content: "Potential Growth",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "20% CAGR growth annually.",
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "Business Model",
//         type: "textAndImage",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "heading2",
//               content: "How We Make Money",
//             },
//             {
//               id: uuidv4(),
//               type: "bulletList",
//               content: [
//                 "Subscription-based revenue",
//                 "One-time licensing fee",
//                 "Enterprise packages",
//               ],
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "Thank You",
//         type: "accentLeft",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "title",
//               content: "Thank You for Your Time",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "We hope you join our journey.",
//             },
//           ],
//         },
//       },
//     ],
//   },

//   // ===========================
//   //  Social Media Report
//   // ===========================
//   {
//     id: uuidv4(),
//     name: "Social Media Report",
//     theme: "Minimal",
//     slides: [
//       {
//         id: uuidv4(),
//         slideName: "Report Overview",
//         type: "blank-card",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "title",
//               content: "Social Media Performance Report",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "A complete analysis of our social growth.",
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "Audience Growth",
//         type: "twoColumnsWithHeadings",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "heading3",
//               content: "Instagram",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "Growth: 20% this month",
//             },
//             {
//               id: uuidv4(),
//               type: "heading3",
//               content: "Twitter",
//             },
//             {
//               id: uuidv4(),
//               type: "paragraph",
//               content: "Growth: 15% this month",
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "Top Performing Content",
//         type: "twoImageColumns",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "heading2",
//               content: "Best Performing Posts",
//             },
//           ],
//         },
//       },
//       {
//         id: uuidv4(),
//         slideName: "Future Strategies",
//         type: "todoList",
//         content: {
//           id: uuidv4(),
//           type: "column",
//           content: [
//             {
//               id: uuidv4(),
//               type: "bulletList",
//               content: [
//                 "Increase video content",
//                 "Collaborate with influencers",
//                 "Boost social ad budget",
//               ],
//             },
//           ],
//         },
//       },
//     ],
//   },
// ];

// Templates test 1 -------------------------------------------------------------------------------------------------------------------------
export const templates: Template[] = [
  // Business template

  {
    id: uuidv4(),
    name: "Quarterly Business Review",
    description:
      "Professional template for business presentations and quarterly reviews",
    category: { id: "business", name: "Business" },
    thumbnail:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop",
    outlines: [
      { id: uuidv4(), title: "Title Slide", order: 1 },
      { id: uuidv4(), title: "Financial Highlights", order: 2 },
      { id: uuidv4(), title: "Financial Table", order: 3 },
      { id: uuidv4(), title: "Strategic Initiatives", order: 4 },
      { id: uuidv4(), title: "Success Metrics & Development", order: 5 },
      { id: uuidv4(), title: "Outlook & Next Steps", order: 6 },
    ],
    slides: [
      {
        id: uuidv4(),
        type: "accentLeft",
        slideOrder: 1,
        content: {
          id: uuidv4(),
          name: "Column",
          type: "column",
          content: [
            {
              id: uuidv4(),
              name: "Resizable column",
              type: "resizable-column",
              content: [
                {
                  id: uuidv4(),
                  alt: "Business chart showing growth",
                  name: "Image",
                  type: "image",
                  content:
                    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
                },
              ],
              restrictToDrop: true,
            },
            {
              id: uuidv4(),
              name: "Column",
              type: "column",
              content: [
                {
                  id: uuidv4(),
                  name: "Heading1",
                  type: "heading1",
                  content: "Q2 2023 Business Review",
                  placeholder: "Heading1",
                },
                {
                  id: uuidv4(),
                  name: "Paragraph",
                  type: "paragraph",
                  content:
                    "Comprehensive overview of our business performance and strategic initiatives for the second quarter.",
                  placeholder: "start typing here...",
                },
              ],
              className: "w-full h-full p-8 flex justify-center items-center",
              placeholder: "Heading1",
            },
          ],
          restrictToDrop: true,
        },
        className: "min-h-[300px]",
        slideName: "Title Slide",
      },
      {
        id: uuidv4(),
        slideOrder: 2,
        type: "twoColumnsWithHeadings",
        content: {
          id: uuidv4(),
          name: "Column",
          type: "column",
          content: [
            {
              id: uuidv4(),
              name: "Heading3",
              type: "heading3",
              content: "Revenue Growth",
              placeholder: "Heading3",
            },
            {
              id: uuidv4(),
              name: "Paragraph",
              type: "paragraph",
              content:
                "We've seen a 15% increase in revenue compared to last quarter.",
              placeholder: "start typing here...",
            },
            {
              id: uuidv4(),
              name: "Bullet List",
              type: "bulletList",
              content: [
                "New enterprise clients",
                "Upselling to existing customers",
                "Expansion into new markets",
              ],
            },
            {
              id: uuidv4(),
              name: "Column",
              type: "column",
              content: [
                {
                  id: uuidv4(),
                  name: "Heading3",
                  type: "heading3",
                  content: "Cost Optimization",
                  placeholder: "Heading3",
                },
                {
                  id: uuidv4(),
                  name: "Paragraph",
                  type: "paragraph",
                  content:
                    "Our cost-cutting initiatives have resulted in a 12% reduction in operational expenses.",
                  placeholder: "start typing here...",
                },
                {
                  id: uuidv4(),
                  name: "Bullet List",
                  type: "bulletList",
                  content: [
                    "Process automation",
                    "Vendor consolidation",
                    "Remote work policies",
                  ],
                },
              ],
              className: "w-full h-full p-8 flex justify-center items-center",
              placeholder: "Heading3",
              restrictToDrop: true,
            },
          ],
          className: "w-full h-full p-8 flex justify-center items-center",
          placeholder: "Heading3",
          restrictToDrop: true,
        },
        className: "min-h-[300px]",
        slideName: "Financial Highlights",
      },
      {
        id: uuidv4(),
        slideOrder: 3,
        type: "tableLayout",
        content: {
          id: uuidv4(),
          name: "Column",
          type: "column",
          content: [
            {
              id: uuidv4(),
              name: "Heading2",
              type: "heading2",
              content: "Q2 Financial Summary",
              placeholder: "Heading2",
            },
            {
              id: uuidv4(),
              name: "Table",
              type: "table",
              content: [
                ["Metric", "Q1 2023", "Q2 2023", "Change", "YoY Change"],
                ["Revenue", "$4.2M", "$4.8M", "+15%", "+22%"],
                ["EBITDA", "$1.1M", "$1.3M", "+18%", "+25%"],
                ["Operating Expenses", "$2.5M", "$2.2M", "-12%", "-8%"],
                ["Customer Acquisition Cost", "$420", "$380", "-10%", "-15%"],
                ["Customer Retention", "87%", "92%", "+5%", "+8%"],
              ],
            },
          ],
          restrictToDrop: true,
        },
        className: "min-h-[300px]",
        slideName: "Financial Table",
      },
      {
        id: uuidv4(),
        slideOrder: 4,
        type: "textAndImage",
        content: {
          id: uuidv4(),
          name: "Column",
          type: "column",
          content: [
            {
              id: uuidv4(),
              name: "Column",
              type: "column",
              content: [
                {
                  id: uuidv4(),
                  name: "Heading2",
                  type: "heading2",
                  content: "Strategic Initiatives",
                  placeholder: "Heading2",
                },
                {
                  id: uuidv4(),
                  name: "Paragraph",
                  type: "paragraph",
                  content:
                    "Key initiatives driving our business growth and market expansion.",
                  placeholder: "start typing here...",
                },
                {
                  id: uuidv4(),
                  name: "Bullet List",
                  type: "bulletList",
                  content: [
                    "Digital transformation acceleration",
                    "Market expansion in APAC region",
                    "Product portfolio diversification",
                    "Operational excellence program",
                  ],
                },
              ],
              className: "w-full h-full p-8 flex justify-center items-center",
            },
            {
              id: uuidv4(),
              alt: "Business strategy meeting",
              name: "Image",
              type: "image",
              content:
                "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2940&auto=format&fit=crop",
            },
          ],
          restrictToDrop: true,
        },
        className: "min-h-[300px]",
        slideName: "Strategic Initiatives",
      },
      {
        id: uuidv4(),
        slideOrder: 5,
        type: "twoColumns",
        content: {
          id: uuidv4(),
          name: "Column",
          type: "column",
          content: [
            {
              id: uuidv4(),
              name: "Heading3",
              type: "heading3",
              content: "Customer Success Metrics",
              placeholder: "Heading3",
            },
            {
              id: uuidv4(),
              name: "Paragraph",
              type: "paragraph",
              content:
                "Our customer-centric approach is yielding positive results.",
              placeholder: "start typing here...",
            },
            {
              id: uuidv4(),
              name: "Bullet List",
              type: "bulletList",
              content: [
                "NPS increased to 72 (+8)",
                "Customer satisfaction at 94%",
                "Support response time reduced by 35%",
              ],
            },
            {
              id: uuidv4(),
              name: "Column",
              type: "column",
              content: [
                {
                  id: uuidv4(),
                  name: "Heading3",
                  type: "heading3",
                  content: "Product Development",
                  placeholder: "Heading3",
                },
                {
                  id: uuidv4(),
                  name: "Paragraph",
                  type: "paragraph",
                  content: "Innovation milestones achieved in Q2 2023.",
                  placeholder: "start typing here...",
                },
                {
                  id: uuidv4(),
                  name: "Bullet List",
                  type: "bulletList",
                  content: [
                    "3 major product releases",
                    "15 new features deployed",
                    "Development velocity increased by 22%",
                    "Technical debt reduced by 18%",
                  ],
                },
              ],
              className: "w-full h-full p-8 flex justify-center items-center",
              placeholder: "Heading3",
              restrictToDrop: true,
            },
          ],
          className: "w-full h-full p-8 flex justify-center items-center",
          placeholder: "Heading3",
          restrictToDrop: true,
        },
        className: "min-h-[300px]",
        slideName: "Success Metrics & Development",
      },
      {
        id: uuidv4(),
        slideOrder: 6,
        type: "accentRight",
        content: {
          id: uuidv4(),
          name: "Column",
          type: "column",
          content: [
            {
              id: uuidv4(),
              name: "Column",
              type: "column",
              content: [
                {
                  id: uuidv4(),
                  name: "Heading2",
                  type: "heading2",
                  content: "Q3 Outlook & Next Steps",
                  placeholder: "Heading2",
                },
                {
                  id: uuidv4(),
                  name: "Paragraph",
                  type: "paragraph",
                  content: "Our strategic focus for the upcoming quarter.",
                  placeholder: "start typing here...",
                },
                {
                  id: uuidv4(),
                  name: "Bullet List",
                  type: "bulletList",
                  content: [
                    "Accelerate enterprise sales pipeline",
                    "Launch Customer Success 2.0 program",
                    "Expand engineering team by 15%",
                    "Prepare for Series C funding round",
                  ],
                },
              ],
              className: "w-full h-full p-8 flex justify-center items-center",
            },
            {
              id: uuidv4(),
              name: "Resizable column",
              type: "resizable-column",
              content: [
                {
                  id: uuidv4(),
                  alt: "Future business growth concept",
                  name: "Image",
                  type: "image",
                  content:
                    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2815&auto=format&fit=crop",
                },
              ],
              restrictToDrop: true,
            },
          ],
          restrictToDrop: true,
        },
        className: "min-h-[300px]",
        slideName: "Outlook & Next Steps",
      },
    ],
  },
  // Creative template
  {
    id: uuidv4(),
    name: "Creative Portfolio",
    description:
      "Visually stunning template for creative professionals, portfolios, and design presentations",
    category: { id: "creative", name: "Creative" },
    thumbnail:
      "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?q=80&w=2940&auto=format&fit=crop",
    outlines: [
      { id: uuidv4(), title: "Creative Introduction", order: 1 },
      { id: uuidv4(), title: "Creative Process", order: 2 },
      { id: uuidv4(), title: "Portfolio Showcase", order: 3 },
      { id: uuidv4(), title: "Services & Pricing", order: 4 },
      { id: uuidv4(), title: "Client Testimonials", order: 5 },
      { id: uuidv4(), title: "Contact & Next Steps", order: 6 },
    ],
    slides: [
      {
        id: uuidv4(),
        type: "accentLeft",
        slideOrder: 1,
        content: {
          id: uuidv4(),
          name: "Column",
          type: "column",
          content: [
            {
              id: uuidv4(),
              name: "Resizable column",
              type: "resizable-column",
              content: [
                {
                  id: uuidv4(),
                  alt: "Creative workspace with design elements and vibrant colors",
                  name: "Image",
                  type: "image",
                  content:
                    "https://images.unsplash.com/photo-1534531173927-aeb928d54385?q=80&w=2940&auto=format&fit=crop",
                },
              ],
              restrictToDrop: true,
            },
            {
              id: uuidv4(),
              name: "Column",
              type: "column",
              content: [
                {
                  id: uuidv4(),
                  name: "Heading1",
                  type: "heading1",
                  content: "Creative Vision 2024",
                  placeholder: "Heading1",
                },
                {
                  id: uuidv4(),
                  name: "Paragraph",
                  type: "paragraph",
                  content:
                    "Showcasing our design philosophy, creative process, and innovative solutions for modern brands.",
                  placeholder: "start typing here...",
                },
              ],
              className: "w-full h-full p-8 flex justify-center items-center",
              placeholder: "Heading1",
            },
          ],
          restrictToDrop: true,
        },
        className: "min-h-[300px]",
        slideName: "Creative Introduction",
      },
      {
        id: uuidv4(),
        slideOrder: 2,
        type: "threeColumnsWithHeadings",
        content: {
          id: uuidv4(),
          name: "Column",
          type: "column",
          content: [
            {
              id: uuidv4(),
              name: "Heading2",
              type: "heading2",
              content: "Our Creative Process",
              placeholder: "Heading2",
            },
            {
              id: uuidv4(),
              name: "Column",
              type: "column",
              content: [
                {
                  id: uuidv4(),
                  name: "Heading3",
                  type: "heading3",
                  content: "Discovery",
                  placeholder: "Heading3",
                },
                {
                  id: uuidv4(),
                  name: "Paragraph",
                  type: "paragraph",
                  content:
                    "We immerse ourselves in your brand and audience to understand core needs.",
                  placeholder: "start typing here...",
                },
              ],
              className: "p-4",
            },
            {
              id: uuidv4(),
              name: "Column",
              type: "column",
              content: [
                {
                  id: uuidv4(),
                  name: "Heading3",
                  type: "heading3",
                  content: "Creation",
                  placeholder: "Heading3",
                },
                {
                  id: uuidv4(),
                  name: "Paragraph",
                  type: "paragraph",
                  content:
                    "Our designers craft visual solutions that align with your strategic goals.",
                  placeholder: "start typing here...",
                },
              ],
              className: "p-4",
            },
            {
              id: uuidv4(),
              name: "Column",
              type: "column",
              content: [
                {
                  id: uuidv4(),
                  name: "Heading3",
                  type: "heading3",
                  content: "Refinement",
                  placeholder: "Heading3",
                },
                {
                  id: uuidv4(),
                  name: "Paragraph",
                  type: "paragraph",
                  content:
                    "We iterate and perfect our work until it exceeds expectation and delivers impact.",
                  placeholder: "start typing here...",
                },
              ],
              className: "p-4",
            },
          ],
          restrictToDrop: true,
        },
        className: "min-h-[300px]",
        slideName: "Creative Process",
      },
      {
        id: uuidv4(),
        slideOrder: 3,
        type: "twoImageColumns",
        content: {
          id: uuidv4(),
          name: "Column",
          type: "column",
          content: [
            {
              id: uuidv4(),
              name: "Heading2",
              type: "heading2",
              content: "Portfolio Highlights",
              placeholder: "Heading2",
            },
            {
              id: uuidv4(),
              name: "Column",
              type: "column",
              content: [
                {
                  id: uuidv4(),
                  alt: "Brand identity design with logo mockups",
                  name: "Image",
                  type: "image",
                  content:
                    "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
                },
                {
                  id: uuidv4(),
                  name: "Heading3",
                  type: "heading3",
                  content: "Brand Identity",
                  placeholder: "Heading3",
                },
                {
                  id: uuidv4(),
                  name: "Paragraph",
                  type: "paragraph",
                  content:
                    "Creating distinctive visual identities that capture brand essence and resonate with audiences.",
                  placeholder: "start typing here...",
                },
              ],
              className: "p-4",
            },
            {
              id: uuidv4(),
              name: "Column",
              type: "column",
              content: [
                {
                  id: uuidv4(),
                  alt: "Digital interface design for mobile application",
                  name: "Image",
                  type: "image",
                  content:
                    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
                },
                {
                  id: uuidv4(),
                  name: "Heading3",
                  type: "heading3",
                  content: "UI/UX Design",
                  placeholder: "Heading3",
                },
                {
                  id: uuidv4(),
                  name: "Paragraph",
                  type: "paragraph",
                  content:
                    "Crafting intuitive digital experiences that balance form and function for maximum user engagement.",
                  placeholder: "start typing here...",
                },
              ],
              className: "p-4",
            },
          ],
          restrictToDrop: true,
        },
        className: "min-h-[300px]",
        slideName: "Portfolio Showcase",
      },
      {
        id: uuidv4(),
        slideOrder: 4,
        type: "tableLayout",
        content: {
          id: uuidv4(),
          name: "Column",
          type: "column",
          content: [
            {
              id: uuidv4(),
              name: "Heading2",
              type: "heading2",
              content: "Design Services & Pricing",
              placeholder: "Heading2",
            },
            {
              id: uuidv4(),
              name: "Table",
              type: "table",
              content: [
                ["Service", "Deliverables", "Timeline", "Investment"],
                [
                  "Brand Identity",
                  "Logo, Guidelines, Assets",
                  "3-4 weeks",
                  "$2,500-5,000",
                ],
                [
                  "Web Design",
                  "Wireframes, UI Design, Prototype",
                  "4-6 weeks",
                  "$3,500-7,000",
                ],
                [
                  "Print Design",
                  "Business Cards, Brochures, Packaging",
                  "2-3 weeks",
                  "$1,500-3,000",
                ],
                [
                  "Social Media",
                  "Templates, Campaign Assets",
                  "1-2 weeks",
                  "$1,000-2,500",
                ],
              ],
            },
          ],
          restrictToDrop: true,
        },
        className: "min-h-[300px]",
        slideName: "Services & Pricing",
      },
      {
        id: uuidv4(),
        slideOrder: 5,
        type: "textAndImage",
        content: {
          id: uuidv4(),
          name: "Column",
          type: "column",
          content: [
            {
              id: uuidv4(),
              name: "Column",
              type: "column",
              content: [
                {
                  id: uuidv4(),
                  name: "Heading2",
                  type: "heading2",
                  content: "Client Testimonials",
                  placeholder: "Heading2",
                },
                {
                  id: uuidv4(),
                  name: "Blockquote",
                  type: "blockquote",
                  content:
                    "Their creative team transformed our brand from ordinary to extraordinary. The attention to detail and strategic thinking behind each design decision was impressive.",
                },
                {
                  id: uuidv4(),
                  name: "Paragraph",
                  type: "paragraph",
                  content:
                    "— Sarah Johnson, Marketing Director at Elevate Brands",
                  placeholder: "start typing here...",
                },
                {
                  id: uuidv4(),
                  name: "Blockquote",
                  type: "blockquote",
                  content:
                    "Working with this creative team gave us exactly what we needed: a visual identity that communicates our values and resonates with our audience.",
                },
                {
                  id: uuidv4(),
                  name: "Paragraph",
                  type: "paragraph",
                  content: "— Michael Chen, Founder of Nexus Technologies",
                  placeholder: "start typing here...",
                },
              ],
              className: "w-full h-full p-8 flex justify-center items-center",
            },
            {
              id: uuidv4(),
              alt: "Happy clients in a creative meeting",
              name: "Image",
              type: "image",
              content:
                "https://images.unsplash.com/photo-1559223607-a43c990c692c?q=80&w=2940&auto=format&fit=crop",
            },
          ],
          restrictToDrop: true,
        },
        className: "min-h-[300px]",
        slideName: "Client Testimonials",
      },
      {
        id: uuidv4(),
        slideOrder: 6,
        type: "accentRight",
        content: {
          id: uuidv4(),
          name: "Column",
          type: "column",
          content: [
            {
              id: uuidv4(),
              name: "Column",
              type: "column",
              content: [
                {
                  id: uuidv4(),
                  name: "Heading2",
                  type: "heading2",
                  content: "Let's Create Together",
                  placeholder: "Heading2",
                },
                {
                  id: uuidv4(),
                  name: "Paragraph",
                  type: "paragraph",
                  content:
                    "Ready to transform your visual identity and create meaningful connections with your audience?",
                  placeholder: "start typing here...",
                },
                {
                  id: uuidv4(),
                  name: "Bullet List",
                  type: "bulletList",
                  content: [
                    "Free initial consultation",
                    "Customized project proposals",
                    "Dedicated creative team",
                    "Ongoing support and collaboration",
                  ],
                },
                {
                  id: uuidv4(),
                  name: "Paragraph",
                  type: "paragraph",
                  content:
                    "Contact us: hello@creativestudio.com | (555) 123-4567",
                  placeholder: "start typing here...",
                },
              ],
              className: "w-full h-full p-8 flex justify-center items-center",
            },
            {
              id: uuidv4(),
              name: "Resizable column",
              type: "resizable-column",
              content: [
                {
                  id: uuidv4(),
                  alt: "Creative workspace with design tools and inspiration board",
                  name: "Image",
                  type: "image",
                  content:
                    "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=3069&auto=format&fit=crop",
                },
              ],
              restrictToDrop: true,
            },
          ],
          restrictToDrop: true,
        },
        className: "min-h-[300px]",
        slideName: "Contact & Next Steps",
      },
    ],
  },
  // Data template
  {
    id: uuidv4(),
    name: "Data Analytics",
    description:
      "Professional template for data presentations, analytics reports, and insights visualization",
    category: { id: "data", name: "Data" },
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
    outlines: [
      { id: uuidv4(), title: "Data Overview", order: 1 },
      { id: uuidv4(), title: "Key Metrics", order: 2 },
      { id: uuidv4(), title: "Data Comparison", order: 3 },
      { id: uuidv4(), title: "Regional Analysis", order: 4 },
      { id: uuidv4(), title: "Key Insights", order: 5 },
      { id: uuidv4(), title: "Recommendations", order: 6 },
    ],
    slides: [
      {
        id: uuidv4(),
        type: "accentLeft",
        slideOrder: 1,
        content: {
          id: uuidv4(),
          name: "Column",
          type: "column",
          content: [
            {
              id: uuidv4(),
              name: "Resizable column",
              type: "resizable-column",
              content: [
                {
                  id: uuidv4(),
                  alt: "Data visualization dashboard with charts and graphs",
                  name: "Image",
                  type: "image",
                  content:
                    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
                },
              ],
              restrictToDrop: true,
            },
            {
              id: uuidv4(),
              name: "Column",
              type: "column",
              content: [
                {
                  id: uuidv4(),
                  name: "Heading1",
                  type: "heading1",
                  content: "2024 Data Insights",
                  placeholder: "Heading1",
                },
                {
                  id: uuidv4(),
                  name: "Paragraph",
                  type: "paragraph",
                  content:
                    "A comprehensive analysis of key metrics, trends, and actionable insights for data-driven decision making.",
                  placeholder: "start typing here...",
                },
              ],
              className: "w-full h-full p-8 flex justify-center items-center",
              placeholder: "Heading1",
            },
          ],
          restrictToDrop: true,
        },
        className: "min-h-[300px]",
        slideName: "Data Overview",
      },
      {
        id: uuidv4(),
        slideOrder: 2,
        type: "threeColumnsWithHeadings",
        content: {
          id: uuidv4(),
          name: "Column",
          type: "column",
          content: [
            {
              id: uuidv4(),
              name: "Heading2",
              type: "heading2",
              content: "Key Performance Indicators",
              placeholder: "Heading2",
            },
            {
              id: uuidv4(),
              name: "Column",
              type: "column",
              content: [
                {
                  id: uuidv4(),
                  name: "Heading3",
                  type: "heading3",
                  content: "Revenue Growth",
                  placeholder: "Heading3",
                },
                {
                  id: uuidv4(),
                  name: "Paragraph",
                  type: "paragraph",
                  content:
                    "23% increase year-over-year, exceeding market expectations.",
                  placeholder: "start typing here...",
                },
              ],
              className: "p-4",
            },
            {
              id: uuidv4(),
              name: "Column",
              type: "column",
              content: [
                {
                  id: uuidv4(),
                  name: "Heading3",
                  type: "heading3",
                  content: "User Acquisition",
                  placeholder: "Heading3",
                },
                {
                  id: uuidv4(),
                  name: "Paragraph",
                  type: "paragraph",
                  content:
                    "42K new users this quarter, with 68% retention rate.",
                  placeholder: "start typing here...",
                },
              ],
              className: "p-4",
            },
            {
              id: uuidv4(),
              name: "Column",
              type: "column",
              content: [
                {
                  id: uuidv4(),
                  name: "Heading3",
                  type: "heading3",
                  content: "Conversion Rate",
                  placeholder: "Heading3",
                },
                {
                  id: uuidv4(),
                  name: "Paragraph",
                  type: "paragraph",
                  content:
                    "3.8% average conversion, up 1.2 percentage points from last period.",
                  placeholder: "start typing here...",
                },
              ],
              className: "p-4",
            },
          ],
          restrictToDrop: true,
        },
        className: "min-h-[300px]",
        slideName: "Key Metrics",
      },
      {
        id: uuidv4(),
        slideOrder: 3,
        type: "tableLayout",
        content: {
          id: uuidv4(),
          name: "Column",
          type: "column",
          content: [
            {
              id: uuidv4(),
              name: "Heading2",
              type: "heading2",
              content: "Quarterly Comparison",
              placeholder: "Heading2",
            },
            {
              id: uuidv4(),
              name: "Table",
              type: "table",
              content: [
                ["Metric", "Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024"],
                ["Total Users", "128,450", "152,680", "187,920", "210,340"],
                ["Avg. Session Duration", "4:32", "5:18", "6:07", "5:52"],
                ["Bounce Rate", "42.3%", "38.7%", "34.2%", "32.8%"],
                ["Revenue per User", "$24.50", "$27.80", "$31.20", "$34.70"],
              ],
            },
          ],
          restrictToDrop: true,
        },
        className: "min-h-[300px]",
        slideName: "Data Comparison",
      },
      {
        id: uuidv4(),
        slideOrder: 4,
        type: "twoImageColumns",
        content: {
          id: uuidv4(),
          name: "Column",
          type: "column",
          content: [
            {
              id: uuidv4(),
              name: "Heading2",
              type: "heading2",
              content: "Regional Performance",
              placeholder: "Heading2",
            },
            {
              id: uuidv4(),
              name: "Column",
              type: "column",
              content: [
                {
                  id: uuidv4(),
                  alt: "Map visualization showing North America market data",
                  name: "Image",
                  type: "image",
                  content:
                    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2940&auto=format&fit=crop",
                },
                {
                  id: uuidv4(),
                  name: "Heading3",
                  type: "heading3",
                  content: "North America",
                  placeholder: "Heading3",
                },
                {
                  id: uuidv4(),
                  name: "Paragraph",
                  type: "paragraph",
                  content:
                    "Market share increased by 12% with significant growth in enterprise segment.",
                  placeholder: "start typing here...",
                },
              ],
              className: "p-4",
            },
            {
              id: uuidv4(),
              name: "Column",
              type: "column",
              content: [
                {
                  id: uuidv4(),
                  alt: "Map visualization showing EMEA region market data",
                  name: "Image",
                  type: "image",
                  content:
                    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2940&auto=format&fit=crop",
                },
                {
                  id: uuidv4(),
                  name: "Heading3",
                  type: "heading3",
                  content: "EMEA Region",
                  placeholder: "Heading3",
                },
                {
                  id: uuidv4(),
                  name: "Paragraph",
                  type: "paragraph",
                  content:
                    "46% growth in new markets with strong adoption in financial services sector.",
                  placeholder: "start typing here...",
                },
              ],
              className: "p-4",
            },
          ],
          restrictToDrop: true,
        },
        className: "min-h-[300px]",
        slideName: "Regional Analysis",
      },
      {
        id: uuidv4(),
        slideOrder: 5,
        type: "textAndImage",
        content: {
          id: uuidv4(),
          name: "Column",
          type: "column",
          content: [
            {
              id: uuidv4(),
              name: "Column",
              type: "column",
              content: [
                {
                  id: uuidv4(),
                  name: "Heading2",
                  type: "heading2",
                  content: "Key Insights & Trends",
                  placeholder: "Heading2",
                },
                {
                  id: uuidv4(),
                  name: "Bullet List",
                  type: "bulletList",
                  content: [
                    "Mobile traffic increased to 78% of total sessions",
                    "AI-powered recommendations improved conversion by 28%",
                    "User segmentation shows highest growth in 25-34 demographic",
                    "Average order value increased 18% following UX improvements",
                    "Customer acquisition cost decreased by 12% through channel optimization",
                  ],
                },
              ],
              className: "w-full h-full p-8 flex justify-center items-center",
            },
            {
              id: uuidv4(),
              alt: "Data trend visualization with colored charts and statistics",
              name: "Image",
              type: "image",
              content:
                "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2940&auto=format&fit=crop",
            },
          ],
          restrictToDrop: true,
        },
        className: "min-h-[300px]",
        slideName: "Key Insights",
      },
      {
        id: uuidv4(),
        slideOrder: 6,
        type: "accentRight",
        content: {
          id: uuidv4(),
          name: "Column",
          type: "column",
          content: [
            {
              id: uuidv4(),
              name: "Column",
              type: "column",
              content: [
                {
                  id: uuidv4(),
                  name: "Heading2",
                  type: "heading2",
                  content: "Strategic Recommendations",
                  placeholder: "Heading2",
                },
                {
                  id: uuidv4(),
                  name: "Paragraph",
                  type: "paragraph",
                  content:
                    "Based on our comprehensive data analysis, we recommend the following action items:",
                  placeholder: "start typing here...",
                },
                {
                  id: uuidv4(),
                  name: "Bullet List",
                  type: "bulletList",
                  content: [
                    "Increase investment in high-converting marketing channels",
                    "Optimize customer journey for mobile-first experience",
                    "Expand AI capabilities for personalized recommendations",
                    "Develop targeted campaigns for the growing 25-34 demographic",
                    "Implement enhanced analytics tracking for deeper insights",
                  ],
                },
              ],
              className: "w-full h-full p-8 flex justify-center items-center",
            },
            {
              id: uuidv4(),
              name: "Resizable column",
              type: "resizable-column",
              content: [
                {
                  id: uuidv4(),
                  alt: "Strategic planning with data visualization dashboards",
                  name: "Image",
                  type: "image",
                  content:
                    "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=2940&auto=format&fit=crop",
                },
              ],
              restrictToDrop: true,
            },
          ],
          restrictToDrop: true,
        },
        className: "min-h-[300px]",
        slideName: "Recommendations",
      },
    ],
  },
  // Minimalist template
  // {
  //   id: uuidv4(),
  //   name: "Minimalist Presentation",
  //   description: "Clean, simple design for impactful presentations",
  //   category: { id: "minimalist", name: "Minimalist" },
  //   thumbnail:
  //     "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=2940&auto=format&fit=crop",
  //   slides: [
  //     {
  //       id: uuidv4(),
  //       slideOrder: 1,
  //       type: "accentLeft",
  //       content: {
  //         id: uuidv4(),
  //         name: "Column",
  //         type: "column",
  //         content: [
  //           {
  //             id: uuidv4(),
  //             name: "Column",
  //             type: "column",
  //             content: [
  //               {
  //                 id: uuidv4(),
  //                 name: "Heading1",
  //                 type: "heading1",
  //                 content: "Minimalist Approach",
  //                 placeholder: "Heading1",
  //               },
  //               {
  //                 id: uuidv4(),
  //                 name: "Paragraph",
  //                 type: "paragraph",
  //                 content: "Less is more. Focus on what truly matters.",
  //                 placeholder: "start typing here...",
  //               },
  //             ],
  //             className: "w-full h-full p-8 flex justify-center items-center",
  //             placeholder: "Heading1",
  //           },
  //         ],
  //         restrictToDrop: true,
  //       },
  //       className: "min-h-[300px]",
  //       slideName: "Title Slide",
  //     },
  //     {
  //       id: uuidv4(),
  //       slideOrder: 2,
  //       type: "twoColumns",
  //       content: {
  //         id: uuidv4(),
  //         name: "Column",
  //         type: "column",
  //         content: [
  //           {
  //             id: uuidv4(),
  //             name: "Heading2",
  //             type: "heading2",
  //             content: "Core Principles",
  //             placeholder: "Heading2",
  //           },
  //           {
  //             id: uuidv4(),
  //             name: "Bullet List",
  //             type: "bulletList",
  //             content: [
  //               "Simplicity in design",
  //               "Focus on essential content",
  //               "Eliminate distractions",
  //               "Clean typography",
  //             ],
  //           },
  //           {
  //             id: uuidv4(),
  //             name: "Column",
  //             type: "column",
  //             content: [
  //               {
  //                 id: uuidv4(),
  //                 name: "Blockquote",
  //                 type: "blockquote",
  //                 content:
  //                   "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.",
  //               },
  //               {
  //                 id: uuidv4(),
  //                 name: "Paragraph",
  //                 type: "paragraph",
  //                 content: "— Antoine de Saint-Exupéry",
  //                 placeholder: "start typing here...",
  //               },
  //             ],
  //             className: "w-full h-full p-8 flex justify-center items-center",
  //             placeholder: "Quote",
  //             restrictToDrop: true,
  //           },
  //         ],
  //         className: "w-full h-full p-8 flex justify-center items-center",
  //         placeholder: "Heading2",
  //         restrictToDrop: true,
  //       },
  //       className: "min-h-[300px]",
  //       slideName: "Principles",
  //     },
  //   ],
  // },

  {
    id: uuidv4(),
    name: "Minimalist Elegance",
    description:
      "Clean, simple design focused on essential content with refined typography and ample white space",
    category: { id: "minimalist", name: "Minimalist" },
    thumbnail:
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2940&auto=format&fit=crop",
    outlines: [
      { id: uuidv4(), title: "Minimalist Introduction", order: 1 },
      { id: uuidv4(), title: "Core Principles", order: 2 },
      { id: uuidv4(), title: "Design Elements", order: 3 },
      { id: uuidv4(), title: "Comparison", order: 4 },
      { id: uuidv4(), title: "Philosophy", order: 5 },
      { id: uuidv4(), title: "Next Steps", order: 6 },
    ],
    slides: [
      {
        id: uuidv4(),
        type: "accentLeft",
        slideOrder: 1,
        content: {
          id: uuidv4(),
          name: "Column",
          type: "column",
          content: [
            {
              id: uuidv4(),
              name: "Resizable column",
              type: "resizable-column",
              content: [
                {
                  id: uuidv4(),
                  alt: "Minimalist workspace with white desk and simple objects",
                  name: "Image",
                  type: "image",
                  content:
                    "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=2787&auto=format&fit=crop",
                },
              ],
              restrictToDrop: true,
            },
            {
              id: uuidv4(),
              name: "Column",
              type: "column",
              content: [
                {
                  id: uuidv4(),
                  name: "Heading1",
                  type: "heading1",
                  content: "Less is more.",
                  placeholder: "Heading1",
                },
                {
                  id: uuidv4(),
                  name: "Paragraph",
                  type: "paragraph",
                  content:
                    "Clarity through simplicity. Focusing on what truly matters.",
                  placeholder: "start typing here...",
                },
              ],
              className: "w-full h-full p-8 flex justify-center items-center",
              placeholder: "Heading1",
            },
          ],
          restrictToDrop: true,
        },
        className: "min-h-[300px]",
        slideName: "Minimalist Introduction",
      },
      {
        id: uuidv4(),
        slideOrder: 2,
        type: "threeColumnsWithHeadings",
        content: {
          id: uuidv4(),
          name: "Column",
          type: "column",
          content: [
            {
              id: uuidv4(),
              name: "Heading2",
              type: "heading2",
              content: "Core Principles",
              placeholder: "Heading2",
            },
            {
              id: uuidv4(),
              name: "Column",
              type: "column",
              content: [
                {
                  id: uuidv4(),
                  name: "Heading3",
                  type: "heading3",
                  content: "Simplicity",
                  placeholder: "Heading3",
                },
                {
                  id: uuidv4(),
                  name: "Paragraph",
                  type: "paragraph",
                  content:
                    "Remove the unnecessary. Keep only what serves a purpose.",
                  placeholder: "start typing here...",
                },
              ],
              className: "p-4",
            },
            {
              id: uuidv4(),
              name: "Column",
              type: "column",
              content: [
                {
                  id: uuidv4(),
                  name: "Heading3",
                  type: "heading3",
                  content: "Clarity",
                  placeholder: "Heading3",
                },
                {
                  id: uuidv4(),
                  name: "Paragraph",
                  type: "paragraph",
                  content:
                    "Clear communication without distraction or ornamentation.",
                  placeholder: "start typing here...",
                },
              ],
              className: "p-4",
            },
            {
              id: uuidv4(),
              name: "Column",
              type: "column",
              content: [
                {
                  id: uuidv4(),
                  name: "Heading3",
                  type: "heading3",
                  content: "Focus",
                  placeholder: "Heading3",
                },
                {
                  id: uuidv4(),
                  name: "Paragraph",
                  type: "paragraph",
                  content:
                    "Emphasize the essential. Draw attention to what matters most.",
                  placeholder: "start typing here...",
                },
              ],
              className: "p-4",
            },
          ],
          restrictToDrop: true,
        },
        className: "min-h-[300px]",
        slideName: "Core Principles",
      },
      {
        id: uuidv4(),
        slideOrder: 3,
        type: "twoImageColumns",
        content: {
          id: uuidv4(),
          name: "Column",
          type: "column",
          content: [
            {
              id: uuidv4(),
              name: "Heading2",
              type: "heading2",
              content: "Minimalist Design",
              placeholder: "Heading2",
            },
            {
              id: uuidv4(),
              name: "Column",
              type: "column",
              content: [
                {
                  id: uuidv4(),
                  alt: "Clean, minimal interior design with monochrome palette",
                  name: "Image",
                  type: "image",
                  content:
                    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2940&auto=format&fit=crop",
                },
                {
                  id: uuidv4(),
                  name: "Heading3",
                  type: "heading3",
                  content: "Space",
                  placeholder: "Heading3",
                },
                {
                  id: uuidv4(),
                  name: "Paragraph",
                  type: "paragraph",
                  content:
                    "Using negative space as a design element. Allowing content to breathe.",
                  placeholder: "start typing here...",
                },
              ],
              className: "p-4",
            },
            {
              id: uuidv4(),
              name: "Column",
              type: "column",
              content: [
                {
                  id: uuidv4(),
                  alt: "Minimalist product with clean lines and simple form",
                  name: "Image",
                  type: "image",
                  content:
                    "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2940&auto=format&fit=crop",
                },
                {
                  id: uuidv4(),
                  name: "Heading3",
                  type: "heading3",
                  content: "Form",
                  placeholder: "Heading3",
                },
                {
                  id: uuidv4(),
                  name: "Paragraph",
                  type: "paragraph",
                  content:
                    "Clean lines, intentional composition, and refined aesthetics that communicate purpose.",
                  placeholder: "start typing here...",
                },
              ],
              className: "p-4",
            },
          ],
          restrictToDrop: true,
        },
        className: "min-h-[300px]",
        slideName: "Design Elements",
      },
      {
        id: uuidv4(),
        slideOrder: 4,
        type: "tableLayout",
        content: {
          id: uuidv4(),
          name: "Column",
          type: "column",
          content: [
            {
              id: uuidv4(),
              name: "Heading2",
              type: "heading2",
              content: "Simplified Approach",
              placeholder: "Heading2",
            },
            {
              id: uuidv4(),
              name: "Table",
              type: "table",
              content: [
                ["Element", "Traditional", "Minimalist"],
                [
                  "Typography",
                  "Multiple fonts, sizes, weights",
                  "Single typeface, limited variations",
                ],
                [
                  "Color",
                  "Expansive palette, gradients",
                  "Monochrome or limited palette",
                ],
                [
                  "Layout",
                  "Dense, filled spaces",
                  "Generous whitespace, breathing room",
                ],
                [
                  "Content",
                  "Comprehensive, detailed",
                  "Essential, focused on key points",
                ],
              ],
            },
          ],
          restrictToDrop: true,
        },
        className: "min-h-[300px]",
        slideName: "Comparison",
      },
      {
        id: uuidv4(),
        slideOrder: 5,
        type: "textAndImage",
        content: {
          id: uuidv4(),
          name: "Column",
          type: "column",
          content: [
            {
              id: uuidv4(),
              name: "Column",
              type: "column",
              content: [
                {
                  id: uuidv4(),
                  name: "Heading2",
                  type: "heading2",
                  content: "Minimal Impact",
                  placeholder: "Heading2",
                },
                {
                  id: uuidv4(),
                  name: "Paragraph",
                  type: "paragraph",
                  content:
                    "The minimalist approach extends beyond design to a philosophy of sustainable living and business practices.",
                  placeholder: "start typing here...",
                },
                {
                  id: uuidv4(),
                  name: "Bullet List",
                  type: "bulletList",
                  content: [
                    "Reduced resource consumption",
                    "Focus on quality over quantity",
                    "Intentional decision-making",
                    "Sustainable, long-lasting solutions",
                    "Clarity of purpose and vision",
                  ],
                },
              ],
              className: "w-full h-full p-8 flex justify-center items-center",
            },
            {
              id: uuidv4(),
              alt: "Minimalist lifestyle with few carefully selected objects",
              name: "Image",
              type: "image",
              content:
                "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?q=80&w=2938&auto=format&fit=crop",
            },
          ],
          restrictToDrop: true,
        },
        className: "min-h-[300px]",
        slideName: "Philosophy",
      },
      {
        id: uuidv4(),
        slideOrder: 6,
        type: "accentRight",
        content: {
          id: uuidv4(),
          name: "Column",
          type: "column",
          content: [
            {
              id: uuidv4(),
              name: "Column",
              type: "column",
              content: [
                {
                  id: uuidv4(),
                  name: "Heading2",
                  type: "heading2",
                  content: "Simply Begin",
                  placeholder: "Heading2",
                },
                {
                  id: uuidv4(),
                  name: "Paragraph",
                  type: "paragraph",
                  content:
                    "Start your minimalist journey with these essential steps:",
                  placeholder: "start typing here...",
                },
                {
                  id: uuidv4(),
                  name: "Bullet List",
                  type: "bulletList",
                  content: [
                    "Identify what truly matters",
                    "Remove the unnecessary",
                    "Create space for intention",
                    "Refine and iterate",
                    "Focus on quality over quantity",
                  ],
                },
                {
                  id: uuidv4(),
                  name: "Paragraph",
                  type: "paragraph",
                  content:
                    "Contact: hello@minimalist.design | @minimalist.design",
                  placeholder: "start typing here...",
                },
              ],
              className: "w-full h-full p-8 flex justify-center items-center",
            },
            {
              id: uuidv4(),
              name: "Resizable column",
              type: "resizable-column",
              content: [
                {
                  id: uuidv4(),
                  alt: "Minimalist workspace with single object on white background",
                  name: "Image",
                  type: "image",
                  content:
                    "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=2787&auto=format&fit=crop",
                },
              ],
              restrictToDrop: true,
            },
          ],
          restrictToDrop: true,
        },
        className: "min-h-[300px]",
        slideName: "Next Steps",
      },
    ],
  },

  // Study template
  {
    id: uuidv4(),
    name: "Academic Research",
    description:
      "Present your academic research with structured sections and clear information",
    category: { id: "study", name: "Study" },
    thumbnail:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2940&auto=format&fit=crop",
    outlines: [
      {
        id: uuidv4(),
        title: "Research Title",
        order: 1,
      },
      {
        id: uuidv4(),
        title: "Research Methods",
        order: 2,
      },
      {
        id: uuidv4(),
        title: "Research Findings",
        order: 3,
      },
    ],
    slides: [
      {
        id: uuidv4(),
        slideOrder: 1,
        type: "accentLeft",
        content: {
          id: uuidv4(),
          name: "Column",
          type: "column",
          content: [
            {
              id: uuidv4(),
              name: "Resizable column",
              type: "resizable-column",
              content: [
                {
                  id: uuidv4(),
                  alt: "Research illustration",
                  name: "Image",
                  type: "image",
                  content:
                    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2940&auto=format&fit=crop",
                },
              ],
              restrictToDrop: true,
            },
            {
              id: uuidv4(),
              name: "Column",
              type: "column",
              content: [
                {
                  id: uuidv4(),
                  name: "Heading1",
                  type: "heading1",
                  content: "Climate Change Impact on Urban Ecosystems",
                  placeholder: "Heading1",
                },
                {
                  id: uuidv4(),
                  name: "Paragraph",
                  type: "paragraph",
                  content:
                    "A comprehensive research study on the effects of climate change on urban biodiversity and ecosystem services.",
                  placeholder: "start typing here...",
                },
                {
                  id: uuidv4(),
                  name: "Paragraph",
                  type: "paragraph",
                  content:
                    "Dr. Emma Johnson • Department of Environmental Science",
                  placeholder: "start typing here...",
                },
              ],
              className: "w-full h-full p-8 flex justify-center items-center",
              placeholder: "Heading1",
            },
          ],
          restrictToDrop: true,
        },
        className: "min-h-[300px]",
        slideName: "Research Title",
      },
      {
        id: uuidv4(),
        slideOrder: 2,
        type: "twoColumnsWithHeadings",
        content: {
          id: uuidv4(),
          name: "Column",
          type: "column",
          content: [
            {
              id: uuidv4(),
              name: "Heading3",
              type: "heading3",
              content: "Research Objectives",
              placeholder: "Heading3",
            },
            {
              id: uuidv4(),
              name: "Numbered List",
              type: "numberedList",
              content: [
                "Evaluate temperature changes in urban centers over 50 years",
                "Document shifts in urban flora and fauna populations",
                "Analyze the impact on ecosystem services",
                "Develop adaptation strategies for urban planning",
              ],
            },
            {
              id: uuidv4(),
              name: "Column",
              type: "column",
              content: [
                {
                  id: uuidv4(),
                  name: "Heading3",
                  type: "heading3",
                  content: "Methodology",
                  placeholder: "Heading3",
                },
                {
                  id: uuidv4(),
                  name: "Bullet List",
                  type: "bulletList",
                  content: [
                    "Longitudinal data collection (1970-2023)",
                    "GIS mapping of urban heat islands",
                    "Biodiversity inventories in 15 major cities",
                    "Satellite imagery analysis",
                    "Interviews with urban ecologists and planners",
                  ],
                },
              ],
              className: "w-full h-full p-8 flex justify-center items-center",
              placeholder: "Heading3",
              restrictToDrop: true,
            },
          ],
          className: "w-full h-full p-8 flex justify-center items-center",
          placeholder: "Heading3",
          restrictToDrop: true,
        },
        className: "min-h-[300px]",
        slideName: "Research Methods",
      },
      {
        id: uuidv4(),
        slideOrder: 3,
        type: "tableLayout",
        content: {
          id: uuidv4(),
          name: "Column",
          type: "column",
          content: [
            {
              id: uuidv4(),
              name: "Heading2",
              type: "heading2",
              content: "Key Findings",
              placeholder: "Heading2",
            },
            {
              id: uuidv4(),
              name: "Table",
              type: "table",
              content: [
                [
                  "Urban Factor",
                  "1970s Baseline",
                  "Current Status",
                  "Change",
                  "Impact Level",
                ],
                ["Average Temperature", "21.2°C", "23.8°C", "+2.6°C", "High"],
                [
                  "Native Plant Species",
                  "423 species",
                  "387 species",
                  "-8.5%",
                  "Moderate",
                ],
                [
                  "Bird Populations",
                  "89 species",
                  "72 species",
                  "-19.1%",
                  "High",
                ],
                ["Urban Tree Canopy", "27.3%", "22.1%", "-5.2%", "High"],
                [
                  "Carbon Sequestration",
                  "18.4 Mt/year",
                  "15.2 Mt/year",
                  "-17.4%",
                  "High",
                ],
              ],
            },
          ],
          restrictToDrop: true,
        },
        className: "min-h-[300px]",
        slideName: "Research Findings",
      },
    ],
  },
];

export const categories: Category[] = [
  { id: "all", name: "All Templates" },
  { id: "business", name: "Business" },
  { id: "creative", name: "Creative" },
  { id: "data", name: "Data" },
  { id: "minimalist", name: "Minimalist" },
  { id: "study", name: "Study" },
];
