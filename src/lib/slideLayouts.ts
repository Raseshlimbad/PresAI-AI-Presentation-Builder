import { v4 as uuidv4 } from "uuid";
import { ContentType } from "./types";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;


// Blank Card
export const BlankCard = {
  slideName: "Blank card",
  type: "blank-card",
  className: "p-8 mx-auto flex justify-center items-center min-h-[200px]",
  content: {
    id: uuidv4(),
    type: "column" as ContentType,
    name: "Column",
    content: [
      {
        id: uuidv4(),
        type: "title" as ContentType,
        name: "Title",
        content: "",
        placeholder: "Untitled Card",
      },
    ],
  },
};

// Accent Left
export const AccentLeft = {
  slideName: "Accent left",
  type: "accentLeft",
  className: "min-h-[300px]",
  content: {
    id: uuidv4(),
    type: "column" as ContentType,
    name: "Column",
    restrictDropTo: true,
    content: [
      {
        id: uuidv4(),
        type: "resizable-column" as ContentType,
        name: "Resizable column",
        restrictToDrop: true,
        content: [
          {
            id: uuidv4(),
            type: "image" as ContentType,
            name: "Image",
            content:
              `https://res.cloudinary.com/${cloudName}/image/upload/v1742558363/nlgi63u4fnijpzm3slcm.jpg`,
            alt: "Title",
          },
          {
            id: uuidv4(),
            type: "column" as ContentType,
            name: "Column",
            content: [
              {
                id: uuidv4(),
                type: "heading1" as ContentType,
                name: "Heading1",
                content: "",
                placeholder: "Heading1",
              },
              {
                id: uuidv4(),
                type: "paragraph" as ContentType,
                name: "Paragraph",
                content: "",
                placeholder: "start typing here",
              },
            ],
            className: "w-full h-full p-8 flex justify-center items-center",
            placeholder: "Heading1",
          },
        ],
      },
    ],
  },
};

// Accent Right
export const AccentRight = {
  slideName: "Accent Right",
  type: "accentRight",
  className: "min-h-[300px]",
  content: {
    id: uuidv4(),
    type: "column" as ContentType,
    name: "Column",
    content: [
      {
        id: uuidv4(),
        type: "resizable-column" as ContentType,
        name: "Resizable column",
        restrictToDrop: true,
        content: [
          {
            id: uuidv4(),
            type: "column" as ContentType,
            name: "Column",
            content: [
              {
                id: uuidv4(),
                type: "heading1" as ContentType,
                name: "Heading1",
                content: "",
                placeholder: "Heading1",
              },
              {
                id: uuidv4(),
                type: "paragraph" as ContentType,
                name: "Paragraph",
                content: "",
                placeholder: "start typing here",
              },
            ],
            className: "w-full h-full p-8 flex justify-center items-center",
            placeholder: "Heading1",
          },
          {
            id: uuidv4(),
            type: "image" as ContentType,
            name: "Image",
            restrictToDrop: true,
            content:
              `https://res.cloudinary.com/${cloudName}/image/upload/v1742558363/nlgi63u4fnijpzm3slcm.jpg`,
            alt: "Title",
          },
        ],
      },
    ],
  },
};

// Image and Text
export const ImageAndText = {
  slideName: "Image and text",
  type: "imageAndText",
  className: "min-h-[200px] p-8 mx-auto flex justify-center items-center",
  content: {
    id: uuidv4(),
    type: "column" as ContentType,
    name: "Column",
    content: [
      {
        id: uuidv4(),
        type: "resizable-column" as ContentType,
        name: "Image and text",
        className: "border",
        content: [
          {
            id: uuidv4(),
            type: "column" as ContentType,
            name: "Column",
            content: [
              {
                id: uuidv4(),
                type: "image" as ContentType,
                name: "Image",
                className: "p-3",
                content:
                  // `https://res.cloudinary.com/${cloudName}/image/upload/v1742558363/nlgi63u4fnijpzm3slcm.jpg`,
                  "https://res.cloudinary.com/dpdb2wcfi/image/upload/v1742558363/nlgi63u4fnijpzm3slcm.jpg",
                  // "nlgi63u4fnijpzm3slcm",
                alt: "Title",
              },
            ],
          },
          {
            id: uuidv4(),
            type: "column" as ContentType,
            name: "Column",
            content: [
              {
                id: uuidv4(),
                type: "heading1" as ContentType,
                name: "Heading1",
                content: "",
                placeholder: "Heading1",
              },
              {
                id: uuidv4(),
                type: "paragraph" as ContentType,
                name: "Paragraph",
                content: "",
                placeholder: "start typing here",
              },
            ],
            className: "w-full h-full p-8 flex justify-center items-center",
            placeholder: "Heading1",
          },
        ],
      },
    ],
  },
};

