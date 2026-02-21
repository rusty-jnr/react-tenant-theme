import { Outlet } from "react-router-dom";
import "../styles/docs.css";
import { Sidebar } from "../components/Sidebar";

export function DocsLayout() {
  return (
    <div className="docs">
      <Sidebar />
      <main className="main">
        <div className="content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}