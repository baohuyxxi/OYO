import './PaymentInfo.scss';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import CustomInput from '~/assets/custom/CustomInput';
import { listBankModel } from '~/models/bank';
import MenuItem from '@mui/material/MenuItem';
import partnerCreateAccomAPI from '~/services/apis/partnerAPI/partnerCreateAccomAPI';
export default function PaymentInfo({ id, save, doneSave }) {
    const [listBank, setListBank] = useState(listBankModel);
    const [data, setData] = useState({});

    useEffect(() => {
        if (id) {
            partnerCreateAccomAPI.getPaymentInfo(id).then((res) => {
                setData(res.data);
            });
        }
    }, []);

    const onChangeData = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    useEffect(() => {
        console.log(data);
        if (save) {
            partnerCreateAccomAPI.updatePayment({ id, data }).then((res) => {
                doneSave(true);
            }).catch(() => {
                doneSave(false);
            });
        }
    }, [save]);
    return (
        <div className="payment-info">
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
                    title={t(`title.account_number`)}
                    width={520}
                    name="accountNumber"
                    value={data.accountNumber || ''}
                    onChange={onChangeData}
                />
                <CustomInput
                    size="small"
                    title={t(`title.account_name`)}
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
            </div>
        </div>
    );
}
