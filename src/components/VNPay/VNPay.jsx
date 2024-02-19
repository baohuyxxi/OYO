import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import thư viện axios
import sha512 from 'js-sha512';
import moment from 'moment-timezone';   

const VNPay = () => {
    const createPaymentUrl = async () => {
        try {
            const ipAddr = await axios.get('https://api.ipify.org?format=json').then((response) => response.data.ip);
            // Lấy thời gian hiện tại
            const currentDateTimeVN = moment.tz(moment(), 'Asia/Ho_Chi_Minh').format();
            const createDate = currentDateTimeVN.toISOString().replace(/[-T:]/g, '').slice(0, -5);

            // Tạo thời gian 15 phút tiếp theo
            const next15Minutes = new Date(currentDateTimeVN.getTime() + 15 * 60000);
            const expireDate = next15Minutes.toISOString().replace(/[-T:]/g, '').slice(0, -5);

            // Tạo mã ngẫu nhiên 8 số cho vnp_TxnRef
            const randomTxnRef = Math.floor(10000000 + Math.random() * 90000000);
            let vnp_Params = {
                vnp_Amount: 120000000,
                vnp_BankCode: 'NCB',
                vnp_Command: 'pay',
                vnp_CreateDate: createDate,
                vnp_CurrCode: 'VND',
                vnp_ExpireDate: expireDate,
                vnp_IpAddr: ipAddr,
                vnp_Locale: 'vn',
                vnp_OrderInfo: 'Thanh toan don hang :5',
                vnp_OrderType: 'other',
                vnp_ReturnUrl: 'http://localhost:5173/booking',
                vnp_TmnCode: 'EXLRT5HV',
                vnp_TxnRef: randomTxnRef,
                vnp_Version: '2.1.0'
            };
            console.log(vnp_Params);
            // Tạo chuỗi query từ vnp_Params sử dụng URLSearchParams
            const params = new URLSearchParams();
            for (const key in vnp_Params) {
                params.append(key, vnp_Params[key]);
            }
            const queryString = params.toString();
            console.log(queryString);

            // Tạo mã băm từ chuỗi query và secretKey
            const secretKey = 'CLMXUQRJDTHASLQRMTNIMVVCMCRVRHBT'; // Thay thế 'your_secret_key_here' bằng secretKey thực của bạn
            const vnp_SecureHash = sha512.hmac.create(secretKey).update(queryString).hex();
            console.log(vnp_SecureHash);
            const vnpUrl =
                'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?' +
                queryString +
                '&vnp_SecureHash=' +
                vnp_SecureHash;
            window.open(vnpUrl, '_blank');

            console.log(vnpUrl);
        } catch (error) {
            console.error('Error creating payment URL:', error);
        }
    };

    return (
        <div>
            <button className="btn__booking" onClick={createPaymentUrl}>
                Chuyển đến trang thanh toán
            </button>
        </div>
    );
};

export default VNPay;
