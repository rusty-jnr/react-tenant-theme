import "./App.css";
import { useThemeEngine } from "react-tenant-theme";

export default function App() {
  const { tenant, theme, setTenant, setTheme } = useThemeEngine();

  return (
    <div className="page">
      <header className="header">
        <h1>Theming Engine Demo</h1>
        <p>
          Tenant: <b>{tenant.name}</b> — Theme: <b>{theme.name}</b>
        </p>
      </header>

      <div className="controls">
        <label>
          Tenant
          <select value={tenant.id} onChange={(e) => setTenant(e.target.value)}>
            <option value="acme">Acme</option>
            <option value="globex">Globex</option>
          </select>
        </label>

        <label>
          Theme
          <select value={theme.id} onChange={(e) => setTheme(e.target.value)}>
            {tenant.themes.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <main className="card">
        <h2>Example UI</h2>
        <p>
          This UI is driven by CSS variables set by the theming engine. Switch tenant/theme to see colors update.
        </p>
        <button className="btn">Primary action</button>
      </main>
    </div>
  );
}