// Text and Image
export const TextAndImage = {
  slideName: "Text and image",
  type: "textAndImage",
  className: "min-h-[200px] p-8 mx-auto flex justify-center items-center",
  content: {
    id: uuidv4(),
    type: "column" as ContentType,
    name: "Column",
    content: [
      {
        id: uuidv4(),
        type: "resizable-column" as ContentType,
        name: "Text and image",
        className: "border",
        content: [
          {
            id: uuidv4(),
            type: "column" as ContentType,
            name: "",
            content: [
              {
                id: uuidv4(),
                type: "heading1" as ContentType,
                name: "Heading1",
                content: "",
                placeholder: "Heading1",
              },
              {
                id: uuidv4(),
                type: "paragraph" as ContentType,
                name: "Paragraph",
                content: "",
                placeholder: "start typing here",
              },
            ],
            className: "w-full h-full p-8 flex justify-center items-center",
            placeholder: "Heading1",
          },
          {
            id: uuidv4(),
            type: "column" as ContentType,
            name: "Column",
            content: [
              {
                id: uuidv4(),
                type: "image" as ContentType,
                name: "Image",
                className: "p-3",
                content:
                  `https://res.cloudinary.com/${cloudName}/image/upload/v1742558363/nlgi63u4fnijpzm3slcm.jpg`,
                alt: "Title",
              },
            ],
          },
        ],
      },
    ],
  },
};

// Two Columns
export const TwoColumns = {
  slideName: "Two columns",
  type: "twoColumns",
  className: "p-4 mx-auto flex justify-center items-center",
  content: {
    id: uuidv4(),
    type: "column" as ContentType,
    name: "Column",
    content: [
      {
        id: uuidv4(),
        type: "title" as ContentType,
        name: "Title",
        content: "",
        placeholder: "Untitled Card",
      },
      {
        id: uuidv4(),
        type: "resizable-column" as ContentType,
        name: "Text and image",
        className: "border",
        content: [
          {
            id: uuidv4(),
            type: "paragraph" as ContentType,
            name: "Paragraph",
            content: "",
            placeholder: "Start typing...",
          },
          {
            id: uuidv4(),
            type: "paragraph" as ContentType,
            name: "Paragraph",
            content: "",
            placeholder: "Start typing...",
          },
        ],
      },
    ],
  },
};

// Two Columns with Headings
export const TwoColumnsWithHeadings = {
  slideName: "Two columns with headings",
  type: "twoColumnsWithHeadings",
  className: "p-4 mx-auto flex justify-center items-center",
  content: {
    id: uuidv4(),
    type: "column" as ContentType,
    name: "Column",
    content: [
      {
        id: uuidv4(),
        type: "title" as ContentType,
        name: "Title",
        content: "",
        placeholder: "Untitled Card",
      },
      {
        id: uuidv4(),
        type: "resizable-column" as ContentType,
        name: "Text and image",
        className: "border",
        content: [
          {
            id: uuidv4(),
            type: "column" as ContentType,
            name: "Column",
            content: [
              {
                id: uuidv4(),
                type: "heading3" as ContentType,
                name: "Heading3",
                content: "",
                placeholder: "Heading 3",
              },
              {
                id: uuidv4(),
                type: "paragraph" as ContentType,
                name: "Paragraph",
                content: "",
                placeholder: "Start typing...",
              },
            ],
          },
          {
            id: uuidv4(),
            type: "column" as ContentType,
            name: "Column",
            content: [
              {
                id: uuidv4(),
                type: "heading3" as ContentType,
                name: "Heading3",
                content: "",
                placeholder: "Heading 3",
              },
              {
                id: uuidv4(),
                type: "paragraph" as ContentType,
                name: "Paragraph",
                content: "",
                placeholder: "Start typing...",
              },
            ],
          },
        ],
      },
    ],
  },
};

