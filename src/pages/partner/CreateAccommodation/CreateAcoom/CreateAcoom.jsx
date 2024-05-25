import { ca } from 'date-fns/locale';
import './CreateAcoom.scss';
import React, { useState, useEffect } from 'react';
import FramePageOwner from '~/components/FramePage/FramePageOwner';
import { Outlet, Route, Routes, useParams } from 'react-router-dom';
import CreateAccomCate from '../CreateAccomCate/CreateAccomCate';
import MenuCreateAccom from '../MenuCreateAccom/MenuCreateAccom';
import GeneralInfo from '../GeneralInfo/GeneralInfo';
import AddressAccom from '../AddressAccom/AddressAccom';
import Gallery from '../Gallery/Gallery';
import Amenities from '../Amenities/Amenities';
import RoomSetting from '../RoomSetting/RoomSetting';
import Policy from '../Policy/Policy';
import PaymentInfo from '../PaymentInfo/PaymentInfo';
import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';

export default function CreateAcoom() {
    const params = useParams();
    const [idAccom, setIdAccom] = useState(null);
    const [onClickSave, setOnClickSave] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        if (params['*'].split('/')[1] !== idAccom) {
            setIdAccom(params['*'].split('/')[1]);
        }
    }, [params['*']]);

    const handleSave = (complete) => {
        if (complete) {
            enqueueSnackbar('Lưu thành công', { variant: 'success' });
        } else {
            enqueueSnackbar('Lưu thất bại', { variant: 'error' });
        }
        setOnClickSave(false);
    };

    return (
        <FramePageOwner>
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
                                                                doneSave={handleSave}
                                                            />
                                                        }
                                                    />
                                                    <Route
                                                        path="address/*"
                                                        element={
                                                            <AddressAccom
                                                                id={idAccom}
                                                                save={onClickSave}
                                                                doneSave={handleSave}
                                                            />
                                                        }
                                                    />
                                                    <Route
                                                        path="amenities/*"
                                                        element={
                                                            <Amenities
                                                                id={idAccom}
                                                                save={onClickSave}
                                                                doneSave={handleSave}
                                                            />
                                                        }
                                                    />
                                                    <Route
                                                        path="gallery/*"
                                                        element={
                                                            <Gallery
                                                                id={idAccom}
                                                                save={onClickSave}
                                                                doneSave={handleSave}
                                                            />
                                                        }
                                                    />
                                                    <Route
                                                        path="roomSetting/*"
                                                        element={
                                                            <RoomSetting
                                                                id={idAccom}
                                                                save={onClickSave}
                                                                doneSave={handleSave}
                                                            />
                                                        }
                                                    />
                                                    <Route
                                                        path="policy/*"
                                                        element={
                                                            <Policy
                                                                id={idAccom}
                                                                save={onClickSave}
                                                                doneSave={handleSave}
                                                            />
                                                        }
                                                    />
                                                    <Route
                                                        path="payment/*"
                                                        element={
                                                            <PaymentInfo
                                                                id={idAccom}
                                                                save={onClickSave}
                                                                doneSave={handleSave}
                                                            />
                                                        }
                                                    />
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
        </FramePageOwner>
    );
}
