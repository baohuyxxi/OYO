import './GeneralInfo.scss';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import partnerCreateAccomAPI from '~/services/apis/partnerAPI/partnerCreateAccomAPI';
import publicSurcharge from '~/services/apis/publicAPI/surcharge';
export default function GeneralInfo({ id, save, doneSave }) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [allSurcharge, setAllSurchagre] = useState([]);
    useEffect(() => {
        publicSurcharge.getAllSurcharge().then((res) => {
            setAllSurchagre(res.data);
        });
        if (id) {
            partnerCreateAccomAPI.getGeneralInfo(id).then((res) => {
                setData(res.data);
                setLoading(false);
            });
        }
    }, []);

    useEffect(() => {
        if (save) {
            partnerCreateAccomAPI
                .updateGeneralInfo({ id, data })
                .then((res) => {
                    doneSave(true);
                })
                .catch(() => {
                    doneSave(false);
                });
        }
    }, [save]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    };
    console.log(data);
    return (
        <div className="general-info">
            {loading ? (
                <></>
            ) : (
                <div className="info__content">
                    <label className="info__title">{t('label.nameHome')}</label>
                    <input
                        type="text"
                        name="nameAccom"
                        placeholder={t('placeholder.nameHome')}
                        className="info__input"
                        defaultValue={data?.nameAccom}
                        onChange={handleChange}
                    />

                    <label className="info__title">{t('label.descHome')}</label>
                    <textarea
                        name="description"
                        className="info__textarea"
                        defaultValue={data?.description}
                        onChange={handleChange}
                    />
                    <label className="info__title">{t('label.guide')}</label>
                    <textarea name="guide" className="info__input" defaultValue={data?.guide} onChange={handleChange} />

                    <label className="info__title">{t('label.priceHome')}</label>
                    <input
                        name="pricePerNight"
                        type="number"
                        placeholder={t('placeholder.priceVND')}
                        className="info__input"
                        defaultValue={data?.pricePerNight}
                        onChange={handleChange}
                    />
                    <label className="info__title">{t('label.acreageHome')}</label>
                    <input
                        name="acreage"
                        type="number"
                        placeholder={t('placeholder.acreageM2')}
                        className="info__input"
                        defaultValue={data?.acreage}
                        onChange={handleChange}
                    />
                    <label className="info__title">{t('label.checkInFrom')}</label>
                    <input
                        name="checkInFrom"
                        type="time"
                        className="info__input"
                        defaultValue={data?.checkInFrom}
                        onChange={handleChange}
                    />
                    <label className="info__title">{t('label.checkOutTo')}</label>
                    <input
                        name="checkOutTo"
                        type="time"
                        className="info__input"
                        defaultValue={data?.checkOutTo}
                        onChange={handleChange}
                    />
                    <label className="info__title">{t('label.discountPercent')}</label>
                    <input
                        name="pricePerNight"
                        type="number"
                        placeholder={t('placeholder.pricePerNight')}
                        className="info__input"
                        defaultValue={data?.pricePerNight}
                        onChange={handleChange}
                    />
                    <label className="info__title">{t('label.discountPercent')}</label>
                    <input
                        name="discountPercent"
                        type="number"
                        placeholder={t('placeholder.discountPercent')}
                        className="info__input"
                        defaultValue={data?.discountPercent}
                        onChange={handleChange}
                    />
                    <label className="info__title">Surcharge List</label>
                    <ul className="surcharge-list">
                        {allSurcharge.map((surcharge, index) => (
                            <div key={index}>
                                <label className="info__title">{surcharge.surchargeCateName}</label>
                                <input
                                    type="text"
                                    className="info__input"
                                    name={surcharge.surchargeCateName}
                                    defaultValue={
                                        data.surchargeList[
                                            data.surchargeList.findIndex(
                                                (item) => item.surchargeCode === surcharge.surchargeCode
                                            )
                                        ]?.cost
                                    }
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            surchargeList: [
                                                ...data.surchargeList.filter(
                                                    (item) => item.surchargeCode !== surcharge.surchargeCode
                                                ),
                                                {
                                                    surchargeCode: surcharge.surchargeCode,
                                                    cost: parseInt(e.target.value)
                                                }
                                            ]
                                        })
                                    }
                                />
                            </div>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}