// Three Columns
export const ThreeColumns = {
  slideName: "Three column",
  type: "threeColumns",
  className: "p-4 mx-auto flex justify-center items-center",
  content: {
    id: uuidv4(),
    type: "column" as ContentType,
    name: "Column",
    content: [
      {
        id: uuidv4(),
        type: "title" as ContentType,
        name: "Title",
        content: "",
        placeholder: "Untitled Card",
      },
      {
        id: uuidv4(),
        type: "resizable-column" as ContentType,
        name: "Text and image",
        className: "border",
        content: [
          {
            id: uuidv4(),
            type: "paragraph" as ContentType,
            name: "",
            content: "",
            placeholder: "Start typing...",
          },
          {
            id: uuidv4(),
            type: "paragraph" as ContentType,
            name: "",
            content: "",
            placeholder: "Start typing...",
          },
          {
            id: uuidv4(),
            type: "paragraph" as ContentType,
            name: "",
            content: "",
            placeholder: "Start typing...",
          },
        ],
      },
    ],
  },
};

// Three Columns with Headings
export const ThreeColumnsWithHeadings = {
  slideName: "Three columns with headings",
  type: "threeColumnsWithHeadings",
  className: "p-4 mx-auto flex justify-center items-center",
  content: {
    id: uuidv4(),
    type: "column" as ContentType,
    name: "Column",
    content: [
      {
        id: uuidv4(),
        type: "title" as ContentType,
        name: "Title",
        content: "",
        placeholder: "Untitled Card",
      },
      {
        id: uuidv4(),
        type: "resizable-column" as ContentType,
        name: "Text and image",
        className: "border",
        content: [
          {
            id: uuidv4(),
            type: "column" as ContentType,
            name: "Column",
            content: [
              {
                id: uuidv4(),
                type: "heading3" as ContentType,
                name: "Heading3",
                content: "",
                placeholder: "Heading 3",
              },
              {
                id: uuidv4(),
                type: "paragraph" as ContentType,
                name: "Paragraph",
                content: "",
                placeholder: "Start typing...",
              },
            ],
          },
          {
            id: uuidv4(),
            type: "column" as ContentType,
            name: "Column",
            content: [
              {
                id: uuidv4(),
                type: "heading3" as ContentType,
                name: "Heading3",
                content: "",
                placeholder: "Heading 3",
              },
              {
                id: uuidv4(),
                type: "paragraph" as ContentType,
                name: "Paragraph",
                content: "",
                placeholder: "Start typing...",
              },
            ],
          },

          {
            id: uuidv4(),
            type: "column" as ContentType,
            name: "Column",
            content: [
              {
                id: uuidv4(),
                type: "heading3" as ContentType,
                name: "Heading3",
                content: "",
                placeholder: "Heading 3",
              },
              {
                id: uuidv4(),
                type: "paragraph" as ContentType,
                name: "Paragraph",
                content: "",
                placeholder: "Start typing...",
              },
            ],
          },
        ],
      },
    ],
  },
};

// Four Columns
export const FourColumns = {
  slideName: "Four column",
  type: "fourColumns",
  className: "p-4 mx-auto flex justify-center items-center",
  content: {
    id: uuidv4(),
    type: "column" as ContentType,
    name: "Column",
    content: [
      {
        id: uuidv4(),
        type: "title" as ContentType,
        name: "Title",
        content: "",
        placeholder: "Untitled Card",
      },
      {
        id: uuidv4(),
        type: "resizable-column" as ContentType,
        name: "Text and image",
        className: "border",
        content: [
          {
            id: uuidv4(),
            type: "paragraph" as ContentType,
            name: "Paragraph",
            content: "",
            placeholder: "Start typing...",
          },
          {
            id: uuidv4(),
            type: "paragraph" as ContentType,
            name: "Paragraph",
            content: "",
            placeholder: "Start typing...",
          },
          {
            id: uuidv4(),
            type: "paragraph" as ContentType,
            name: "Paragraph",
            content: "",
            placeholder: "Start typing...",
          },
          {
            id: uuidv4(),
            type: "paragraph" as ContentType,
            name: "Paragraph",
            content: "",
            placeholder: "Start typing...",
          },
        ],
      },
    ],
  },
};

