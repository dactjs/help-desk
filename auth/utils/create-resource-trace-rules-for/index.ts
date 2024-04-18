import { Session } from "next-auth";
import { AbilityBuilder } from "@casl/ability";

import { AppAbility } from "../../ability";

export function createResourceTraceRulesFor(
  _: Session,
  builder: AbilityBuilder<AppAbility>
) {
  builder.can("read", "ResourceTrace");
}
