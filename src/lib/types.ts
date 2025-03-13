// Slide
export interface Slide {
  id: string;
  slideName: string;
  type: string;
  content: ContentItem;
  slideOrder: number;
  className?: string;
}

// Content Type
export type ContentType =
  | "column"
  | "resizable-column"
  | "text"
  | "paragraph"
  | "image"
  | "table"
  | "multiColumn"
  | "blank"
  | "imageAndText"
  | "heading1"
  | "heading2"
  | "heading3"
  | "heading4"
  | "title"
  | "blockquote"
  | "numberedList"
  | "bulletedList"
  | "code"
  | "link"
  | "quote"
  | "devider"
  | "todoList"
  | "bulletList"
  | "calloutBox"
  | "codeBlock"
  | "customButton"
  | "tableOfContents"
  | "divider"
  ;

// Content Item
export interface ContentItem {
  id: string;
  type: ContentType;
  name: string;
  content: ContentItem[] | string | string[] | string[][];
  initialRows?: number;
  initialColumns?: number;
  restrictToDrop?: boolean;
  columns?: number;
  placeholder?: string;
  className?: string;
  alt?: string;
  callOutType?: "success" | "warning" | "info" | "question" | "caution" | "note";
  link?: string;
  code?: string;
  codeBlock?: string;
  language?: string;
  bgColor?: string;
  divider? :string;
  isTransparent?: boolean;
}

// Theme
export interface Theme {
  name: string;
  fontFamily: string;
  fontColor: string;
  backgroundColor: string;
  slideBackgroundColor: string;
  accentColor: string;
  gradientBackground?: string;
  sidebarColor?: string;
  navbarColor?: string;
  type: 'light' | 'dark';
  category?: Category;
}

// Outline Card
export interface OutlineCard{
  title: string
  id: string
  order: number
}

// Layout Slides
export interface LayoutSlides {
  slideName: string
  content: ContentItem
  className?: string
  type: string
}

// Layout
export interface Layout{
  name: string
  icon: React.FC
  type: string
  component: LayoutSlides
  layoutType: string
}

// Layout Group
export interface LayoutGroup{
  name: string
  layouts: Layout[]
}

// Component
interface Component {
  name: string;
  icon: string;
  type: string;
  component: ContentItem;
  componentType: string;
}

// Component Group    
export interface ComponentGroup {
  name: string;
  components: Component[];
}

// Template
export interface Template {
  id: string;
  name: string;
  theme: string;
  slides: Slide[];
  category?: Category;
}


export type Category = {
  id: string;
  name: string;
}