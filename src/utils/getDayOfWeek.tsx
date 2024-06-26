export const getDayOfWeek = (dateString: string) => {
    const parts = dateString.split('.');
    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
    const year = parseInt(parts[2]);
    const date = new Date(year, month, day);
    return date.getDay()
}
