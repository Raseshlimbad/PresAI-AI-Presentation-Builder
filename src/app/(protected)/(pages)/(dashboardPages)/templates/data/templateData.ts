// data/templateData.js
// export const templates = [
//     {
//       id: "modern-business",
//       name: "Modern Business",
//       theme: "light",
//       category: "business",
//       slides: [
//         {
//           id: "slide-1",
//           slideName: "Title Slide",
//           type: "title",
//           content: {
//             id: "title-content",
//             type: "column",
//             name: "Title Content",
//             content: [
//               {
//                 id: "title-heading",
//                 type: "heading1",
//                 name: "Title",
//                 content: "Your Presentation Title",
//                 className: "text-4xl font-bold"
//               },
//               {
//                 id: "subtitle-text",
//                 type: "heading3",
//                 name: "Subtitle",
//                 content: "Company Name • Date",
//                 className: "text-xl text-gray-500"
//               }
//             ]
//           },
//           slideOrder: 1,
//           className: "bg-white text-black"
//         }
//       ]
//     },
//     {
//       id: "educational-presentation",
//       name: "Educational Presentation",
//       theme: "light",
//       category: "study",
//       slides: [
//         {
//           id: "slide-1",
//           slideName: "Title Slide",
//           type: "title",
//           content: {
//             id: "title-content",
//             type: "column",
//             name: "Title Content",
//             content: [
//               {
//                 id: "title-heading",
//                 type: "heading1",
//                 name: "Title",
//                 content: "Introduction to Physics",
//                 className: "text-4xl font-semibold text-blue-700"
//               },
//               {
//                 id: "subtitle-text",
//                 type: "heading3",
//                 name: "Subtitle",
//                 content: "Fundamentals of Motion and Forces",
//                 className: "text-lg text-blue-500"
//               }
//             ]
//           },
//           slideOrder: 1,
//           className: "bg-white text-black"
//         },
//         {
//           id: "slide-2",
//           slideName: "Lesson Content",
//           type: "content",
//           content: {
//             id: "lesson-content",
//             type: "column",
//             name: "Lesson Content",
//             content: [
//               {
//                 id: "lesson-heading",
//                 type: "heading2",
//                 name: "Topic",
//                 content: "Newton’s Laws of Motion",
//                 className: "text-2xl font-bold mb-4"
//               },
//               {
//                 id: "bullet-list",
//                 type: "bulletedList",
//                 name: "Key Points",
//                 content: [
//                   "First Law: Objects remain in motion unless acted upon",
//                   "Second Law: F = ma (Force equals mass times acceleration)",
//                   "Third Law: Every action has an equal and opposite reaction"
//                 ],
//                 className: "list-disc space-y-2 ml-6"
//               }
//             ]
//           },
//           slideOrder: 2,
//           className: "bg-gray-50 text-black"
//         }
//       ]
//     },
//     {
//       id: "startup-pitch",
//       name: "Startup Pitch",
//       theme: "dark",
//       category: "business",
//       slides: [
//         {
//           id: "slide-1",
//           slideName: "Title Slide",
//           type: "title",
//           content: {
//             id: "title-content",
//             type: "column",
//             name: "Title Content",
//             content: [
//               {
//                 id: "title-heading",
//                 type: "heading1",
//                 name: "Title",
//                 content: "Next-Gen Startup",
//                 className: "text-5xl font-bold text-purple-300"
//               },
//               {
//                 id: "subtitle-text",
//                 type: "heading3",
//                 name: "Subtitle",
//                 content: "Innovating the future of tech",
//                 className: "text-xl text-purple-100"
//               }
//             ]
//           },
//           slideOrder: 1,
//           className: "bg-gray-900 text-white"
//         },
//         {
//           id: "slide-2",
//           slideName: "Problem & Solution",
//           type: "content",
//           content: {
//             id: "content-layout",
//             type: "multiColumn",
//             name: "Problem & Solution Layout",
//             content: [
//               {
//                 id: "problem-heading",
//                 type: "heading2",
//                 name: "Problem",
//                 content: "The existing market lacks affordable AI solutions.",
//                 className: "text-2xl font-semibold mb-4"
//               },
//               {
//                 id: "solution-heading",
//                 type: "heading2",
//                 name: "Solution",
//                 content: "We provide cost-effective AI-powered automation.",
//                 className: "text-2xl font-semibold mb-4"
//               }
//             ],
//             columns: 2
//           },
//           slideOrder: 2,
//           className: "bg-gray-800 text-white"
//         }
//       ]
//     },
//     {
//       id: "case-study",
//       name: "Case Study",
//       theme: "light",
//       category: "study",
//       slides: [
//         {
//           id: "slide-1",
//           slideName: "Title Slide",
//           type: "title",
//           content: {
//             id: "title-content",
//             type: "column",
//             name: "Title Content",
//             content: [
//               {
//                 id: "title-heading",
//                 type: "heading1",
//                 name: "Title",
//                 content: "Market Trends Analysis",
//                 className: "text-4xl font-bold text-blue-700"
//               },
//               {
//                 id: "subtitle-text",
//                 type: "heading3",
//                 name: "Subtitle",
//                 content: "A deep dive into consumer behavior",
//                 className: "text-xl text-blue-500"
//               }
//             ]
//           },
//           slideOrder: 1,
//           className: "bg-white text-black"
//         },
//         {
//           id: "slide-2",
//           slideName: "Data Insights",
//           type: "dataTable",
//           content: {
//             id: "table-content",
//             type: "table",
//             name: "Market Analysis",
//             content: [
//               ["Year", "Market Growth", "Consumer Demand"],
//               ["2022", "10%", "High"],
//               ["2023", "15%", "Very High"],
//               ["2024", "18%", "Extreme"]
//             ],
//             initialRows: 4,
//             initialColumns: 3,
//             className: "w-full border-collapse"
//           },
//           slideOrder: 2,
//           className: "bg-gray-50 text-black"
//         }
//       ]
//     },
//     {
//         id: "tech-conference",
//         name: "Tech Conference",
//         theme: "dark",
//         category: "business",
//         slides: [
//           {
//             id: "slide-1",
//             slideName: "Welcome Slide",
//             type: "title",
//             content: {
//               id: "title-content",
//               type: "column",
//               name: "Title Content",
//               content: [
//                 {
//                   id: "title-heading",
//                   type: "heading1",
//                   name: "Title",
//                   content: "Future of AI & Tech",
//                   className: "text-5xl font-bold text-blue-400"
//                 },
//                 {
//                   id: "subtitle-text",
//                   type: "heading3",
//                   name: "Subtitle",
//                   content: "Annual Technology Conference 2025",
//                   className: "text-xl text-blue-200"
//                 }
//               ]
//             },
//             slideOrder: 1,
//             className: "bg-gray-900 text-white"
//           },
//           {
//             id: "slide-2",
//             slideName: "Speaker Info",
//             type: "imageAndText",
//             content: {
//               id: "speaker-info",
//               type: "multiColumn",
//               name: "Speaker Details",
//               content: [
//                 {
//                   id: "speaker-image",
//                   type: "image",
//                   name: "Speaker Image",
//                   content: "/api/speakers/john-doe.jpg",
//                   className: "rounded-full w-32 h-32"
//                 },
//                 {
//                   id: "speaker-text",
//                   type: "paragraph",
//                   name: "Speaker Bio",
//                   content: "John Doe, AI Researcher, will present breakthroughs in machine learning.",
//                   className: "text-lg"
//                 }
//               ],
//               columns: 2
//             },
//             slideOrder: 2,
//             className: "bg-gray-800 text-white"
//           }
//         ]
//       },
    
