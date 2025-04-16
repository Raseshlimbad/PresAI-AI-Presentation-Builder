import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { v4 as uuidv4 } from 'uuid';
import { useSlideStore } from '@/store/useSlideStore';
import React from 'react';

export const generateEnhancedPdf = async (
  title: string,
  captureMode: boolean = false
): Promise<void> => {
  try {
    const { currentTheme } = useSlideStore.getState();

    // Create a temporary presentation container
    const presentationContainer = document.createElement('div');
    presentationContainer.style.position = 'fixed';
    presentationContainer.style.left = '-9999px';
    presentationContainer.style.top = '-9999px';
    presentationContainer.style.width = '1920px';
    presentationContainer.style.height = '1080px';
    document.body.appendChild(presentationContainer);

    // Create PDF document
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [1920, 1080]
    });

    // Get all slides from the store
    const { getOrderedSlides } = useSlideStore.getState();
    const slides = getOrderedSlides();

    // Process each slide
    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];

      // Create slide container with theme styling
      const slideContainer = document.createElement('div');
      slideContainer.style.width = '1920px';
      slideContainer.style.height = '1080px';
      slideContainer.style.position = 'relative';
      slideContainer.style.overflow = 'hidden';
      slideContainer.style.backgroundColor = currentTheme.slideBackgroundColor;
      slideContainer.style.backgroundImage = currentTheme.gradientBackground || '';
      slideContainer.style.color = currentTheme.fontColor;
      slideContainer.style.fontFamily = currentTheme.fontFamily;
      slideContainer.style.padding = '60px';
      slideContainer.style.boxSizing = 'border-box';

      // Create content container
      const contentContainer = document.createElement('div');
      contentContainer.style.width = '100%';
      contentContainer.style.height = '100%';
      contentContainer.style.position = 'relative';
      contentContainer.className = slide.className || '';

      // Render slide content using the same renderer as the presentation view
      const root = document.createElement('div');
      root.style.width = '100%';
      root.style.height = '100%';
      root.style.position = 'relative';
      
      // Import dynamically to avoid SSR issues
      const { createRoot } = await import('react-dom/client');
      const { MasterRecursiveComponent } = await import('@/app/(protected)/presentation/[presentationId]/_components/editor/MasterRecursiveComponent');
      
      const reactRoot = createRoot(root);
      const MasterComponent = React.createElement(MasterRecursiveComponent, {
        content: slide.content,
        onContentChange: () => {},
        slideId: slide.id,
        isPreview: true,
        isEditable: false
      });
      
      reactRoot.render(MasterComponent);

      // Wait for content to render
      await new Promise(resolve => setTimeout(resolve, 100));

      contentContainer.appendChild(root);
      slideContainer.appendChild(contentContainer);
      presentationContainer.innerHTML = '';
      presentationContainer.appendChild(slideContainer);

      // Wait for fonts and images to load
      await document.fonts.ready;
      await Promise.all(
        Array.from(slideContainer.getElementsByTagName('img'))
          .map(img => img.complete ? Promise.resolve() : new Promise(resolve => img.onload = resolve))
      );

      // Capture the slide
      const canvas = await html2canvas(slideContainer, {
        scale: 2,
        useCORS: true,
        logging: false,
        width: 1920,
        height: 1080,
        windowWidth: 1920,
        windowHeight: 1080,
        backgroundColor: currentTheme.slideBackgroundColor,
        onclone: (clonedDoc) => {
          const elements = clonedDoc.getElementsByTagName('*');
          for (const el of elements) {
            if (el instanceof HTMLElement) {
              // Ensure visibility
              el.style.opacity = '1';
              
              // Remove transforms
              if (el.style.transform) {
                el.style.transform = 'none';
              }
              
              // Apply theme styles
              if (el.tagName.match(/^H[1-6]$|^P$/i)) {
                el.style.color = currentTheme.fontColor;
                el.style.fontFamily = currentTheme.fontFamily;
              }
              
              // Style interactive elements
              if (el.tagName === 'BUTTON' || el.tagName === 'A') {
                el.style.color = currentTheme.accentColor;
              }
            }
          }
        }
      });

      // Add page to PDF
      if (i > 0) {
        pdf.addPage();
      }

      const imgData = canvas.toDataURL('image/png', 1.0);
      
      // Calculate dimensions
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const ratio = Math.min(pdfWidth / imgProps.width, pdfHeight / imgProps.height);
      const width = imgProps.width * ratio;
      const height = imgProps.height * ratio;
      const x = (pdfWidth - width) / 2;
      const y = (pdfHeight - height) / 2;

      // Add image to PDF
      pdf.addImage(imgData, 'PNG', x, y, width, height, undefined, 'FAST');

      // Clean up React root
      reactRoot.unmount();
    }

    // Clean up temporary container
    document.body.removeChild(presentationContainer);

    if (!captureMode) {
      // Save the PDF
      const filename = `${title.replace(/\s+/g, '-')}-${uuidv4()}.pdf`;
      pdf.save(filename);
    }

  } catch (error) {
    console.error('Error generating enhanced PDF:', error);
    throw error;
  }
}; 