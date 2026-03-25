import { Download, Copy, Check } from 'lucide-react';
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
    
    // Check each color property
    const colorProps = [
      'backgroundColor', 'color', 'borderColor', 
      'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor',
      'outlineColor', 'textDecorationColor', 'caretColor',
      'boxShadow'
    ] as const;
    
    for (const prop of colorProps) {
      const value = style[prop as keyof CSSStyleDeclaration] as string;
      if (value && typeof value === 'string' && unsupportedColorPattern.test(value)) {
        if (prop === 'backgroundColor') {
          el.style.backgroundColor = 'transparent';
        } else if (prop === 'color') {
          // Try to inherit, or fall back to a safe color
          el.style.color = '#d4d4d4';
        } else if (prop === 'boxShadow') {
          el.style.boxShadow = 'none';
        } else {
          (el.style as unknown as Record<string, string>)[prop] = 'transparent';
        }
      }
    }
  }
}

export function ExportOptions({ previewRef }: Props) {
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);

  const captureImage = useCallback(async () => {
    if (!previewRef.current) return null;
    
    const element = previewRef.current;
    
    return await html2canvas(element, {
      backgroundColor: null,
      scale: 2,
      logging: false,
      useCORS: true,
      // Capture the full content, not clipped
      scrollY: -window.scrollY,
      onclone: (_doc, clonedElement) => {
        // Sanitize all unsupported color functions in the cloned DOM
        sanitizeColors(clonedElement);
      }
    });
  }, [previewRef]);

  const downloadPNG = async () => {
    setExporting(true);
    try {
      const canvas = await captureImage();
      if (!canvas) return;
      const link = document.createElement('a');
      link.download = `ai-response-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
      alert('Export failed — please try again');
    } finally {
      setExporting(false);
    }
  };

  const copyToClipboard = async () => {
    setExporting(true);
    try {
      const canvas = await captureImage();
      if (!canvas) return;
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          // Fallback to download
          const link = document.createElement('a');
          link.download = `ai-response-${Date.now()}.png`;
          link.href = canvas.toDataURL('image/png');
          link.click();
        }
      }, 'image/png');
    } catch (err) {
      console.error('Copy failed:', err);
      alert('Copy failed — please try again');
    } finally {
      setExporting(false);
    }
  };

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
            <><Copy className="w-4 h-4" /> Copy to Clipboard</>
          )}
        </button>
        <button
          onClick={downloadPNG}
          disabled={exporting}
          className="flex items-center justify-center gap-2 px-4 py-2 text-sm border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          PNG
        </button>
      </div>
    </div>
  );
}
