import { useState, useEffect } from 'react';
import { listBankModel } from '~/models/bank';
import CustomInput from '~/assets/custom/CustomInput';
import MenuItem from '@mui/material/MenuItem';
import { t } from 'i18next';
import partnerManageAccomAPI from '~/services/apis/partnerAPI/partnerManageAccomAPI';

const PaymentInfoSetting = ({ accomId }) => {
    const [listBank, setListBank] = useState(listBankModel);
    const [data, setData] = useState({});

    useEffect(() => {
        if (accomId) {
            partnerManageAccomAPI.getPaymentInfo(accomId).then((res) => {
                setData(res.data);
            });
        }
    }, [accomId]);

    const onChangeData = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    // useEffect(() => {
    //     if (save) {
    //         partnerManageAccomAPI
    //             .updatePayment({ id, data })
    //             .then((res) => {
    //                 doneSave(true);
    //             })
    //             .catch(() => {
    //                 doneSave(false);
    //             });
    //     }
    // }, [save]);
    return (
        <div className="payment-info">
            <h3>Thanh toán</h3>
            <div className="info__content">
                <CustomInput
                    name="bankId"
                    select={true}
                    size="small"
                    title={t(`title.bank`)}
                    width={520}
                    value={data.bankId || ''}
                    onChange={onChangeData}
                    content={listBank.map((bank, index) => (
                        <MenuItem key={index} value={bank.id}>
                            {bank.name_bank}
                        </MenuItem>
                    ))}
                ></CustomInput>
                <CustomInput
                    size="small"
                    title={t(`title.accountNumber`)}
                    width={520}
                    name="accountNumber"
                    value={data.accountNumber || ''}
                    onChange={onChangeData}
                />
                <CustomInput
                    size="small"
                    title={t(`title.accountNameHost`)}
                    width={520}
                    name="accountNameHost"
                    value={data.accountNameHost || ''}
                    onChange={onChangeData}
                />
                <CustomInput
                    size="small"
                    title={t(`title.swiftCode`)}
                    width={520}
                    name="swiftCode"
                    value={data.swiftCode || ''}
                    onChange={onChangeData}
                />
                <button className="btn-save">Lưu</button>
            </div>
        </div>
    );
};

export default PaymentInfoSetting;
