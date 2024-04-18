import { Session } from "next-auth";
import { AbilityBuilder } from "@casl/ability";
import { UserRole } from "@prisma/client";

import { AppAbility } from "../../ability";

export function createTicketServiceRulesFor(
  { user }: Session,
  builder: AbilityBuilder<AppAbility>
) {
  builder.can("read", "TicketService");

  if (user?.role === UserRole.ADMIN) {
    builder.can(["create", "delete"], "TicketService");
    builder.can("update", "TicketService", ["name", "categoryId"]);
  }
}
