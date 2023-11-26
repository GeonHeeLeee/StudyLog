export const addDate = (baseDate: Date, day: number | string) => {
  const date = new Date();
  date.setDate(baseDate.getDate() + parseInt(`${day}`) - 1);
  return date;
};

export const stringifyDate = (baseDate: Date) => {
  return baseDate.toISOString().replace('.000Z', 'Z');
};
