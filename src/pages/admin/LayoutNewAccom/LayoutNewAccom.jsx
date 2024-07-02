import './LayoutNewAccom.scss';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cmsAccomPlaceAPI from '~/services/apis/adminAPI/cmsAccomPlaceAPI';
export default function LayoutNewAccom() {
    const navigate = useNavigate();
    const [listNewAccom, setListNewAccom] = useState([]);
    const [loading, setLoading] = useState(true);
    const handleItemClick = (id) => {
        navigate(`/admin/new-accom/${id}`);
    };

    useEffect(() => {
        cmsAccomPlaceAPI.getAllAcommPlaceWithPaging().then((res) => {
            setListNewAccom(res.data.content);
            setLoading(false);
        });
    }, []);

    return (
        <div className="new-accom__page">
            <div className="header__customer">
                <h2 className="page-header">Danh sách chỗ nghỉ mới</h2>
                <div className="new-accom__container paper">
                    <div className="new-accom__list">
                        {loading ? (
                            <></>
                        ) : (
                            <>
                                {listNewAccom.map((item, index) => {
                                    return (
                                        <div
                                            className="new-accom__item"
                                            key={index}
                                            onClick={() => handleItemClick(item.accomId)}
                                        >
                                            <div className="new-accom__img">
                                                <img src={item.logo} alt={item.accomName} />
                                            </div>
                                            <div className="new-accom__content">
                                                <h3 className="new-accom__name">{item.accomName}</h3>
                                                <p className="new-accom__address">{item.addressDetail}</p>
                                                <p className="new-accom__price">{item.progress}%</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
