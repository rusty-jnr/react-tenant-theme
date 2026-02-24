import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "../styles/docs.css";
import { Sidebar } from "../components/Sidebar";

export function DocsLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <div className="docs">
      <header className="docsHeader" aria-label="Site header">
        <button
          type="button"
          className="docsHeaderMenuBtn"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <div className="docsHeaderBrand">
          <span className="docsHeaderBrandTitle">React Tenant Theme</span>
          <span className="docsHeaderBrandSub">Docs</span>
        </div>
      </header>

      <div
        className={`sidebarBackdrop ${mobileMenuOpen ? "sidebarBackdropVisible" : ""}`}
        aria-hidden={!mobileMenuOpen}
        onClick={() => setMobileMenuOpen(false)}
      />

      <Sidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <main className="main">
        <div className="content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
