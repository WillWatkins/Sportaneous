export const formatTimestamp = (timestamp) => {
  let date = new Date(timestamp * 1000);
  let datevalues = {
    fullYear: String(date.getFullYear()),
    month: String(date.getMonth() + 1),
    day: String(date.getDate()),
    hour: String(date.getHours()),
    minutes: String(date.getMinutes()),
    seconds: String(date.getSeconds()),
  };
  if (Number(datevalues.hour) < 10) {
    let hourString = "0" + datevalues.hour;
    datevalues.hour = hourString;
  }
  if (Number(datevalues.minutes) < 10) {
    let minutesString = "0" + datevalues.minutes;
    datevalues.minutes = minutesString;
  }
  return `${datevalues.hour}:${datevalues.minutes} ${datevalues.day}/${datevalues.month}/${datevalues.fullYear}`;
};
