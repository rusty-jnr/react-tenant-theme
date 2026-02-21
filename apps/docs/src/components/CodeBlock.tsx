import React from "react";
import { codeToHtml } from "shiki";

type Props = {
  code: string;
  lang?: "ts" | "tsx" | "js" | "bash" | "json" | "css" | "scss";
  title?: string;
};

export function CodeBlock({ code, lang = "ts", title }: Props) {
  const [html, setHtml] = React.useState<string>("");

  React.useEffect(() => {
    let cancelled = false;

    (async () => {
      const out = await codeToHtml(code, {
        lang,
        theme: "github-dark-default",
      });
      if (!cancelled) setHtml(out);
    })();

    return () => {
      cancelled = true;
    };
  }, [code, lang]);

  return (
    <div className="codeShell">
      <div className="codeHeader">
        <span>{title ?? lang.toUpperCase()}</span>
        <span />
      </div>

      <div
        className="codePre"
        // Shiki returns a <pre class="shiki">...</pre>
        // We safely inject because it's generated from our own string
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}