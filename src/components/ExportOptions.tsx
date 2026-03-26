import { Download, Copy, Check, Share2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { useState, useCallback } from 'react';

interface Props {
  previewRef: React.RefObject<HTMLDivElement | null>;
}

// Replace all oklch/oklab/color-mix CSS color functions with fallback hex colors
function sanitizeColors(element: HTMLElement) {
  const unsupportedColorPattern = /oklch|oklab|color-mix|color\(/i;
  
  const allElements = element.querySelectorAll('*');
  const elements = [element, ...Array.from(allElements)] as HTMLElement[];
  
  for (const el of elements) {
    const style = getComputedStyle(el);
    const colorProps = [
      'backgroundColor', 'color', 'borderColor', 
      'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor',
      'outlineColor', 'textDecorationColor', 'caretColor', 'boxShadow'
    ] as const;
    
    for (const prop of colorProps) {
      const value = style[prop as keyof CSSStyleDeclaration] as string;
      if (value && typeof value === 'string' && unsupportedColorPattern.test(value)) {
        if (prop === 'backgroundColor') el.style.backgroundColor = 'transparent';
        else if (prop === 'color') el.style.color = '#d4d4d4';
        else if (prop === 'boxShadow') el.style.boxShadow = 'none';
        else (el.style as unknown as Record<string, string>)[prop] = 'transparent';
      }
    }
  }
}

// Convert SVG elements to inline <img> with data URIs so html2canvas renders them correctly
function inlineSvgs(element: HTMLElement) {
  const svgs = element.querySelectorAll('svg');
  svgs.forEach(svg => {
    const computed = getComputedStyle(svg);
    const width = svg.getAttribute('width') || computed.width || '24';
    const height = svg.getAttribute('height') || computed.height || '24';
    
    // Ensure the SVG has explicit dimensions and xmlns
    const clone = svg.cloneNode(true) as SVGElement;
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    if (!clone.getAttribute('width')) clone.setAttribute('width', String(width));
    if (!clone.getAttribute('height')) clone.setAttribute('height', String(height));
    
    // Inherit color from parent for stroke/fill
    const color = computed.color || '#888';
    const allPaths = clone.querySelectorAll('path, line, rect, circle, polyline, polygon');
    allPaths.forEach(el => {
      if (el.getAttribute('stroke') === 'currentColor') el.setAttribute('stroke', color);
      if (el.getAttribute('fill') === 'currentColor') el.setAttribute('fill', color);
    });
    if (clone.getAttribute('stroke') === 'currentColor') clone.setAttribute('stroke', color);
    if (clone.getAttribute('fill') === 'currentColor') clone.setAttribute('fill', color);
    
    const svgString = new XMLSerializer().serializeToString(clone);
    const dataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
    
    const img = document.createElement('img');
    img.src = dataUri;
    img.style.width = typeof width === 'string' && width.endsWith('px') ? width : `${width}px`;
    img.style.height = typeof height === 'string' && height.endsWith('px') ? height : `${height}px`;
    img.style.display = 'inline-block';
    img.style.verticalAlign = 'middle';
    img.style.flexShrink = '0';
    
    svg.parentNode?.replaceChild(img, svg);
  });
}

// Check if we're on mobile (for share vs download)
function isMobile() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

export function ExportOptions({ previewRef }: Props) {
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);

  const captureImage = useCallback(async () => {
    if (!previewRef.current) return null;
    const element = previewRef.current;
    // Capture the element's current rendered width so the clone matches exactly
    const rect = element.getBoundingClientRect();
    
    return await html2canvas(element, {
      backgroundColor: null,
      scale: 2,
      logging: false,
      useCORS: true,
      width: rect.width,
      scrollY: -window.scrollY,
      onclone: (_doc, clonedElement) => {
        // Force the cloned element to the same width as the original
        clonedElement.style.width = `${rect.width}px`;
        clonedElement.style.minWidth = `${rect.width}px`;
        clonedElement.style.maxWidth = `${rect.width}px`;
        clonedElement.style.overflow = 'visible';
        // Remove sticky positioning — breaks html2canvas rendering
        const stickyElements = clonedElement.querySelectorAll('*');
        stickyElements.forEach(el => {
          const computed = getComputedStyle(el);
          if (computed.position === 'sticky') {
            (el as HTMLElement).style.position = 'relative';
          }
        });
        sanitizeColors(clonedElement);
        inlineSvgs(clonedElement);
      }
    });
  }, [previewRef]);

  const canvasToBlob = (canvas: HTMLCanvasElement): Promise<Blob | null> => {
    return new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
  };

  // On mobile: use Web Share API → iOS will show "Save Image" option → goes to Camera Roll
  // On desktop: regular download
  const downloadOrShare = async () => {
    setExporting(true);
    try {
      const canvas = await captureImage();
      if (!canvas) return;

      if (isMobile() && navigator.share) {
        const blob = await canvasToBlob(canvas);
        if (!blob) return;
        const file = new File([blob], `ai-response-${Date.now()}.png`, { type: 'image/png' });
        await navigator.share({
          files: [file],
          title: 'AI Response Screenshot',
        });
      } else {
        const link = document.createElement('a');
        link.download = `ai-response-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    } catch (err) {
      // User cancelled share sheet — that's fine
      if ((err as Error)?.name !== 'AbortError') {
        console.error('Export failed:', err);
      }
    } finally {
      setExporting(false);
    }
  };

  const copyToClipboard = async () => {
    setExporting(true);
    try {
      const canvas = await captureImage();
      if (!canvas) return;
      const blob = await canvasToBlob(canvas);
      if (!blob) return;
      
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Fallback: trigger share/download
        await downloadOrShare();
      }
    } catch (err) {
      console.error('Copy failed:', err);
    } finally {
      setExporting(false);
    }
  };

  const mobile = isMobile();

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Export</h2>
      <div className="flex gap-2">
        <button
          onClick={copyToClipboard}
          disabled={exporting}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors disabled:opacity-50"
        >
          {copied ? (
            <><Check className="w-4 h-4" /> Copied</>
          ) : (
            <><Copy className="w-4 h-4" /> Copy</>
          )}
        </button>
        <button
          onClick={downloadOrShare}
          disabled={exporting}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors disabled:opacity-50"
        >
          {mobile ? (
            <><Share2 className="w-4 h-4" /> Save to Photos</>
          ) : (
            <><Download className="w-4 h-4" /> Download PNG</>
          )}
        </button>
      </div>
    </div>
  );
}
