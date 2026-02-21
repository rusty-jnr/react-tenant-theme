export type OrgConfigResponse = {
  orgId: string;
  orgName: string;
  defaultThemeId: string;
  colors: {
    bg: string;
    fg: string;
    primary: string;
  };
};

export async function fetchOrgConfig(): Promise<OrgConfigResponse> {
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 700));

  // Simulate an org config response from your backend
  return {
    orgId: "acme",
    orgName: "Acme Inc",
    defaultThemeId: "brand",
    colors: {
      bg: "#0b1020",
      fg: "#e5e7eb",
      primary: "#60a5fa",
    },
  };
}