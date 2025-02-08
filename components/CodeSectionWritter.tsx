//@ts-nocheck

import React, { useEffect, useState } from 'react';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import { useTypewriter } from 'react-simple-typewriter';
import { escape } from 'html-escaper';

const CodeHighlightWriter = ({
    code,
    onTypingComplete, 
  }: {
    code: string;
    onTypingComplete?: () => void; 
  }) => {
    
  const [html, setHtml] = useState<string>('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const typingDelay = 0;

  useEffect(() => {
    const processCode = async () => {

        const escapeCode = escape(code);

        const file = await unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypePrettyCode, {
          theme: 'tokyo-night',
          onVisitLine(node:any) {
            if (node.children.length === 1 && node.children[0].type === 'text' && node.children[0].value === '') {
              node.children = [];
            }
          },
          onVisitHighlightedLine(node:any) {
            // Ajouter une classe personnalisée aux lignes mises en surbrillance
            if (!node.properties.className) {
              node.properties.className = [];
            }
            node.properties.className.push('highlighted');
          },
          onVisitHighlightedWord(node:any) {
            node.properties.className = ['word'];
          },
        } as any )
        .use(rehypeStringify)
        .process(`<pre><code class="language-jsx">${escapeCode}</code></pre>`);

      setHtml(String(file));
    };

    processCode();
  }, [code]);

  const stripHtml = (html: string) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  const [text, helper] = useTypewriter({
    words: [code],
    loop: 1,
    typeSpeed:0 ,
  });

  const { isType, isDelete, isDelay, isDone } = helper;

  useEffect(() => {
    if (isDone) {
      setIsTypingComplete(true);
      onTypingComplete?.();
    }
  }, [isDone, onTypingComplete]);

  return (
    <div className="w-full rounded-lg h-full overflow-auto">
      {!isTypingComplete ? (
        <div className="font-mono text-sm text-[#a9b1d6] p-4  w-full  whitespace-pre bg-[#1a1b26] rounded-lg">
          <span>{text}</span>
        </div>
      ) : (
        <div 
          className="font-mono text-sm h-full "
          dangerouslySetInnerHTML={{ __html: html }} 
        />
      )}
    </div>
  );
};

export default CodeHighlightWriter;
