export const formatDatetime = (date: Date) => {
  const months = ['Jan', 'Feb', "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${date.getHours()}:${date.getMinutes()} - ${months[date.getMonth()]} ${date.getDay}, ${date.getFullYear()}`;
}