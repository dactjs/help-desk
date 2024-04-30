import { Session } from "next-auth";
import { AbilityBuilder } from "@casl/ability";
import { UserRole, TicketStatus } from "@prisma/client";

import { AppAbility } from "../../ability";

export function createTicketRulesFor(
  { user }: Session,
  builder: AbilityBuilder<AppAbility>
) {
  builder.can("create", "Ticket");
  builder.can("read", "Ticket", { sentById: user?.id });

  if (user?.role === UserRole.USER) {
    builder.can("close", "Ticket", {
      sentById: user?.id,
      status: { in: [TicketStatus.RESOLVED] },
      NOT: { OR: [{ assignedTo: null }, { assignedToId: null }] },
    });

    builder.can("cancel", "Ticket", {
      sentById: user?.id,
      status: {
        in: [
          TicketStatus.UNASSIGNED,
          TicketStatus.ASSIGNED,
          TicketStatus.IN_PROGRESS,
        ],
      },
    });
  }

  if (user?.role === UserRole.TECHNICIAN) {
    builder.can("read", "Ticket");

    builder.can("take", "Ticket", {
      status: TicketStatus.UNASSIGNED,
      OR: [{ assignedTo: null }, { assignedToId: null }],
    });

    builder.can("open", "Ticket", {
      assignedToId: user?.id,
      status: { in: [TicketStatus.ASSIGNED] },
      NOT: { OR: [{ assignedTo: null }, { assignedToId: null }] },
    });

    builder.can("resolve", "Ticket", {
      assignedToId: user?.id,
      status: { in: [TicketStatus.IN_PROGRESS] },
      NOT: { OR: [{ assignedTo: null }, { assignedToId: null }] },
    });

    builder.can("cancel", "Ticket", {
      status: {
        in: [
          TicketStatus.UNASSIGNED,
          TicketStatus.ASSIGNED,
          TicketStatus.IN_PROGRESS,
        ],
      },
    });
  }

  if (user?.role === UserRole.ADMIN) {
    builder.can("read", "Ticket");

    builder.can("assign", "Ticket", {
      status: TicketStatus.UNASSIGNED,
      OR: [{ assignedTo: null }, { assignedToId: null }],
    });

    builder.can("transfer", "Ticket", {
      status: { in: [TicketStatus.ASSIGNED, TicketStatus.IN_PROGRESS] },
      NOT: { OR: [{ assignedTo: null }, { assignedToId: null }] },
    });

    builder.can("open", "Ticket", {
      status: { in: [TicketStatus.ASSIGNED] },
      NOT: { OR: [{ assignedTo: null }, { assignedToId: null }] },
    });

    builder.can("resolve", "Ticket", {
      status: { in: [TicketStatus.IN_PROGRESS] },
      NOT: { OR: [{ assignedTo: null }, { assignedToId: null }] },
    });

    builder.can("close", "Ticket", {
      status: { in: [TicketStatus.RESOLVED] },
      NOT: { OR: [{ assignedTo: null }, { assignedToId: null }] },
    });

    builder.can("cancel", "Ticket", {
      status: {
        in: [
          TicketStatus.UNASSIGNED,
          TicketStatus.ASSIGNED,
          TicketStatus.IN_PROGRESS,
        ],
      },
    });

    builder.can("delete", "Ticket");
  }
}
