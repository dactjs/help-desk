import { Session } from "next-auth";
import { AbilityBuilder } from "@casl/ability";
import { UserRole, ResourceStatus } from "@prisma/client";

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
    builder.can("create", "Resource");

    builder.can("input", "Resource", {
      status: ResourceStatus.REPAIR_IN_PROGRESS,
    });

    builder.can("assign", "Resource", {
      status: ResourceStatus.UNASSIGNED,
      OR: [{ assignedTo: null }, { assignedToId: null }],
    });

    builder.can("transfer", "Resource", {
      status: ResourceStatus.ASSIGNED,
      NOT: { OR: [{ assignedTo: null }, { assignedToId: null }] },
    });

    builder.can("unassign", "Resource", {
      status: ResourceStatus.ASSIGNED,
      NOT: { OR: [{ assignedTo: null }, { assignedToId: null }] },
    });

    builder.can("repair", "Resource", {
      status: { in: [ResourceStatus.ASSIGNED, ResourceStatus.UNASSIGNED] },
    });

    builder.can("output", "Resource", {
      status: {
        in: [ResourceStatus.UNASSIGNED, ResourceStatus.REPAIR_IN_PROGRESS],
      },
      OR: [{ assignedTo: null }, { assignedToId: null }],
    });

    builder.can("delete", "Resource");
  }
}
