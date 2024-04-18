import { Session } from "next-auth";
import { AbilityBuilder } from "@casl/ability";
import { UserRole } from "@prisma/client";

import { AppAbility } from "../../ability";

export function createUserRulesFor(
  { user }: Session,
  builder: AbilityBuilder<AppAbility>
) {
  builder.can("read", "User");

  if (user?.role === UserRole.ADMIN) {
    builder.can(["create", "reset-password", "delete"], "User");

    builder.can("update", "User", [
      "username",
      "email",
      "name",
      "status",
      "role",
    ]);
  }
}
