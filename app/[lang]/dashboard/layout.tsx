import { Layout } from "@/components/templates/layout";

export interface DashboardLayoutProps {
  children: React.ReactElement;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <Layout>{children}</Layout>;
}
