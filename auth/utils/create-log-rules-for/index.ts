import { Session } from "next-auth";
import { AbilityBuilder } from "@casl/ability";
import { UserRole } from "@prisma/client";

import { AppAbility } from "../../ability";

export function createLogRulesFor(
  { user }: Session,
  builder: AbilityBuilder<AppAbility>
) {
  if (user?.role === UserRole.ADMIN) {
    builder.can("read", "Log");
  }
}
