import ReactMarkdown from 'react-markdown';

interface Props {
  content: string;
  className?: string;
}

export function Markdown({ content, className = '' }: Props) {
  return (
    <div className={className}>
    <ReactMarkdown
      components={{
        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
        strong: ({ children }) => <strong className="font-bold">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        code: ({ children }) => (
          <code className="bg-black/20 rounded px-1.5 py-0.5 text-sm font-mono">{children}</code>
        ),
        pre: ({ children }) => (
          <pre className="bg-black/20 rounded-lg p-3 overflow-x-auto my-2">{children}</pre>
        ),
        ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 my-2">{children}</ol>,
        ul: ({ children }) => <ul className="list-disc list-inside space-y-1 my-2">{children}</ul>,
        li: ({ children }) => <li>{children}</li>,
        h1: ({ children }) => <h1 className="text-xl font-bold mt-3 mb-1">{children}</h1>,
        h2: ({ children }) => <h2 className="text-lg font-bold mt-3 mb-1">{children}</h2>,
        h3: ({ children }) => <h3 className="text-base font-bold mt-2 mb-1">{children}</h3>,
      }}
    >
      {content}
    </ReactMarkdown>
    </div>
  );
}
