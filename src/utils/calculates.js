export const pricePay = (data) => {
    console.log(data);
    const numberOfNights = Math.ceil((new Date(data.checkOut) - new Date(data.checkIn)) / (1000 * 60 * 60 * 24));
    console.log(numberOfNights);
    const basePrice = data.pricePerNight * numberOfNights;
    let totalPrice = basePrice - data.surcharge;

    // Áp dụng giảm giá nếu có
    if ( data.discount !== 0) {
        totalPrice *= data.discount;
    }
   
    // Áp dụng giảm giá theo paymentMethod
    if ( data.paymentMethod === 'PAYPAL') {
        totalPrice *= 0.9; // Giảm giá 10% nếu sử dụng PayPal
    }

    // Áp dụng giảm giá theo paymentPolicy
    if ( data.paymentPolicy === 'PAYMENT_HALF') {
        totalPrice /= 2; // Giảm giá 50% nếu chọn PAYMENT_HALF
    }
    console.log(totalPrice)

    // Thêm vào tổng giá tiền
    // totalPrice += priceTotal;

    return totalPrice;
}