export const monthNumberToName = (month: number) => {
    if (month < 1 || month > 12) {
        return "Неверный номер месяца";
    }
    const monthNames = [
        "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];
    return monthNames[month - 1];
}