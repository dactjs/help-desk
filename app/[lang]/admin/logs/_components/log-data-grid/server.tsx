import { ReadonlyURLSearchParams } from "next/navigation";
import fs from "fs/promises";

import { auth } from "@/auth";
import { createAbilityFor } from "@/auth/utils/create-ability-for";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/logs";

import { ParamsSchema } from "../../_schemas";

import { ClientLogDataGrid } from "./client";
import { Log } from "./types";

export interface ServerLogDataGridProps {
  searchParams: ReadonlyURLSearchParams;
}

export async function ServerLogDataGrid({
  searchParams,
}: ServerLogDataGridProps) {
  const language = getAppLanguage();

  let logs: Log[] = [];

  const [session, dictionary] = await Promise.all([
    auth(),
    getDictionary(language),
  ]);

  const ability = createAbilityFor(session);

  if (ability.can("read", "Log")) {
    const dir = "./tmp";

    try {
      await fs.access(dir);
    } catch {
      await fs.mkdir(dir);
    }

    const params = new URLSearchParams(searchParams);

    const result = ParamsSchema.safeParse(Object.fromEntries(params));

    const start = result.data?.start || new Date();
    const end = result.data?.end || new Date();

    while (start <= end) {
      const year = start.getFullYear();
      const month = String(start.getMonth()).padStart(2, "0");
      const day = String(start.getDate()).padStart(2, "0");

      const file = `${dir}/${year}_${month}_${day}.txt`;

      try {
        await fs.access(file);
      } catch {
        await fs.writeFile(file, "");
      }

      const raw = await fs.readFile(file, { encoding: "utf-8" });

      const lines = raw.split("\n");

      lines.forEach((line) => {
        const trimmed = line.trim();

        if (!trimmed) return;

        const [timestamp, model, operation, metadata, user] =
          trimmed.split(";");

        logs.push({
          id: crypto.randomUUID(),
          timestamp: new Date(Number(timestamp)),
          model,
          operation,
          metadata: JSON.parse(metadata),
          user: JSON.parse(user),
        });
      });

      start.setDate(start.getDate() + 1);
    }
  }

  return (
    <ClientLogDataGrid
      logs={logs}
      language={language}
      dictionary={{
        log: dictionary.log,
        log_data_grid: dictionary.log_data_grid,
        log_details_dialog: dictionary.log_details_dialog,
      }}
    />
  );
}
