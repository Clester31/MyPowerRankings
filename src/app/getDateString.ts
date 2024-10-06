export default function getDateString() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const dateString = `${day < 10 ? '0' : ''}${day}${month+1}${year}`;
    return dateString;
}