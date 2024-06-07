export const formatDate = (date) => {
  const options = {
    hour: "numeric",
    minute: "numeric",
  };
  const dateF = new Date(date);
  let formattedDate = Intl.DateTimeFormat("vi-VN", options).format(dateF);
  return formattedDate;
};
