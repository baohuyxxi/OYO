import { el } from 'date-fns/locale';

const convertPrice = (price) => {
    const typrice = localStorage.getItem('selectedLanguage');

    if (typrice === 'en') {
        if (price !== '' && price !== undefined) {
            const result = (parseInt(price) / 23000).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
            });
            return result;
        }
        return 0;
    } else {
        if (price !== '' && price !== undefined) {
            const result = parseInt(price).toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND'
            });
            return result;
        }
        return 0;
    }
};

export default convertPrice;
