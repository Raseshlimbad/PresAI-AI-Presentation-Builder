import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useSlideStore } from '@/store/useSlideStore';

export const generatePdfFromSlides = async (
  slideElements: HTMLElement[],
  title: string
): Promise<void> => {
  try {
    // Get the current theme from the store
    const { currentTheme } = useSlideStore.getState();

    
    // Create a new PDF document with larger dimensions
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'pt', // Changed from 'px' to 'pt' for better scaling
      format: [3840, 2160] // Increased to 4K resolution
    });

    // Capture each slide as an image and add to PDF
    for (let i = 0; i < slideElements.length; i++) {
      const element = slideElements[i];

      // Create a clone of the slide element to avoid modifying the original
      const clone = element.cloneNode(true) as HTMLElement;
      
      // Create a temporary container with theme background
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '-9999px';
      container.style.width = '3840px';
      container.style.height = '2160px';
      container.style.backgroundColor = currentTheme.slideBackgroundColor;
      container.style.backgroundImage = currentTheme.gradientBackground || '';
      container.style.overflow = 'hidden';
      
      // Ensure the clone has the correct dimensions and styling
      clone.style.width = '100%';
      clone.style.height = '100%';
      clone.style.position = 'relative';
      clone.style.transform = 'none';
      clone.style.margin = '0';
      clone.style.padding = '120px'; // Increased padding
      clone.style.boxSizing = 'border-box';
      clone.style.opacity = '1';
      clone.style.color = currentTheme.fontColor;
      clone.style.fontFamily = currentTheme.fontFamily;
      clone.style.fontSize = '2.5em'; // Increased base font size
      
      // Add the clone to the temporary container
      container.appendChild(clone);
      document.body.appendChild(container);

      // Wait for any fonts to load
      await document.fonts.ready;

      // Convert slide to canvas with higher quality settings
      const canvas = await html2canvas(container, {
        scale: 4, // Increased scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: currentTheme.slideBackgroundColor,
        width: 3840,
        height: 2160,
        windowWidth: 3840,
        windowHeight: 2160,
        onclone: (clonedDoc) => {
          const elements = clonedDoc.getElementsByTagName('*');
          for (let i = 0; i < elements.length; i++) {
            const el = elements[i] as HTMLElement;
            el.style.opacity = '1';
            
            // Apply larger font sizes based on element type
            if (el.tagName.match(/^H1$/i)) {
              el.style.fontSize = '4em';
            } else if (el.tagName.match(/^H[2-6]$/i)) {
              el.style.fontSize = '3em';
            } else if (el.tagName === 'P') {
              el.style.fontSize = '2.5em';
            } else if (el.tagName === 'LI') {
              el.style.fontSize = '2.5em';
              el.style.marginBottom = '1em';
            }
            
            // Ensure theme colors are applied
            el.style.color = el.tagName.match(/^H[1-6]$/i) ? 
              currentTheme.accentColor : 
              currentTheme.fontColor;
            el.style.fontFamily = currentTheme.fontFamily;
          }
        }
      });

      // Remove the temporary container
      document.body.removeChild(container);

      // Convert canvas to image
      const imgData = canvas.toDataURL('image/png', 1.0);

      // Add new page if not first page
      if (i > 0) {
        pdf.addPage();
      }

      // Calculate dimensions to maintain aspect ratio
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const ratio = Math.min(pdfWidth / imgProps.width, pdfHeight / imgProps.height);
      const width = imgProps.width * ratio;
      const height = imgProps.height * ratio;
      const x = (pdfWidth - width) / 2;
      const y = (pdfHeight - height) / 2;

      // Add image to PDF with full quality
      pdf.addImage(imgData, 'PNG', x, y, width, height, undefined, 'FAST');
    }

    // Generate unique filename and save
    const filename = `${title.replace(/\s+/g, '-')}.pdf`;
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};