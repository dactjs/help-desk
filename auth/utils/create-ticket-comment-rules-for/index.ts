import { Session } from "next-auth";
import { AbilityBuilder } from "@casl/ability";
import { UserRole } from "@prisma/client";

import { AppAbility } from "../../ability";

export function createTicketCommentRulesFor(
  { user }: Session,
  builder: AbilityBuilder<AppAbility>
) {
  builder.can("create", "TicketComment");

  builder.can(["read", "delete"], "TicketComment", {
    writtenById: user?.id,
  });

  builder.can("update", "TicketComment", ["content"], {
    writtenById: user?.id,
  });

  if (user?.role === UserRole.ADMIN || user?.role === UserRole.TECHNICIAN) {
    builder.can("read", "TicketComment");
  }

  if (user?.role === UserRole.ADMIN) {
    builder.can("delete", "TicketComment");
  }
}
