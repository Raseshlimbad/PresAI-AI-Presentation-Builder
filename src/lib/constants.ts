import {
  AccentLeft,
  AccentRight,
  BlankCard,
  FourColumns,
  FourImageColumns,
  ImageAndText,
  TextAndImage,
  ThreeColumns,
  ThreeColumnsWithHeadings,
  ThreeImageColumns,
  TwoColumns,
  TwoColumnsWithHeadings,
  TwoImageColumns,
} from "@/lib/slideLayouts";
import { Home, Trash } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
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
import {
  Category,
  ComponentGroup,
  LayoutGroup,
  Template,
  Theme,
} from "./types";

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
    // {
    //   title: "Templates",
    //   url: "/templates",
    //   icon: LayoutTemplate,
    // },
    {
      title: "Trash",
      url: "/trash",
      icon: Trash,
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
