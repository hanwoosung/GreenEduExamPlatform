export const addDay = (date, value) => {
    if(date) {
        const result = new Date(date);

        if(value) result.setDate(result.getDate() + Number(value));
        else result.setDate(result.getDate() + 1);

        console.log(formatDate(result));

        return formatDate(result);
    }
    return date;
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
    const day = String(date.getDate()).padStart(2, '0'); // 날짜 두 자리로 포맷
    return `${year}-${month}-${day}`;
}