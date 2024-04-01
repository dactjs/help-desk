import TicketsIcon from "@mui/icons-material/ConfirmationNumber";
import ResourcesIcon from "@mui/icons-material/Devices";
import UsersIcon from "@mui/icons-material/Group";

import { Dashboard } from "@/components/templates/draft";
import { PageParams } from "@/types/page-params";

import { getDictionary } from "./_dictionaries";

export interface AdminLayoutProps {
  params: PageParams;
  children: React.ReactElement;
}

//  TODO: dont use draft
export default async function AdminLayout({
  params: { lang },
  children,
}: AdminLayoutProps) {
  const { tickets, resources, users } = await getDictionary(lang);

  return (
    <Dashboard
      navigation={[
        {
          href: `/${lang}/admin/tickets`,
          type: "ITEM",
          icon: <TicketsIcon />,
          label: tickets,
        },
        {
          href: `/${lang}/admin/resources`,
          type: "ITEM",
          icon: <ResourcesIcon />,
          label: resources,
        },
        {
          href: `/${lang}/admin/users`,
          type: "ITEM",
          icon: <UsersIcon />,
          label: users,
        },
      ]}
    >
      {children}
    </Dashboard>
  );
}
