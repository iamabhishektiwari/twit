export const CreateAt = (seconds) => {
  if (!(Number.isInteger(seconds) && new Date(seconds).getTime() > 0))
    return null;
  const date = new Date(seconds * 1000);
  const formatDate =
    date.getDate() + "/" + date.getMonth() + 1 + "/" + date.getFullYear();
  const hours = date.getHours();
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedTime =
    hours + ":" + date.getMinutes() + " " + ampm.toUpperCase();
  //return [formatDate, formattedTime];
  return formattedTime + " - " + formatDate;
};
