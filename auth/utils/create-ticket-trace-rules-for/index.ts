import { Session } from "next-auth";
import { AbilityBuilder } from "@casl/ability";

import { AppAbility } from "../../ability";

export function createTicketTraceRulesFor(
  _: Session,
  builder: AbilityBuilder<AppAbility>
) {
  builder.can("read", "TicketTrace");
}
