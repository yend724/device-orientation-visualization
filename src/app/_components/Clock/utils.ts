export const zeroPadding = (num: number | string, places: number) => {
  return String(num).padStart(places, '0');
};

export const formatDateTimeToDigital = (dateTime: Date) => {
  const year = dateTime.getFullYear();
  const month = zeroPadding(dateTime.getMonth() + 1, 2);
  const date = zeroPadding(dateTime.getDate(), 2);
  const hours = zeroPadding(dateTime.getHours(), 2);
  const minutes = zeroPadding(dateTime.getMinutes(), 2);
  const seconds = zeroPadding(dateTime.getSeconds(), 2);
  const milliseconds = zeroPadding(dateTime.getMilliseconds(), 3);
  return {
    date: `${year}-${month}-${date}`,
    time: `${hours}:${minutes}:${seconds}.${milliseconds}`,
  };
};

export const splitDateTime = (dateTime: Date) => {
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1;
  const date = dateTime.getDate();
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  const seconds = dateTime.getSeconds();
  const milliseconds = dateTime.getMilliseconds();
  return { year, month, date, hours, minutes, seconds, milliseconds };
};
