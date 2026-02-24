import React from "react";
import { codeToHtml } from "shiki";

type Props = {
  code: string;
  lang?: "ts" | "tsx" | "js" | "bash" | "json" | "css" | "scss";
  title?: string;
};

export function CodeBlock({ code, lang = "ts", title }: Props) {
  const [html, setHtml] = React.useState<string>("");
  const [isScrollable, setIsScrollable] = React.useState(false);
  const preRef = React.useRef<HTMLDivElement>(null);

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

  React.useEffect(() => {
    if (!html) return;
    const container = preRef.current;
    const el = container?.querySelector("pre");
    if (!el || !container) return;

    const check = () => {
      setIsScrollable(el.scrollWidth > el.clientWidth);
    };
    check();
    requestAnimationFrame(check);
    const ro = new ResizeObserver(check);
    ro.observe(container);
    return () => ro.disconnect();
  }, [html]);

  return (
    <div className="codeShell">
      <div className="codeHeader">
        <span>{title ?? lang.toUpperCase()}</span>
        <span />
      </div>

      <div
        ref={preRef}
        className={`codePre ${isScrollable ? "codePre--scrollable" : ""}`}
        // Shiki returns a <pre class="shiki">...</pre>
        // We safely inject because it's generated from our own string
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}