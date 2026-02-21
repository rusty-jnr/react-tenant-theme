import React from "react";

export function InlineCode({ children }: { children: React.ReactNode }) {
  return <code className="inlineCode">{children}</code>;
}

export function Tag({ children }: { children: React.ReactNode }) {
  return <span className="tag">{children}</span>;
}