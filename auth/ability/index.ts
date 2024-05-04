"use client";

import { createContext } from "react";
import { PureAbility } from "@casl/ability";
import { useAbility, createContextualCan } from "@casl/react";
import { createPrismaAbility, Subjects, PrismaQuery } from "@casl/prisma";
import {
  User,
  Ticket,
  TicketTrace,
  TicketComment,
  TicketService,
  TicketServiceCategory,
  Resource,
  ResourceTrace,
  ResourceComment,
} from "@prisma/client";

interface Log {
  timestamp: number;
  model: string;
  operation: string;
  metadata: object;
  user: Pick<User, "id" | "username" | "email" | "name">;
}

export type AppAbility = PureAbility<
  [
    string,
    Subjects<{
      Log: Partial<Log>;
      User: Partial<User>;
      Ticket: Partial<Ticket>;
      TicketTrace: Partial<TicketTrace>;
      TicketComment: Partial<TicketComment>;
      TicketService: Partial<TicketService>;
      TicketServiceCategory: Partial<TicketServiceCategory>;
      Resource: Partial<Resource>;
      ResourceTrace: Partial<ResourceTrace>;
      ResourceComment: Partial<ResourceComment>;
    }>
  ],
  PrismaQuery
>;

export const AbilityContext = createContext<AppAbility>(createPrismaAbility());
export const Can = createContextualCan(AbilityContext.Consumer);
export const useAppAbility = () => useAbility(AbilityContext);