//       // 2. Marketing Strategy Template
//       {
//         id: "marketing-strategy",
//         name: "Marketing Strategy",
//         theme: "light",
//         category: "business",
//         slides: [
//           {
//             id: "slide-1",
//             slideName: "Title Slide",
//             type: "title",
//             content: {
//               id: "title-content",
//               type: "column",
//               name: "Title Content",
//               content: [
//                 {
//                   id: "title-heading",
//                   type: "heading1",
//                   name: "Title",
//                   content: "2025 Marketing Plan",
//                   className: "text-4xl font-bold text-red-600"
//                 },
//                 {
//                   id: "subtitle-text",
//                   type: "heading3",
//                   name: "Subtitle",
//                   content: "Growth Strategies for the Digital Age",
//                   className: "text-lg text-red-400"
//                 }
//               ]
//             },
//             slideOrder: 1,
//             className: "bg-white text-black"
//           },
//           {
//             id: "slide-2",
//             slideName: "Market Analysis",
//             type: "dataTable",
//             content: {
//               id: "table-content",
//               type: "table",
//               name: "Market Trends",
//               content: [
//                 ["Year", "Revenue Growth", "User Acquisition"],
//                 ["2023", "15%", "500K users"],
//                 ["2024", "20%", "800K users"],
//                 ["2025", "25%", "1.2M users"]
//               ],
//               initialRows: 4,
//               initialColumns: 3,
//               className: "w-full border-collapse border border-gray-300"
//             },
//             slideOrder: 2,
//             className: "bg-gray-50 text-black"
//           }
//         ]
//       },
    
