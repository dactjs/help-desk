import fs from "fs/promises";

import { auth } from "@/auth";
import { createAbilityFor } from "@/auth/utils/create-ability-for";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/logs";

import { ClientLogDataGrid } from "./client";
import { Log } from "./types";

export async function ServerLogDataGrid() {
  const language = getAppLanguage();

  let logs: Log[] = [];

  const [session, dictionary] = await Promise.all([
    auth(),
    getDictionary(language),
  ]);

  const ability = createAbilityFor(session);

  if (ability.can("read", "Log")) {
    const dir = "./logs";

    try {
      await fs.access(dir);
    } catch {
      await fs.mkdir(dir);
    }

    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth()).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

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

      const [timestamp, model, operation, metadata, user] = trimmed.split(";");

      logs.push({
        id: crypto.randomUUID(),
        timestamp: new Date(Number(timestamp)),
        model,
        operation,
        metadata: JSON.parse(metadata),
        user: JSON.parse(user),
      });
    });
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
