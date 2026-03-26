import { Download, Copy, Check, Share2 } from 'lucide-react';
import { domToBlob } from 'modern-screenshot';
import { useState, useCallback } from 'react';

interface Props {
  previewRef: React.RefObject<HTMLDivElement | null>;
}

// Check if we're on mobile (for share vs download)
function isMobile() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

export function ExportOptions({ previewRef }: Props) {
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);

  const captureBlob = useCallback(async (): Promise<Blob | null> => {
    if (!previewRef.current) return null;
    const element = previewRef.current;

    return await domToBlob(element, {
      scale: 2,
      quality: 1,
      type: 'image/png',
      features: {
        // Don't remove control characters from text
        removeControlCharacter: false,
      },
    });
  }, [previewRef]);

  // On mobile: use Web Share API → iOS will show "Save Image" option → goes to Camera Roll
  // On desktop: regular download
  const downloadOrShare = async () => {
    setExporting(true);
    try {
      const blob = await captureBlob();
      if (!blob) return;

      if (isMobile() && navigator.share) {
        const file = new File([blob], `ai-response-${Date.now()}.png`, { type: 'image/png' });
        await navigator.share({
          files: [file],
          title: 'AI Response Screenshot',
        });
      } else {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `ai-response-${Date.now()}.png`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
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
      const blob = await captureBlob();
      if (!blob) return;

      try {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
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