// Two Image Columns
export const TwoImageColumns = {
  slideName: "Two Image Columns",
  type: "twoImageColumns",
  className: "p-4 mx-auto flex justify-center items-center",
  content: {
    id: uuidv4(),
    type: "column" as ContentType,
    name: "Column",
    content: [
      {
        id: uuidv4(),
        type: "title" as ContentType,
        name: "Title",
        content: "",
        placeholder: "Untitled Card",
      },
      {
        id: uuidv4(),
        type: "resizable-column" as ContentType,
        name: "Text and image",
        className: "border",
        content: [
          {
            id: uuidv4(),
            type: "column" as ContentType,
            name: "Column",
            content: [
              {
                id: uuidv4(),
                type: "image" as ContentType,
                name: "Image",
                className: "p-3",
                content:
                  `https://res.cloudinary.com/${cloudName}/image/upload/v1742558363/nlgi63u4fnijpzm3slcm.jpg`,
                alt: "Title",
              },
              {
                id: uuidv4(),
                type: "heading3" as ContentType,
                name: "Heading3",
                content: "",
                placeholder: "Heading 3",
              },
              {
                id: uuidv4(),
                type: "paragraph" as ContentType,
                name: "Paragraph",
                content: "",
                placeholder: "Start typing...",
              },
            ],
          },
          {
            id: uuidv4(),
            type: "column" as ContentType,
            name: "Column",
            content: [
              {
                id: uuidv4(),
                type: "image" as ContentType,
                name: "Image",
                className: "p-3",
                content:
                  `https://res.cloudinary.com/${cloudName}/image/upload/v1742558363/nlgi63u4fnijpzm3slcm.jpg`,
                alt: "Title",
              },
              {
                id: uuidv4(),
                type: "heading3" as ContentType,
                name: "Heading3",
                content: "",
                placeholder: "Heading 3",
              },
              {
                id: uuidv4(),
                type: "paragraph" as ContentType,
                name: "Paragraph",
                content: "",
                placeholder: "Start typing...",
              },
            ],
          },
        ],
      },
    ],
  },
};

// Three Image Columns
export const ThreeImageColumns = {
  slideName: "Three Image Columns",
  type: "threeImageColumns",
  className: "p-4 mx-auto flex justify-center items-center",
  content: {
    id: uuidv4(),
    type: "column" as ContentType,
    name: "Column",
    content: [
      {
        id: uuidv4(),
        type: "title" as ContentType,
        name: "Title",
        content: "",
        placeholder: "Untitled Card",
      },
      {
        id: uuidv4(),
        type: "resizable-column" as ContentType,
        name: "Text and image",
        className: "border",
        content: [
          {
            id: uuidv4(),
            type: "column" as ContentType,
            name: "Column",
            content: [
              {
                id: uuidv4(),
                type: "image" as ContentType,
                name: "Image",
                className: "p-3",
                content:
                  `https://res.cloudinary.com/${cloudName}/image/upload/v1742558363/nlgi63u4fnijpzm3slcm.jpg`,
                alt: "Title",
              },
              {
                id: uuidv4(),
                type: "heading3" as ContentType,
                name: "Heading3",
                content: "",
                placeholder: "Heading 3",
              },
              {
                id: uuidv4(),
                type: "paragraph" as ContentType,
                name: "Paragraph",
                content: "",
                placeholder: "Start typing...",
              },
            ],
          },
          {
            id: uuidv4(),
            type: "column" as ContentType,
            name: "Column",
            content: [
              {
                id: uuidv4(),
                type: "image" as ContentType,
                name: "Image",
                className: "p-3",
                content:
                  `https://res.cloudinary.com/${cloudName}/image/upload/v1742558363/nlgi63u4fnijpzm3slcm.jpg`,
                alt: "Title",
              },
              {
                id: uuidv4(),
                type: "heading3" as ContentType,
                name: "Heading3",
                content: "",
                placeholder: "Heading 3",
              },
              {
                id: uuidv4(),
                type: "paragraph" as ContentType,
                name: "Paragraph",
                content: "",
                placeholder: "Start typing...",
              },
            ],
          },

          {
            id: uuidv4(),
            type: "column" as ContentType,
            name: "Column",
            content: [
              {
                id: uuidv4(),
                type: "image" as ContentType,
                name: "Image",
                className: "p-3",
                content:
                  `https://res.cloudinary.com/${cloudName}/image/upload/v1742558363/nlgi63u4fnijpzm3slcm.jpg`,
                alt: "Title",
              },
              {
                id: uuidv4(),
                type: "heading3" as ContentType,
                name: "Heading3",
                content: "",
                placeholder: "Heading 3",
              },
              {
                id: uuidv4(),
                type: "paragraph" as ContentType,
                name: "Paragraph",
                content: "",
                placeholder: "Start typing...",
              },
            ],
          },
        ],
      },
    ],
  },
};

