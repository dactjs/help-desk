export function getShortUUID(uuid: string): string {
  const sliced = `#-${uuid.slice(0, 4)}`;

  return sliced.toUpperCase();
}
