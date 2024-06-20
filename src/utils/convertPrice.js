export const convertPrice = (price) => {
    const typrice = localStorage.getItem('selectedLanguage');
    if (typrice === 'en') {
        if (price !== '' && price !== undefined) {
            const result = (parseInt(price) / 23000).toLocaleString('en-US');
            return result;
        }
        return 0;
    } else {
        if (price !== '' && price !== undefined) {
            const result = parseInt(price).toLocaleString('vi-VN');
            return result;
        }
        return 0;
    }
};


export const convertPriceToNumber = (price) => {
    if (price !== '' && price !== undefined) {
        const result = parseInt(price.replace(/\D/g, ''));
        return result;
    }
    return 0;
}