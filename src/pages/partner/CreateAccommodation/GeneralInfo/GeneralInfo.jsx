import './GeneralInfo.scss';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';

export default function GeneralInfo() {
    
    return (
        <div className="general-info">
            <div className="info__content">
                <label className="title-desc-step5">{t('label.nameHome')}</label>
                <input
                    type="text"
                    placeholder={t('placeholder.nameHome')}
                    className="input-step5"
                    // onChange={handleChangeNameRoom}
                />

                <label className="title-desc-step5">{t('label.descHome')}</label>
                <textarea
                    className="text-step5"
                    //  onChange={handleChangeDescRoom}
                />

                <label className="title-desc-step5">{t('label.priceHome')}</label>
                <input
                    type="number"
                    placeholder={t('placeholder.priceVND')}
                    className="input-step5"
                    // onChange={handleChangePriceRoom}
                />
                <label className="title-desc-step5">{t('label.acreageHome')}</label>
                <input
                    type="number"
                    placeholder={t('placeholder.acreageM2')}
                    className="input-step5"
                    // onChange={handleChangeAcreage}
                />
            </div>
        </div>
    );
}
