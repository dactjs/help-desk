export type DashboardNavigationType =
  (typeof DashboardNavigationType)[keyof typeof DashboardNavigationType];

export const DashboardNavigationType = {
  ITEM: "ITEM",
  GROUP: "GROUP",
} as const;

export type DashboardNavigationItem = {
  type: typeof DashboardNavigationType.ITEM;
  href: string;
  icon: React.ReactNode;
  text: string;
};

export type DashboardNavigationGroup = {
  type: typeof DashboardNavigationType.GROUP;
  icon: React.ReactNode;
  heading: string;
  items: DashboardNavigationItem[];
};

export type DashboardNavigation = Array<
  DashboardNavigationItem | DashboardNavigationGroup
>;
