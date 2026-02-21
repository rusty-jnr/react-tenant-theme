import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DocsLayout } from "./layout/DocsLayout";
import { Home } from "./pages/Home";
import { GettingStarted } from "./pages/GettingStarted";
import { MultiTenant } from "./pages/MultiTenant";
import { AsyncOrgConfig } from "./pages/AsyncOrgConfig";
import { ApiReference } from "./pages/ApiReference";
import { Roadmap } from "./pages/Roadmap";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DocsLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/getting-started" element={<GettingStarted />} />
          <Route path="/multi-tenant" element={<MultiTenant />} />
          <Route path="/async" element={<AsyncOrgConfig />} />
          <Route path="/api" element={<ApiReference />} />
          <Route path="/roadmap" element={<Roadmap />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}