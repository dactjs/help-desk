import { Session } from "next-auth";
import { AbilityBuilder } from "@casl/ability";
import { UserRole } from "@prisma/client";

import { AppAbility } from "../../ability";

export function createResourceRulesFor(
  { user }: Session,
  builder: AbilityBuilder<AppAbility>
) {
  builder.can("read", "Resource", { assignedToId: user?.id });

  if (user?.role === UserRole.ADMIN || user?.role === UserRole.TECHNICIAN) {
    builder.can("read", "Resource");
    builder.can("update", "Resource", ["brand", "model", "serial"]);
  }

  if (user?.role === UserRole.ADMIN) {
    builder.can("assign", "Resource", { assignedTo: null });

    builder.can("transfer", "Resource", { NOT: { assignedTo: null } });

    builder.can("unassign", "Resource", { NOT: { assignedTo: null } });

    builder.can("repair", "Resource");

    builder.can("output", "Resource", { assignedTo: null });

    builder.can("delete", "Resource");
  }
}
