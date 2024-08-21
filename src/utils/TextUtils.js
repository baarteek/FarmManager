export const formatDecimalInput = (text) => {
    const formattedText = text.replace(',', '.');
    return parseFloat(formattedText).toFixed(2);
};