import React, { useEffect, useState } from 'react';
import { t } from 'i18next';
import { Link, useNavigate } from 'react-router-dom';
import SkeletonProvince from '../Skeleton/SkeletonProvince';
import ProvinceVN from '~/mockdata/ProvinceVN.json';
import publicAccomPlaceAPI from '~/services/apis/publicAPI/publicAccomPlaceAPI';
import './Popular.scss';

const Popular = () => {
    const [listProvince, setListProvince] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        publicAccomPlaceAPI
            .getTopHomeOfProvince()
            .then((res) => {
                setListProvince(res.data.content);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleLinkToProvince = (province) => {
        navigate(`list-accom?provinceCode=${province.provinceCode}`);
    };

    return (
        <div className="web-content">
            <div className="package-menu">
                <div className="package-menu__head">
                    <p>{t('title.exploreVN')}</p>
                </div>
                <div className="row">
                    {loading ? (
                        <SkeletonProvince />
                    ) : (
                        listProvince?.map((province, index) => {
                            return (
                                <div className="col l-3 m-6 c-12" key={index}>
                                    <div className="package">
                                        <div className="package-overlay">
                                            <img src={province?.thumbnail} alt="" className="package-thumbnail" />
                                            <div className="package-info">
                                                <h3 className="package-heading">{province?.name}</h3>
                                                <span className="package-desc">
                                                    {`${province?.numBooking} ${t('numberCount.countBooking')}`}
                                                </span>
                                            </div>
                                        </div>

                                        <Link to="#" className="mobile-package__link"></Link>
                                        <div className="package-cover hide-on-mobile-tablet">
                                            <div className="package-btn">
                                                <p
                                                    className="package-btn-link"
                                                    onClick={() => handleLinkToProvince(province)}
                                                >
                                                    {t('link.viewDetail')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default Popular;
