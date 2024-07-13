const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};

const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('.').map(part => parseInt(part, 10));
    return new Date(year, month - 1, day);
};

export { formatDate, parseDate };