// Four Image Columns
export const FourImageColumns = {
  slideName: "Four Image Columns",
  type: "fourImageColumns",
  className: "p-4 mx-auto flex justify-center items-center",
  content: {
    id: uuidv4(),
    type: "column" as ContentType,
    name: "Column",
    content: [
      {
        id: uuidv4(),
        type: "title" as ContentType,
        name: "Title",
        content: "",
        placeholder: "Untitled Card",
      },
      {
        id: uuidv4(),
        type: "resizable-column" as ContentType,
        name: "Text and image",
        className: "border",
        content: [
          {
            id: uuidv4(),
            type: "column" as ContentType,
            name: "Column",
            content: [
              {
                id: uuidv4(),
                type: "image" as ContentType,
                name: "Image",
                className: "p-3",
                content:
                  `https://res.cloudinary.com/${cloudName}/image/upload/v1742558363/nlgi63u4fnijpzm3slcm.jpg`,
                alt: "Title",
              },
              {
                id: uuidv4(),
                type: "heading3" as ContentType,
                name: "Heading3",
                content: "",
                placeholder: "Heading 3",
              },
              {
                id: uuidv4(),
                type: "paragraph" as ContentType,
                name: "Paragraph",
                content: "",
                placeholder: "Start typing...",
              },
            ],
          },
          {
            id: uuidv4(),
            type: "column" as ContentType,
            name: "Column",
            content: [
              {
                id: uuidv4(),
                type: "image" as ContentType,
                name: "Image",
                className: "p-3",
                content:
                  `https://res.cloudinary.com/${cloudName}/image/upload/v1742558363/nlgi63u4fnijpzm3slcm.jpg`,
                alt: "Title",
              },
              {
                id: uuidv4(),
                type: "heading3" as ContentType,
                name: "Heading3",
                content: "",
                placeholder: "Heading 3",
              },
              {
                id: uuidv4(),
                type: "paragraph" as ContentType,
                name: "Paragraph",
                content: "",
                placeholder: "Start typing...",
              },
            ],
          },

          {
            id: uuidv4(),
            type: "column" as ContentType,
            name: "Column",
            content: [
              {
                id: uuidv4(),
                type: "image" as ContentType,
                name: "Image",
                className: "p-3",
                content:
                  `https://res.cloudinary.com/${cloudName}/image/upload/v1742558363/nlgi63u4fnijpzm3slcm.jpg`,
                alt: "Title",
              },
              {
                id: uuidv4(),
                type: "heading3" as ContentType,
                name: "Heading3",
                content: "",
                placeholder: "Heading 3",
              },
              {
                id: uuidv4(),
                type: "paragraph" as ContentType,
                name: "Paragraph",
                content: "",
                placeholder: "Start typing...",
              },
            ],
          },

          {
            id: uuidv4(),
            type: "column" as ContentType,
            name: "Column",
            content: [
              {
                id: uuidv4(),
                type: "image" as ContentType,
                name: "Image",
                className: "p-3",
                content:
                  `https://res.cloudinary.com/${cloudName}/image/upload/v1742558363/nlgi63u4fnijpzm3slcm.jpg`,
                alt: "Title",
              },
              {
                id: uuidv4(),
                type: "heading3" as ContentType,
                name: "Heading3",
                content: "",
                placeholder: "Heading 3",
              },
              {
                id: uuidv4(),
                type: "paragraph" as ContentType,
                name: "Paragraph",
                content: "",
                placeholder: "Start typing...",
              },
            ],
          },
        ],
      },
    ],
  },
};

// Table Layout
export const TableLayout = {
  slideName: "Table Layout",
  type: "tableLayout",
  className:
    "p-8 mx-auto flex flex-col justify-center items-center min-h-[400px]",
  content: {
    id: uuidv4(),
    type: "column" as ContentType,
    name: "Column",
    content: [
      {
        id: uuidv4(),
        type: "table" as ContentType,
        name: "Table",
        initialRowSizes: 2,
        initialColumnSizes: 2,
        content: [],
      },
    ],
  },
};
