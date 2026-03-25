import { Download, Copy, Check } from 'lucide-react';
import html2canvas from 'html2canvas';
import { useState, useCallback } from 'react';

interface Props {
  previewRef: React.RefObject<HTMLDivElement | null>;
}

export function ExportOptions({ previewRef }: Props) {
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);

  const captureImage = useCallback(async () => {
    if (!previewRef.current) return null;
    
    const element = previewRef.current;
    
    // Capture only the visible portion (viewport), not scrollable content
    return await html2canvas(element, {
      backgroundColor: null,
      scale: 2,
      logging: false,
      useCORS: true,
      // Limit capture to visible viewport
      height: Math.min(element.clientHeight, element.scrollHeight),
      width: element.clientWidth,
      windowHeight: element.clientHeight,
      windowWidth: element.clientWidth,
      // Don't scroll, capture what's visible
      scrollX: 0,
      scrollY: 0,
      // Clip to visible area
      x: 0,
      y: 0,
      // Replace oklch colors that html2canvas can't parse
      onclone: (doc) => {
        const allElements = doc.querySelectorAll('*');
        allElements.forEach((el) => {
          const computed = window.getComputedStyle(el);
          const htmlEl = el as HTMLElement;
          if (computed.backgroundColor.includes('oklch')) {
            htmlEl.style.backgroundColor = 'transparent';
          }
          if (computed.color.includes('oklch')) {
            htmlEl.style.color = 'inherit';
          }
          if (computed.borderColor.includes('oklch')) {
            htmlEl.style.borderColor = 'transparent';
          }
        });
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
          const link = document.createElement('a');
          link.download = `ai-response-${Date.now()}.png`;
          link.href = canvas.toDataURL('image/png');
          link.click();
        }
      }, 'image/png');
    } catch (err) {
      console.error('Copy failed:', err);
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
