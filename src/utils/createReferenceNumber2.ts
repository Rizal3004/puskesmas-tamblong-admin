export default () => {
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const year = currentDate.getFullYear().toString();

  const referenceNumber = `001/${day}/${month}/${year}`;
  return referenceNumber;
}
