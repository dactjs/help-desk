import { Session } from "next-auth";
import { AbilityBuilder } from "@casl/ability";
import { UserRole } from "@prisma/client";

import { AppAbility } from "../../ability";

export function createTicketServiceCategoryRulesFor(
  { user }: Session,
  builder: AbilityBuilder<AppAbility>
) {
  builder.can("read", "TicketServiceCategory");

  if (user?.role === UserRole.ADMIN) {
    builder.can(["create", "delete"], "TicketServiceCategory");
    builder.can("update", "TicketServiceCategory", ["name"]);
  }
}
