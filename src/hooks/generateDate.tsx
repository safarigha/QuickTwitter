import moment from "moment-jalaali";

const formatDate = (dateString: string) => {
  moment.loadPersian({ usePersianDigits: true });
  const formattedDate = moment(dateString).format("jYYYY/jMM/jDD - HH:mm:ss");
  return formattedDate;
};

export default formatDate;
