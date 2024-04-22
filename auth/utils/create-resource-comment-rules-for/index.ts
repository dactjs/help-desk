import { Session } from "next-auth";
import { AbilityBuilder } from "@casl/ability";
import { UserRole } from "@prisma/client";

import { AppAbility } from "../../ability";

export function createResourceCommentRulesFor(
  { user }: Session,
  builder: AbilityBuilder<AppAbility>
) {
  builder.can("create", "ResourceComment");

  builder.can(["read", "delete"], "ResourceComment", {
    writtenById: user?.id,
  });

  builder.can("update", "ResourceComment", ["content"], {
    writtenById: user?.id,
  });

  if (user?.role === UserRole.ADMIN || user?.role === UserRole.TECHNICIAN) {
    builder.can("read", "ResourceComment");
  }

  if (user?.role === UserRole.ADMIN) {
    builder.can("delete", "ResourceComment");
  }
}
