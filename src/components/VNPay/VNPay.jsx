import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import thư viện axios
import sha512 from 'js-sha512';

const VNPay = () => {
    const createPaymentUrl = async () => {
        try {
            const ipAddr = await axios.get('https://api.ipify.org?format=json').then((response) => response.data.ip);

            let vnp_Params = {
                vnp_Version: '2.1.0',
                vnp_Command: 'pay',
                vnp_TmnCode: 'EXLRT5HV',
                vnp_Locale: 'vn',
                vnp_CurrCode: 'VND',
                vnp_TxnRef: '5',
                vnp_OrderInfo: 'Thanh toan don hang :5',
                vnp_OrderType: 'other',
                vnp_Amount: 1806000,
                vnp_ReturnUrl: 'http://localhost:5173/booking',
                vnp_IpAddr: ipAddr,
                vnp_CreateDate: '20240217153333',
                vnp_BankCode: 'VNPAYQR',
                vnp_ExpireDate: '20240217233333',
            };
             // Tạo chuỗi query từ vnp_Params sử dụng URLSearchParams
             const params = new URLSearchParams();
             for (const key in vnp_Params) {
                 params.append(key, vnp_Params[key]);
             }
             const queryString = params.toString();
 
             // Tạo mã băm từ chuỗi query và secretKey
             const secretKey = 'CLMXUQRJDTHASLQRMTNIMVVCMCRVRHBT'; // Thay thế 'your_secret_key_here' bằng secretKey thực của bạn
             const vnp_SecureHash = sha512.hmac.create(secretKey).update(queryString).hex();
 
             // Thêm mã băm vào vnp_Params
             vnp_Params.vnp_SecureHash = vnp_SecureHash;
 
             // Tạo URL thanh toán từ vnp_Params
             const vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?' + queryString + '&vnp_SecureHash=' + vnp_SecureHash;
             console.log(queryString)
             console.log(vnp_SecureHash)
            console.log(vnpUrl);
        } catch (error) {
            console.error('Error creating payment URL:', error);
        }
    };

    return (
        <div>
            <button onClick={createPaymentUrl}>Chuyển đến trang thanh toán</button>
        </div>
    );
};

export default VNPay;
