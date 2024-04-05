import './Policy.scss';
import { t } from 'i18next';
import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import createAccomSlice from '~/redux/createAccomSlice';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function Policy({ id, save , doneSave}) {
    return (
        <div className="policy">
            <div className="policy__content">
                <label className="title-">{t('label.refundPolicy')}</label>
                <div className="policy__content__item">
                    <label className="title">{t('label.timeCancel')}</label>
                    <select className="input-select">
                        <option value="value1">Trước 1 ngày</option>
                        <option value="value2">Trước 2 ngày</option>
                        <option value="value3">Trước 3 ngày</option>
                        <option value="value2">Trước 5 ngày</option>
                        <option value="value2">Trước 1 tuần</option>
                    </select>
                </div>
                <div className="policy__content__item">
                    <label className="title">{t('label.feeCancel')}</label>
                    <select className="input-select">
                        <option value="value1">5%</option>
                        <option value="value2">10%</option>
                        <option value="value3">15%</option>
                        <option value="value2">20%</option>
                        <option value="value2">25%</option>
                        <option value="value2">50%</option>
                        <option value="value2">Không hoàn trả</option>
                    </select>
                </div>
                <label className="title-">{t('label.policyPublic')}</label>
                <div className="policy__content__item">
                    <FormControlLabel
                        control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />}
                        label={'Được phép hút thuốc'}
                        sx={{ '.MuiTypography-root': { fontSize: 17 } }}
                    />
                </div>
                <div className="policy__content__item">
                    <FormControlLabel
                        control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />}
                        label={'Được phép tổ chức tiệc'}
                        sx={{ '.MuiTypography-root': { fontSize: 17 } }}
                    />
                </div>
                <div className="policy__content__item">
                    <FormControlLabel
                        control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />}
                        label={'Được phép mang thú cưng'}
                        sx={{ '.MuiTypography-root': { fontSize: 17 } }}
                    />
                </div>
            </div>
        </div>
    );
}
