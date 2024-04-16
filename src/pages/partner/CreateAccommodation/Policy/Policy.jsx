import './Policy.scss';
import { t } from 'i18next';
import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import createAccomSlice from '~/redux/createAccomSlice';
import FormControlLabel from '@mui/material/FormControlLabel';
import partnerCreateAccomAPI from '~/services/apis/partnerAPI/partnerCreateAccomAPI';
import { policiesFormData } from '~/share/models/roomHome';
import { cancelBookingModel, policyPublicModel } from '~/share/models/cancelBooking';
import CustomInput from '~/assets/custom/CustomInput';
import MenuItem from '@mui/material/MenuItem';

export default function Policy({ id, save, doneSave }) {
    const [loading, setLoading] = useState(false);
    const [cancelBooking, setCancelBooking] = useState(cancelBookingModel);
    const [policyPublic, setPolicyPublic] = useState(policyPublicModel);
    useEffect(() => {
        if (id) {
            partnerCreateAccomAPI.getPolicy(id).then((res) => {
                setPolicyPublic({
                    allowSmoking: res.data.generalPolicy.allowSmoking || false,
                    allowEvent: res.data.generalPolicy.allowEvent || false,
                    allowPet: res.data.generalPolicy.allowPet || false,
                    cancellationPolicy: res.data.cancellationPolicy.code,
                    cancellationFeeRate: res.data.cancellationPolicy.cancellationFeeRate
                });
                setLoading(false);
            });
        }
    }, []);
    const handleOnchange = (event) => {
        console.log(event.target.value);
        setPolicyPublic({ ...policyPublic, [event.target.name]: event.target.value });
    };
    useEffect(() => {
        if (save) {
            partnerCreateAccomAPI.updatePolicy({ id, data: policyPublic }).then((res) => {
                console.log(res);
            });
            doneSave();
        }
    }, [save]);
    return (
        <div className="policy">
            <div className="policy__content">
                <label className="title-">{t('label.refundPolicy')}</label>
                <div className="policy__content__item row">
                    <CustomInput
                        id="cancellationPolicy"
                        className="input col l-6 m-12 c-12"
                        name="cancellationPolicy"
                        size="small"
                        title={t('label.timeCancel')}
                        select={true}
                        value={policyPublic.cancellationPolicy || cancelBooking.cancelLation[0].value}
                        content={cancelBooking.cancelLation.map((item) => {
                            return (
                                <MenuItem key={item.value} value={item.value}>
                                    {item.label}
                                </MenuItem>
                            );
                        })}
                        onChange={handleOnchange}
                    />
                    <CustomInput
                        id="cancellationFeeRate"
                        className="input col l-6 m-12 c-12"
                        name="cancellationFeeRate"
                        size="small"
                        select={true}
                        title={t('label.feeCancel')}
                        value={policyPublic.cancellationFeeRate || cancelBooking.cancellationFeeRate[0]}
                        content={cancelBooking.cancellationFeeRate.map((item) => {
                            return (
                                <MenuItem key={item} value={item}>
                                    {item}%
                                </MenuItem>
                            );
                        })}
                        onChange={handleOnchange}
                    />
                </div>
         
                <label className="title-">{t('label.policyPublic')}</label>
                <div className="policy__content__item">
                    <FormControlLabel
                        control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />}
                        label={'Được phép hút thuốc'}
                        sx={{ '.MuiTypography-root': { fontSize: 17 } }}
                       checked={policyPublic?.allowSmoking}
                        onChange={(e) => setPolicyPublic({ ...policyPublic, allowSmoking: e.target.checked })}
                    />
                </div>
                <div className="policy__content__item">
                    <FormControlLabel
                        control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />}
                        label={'Được phép tổ chức tiệc'}
                        sx={{ '.MuiTypography-root': { fontSize: 17 } }}
                        checked={policyPublic?.allowEvent}
                        onChange={(e) => setPolicyPublic({ ...policyPublic, allowEvent: e.target.checked })}
                    />
                </div>
                <div className="policy__content__item">
                    <FormControlLabel
                        control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />}
                        label={'Được phép mang thú cưng'}
                        sx={{ '.MuiTypography-root': { fontSize: 17 } }}
                        checked={policyPublic?.allowPet}
                        onChange={(e) => setPolicyPublic({ ...policyPublic, allowPet: e.target.checked })}
                    />
                </div>
            </div>
        </div>
    );
}