//       // 3. Personal Portfolio Template
//       {
//         id: "personal-portfolio",
//         name: "Personal Portfolio",
//         theme: "dark",
//         category: "creative",
//         slides: [
//           {
//             id: "slide-1",
//             slideName: "Introduction",
//             type: "title",
//             content: {
//               id: "title-content",
//               type: "column",
//               name: "Title Content",
//               content: [
//                 {
//                   id: "title-heading",
//                   type: "heading1",
//                   name: "Title",
//                   content: "Hello, I'm Jane Doe",
//                   className: "text-5xl font-bold text-pink-400"
//                 },
//                 {
//                   id: "subtitle-text",
//                   type: "heading3",
//                   name: "Subtitle",
//                   content: "UI/UX Designer | Frontend Developer",
//                   className: "text-lg text-pink-200"
//                 }
//               ]
//             },
//             slideOrder: 1,
//             className: "bg-gray-900 text-white"
//           },
//           {
//             id: "slide-2",
//             slideName: "Portfolio Showcase",
//             type: "imageGallery",
//             content: {
//               id: "portfolio-gallery",
//               type: "gallery",
//               name: "My Projects",
//               content: [
//                 "/api/portfolio/project1.jpg",
//                 "/api/portfolio/project2.jpg",
//                 "/api/portfolio/project3.jpg"
//               ],
//               className: "grid grid-cols-3 gap-4"
//             },
//             slideOrder: 2,
//             className: "bg-gray-800 text-white"
//           }
//         ]
//       },
    
//       // 4. Scientific Research Template
//       {
//         id: "scientific-research",
//         name: "Scientific Research",
//         theme: "light",
//         category: "study",
//         slides: [
//           {
//             id: "slide-1",
//             slideName: "Research Title",
//             type: "title",
//             content: {
//               id: "title-content",
//               type: "column",
//               name: "Title Content",
//               content: [
//                 {
//                   id: "title-heading",
//                   type: "heading1",
//                   name: "Title",
//                   content: "Climate Change Impact Study",
//                   className: "text-4xl font-bold text-green-700"
//                 },
//                 {
//                   id: "subtitle-text",
//                   type: "heading3",
//                   name: "Subtitle",
//                   content: "A Deep Dive into Global Warming Effects",
//                   className: "text-lg text-green-500"
//                 }
//               ]
//             },
//             slideOrder: 1,
//             className: "bg-white text-black"
//           },
//           {
//             id: "slide-2",
//             slideName: "Key Findings",
//             type: "content",
//             content: {
//               id: "findings-content",
//               type: "column",
//               name: "Key Findings",
//               content: [
//                 {
//                   id: "point-1",
//                   type: "heading2",
//                   name: "Point 1",
//                   content: "Sea levels have risen by 3.3mm per year",
//                   className: "text-xl font-bold"
//                 },
//                 {
//                   id: "point-2",
//                   type: "heading2",
//                   name: "Point 2",
//                   content: "Global temperature has increased by 1.2°C since 1900",
//                   className: "text-xl font-bold"
//                 }
//               ]
//             },
//             slideOrder: 2,
//             className: "bg-gray-50 text-black"
//           }
//         ]
//       },
    
