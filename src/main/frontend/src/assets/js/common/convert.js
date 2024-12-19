export const addDay = (date, value) => {
    if(date) {
        const result = new Date(date);

        result.setDate(value ? result.getDate() + Number(value) : result.getDate() + 1);

        return formatDate(result);
    }
    return date;
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}