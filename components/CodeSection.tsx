import React, { useEffect, useState } from "react";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";
import rehypeParse from "rehype-parse";

const CodeHighlight = ({ code }: { code: string }) => {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    const processHtml = async () => {
      const file = await unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypePrettyCode, {
          theme: "tokyo-night",
          onVisitLine(node: any) {
            if (
              node.children.length === 1 &&
              node.children[0].type === "text" &&
              node.children[0].value === ""
            ) {
              node.children = [];
            }
          },
          onVisitHighlightedLine(node: any) {
            // Ajouter une classe personnalisée aux lignes mises en surbrillance
            if (!node.properties.className) {
              node.properties.className = [];
            }
            node.properties.className.push("highlighted");
          },
          onVisitHighlightedWord(node: any) {
            // Ajouter une classe personnalisée aux mots mis en surbrillance
            node.properties.className = ["word"];
          },
        } as any)
        .use(rehypeStringify)
        .process(`<pre><code class="language-javascript">${code}</code></pre>`);

      setHtml(String(file));
    };

    processHtml();
  }, [code]);

  return (
    <div className="w-full">
      <div
        className="max-h-72 overflow-auto w-full text-balance"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

export default CodeHighlight;
