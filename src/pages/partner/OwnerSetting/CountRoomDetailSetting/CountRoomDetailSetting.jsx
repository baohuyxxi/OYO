import { useNavigate, useParams } from 'react-router-dom';
import DialogCountRoom from '~/components/DialogCountRoom/DialogCountRoom';
import ImageOfRoomSetting from '~/components/HostSetting/ImageOfRoomSetting/ImageOfRoomSetting';
import NavbarOwner from '~/components/NavbarOwner/NavbarOwner';
import { typeRoom, typeBedRoom } from '~/share/models/roomHome';
import CountNumber from '~/components/CountNumber/CountNumber';
import CustomInput from '~/assets/custom/CustomInput';
import MenuItem from '@mui/material/MenuItem';
import './CountRoomDetailSetting.scss';

import { useEffect, useState } from 'react';
import partnerManageAPI from '~/services/apis/partnerAPI/partnerManageAPI';
import publicAccomPlaceAPI from '~/services/apis/publicAPI/publicAccomPlaceAPI';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const CountRoomDetailSetting = () => {
    const [listRoomOfHome, setListRoomOfHome] = useState([]);
    const [listCategoryRoom, setListCategoryRoom] = useState([]);
    const [numRoom, setNumRoom] = useState(typeRoom);
    const [bedRooms, setBedRooms] = useState([]);
    const [allBedRoom] = useState(typeBedRoom);
    const params = useParams();
    const { enqueueSnackbar } = useSnackbar();

    const navigate = useNavigate();
    useEffect(() => {
        console.log(bedRooms);
    }, [bedRooms]);
    useEffect(() => {
        if (numRoom[0].number > bedRooms.length) {
            setBedRooms(prevBedRooms => [...prevBedRooms, 'Giường đơn']);
        }
        else if(numRoom[0].number === bedRooms.length-1)
        {
            setBedRooms(prevBedRooms => prevBedRooms.slice(0, -1));
        }
    }, [numRoom[0].number]);

    useEffect(() => {
        publicAccomPlaceAPI.getRoomDetail(`${params.idHome}`).then((dataRoom) => {
            setListRoomOfHome(dataRoom?.data);
            setNumRoom(
                numRoom.map((room) => {
                    return {
                        ...room,
                        number: dataRoom?.data[room.key] || 0
                    };
                })
            );
            setBedRooms(dataRoom?.data.bedRooms);
        });
        // publicAccomPlaceAPI.getAllAccomCategoryInfo().then((dataResponse) => {
        //     setListCategoryRoom(dataResponse?.data);
        // });
    }, [params.idHome]);
    // const handleRemoveRoom = (idRoom) => {
    //     roomOfHomeApi
    //         .deleteRoomOfHome(idRoom)
    //         .then(() => {
    //             enqueueSnackbar('Xóa thành công', { variant: 'success' });
    //             setListRoomOfHome(
    //                 listRoomOfHome.filter((room) => {
    //                     return room.id !== idRoom;
    //                 })
    //             );
    //         })
    //         .catch((error) => {
    //             enqueueSnackbar(error.response?.data.message, { variant: 'error' });
    //         });
    // };

    const handleSaveAddRoom = (dataSetRoomCount) => {
        const newCount = {
            homeId: params?.idHome,
            listCreate: dataSetRoomCount.filter((data) => {
                return data.number !== 0;
            })
        };
        publicAccomPlaceAPI
            .saveCountRoomOfHome(newCount)
            .then((data) => {
                setListRoomOfHome(data.data);
                enqueueSnackbar('Lưu thành công', { variant: 'success' });
            })

            .catch((error) => {
                enqueueSnackbar(error.response?.data.message, { variant: 'error' });
            });
    };

    const handleSaveRoom = (e) => {
        e.preventDefault();
        const newData = {
            homeId: params?.idHome,
            data: {
                bedRooms:bedRooms,
                numKitchen: numRoom[1].number,
                numBedRoom: numRoom[0].number,
                numBathRoom: numRoom[2].number
            }
        };

        partnerManageAPI.updateRoomHome(newData)
    }

    const onChange = (value, index) => {
        const updatedBedRooms = [...bedRooms];
        updatedBedRooms[index] = value;
        setBedRooms(updatedBedRooms);
    };
    return (
        <div className="count-roomdetal__setting">
            <NavbarOwner />
            <div className="content-count__roomdetail__setting">
                <p
                    onClick={() => navigate(-1)}
                    style={{ margin: 0, fontSize: '16px', paddingTop: '-30px', color: 'black', cursor: 'pointer' }}
                >
                    <ArrowBackIosIcon />
                    Quay lại trang
                </p>
                {/* <h1>Phòng và không gian</h1>
                <p>
                    Thêm hoặc chỉnh sửa khu vực mà khách có thể sử dụng và đánh dấu không gian họ sẽ dùng chung với
                    người khác
                </p> */}
                {/* <div className="card-roomdetail__count">
                    <p>Phòng ngủ · Phòng tắm đầy đủ · Bồn tắm nước nóng · Ngoại thất</p>
                    <DialogCountRoom listCategoryRoom={listCategoryRoom} handleSaveAddRoom={handleSaveAddRoom} />
                </div> */}
                {/* <ImageOfRoomSetting
                    listRoomOfHome={listRoomOfHome}
                    handleRemoveRoom={handleRemoveRoom}
                    setListRoomOfHome={setListRoomOfHome}
                /> */}

                <div className="countRoom">
                    {numRoom?.map((room, index) => (
                        <div key={index}>
                            <p>{room.name}</p>
                            <CountNumber keyType={room.key} data={numRoom} number={room.number} setData={setNumRoom} />
                        </div>
                    ))}
                </div>

                <div className="container__bedroom">
                    {bedRooms?.map((bed, index) => (
                        <div key={index} className="option__bed">
                            <p>Phòng ngủ số {index + 1}</p>
                            <CustomInput
                                size="small"
                                value={bed}
                                onChange={(e) => onChange(e.target.value, index)}
                                select={true}
                                content={allBedRoom.map((option) => (
                                    <MenuItem key={option.name} value={option.name}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            />
                        </div>
                    ))}
                </div>
                <button onClick={handleSaveRoom}>Lưu</button>
            </div>
        </div>
    );
};

export default CountRoomDetailSetting;
