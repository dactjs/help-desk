import DashboardIcon from "@mui/icons-material/Dashboard";
import TicketsIcon from "@mui/icons-material/ConfirmationNumber";
import ResourcesIcon from "@mui/icons-material/Devices";
import UsersIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";

import { Dashboard } from "@/components/templates/dashboard";
import { DashboardNavigationType } from "@/components/templates/dashboard/types";
import { getDictionary } from "@/internationalization/dictionaries/common";
import { PageParams } from "@/types/page-params";

export interface TechniciansLayoutProps {
  params: PageParams;
  children: React.ReactNode;
}

export default async function TechniciansLayout({
  params: { lang },
  children,
}: TechniciansLayoutProps) {
  const {
    technicians_layout: {
      dashboard_item_text,
      tickets_item_text,
      resources_item_text,
      users_item_text,
      settings_item_text,
    },
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
        {
          type: DashboardNavigationType.ITEM,
          href: `/${lang}/technicians/settings`,
          icon: <SettingsIcon />,
          text: settings_item_text,
        },
      ]}
    >
      {children}
    </Dashboard>
  );
}
