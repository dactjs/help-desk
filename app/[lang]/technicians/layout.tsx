import DashboardIcon from "@mui/icons-material/Dashboard";
import TicketsIcon from "@mui/icons-material/ConfirmationNumber";
import ResourcesIcon from "@mui/icons-material/Devices";
import UsersIcon from "@mui/icons-material/Group";

import { Dashboard } from "@/components/templates/dashboard";
import { DashboardNavigationType } from "@/components/templates/dashboard/types/navigation";
import { PageParams } from "@/types/page-params";

import { getDictionary } from "./_dictionaries";

export interface TechniciansLayoutProps {
  params: PageParams;
  children: React.ReactElement;
}

export default async function TechniciansLayout({
  params: { lang },
  children,
}: TechniciansLayoutProps) {
  const {
    dashboard_item_text,
    tickets_item_text,
    resources_item_text,
    users_item_text,
  } = await getDictionary(lang);

  return (
    <Dashboard
      navigation={[
        {
          type: DashboardNavigationType.ITEM,
          href: `/${lang}/technicians/dashboard`,
          icon: <DashboardIcon />,
          text: dashboard_item_text,
        },
        {
          type: DashboardNavigationType.ITEM,
          href: `/${lang}/technicians/tickets`,
          icon: <TicketsIcon />,
          text: tickets_item_text,
        },
        {
          type: DashboardNavigationType.ITEM,
          href: `/${lang}/technicians/resources`,
          icon: <ResourcesIcon />,
          text: resources_item_text,
        },
        {
          type: DashboardNavigationType.ITEM,
          href: `/${lang}/technicians/users`,
          icon: <UsersIcon />,
          text: users_item_text,
        },
      ]}
    >
      {children}
    </Dashboard>
  );
}