//       // 5. Photography Portfolio
//       {
//         id: "photography-portfolio",
//         name: "Photography Portfolio",
//         theme: "dark",
//         category: "creative",
//         slides: [
//           {
//             id: "slide-1",
//             slideName: "Cover Slide",
//             type: "title",
//             content: {
//               id: "title-content",
//               type: "column",
//               name: "Title Content",
//               content: [
//                 {
//                   id: "title-heading",
//                   type: "heading1",
//                   name: "Title",
//                   content: "My Photography Journey",
//                   className: "text-6xl font-light text-yellow-300"
//                 },
//                 {
//                   id: "subtitle-text",
//                   type: "heading3",
//                   name: "Subtitle",
//                   content: "Captured Moments, Timeless Memories",
//                   className: "text-lg text-yellow-200"
//                 }
//               ]
//             },
//             slideOrder: 1,
//             className: "bg-black text-white"
//           },
//           {
//             id: "slide-2",
//             slideName: "Photo Showcase",
//             type: "imageGallery",
//             content: {
//               id: "photo-gallery",
//               type: "gallery",
//               name: "Gallery",
//               content: [
//                 "/api/photos/nature1.jpg",
//                 "/api/photos/cityscape.jpg",
//                 "/api/photos/portrait.jpg"
//               ],
//               className: "grid grid-cols-3 gap-4"
//             },
//             slideOrder: 2,
//             className: "bg-gray-900 text-white"
//           }
//         ]
//       }
//   ];

import { Template } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

