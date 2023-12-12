export const addDate = (baseDate: Date, day: number | string) => {
  const date = new Date();
  date.setDate(baseDate.getDate() + parseInt(`${day}`) - 1);
  return date;
};

export const stringifyDate = (baseDate: Date) => {
  console.log(baseDate.toISOString().replace('.000Z', 'Z').split('T')[0]);
  const date = `${baseDate.getFullYear()}-${
    baseDate.getMonth() + 1
  }-${baseDate.getDate()}`;
  console.log(
    baseDate.getFullYear() +
      '년' +
      baseDate.getMonth() +
      '월' +
      baseDate.getDate() +
      '일' +
      baseDate.getHours() +
      '시' +
      baseDate.getMinutes() +
      '분' +
      baseDate.getSeconds() +
      '초'
  );

  // return baseDate.toISOString().replace('.000Z', 'Z').split('T')[0];
  return date;
};
