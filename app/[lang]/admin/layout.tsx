import DashboardIcon from "@mui/icons-material/Dashboard";
import TicketsIcon from "@mui/icons-material/ConfirmationNumber";
import ResourcesIcon from "@mui/icons-material/Devices";
import UsersIcon from "@mui/icons-material/Group";
import PerformanceIcon from "@mui/icons-material/Speed";
import GeneralPerformanceIcon from "@mui/icons-material/GroupWork";
import IndividualPerformanceIcon from "@mui/icons-material/SupportAgent";
import SettingsIcon from "@mui/icons-material/Settings";

import { Dashboard } from "@/components/templates/dashboard";
import { DashboardNavigationType } from "@/components/templates/dashboard/types";
import { getDictionary } from "@/internationalization/dictionaries/common";
import { PageParams } from "@/types/page-params";

export interface AdminLayoutProps {
  params: PageParams;
  children: React.ReactNode;
}

export default async function AdminLayout({
  params: { lang },
  children,
}: AdminLayoutProps) {
  const {
    admin_layout: {
      dashboard_item_text,
      tickets_item_text,
      resources_item_text,
      users_item_text,
      performance_group_heading,
      general_performance_item_text,
      individual_performance_item_text,
      settings_item_text,
    },
  } = await getDictionary(lang);

  return (
    <Dashboard
      navigation={[
        {
          type: DashboardNavigationType.ITEM,
          href: `/${lang}/admin/dashboard`,
          icon: <DashboardIcon />,
          text: dashboard_item_text,
        },
        {
          type: DashboardNavigationType.ITEM,
          href: `/${lang}/admin/tickets`,
          icon: <TicketsIcon />,
          text: tickets_item_text,
        },
        {
          type: DashboardNavigationType.ITEM,
          href: `/${lang}/admin/resources`,
          icon: <ResourcesIcon />,
          text: resources_item_text,
        },
        {
          type: DashboardNavigationType.ITEM,
          href: `/${lang}/admin/users`,
          icon: <UsersIcon />,
          text: users_item_text,
        },
        {
          type: DashboardNavigationType.GROUP,
          icon: <PerformanceIcon />,
          heading: performance_group_heading,
          items: [
            {
              type: DashboardNavigationType.ITEM,
              href: `/${lang}/admin/performance/general`,
              icon: <GeneralPerformanceIcon />,
              text: general_performance_item_text,
            },
            {
              type: DashboardNavigationType.ITEM,
              href: `/${lang}/admin/performance/technicians`,
              icon: <IndividualPerformanceIcon />,
              text: individual_performance_item_text,
            },
          ],
        },
        {
          type: DashboardNavigationType.ITEM,
          href: `/${lang}/admin/settings`,
          icon: <SettingsIcon />,
          text: settings_item_text,
        },
      ]}
    >
      {children}
    </Dashboard>
  );
}
