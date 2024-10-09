const formatDate = (dateInput) => {
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
    
    if (isNaN(date.getTime())) {
        console.error('Invalid date:', dateInput);
        return '';
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
};

const formatDateTime = (dateInput) => {
    const formattedDate = formatDate(dateInput);
    const formattedTime = formatTime(dateInput);
    return `${formattedDate} ${formattedTime}`;
};

const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('.').map(part => parseInt(part, 10));
    return new Date(year, month - 1, day);
};

const formatTime = (dateInput) => {
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
    
    if (isNaN(date.getTime())) {
        console.error('Invalid date:', dateInput);
        return '';
    }

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
};

export { formatDate, parseDate, formatTime, formatDateTime };
