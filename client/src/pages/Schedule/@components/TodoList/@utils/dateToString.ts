export function transformDateObject(date: Date) {
  const offset = 1000 * 60 * 60 * 9;
  return new Date(date.getTime() + offset);
  // return date.toISOString().replace('.000Z', 'Z');
}
