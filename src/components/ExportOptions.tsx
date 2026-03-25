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
    
    const canvas = await html2canvas(previewRef.current, {
      backgroundColor: null,
      scale: 2, // Higher resolution
      logging: false,
      useCORS: true,
    });
    
    return canvas;
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
        } catch (err) {
          // Fallback: download if clipboard fails
          console.error('Clipboard failed, downloading instead:', err);
          const link = document.createElement('a');
          link.download = `ai-response-${Date.now()}.png`;
          link.href = canvas.toDataURL('image/png');
          link.click();
        }
      }, 'image/png');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Export</h2>
      <div className="flex gap-2">
        <button
          onClick={copyToClipboard}
          disabled={exporting}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy to Clipboard
            </>
          )}
        </button>
        <button
          onClick={downloadPNG}
          disabled={exporting}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          PNG
        </button>
      </div>
    </div>
  );
}
