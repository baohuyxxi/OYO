import { useParams } from 'react-router-dom';
import { typeRoom } from '~/models/roomHome';
import CountNumber from '~/components/CountNumber/CountNumber';
import CustomInput from '~/assets/custom/CustomInput';
import MenuItem from '@mui/material/MenuItem';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './CountRoomDetailSetting.scss';
import { useEffect, useState } from 'react';
import publicTypeBedAPI from '~/services/apis/publicAPI/publicTypeBedAPI';
import partnerManageAccomAPI from '~/services/apis/partnerAPI/partnerManageAccomAPI';
import { useSnackbar } from 'notistack';

const CountRoomDetailSetting = ({ allAccomCategory }) => {
    const [numRoom, setNumRoom] = useState(typeRoom);
    const [roomSetting, setRoomSetting] = useState(null);
    const [bedRooms, setBedRooms] = useState([]);
    const [allTypeBed, setAllTypeBed] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const params = useParams();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        publicTypeBedAPI.getAllTypeBed().then((res) => setAllTypeBed(res.data.content));
    }, []);

    useEffect(() => {
        if (numRoom[0].number > bedRooms.length) {
            setBedRooms((prevBedRooms) => [...prevBedRooms, 'TYPE_BED_003']);
        } else if (numRoom[0].number === bedRooms.length - 1) {
            setBedRooms((prevBedRooms) => prevBedRooms.slice(0, -1));
        }
    }, [numRoom[0].number]);

    useEffect(() => {
        partnerManageAccomAPI.getRoomSetting(`${params.idHome}`).then((dataRoom) => {
            setNumRoom(
                numRoom.map((room) => {
                    return {
                        ...room,
                        number: dataRoom?.data[room.key] || 0
                    };
                })
            );
            setBedRooms(dataRoom?.data?.bedRooms.typeBeds.flatMap((bed) => bed.typeBedCode));
            setRoomSetting(dataRoom?.data);
        });
    }, [params.idHome]);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleClose = () => {
        setExpanded(false);
    };

    const handleSaveRoom = (e) => {
        e.preventDefault();
        const newData = {
            id: params?.idHome,
            data: {
                accomCateName: roomSetting?.accomCateName,
                numPeople: roomSetting?.numPeople,
                numKitchen: numRoom[2].number,
                numBathRoom: numRoom[1].number,
                typeBedCodes: bedRooms
            }
        };

        console.log(newData);
        partnerManageAccomAPI
            .updateRoomSetting(newData)
            .then((res) => {
                enqueueSnackbar('Cập nhật thành công', {
                    variant: 'success'
                });
            })
            .catch((err) => {
                enqueueSnackbar(err, {
                    variant: 'error'
                });
            });
    };

    const onChange = (value, index) => {
        const updatedBedRooms = [...bedRooms];
        updatedBedRooms[index] = value;
        setBedRooms(updatedBedRooms);
    };

    return (
        <div className="content-count__roomdetail__setting">
            <form onSubmit={handleSaveRoom}>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <p style={{ width: '33%', flexShrink: 0 }}>Loại chỗ ở</p>
                        {/* <p style={{ color: 'text.secondary' }}>{nameFacilities}</p> */}
                        <CustomInput
                            select={true}
                            value={roomSetting?.accomCateName || ''}
                            width={500}
                            onChange={(e) => setRoomSetting({ ...roomSetting, accomCateName: e.target.value })}
                            content={allAccomCategory.map((option, index) => (
                                <MenuItem key={index} value={option.accomCateName}>
                                    {option.accomCateName}
                                </MenuItem>
                            ))}
                        />
                    </AccordionSummary>
                    <AccordionDetails className="accordion__section">
                        <div className="guest__input">
                            <p>Số lượng khách</p>
                            <input
                                value={roomSetting?.numPeople}
                                onChange={(e) => {
                                    setRoomSetting({
                                        ...roomSetting,
                                        numPeople: parseInt(e.target.value) ? parseInt(e.target.value) : ''
                                    });
                                }}
                            />
                        </div>
                        <div className="header__typeRoom">
                            {numRoom?.map((room, index) => (
                                <div key={index} className="typeRoom">
                                    <p>
                                        {room.name} ({room.number})
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="countRoom">
                            {numRoom?.map((room, index) => (
                                <div key={index}>
                                    <CountNumber
                                        keyType={room.key}
                                        data={numRoom}
                                        number={room.number}
                                        setData={setNumRoom}
                                    />
                                </div>
                            ))}
                        </div>
                    </AccordionDetails>
                    <AccordionDetails>
                        <div className="container__bedroom">
                            {bedRooms?.map((bed, index) => (
                                <div key={index} className="option__bed">
                                    <p>Phòng ngủ số {index + 1}</p>
                                    <CustomInput
                                        size="small"
                                        value={bed || ''}
                                        onChange={(e) => onChange(e.target.value, index)}
                                        select={true}
                                        content={allTypeBed.map((option, i) => (
                                            <MenuItem key={i} value={option.typeBedCode}>
                                                {option.typeBedName}
                                            </MenuItem>
                                        ))}
                                    />
                                </div>
                            ))}
                        </div>
                    </AccordionDetails>
                    <AccordionDetails>
                        <div className="btn">
                            <p onClick={handleClose} className="btn-close">
                                Hủy
                            </p>
                            <button type="submit" className="btn-save">
                                Lưu
                            </button>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </form>
        </div>
    );
};

export default CountRoomDetailSetting;
