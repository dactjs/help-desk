import { Session } from "next-auth";
import { AbilityBuilder } from "@casl/ability";
import { createPrismaAbility } from "@casl/prisma";
import { UserStatus } from "@prisma/client";

import { AppAbility } from "../../ability";

import { createLogRulesFor } from "../create-log-rules-for";
import { createUserRulesFor } from "../create-user-rules-for";
import { createTicketRulesFor } from "../create-ticket-rules-for";
import { createTicketTraceRulesFor } from "../create-ticket-trace-rules-for";
import { createTicketCommentRulesFor } from "../create-ticket-comment-rules-for";
import { createTicketServiceRulesFor } from "../create-ticket-service-rules-for";
import { createTicketServiceCategoryRulesFor } from "../create-ticket-service-category-rules-for";
import { createResourceRulesFor } from "../create-resource-rules-for";
import { createResourceTraceRulesFor } from "../create-resource-trace-rules-for";
import { createResourceCommentRulesFor } from "../create-resource-comment-rules-for";

export function createAbilityFor(session: Session | null): AppAbility {
  const builder = new AbilityBuilder<AppAbility>(createPrismaAbility);

  const user = session?.user;

  if (!user || user.status !== UserStatus.ENABLED) return builder.build();

  const rules = {
    Log: createLogRulesFor,
    User: createUserRulesFor,
    Ticket: createTicketRulesFor,
    TicketTrace: createTicketTraceRulesFor,
    TicketComment: createTicketCommentRulesFor,
    TicketService: createTicketServiceRulesFor,
    TicketServiceCategory: createTicketServiceCategoryRulesFor,
    Resource: createResourceRulesFor,
    ResourceTrace: createResourceTraceRulesFor,
    ResourceComment: createResourceCommentRulesFor,
  } as const;

  Object.values(rules).forEach((rule) => rule(session, builder));

  return builder.build();
}
