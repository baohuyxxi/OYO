import './GeneralInfo.scss';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import partnerCreateAccomAPI from '~/services/apis/partnerAPI/partnerCreateAccomAPI';

export default function GeneralInfo({ id, save , doneSave}) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        if (id) {
            partnerCreateAccomAPI.getGeneralInfo(id).then((res) => {
                setData(res.data);
                setLoading(false);
            });
        }
    }, []);

    useEffect(() => {
        if(save){
            
            partnerCreateAccomAPI.updateGeneralInfo({id, data}).then((res) => {
               
                doneSave();
            });
            doneSave();
        }
    }, [save]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    }
    return (
        <div className="general-info">
            {loading ? (
                <></>
            ) : (
                <div className="info__content">
                    <label className="title-desc-step5">{t('label.nameHome')}</label>
                    <input
                        type="text"
                        name='nameAccom'
                        placeholder={t('placeholder.nameHome')}
                        className="input-step5"
                        defaultValue={data?.nameAccom}
                        onChange={handleChange}
                    />

                    <label className="title-desc-step5">{t('label.descHome')}</label>
                    <textarea
                        name='description'
                        className="text-step5"
                        defaultValue={data?.description}
                        onChange={handleChange}
                    />

                    <label className="title-desc-step5">{t('label.priceHome')}</label>
                    <input
                        name='pricePerNight'
                        type="number"
                        placeholder={t('placeholder.priceVND')}
                        className="input-step5"
                        defaultValue={data?.pricePerNight}
                        onChange={handleChange}
                    />
                    <label className="title-desc-step5">{t('label.acreageHome')}</label>
                    <input
                        name='acreage'
                        type="number"
                        placeholder={t('placeholder.acreageM2')}
                        className="input-step5"
                        defaultValue={data?.acreage}
                        onChange={handleChange}
                    />
                </div>
            )}
        </div>
    );
}


// data = [{
//     accomCateName
// : 
// "Nhà chung cư"
// acreage
// : 
// null
// checkInFrom
// : 
// null
// checkOutTo
// : 
// null
// description
// : 
// null
// discountPercent
// : 
// 0
// guide
// : 
// null
// nameAccom
// : 
// null
// pricePerNight
// : 
// null
// surchargeList
// : 
// []
// }]