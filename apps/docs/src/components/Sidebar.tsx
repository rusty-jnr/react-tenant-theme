import { NavLink } from "react-router-dom";
import { useThemeEngine } from "react-tenant-theme";

function linkClass({ isActive }: { isActive: boolean }) {
  return `navLink ${isActive ? "navLinkActive" : ""}`;
}

export function Sidebar() {
  const { tenants, tenant, theme, setTenant, setTheme } = useThemeEngine();

  return (
    <aside className="sidebar">
      <div className="brand">
        <div>
          <div className="brandTitle">React Tenant Theme</div>
          <div className="brandSub">Docs & Examples</div>
        </div>
      </div>

      <div className="sidebarSection">Getting Started</div>
      <nav className="nav">
        <NavLink to="/" className={linkClass} end>
          <span>Home</span>
          <span className="navHint">Overview</span>
        </NavLink>
        <NavLink to="/getting-started" className={linkClass}>
          <span>Install & setup</span>
          <span className="navHint">Quick start</span>
        </NavLink>
        <NavLink to="/multi-tenant" className={linkClass}>
          <span>Multi-tenant</span>
          <span className="navHint">Tenants & themes</span>
        </NavLink>
        <NavLink to="/async" className={linkClass}>
          <span>Async config</span>
          <span className="navHint">Load from API</span>
        </NavLink>
      </nav>

      <div className="sidebarSection">Reference</div>
      <nav className="nav">
        <NavLink to="/api" className={linkClass}>
          <span>API Reference</span>
          <span className="navHint">Provider, Hook, Types</span>
        </NavLink>
        <NavLink to="/roadmap" className={linkClass}>
          <span>Roadmap</span>
          <span className="navHint">Planned</span>
        </NavLink>
      </nav>

      <div className="sidebarFooter">
        <label className="controlLabel">
          Tenant
          <select
            className="select"
            value={tenant.id}
            onChange={(e) => setTenant(e.target.value)}
          >
            {tenants.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </label>

        <label className="controlLabel">
          Theme
          <select
            className="select"
            value={theme.id}
            onChange={(e) => setTheme(e.target.value)}
          >
            {tenant.themes.map((th) => (
              <option key={th.id} value={th.id}>
                {th.name}
              </option>
            ))}
          </select>
        </label>
      </div>
    </aside>
  );
}