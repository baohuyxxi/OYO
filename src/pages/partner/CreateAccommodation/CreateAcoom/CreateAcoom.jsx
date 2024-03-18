import { ca } from 'date-fns/locale';
import './CreateAcoom.scss';
import React, { useState, useEffect } from 'react';
import FramePage from '~/components/FramePage/FramePage';
import publicAccomPlaceAPI from '~/services/apis/publicAPI/publicAccomPlaceAPI';
import createAccomSlice from '~/redux/createAccomSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Route, Routes, useParams } from 'react-router-dom';
import CreateAccomCate from '../CreateAccomCate/CreateAccomCate';
import MenuCreateAccom from '../MenuCreateAccom/MenuCreateAccom';
import GeneralInfo from '../GeneralInfo/GeneralInfo';

export default function CreateAcoom() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accom = useSelector((state) => state.createAccom);
    console.log(accom);

    return (
        <FramePage>
            <div className="create-acoom__page">
                <Routes>
                    <Route path="/" element={<CreateAccomCate />} />

                    <Route
                        path="*"
                        element={
                            <>
                                <header className="create-acoom__title">
                                    <h2>Tạo chỗ nghỉ mới</h2>
                                </header>
                                <div className=" row">
                                    <MenuCreateAccom />
                                    <div className="col l-10 m-9 c-8">
                                        <Routes>
                                            <Route path="generalInfo" element={<GeneralInfo/>} />
                                            <Route path="amenities" element={<h1>amenities</h1>} />
                                            <Route path="gallery" element={<h1>gallery</h1>} />
                                            <Route path="roomSetting" element={<h1>roomSetting</h1>} />
                                            <Route path="policy" element={<h1>policy</h1>} />
                                            <Route path="payment" element={<h1>payment</h1>} />
                                        </Routes>
                                    </div>
                                </div>
                            </>
                        }
                    />
                </Routes>
            </div>
        </FramePage>
    );
}
