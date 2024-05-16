export const getDaysAmount = (month: string) => {
    const date = new Date(+month.split('.')[1], +month.split('.')[0] - 1, 1);
    date.setMonth(date.getMonth() + 1);
    date.setDate(date.getDate() - 1);
    return date.getDate();
}