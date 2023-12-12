export function transformDateObject(date: Date) {
  const offset = 1000 * 60 * 60 * 9;
  console.log(
    date.getFullYear() +
      '년' +
      date.getMonth() +
      '월' +
      date.getDate() +
      '일' +
      date.getHours() +
      '시' +
      date.getMinutes() +
      '분' +
      date.getSeconds() +
      '초'
  );

  // return new Date(date.getTime() + offset);
  return new Date(date.getTime());
  // return date.toISOString().replace('.000Z', 'Z');
}