export const templates : Template[] = [
    // Business template
    {
      id: uuidv4(),
      name: "Quarterly Business Review",
      description: "Professional template for business presentations and quarterly reviews",
      category: { id: "business", name: "Business" },
      thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop",
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
                    alt: "Business chart showing growth",
                    name: "Image",
                    type: "image",
                    content: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop"
                  }
                ],
                restrictToDrop: true
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
                    placeholder: "Heading1"
                  },
                  {
                    id: uuidv4(),
                    name: "Paragraph",
                    type: "paragraph",
                    content: "Comprehensive overview of our business performance and strategic initiatives for the second quarter.",
                    placeholder: "start typing here..."
                  }
                ],
                className: "w-full h-full p-8 flex justify-center items-center",
                placeholder: "Heading1"
              }
            ],
            restrictToDrop: true
          },
          className: "min-h-[300px]",
          slideName: "Title Slide"
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
                placeholder: "Heading3"
              },
              {
                id: uuidv4(),
                name: "Paragraph",
                type: "paragraph",
                content: "We've seen a 15% increase in revenue compared to last quarter.",
                placeholder: "start typing here..."
              },
              {
                id: uuidv4(),
                name: "Bullet List",
                type: "bulletList",
                content: [
                  "New enterprise clients",
                  "Upselling to existing customers",
                  "Expansion into new markets"
                ]
              }
            ],
            className: "w-full h-full p-8 flex justify-center items-center",
            placeholder: "Heading3",
            restrictToDrop: true
          },
          content2: {   
            id: uuidv4(),
            name: "Column",
            type: "column",
            content: [
              {
                id: uuidv4(),
                name: "Heading3",
                type: "heading3",
                content: "Cost Optimization",
                placeholder: "Heading3"
              },
              {
                id: uuidv4(),
                name: "Paragraph",
                type: "paragraph",
                content: "Our cost-cutting initiatives have resulted in a 12% reduction in operational expenses.",
                placeholder: "start typing here..."
              },
              {
                id: uuidv4(),
                name: "Bullet List",
                type: "bulletList",
                content: [
                  "Process automation",
                  "Vendor consolidation",
                  "Remote work policies"
                ]
              }
            ],
            className: "w-full h-full p-8 flex justify-center items-center",
            placeholder: "Heading3",
            restrictToDrop: true
          },
          className: "min-h-[300px]",
          slideName: "Financial Highlights"
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
                placeholder: "Heading2"
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
                  ["Customer Retention", "87%", "92%", "+5%", "+8%"]
                ]
              }
            ],
            restrictToDrop: true
          },
          className: "min-h-[300px]",
          slideName: "Financial Table"
        }
      ]
    },
    
    // Creative template
    {
      id: uuidv4(),
      name: "Creative Portfolio",
      description:   "Showcase your creative work with this visually appealing template",   
      category: { id: "creative", name: "Creative" },
      thumbnail: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=2940&auto=format&fit=crop",
      slides: [
        {
          id: uuidv4(),
          slideOrder: 1,
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
                    name: "Heading1",
                    type: "heading1",
                    content: "Creative Portfolio",
                    placeholder: "Heading1"
                  },
                  {
                    id: uuidv4(),
                    name: "Paragraph",
                    type: "paragraph",
                    content: "A collection of my most influential creative works and design projects from 2023.",
                    placeholder: "start typing here..."
                  }
                ],
                className: "w-full h-full p-8 flex justify-center items-center",
                placeholder: "Heading1"
              },
              {
                id: uuidv4(),
                name: "Resizable column",
                type: "resizable-column",
                content: [
                  {
                    id: uuidv4(),
                    alt: "Abstract colorful art",
                    name: "Image",
                    type: "image",
                    content: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=2787&auto=format&fit=crop"
                  }
                ],
                restrictToDrop: true
              }
            ],
            restrictToDrop: true
          },
          className: "min-h-[300px]",
          slideName: "Portfolio Cover"
        },
        {
          id: uuidv4(),
          slideOrder: 2,
          type: "threeImageColumns",
          content: {
            id: uuidv4(),
            name: "Column",
            type: "column",
            content: [
              {
                id: uuidv4(),
                name: "Heading2",
                type: "heading2",
                content: "Visual Design Projects",
                placeholder: "Heading2"
              },
              {
                id: uuidv4(),
                name: "Column",
                type: "column",
                content: [
                  {
                    id: uuidv4(),
                    alt: "Project 1 - Brand identity for tech startup",
                    name: "Image",
                    type: "image",
                    content: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2942&auto=format&fit=crop"
                  },
                  {
                    id: uuidv4(),
                    name: "Heading3",
                    type: "heading3",
                    content: "Brand Identity",
                    placeholder: "Heading3"
                  },
                  {
                    id: uuidv4(),
                    name: "Paragraph",
                    type: "paragraph",
                    content: "Complete rebrand for an emerging tech company",
                    placeholder: "start typing here..."
                  }
                ],
                className: "w-full h-full flex flex-col items-center p-4"
              },
              {
                id: uuidv4(),
                name: "Column",
                type: "column",
                content: [
                  {
                    id: uuidv4(),
                    alt: "Project 2 - UI design for mobile app",
                    name: "Image",
                    type: "image",
                    content: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=2940&auto=format&fit=crop"
                  },
                  {
                    id: uuidv4(),
                    name: "Heading3",
                    type: "heading3",
                    content: "UI/UX Design",
                    placeholder: "Heading3"
                  },
                  {
                    id: uuidv4(),
                    name: "Paragraph",
                    type: "paragraph",
                    content: "Mobile app interface for health and wellness tracking",
                    placeholder: "start typing here..."
                  }
                ],
                className: "w-full h-full flex flex-col items-center p-4"
              },
              {
                id: uuidv4(),
                name: "Column",
                type: "column",
                content: [
                  {
                    id: uuidv4(),
                    alt: "Project 3 - Print campaign for retail brand",
                    name: "Image",
                    type: "image",
                    content: "https://images.unsplash.com/photo-1583321500900-82807e458f3c?q=80&w=2940&auto=format&fit=crop"
                  },
                  {
                    id: uuidv4(),
                    name: "Heading3",
                    type: "heading3",
                    content: "Print Design",
                    placeholder: "Heading3"
                  },
                  {
                    id: uuidv4(),
                    name: "Paragraph",
                    type: "paragraph",
                    content: "Award-winning print campaign for retail fashion brand",
                    placeholder: "start typing here..."
                  }
                ],
                className: "w-full h-full flex flex-col items-center p-4"
              }
            ],
            restrictToDrop: true
          },
          className: "min-h-[300px]",
          slideName: "Project Showcase"
        }
      ]
    },
    
    // Data template
    {
      id: uuidv4(),
      name: "Data Analysis Report",
      description: "Present your data analysis with clear visuals and structured information",
      category: { id: "data", name: "Data" },
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
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
                    alt: "Data visualization chart",
                    name: "Image",
                    type: "image",
                    content: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop"
                  }
                ],
                restrictToDrop: true
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
                    content: "Market Analysis Report",
                    placeholder: "Heading1"
                  },
                  {
                    id: uuidv4(),
                    name: "Paragraph",
                    type: "paragraph",
                    content: "In-depth analysis of market trends and consumer behavior in the tech sector for Q2 2023.",
                    placeholder: "start typing here..."
                  }
                ],
                className: "w-full h-full p-8 flex justify-center items-center",
                placeholder: "Heading1"
              }
            ],
            restrictToDrop: true
          },
          className: "min-h-[300px]",
          slideName: "Title Slide"
        },
        {   
          id: uuidv4(),
          slideOrder: 2,
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
                content: "Key Metrics Overview",
                placeholder: "Heading2"
              },
              {
                id: uuidv4(),
                name: "Table",
                type: "table",
                content: [
                  ["Metric", "Current Value", "Previous Period", "Change", "Status"],
                  ["User Engagement", "24.8%", "18.3%", "+6.5%", "Improved"],
                  ["Conversion Rate", "3.2%", "2.7%", "+0.5%", "Improved"],
                  ["Avg. Session Duration", "3:42", "3:12", "+0:30", "Improved"],
                  ["Bounce Rate", "45.2%", "53.7%", "-8.5%", "Improved"],
                  ["Cost per Acquisition", "$28.40", "$35.80", "-$7.40", "Improved"]
                ]
              }
            ],
            restrictToDrop: true
          },
          className: "min-h-[300px]",
          slideName: "Data Metrics"
        },
        {
          id: uuidv4(),
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
                content: "Key Findings",
                placeholder: "Heading3"
              },
              {
                id: uuidv4(),
                name: "Bullet List",
                type: "bulletList",
                content: [
                  "Mobile usage increased by 18% YoY",
                  "Social media referrals grew by 22%",
                  "Email marketing conversion improved to 4.5%",
                  "Video content engagement up 35%"
                ]
              }
            ],
            className: "w-full h-full p-8 flex justify-center items-center",
            placeholder: "Heading3",
            restrictToDrop: true
          },
          content2: {
            id: uuidv4(),
            name: "Column",
            type: "column",
            content: [
              {
                id: uuidv4(),
                name: "Heading3",
                type: "heading3",
                content: "Recommendations",
                placeholder: "Heading3"
              },
              {
                id: uuidv4(),
                name: "Bullet List",
                type: "bulletList",
                content: [
                  "Increase investment in mobile optimization",
                  "Expand social media marketing efforts",
                  "Develop more video content",
                  "Refine email marketing strategy",
                  "Test new CTAs across digital platforms"
                ]
              }
            ],
            className: "w-full h-full p-8 flex justify-center items-center",
            placeholder: "Heading3",
            restrictToDrop: true
          },
          className: "min-h-[300px]",
          slideName: "Findings & Recommendations"
        }
      ]
    },
    
    // Minimalist template
    {
      id: uuidv4(),
      name: "Minimalist Presentation",
      description: "Clean, simple design for impactful presentations",
      category: { id: "minimalist", name: "Minimalist" },
      thumbnail: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=2940&auto=format&fit=crop",
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
                name: "Column",
                type: "column",
                content: [
                  {
                    id: uuidv4(),
                    name: "Heading1",
                    type: "heading1",
                    content: "Minimalist Approach",
                    placeholder: "Heading1"
                  },
                  {
                    id: uuidv4(),
                    name: "Paragraph",
                    type: "paragraph",
                    content: "Less is more. Focus on what truly matters.",
                    placeholder: "start typing here..."
                  }
                ],
                className: "w-full h-full p-8 flex justify-center items-center",
                placeholder: "Heading1"
              }
            ],
            restrictToDrop: true
          },
          className: "min-h-[300px]",
          slideName: "Title Slide"
        },
        {
          id: uuidv4(),
          slideOrder: 2,
          type: "twoColumns",
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
                placeholder: "Heading2"
              },
              {
                id: uuidv4(),
                name: "Bullet List",
                type: "bulletList",
                content: [
                  "Simplicity in design",
                  "Focus on essential content",
                  "Eliminate distractions",
                  "Clean typography"
                ]
              }
            ],
            className: "w-full h-full p-8 flex justify-center items-center",
            placeholder: "Heading2",
            restrictToDrop: true
          },
          content2: {
            id: uuidv4(),
            name: "Column",
            type: "column",
            content: [
              {
                id: uuidv4(),
                name: "Blockquote",
                type: "blockquote",
                content: "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away."
              },
              {
                id: uuidv4(),
                name: "Paragraph",
                type: "paragraph",
                content: "— Antoine de Saint-Exupéry",
                placeholder: "start typing here..."
              }
            ],
            className: "w-full h-full p-8 flex justify-center items-center",
            placeholder: "Quote",
            restrictToDrop: true
          },
          className: "min-h-[300px]",
          slideName: "Principles"
        }
      ]
    },
    
    // Study template
    {
      id: uuidv4(),
      name: "Academic Research",
      description: "Present your academic research with structured sections and clear information",
      category: { id: "study", name: "Study" },
      thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2940&auto=format&fit=crop",
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
                    content: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2940&auto=format&fit=crop"
                  }
                ],
                restrictToDrop: true
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
                    placeholder: "Heading1"
                  },
                  {
                    id: uuidv4(),
                    name: "Paragraph",
                    type: "paragraph",
                    content: "A comprehensive research study on the effects of climate change on urban biodiversity and ecosystem services.",
                    placeholder: "start typing here..."
                  },
                  {
                    id: uuidv4(),
                    name: "Paragraph",
                    type: "paragraph",
                    content: "Dr. Emma Johnson • Department of Environmental Science",
                    placeholder: "start typing here..."
                  }
                ],
                className: "w-full h-full p-8 flex justify-center items-center",
                placeholder: "Heading1"
              }
            ],
            restrictToDrop: true
          },
          className: "min-h-[300px]",
          slideName: "Research Title"
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
                placeholder: "Heading3"
              },
              {
                id: uuidv4(),
                name: "Numbered List",
                type: "numberedList",
                content: [
                  "Evaluate temperature changes in urban centers over 50 years",
                  "Document shifts in urban flora and fauna populations",
                  "Analyze the impact on ecosystem services",
                  "Develop adaptation strategies for urban planning"
                ]
              }
            ],
            className: "w-full h-full p-8 flex justify-center items-center",
            placeholder: "Heading3",
            restrictToDrop: true
          },
          content2: {
            id: uuidv4(),
            name: "Column",
            type: "column",
            content: [
              {
                id: uuidv4(),
                name: "Heading3",
                type: "heading3",
                content: "Methodology",
                placeholder: "Heading3"
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
                  "Interviews with urban ecologists and planners"
                ]
              }
            ],
            className: "w-full h-full p-8 flex justify-center items-center",
            placeholder: "Heading3",
            restrictToDrop: true
          },
          className: "min-h-[300px]",
          slideName: "Research Methods"
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
                placeholder: "Heading2"
              },
              {
                id: uuidv4(),
                name: "Table",
                type: "table",
                content: [
                  ["Urban Factor", "1970s Baseline", "Current Status", "Change", "Impact Level"],
                  ["Average Temperature", "21.2°C", "23.8°C", "+2.6°C", "High"],
                  ["Native Plant Species", "423 species", "387 species", "-8.5%", "Moderate"],
                  ["Bird Populations", "89 species", "72 species", "-19.1%", "High"],
                  ["Urban Tree Canopy", "27.3%", "22.1%", "-5.2%", "High"],
                  ["Carbon Sequestration", "18.4 Mt/year", "15.2 Mt/year", "-17.4%", "High"]
                ]
              }
            ],
            restrictToDrop: true
          },
          className: "min-h-[300px]",
          slideName: "Research Findings"
        }
      ]
    }
  ];
  
  export const categories = [
    { id: "all", name: "All Templates" },
    { id: "business", name: "Business" },
    { id: "creative", name: "Creative" },
    { id: "data", name: "Data" },
    { id: "minimalist", name: "Minimalist" },
    { id: "study", name: "Study" },
  ];

