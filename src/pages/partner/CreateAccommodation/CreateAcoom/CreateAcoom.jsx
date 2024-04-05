import { ca } from 'date-fns/locale';
import './CreateAcoom.scss';
import React, { useState, useEffect } from 'react';
import FramePage from '~/components/FramePage/FramePage';
import publicAccomPlaceAPI from '~/services/apis/publicAPI/publicAccomPlaceAPI';
import createAccomSlice from '~/redux/createAccomSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Outlet, Route, Routes, useParams } from 'react-router-dom';
import CreateAccomCate from '../CreateAccomCate/CreateAccomCate';
import MenuCreateAccom from '../MenuCreateAccom/MenuCreateAccom';
import GeneralInfo from '../GeneralInfo/GeneralInfo';
import AddressAccom from '../AddressAccom/AddressAccom';
import Gallery from '../Gallery/Gallery';
import Amenities from '../Amenities/Amenities';
import RoomSetting from '../RoomSetting/RoomSetting';
import Policy from '../Policy/Policy';
import { Button } from '@mui/material';

export default function CreateAcoom() {
    const params = useParams();
    const [idAccom, setIdAccom] = useState(null);
    const [onClickSave, setOnClickSave] = useState(false);
    useEffect(() => {
        if (params['*'].split('/')[1] !== idAccom) {
            setIdAccom(params['*'].split('/')[1]);
        }
    }, [params['*']]);

    return (
        <FramePage>
            <div className="create-acoom__page">
                <Routes>
                    <Route path="/" element={<CreateAccomCate />} />

                    <Route
                        path="/*"
                        element={
                            <>
                                <header className="create-acoom__title">
                                    <h2>Tạo chỗ nghỉ mới</h2>
                                </header>
                                <div className=" row">
                                    <MenuCreateAccom />
                                    <div className="col l-10 m-9 c-8 screen__container">
                                        {idAccom !== null && (
                                            <div className="screen__container paper">
                                                <Routes>
                                                    <Route
                                                        path="generalInfo/*"
                                                        element={
                                                            <GeneralInfo
                                                                id={idAccom}
                                                                save={onClickSave}
                                                                doneSave={() => setOnClickSave(false)}
                                                            />
                                                        }
                                                    />
                                                    <Route
                                                        path="address/*"
                                                        element={
                                                            <AddressAccom
                                                                id={idAccom}
                                                                save={onClickSave}
                                                                doneSave={() => setOnClickSave(false)}
                                                            />
                                                        }
                                                    />
                                                    <Route
                                                        path="amenities/*"
                                                        element={
                                                            <Amenities
                                                                id={idAccom}
                                                                save={onClickSave}
                                                                doneSave={() => setOnClickSave(false)}
                                                            />
                                                        }
                                                    />
                                                    <Route
                                                        path="gallery/*"
                                                        element={
                                                            <Gallery
                                                                id={idAccom}
                                                                save={onClickSave}
                                                                doneSave={() => setOnClickSave(false)}
                                                            />
                                                        }
                                                    />
                                                    <Route
                                                        path="roomSetting/*"
                                                        element={
                                                            <RoomSetting
                                                                id={idAccom}
                                                                save={onClickSave}
                                                                doneSave={() => setOnClickSave(false)}
                                                            />
                                                        }
                                                    />
                                                    <Route
                                                        path="policy/*"
                                                        element={
                                                            <Policy
                                                                id={idAccom}
                                                                save={onClickSave}
                                                                doneSave={() => setOnClickSave(false)}
                                                            />
                                                        }
                                                    />
                                                    <Route path="payment/*" element={<h1>payment</h1>} />
                                                </Routes>
                                            </div>
                                        )}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className="btn-save-acoom"
                                            onClick={(e) => {
                                                setOnClickSave(true);
                                            }}
                                        >
                                            Lưu
                                        </Button>
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
