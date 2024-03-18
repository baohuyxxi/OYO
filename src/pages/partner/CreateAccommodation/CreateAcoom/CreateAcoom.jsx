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
import AddressAccom from '../AddressAccom/AddressAccom';
import Gallery from '../Gallery/Gallery';
import Amenities from '../Amenities/Amenities';
import RoomSetting from '../RoomSetting/RoomSetting';

export default function CreateAcoom() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const createAccom = useSelector((state) => state.createAccom.accom);

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
                                    <div className="col l-10 m-9 c-8 screen__container paper">
                                        <Routes>
                                            <Route path="generalInfo" element={<GeneralInfo createAccom={createAccom}/>} />
                                            <Route path="address" element={<AddressAccom createAccom={createAccom}/>} />
                                            <Route path="amenities" element={<Amenities createAccom={createAccom}/>} />
                                            <Route path="gallery" element={<Gallery/>} />
                                            <Route path="roomSetting" element={<RoomSetting/>} />
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
