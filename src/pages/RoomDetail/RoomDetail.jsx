import "./RoomDetail.scss";
import AppBar from "~/components/AppBar/AppBar";
import Footer from "~/components/Footer/Footer";
// import SearchForm from "~/components/SearchForm/SearchForm";
import iconStar from "~/assets/icon/star.svg";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import ListImage from "~/components/ListImage/ListImage";
import Convenient from "~/components/Convenient/Convenient";
import DialogConvenient from "~/components/DialogConvenient/DialogConvenient";
import BedRoomSlider from "~/components/BedRoomSlider/BedRoomSlider";
import { Box, Button } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { t } from "i18next";
import CommentReview from "~/components/CommentReview/commentReview";
import FramePage from "~/components/FramePage/FramePage";
import { useNavigate, useParams } from 'react-router-dom';
import { getRoomDetailRequest } from '~/services/API/publicAPI'
import { useEffect, useState } from "react";
import SkeletonRoomDetail from '../../components/Skeleton/SkeletonRoomDetail';

export default function RoomDetail() {
  const navigate = useNavigate();
  const roomId = useParams();
  const [loading, setLoading] = useState(true );
  const [dataDetailHome, setDataDetalHome] = useState("")
  useEffect(() => {
    setLoading(true);
    getRoomDetailRequest(roomId.id).then((dataResponse) => {
      setDataDetalHome(dataResponse.data);
      setLoading(false);
    });
  }, [roomId?.id]);
  const stars = []
  for (let i = 0; i < dataDetailHome.gradeRate; i++) {
    stars.push(
      <img key={i} src={iconStar} alt="icon__star" className="star" />
    );
  }

  const handleBooking = () => {
    navigate('/booking');
  }
  const imageData = {
    listImage: [
      {
        path: "https://ik.imagekit.io/tvlk/apr-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/67841452-f226f2d256b035298d9eb3d60eebdb0e.jpeg?_src=imagekit&tr=c-at_max,h-360,q-40,w-640",
      },
      {
        path: "https://ik.imagekit.io/tvlk/generic-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/20061404-531bce674aa83b20399a46be4614ecf6.jpeg?_src=imagekit&tr=c-at_max,h-360,q-40,w-640",
      },
      {
        path: "https://ik.imagekit.io/tvlk/apr-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/67841452-e8844f04af6d286e209ba096768e7fdb.jpeg?_src=imagekit&tr=c-at_max,h-360,q-40,w-640",
      },
      {
        path: "https://ik.imagekit.io/tvlk/apr-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/67841452-b69b0cdb3c355938005bf629917a1713.jpeg?_src=imagekit&tr=c-at_max,h-360,q-40,w-640",
      },
    ],
    thumbnail:
      "https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/20061404-a98a0a5e26723a7e5720c7e5f4c8ac40.jpeg?_src=imagekit&tr=c-at_max,h-360,q-40,w-640",
  };

  const listoutstandingData = [
    {
      name: 'Nằm ngay trung tâm TP. Hồ Chí Minh, khách sạn này có điểm vị trí tuyệt vời 9,4',
      icon: 'https://png.pngtree.com/png-vector/20190419/ourmid/pngtree-vector-location-icon-png-image_956422.jpg',
      isConfig: true, // Hoặc false tùy thuộc vào việc máy lạnh đã được cấu hình hay chưa
    },
    {
      name: 'Có bãi đậu xe riêng miễn phí ở khách sạn này',
      icon: 'https://png.pngtree.com/png-vector/20190621/ourlarge/pngtree-parking-lot-icon-graphic-design-template-vector-png-image_1497687.jpg', // Đường dẫn đến biểu tượng nhà hàng (nếu có)
      isConfig: true, // Hoặc false tùy thuộc vào việc nhà hàng đã được cấu hình hay chưa
    }
  ];
  const listRoomData = [
    {
      roomName: 'Room 1',
      nameOfBed: 'Queen Size Bed',
    },
    {
      roomName: 'Room 2',
      nameOfBed: 'Double Bed',
    },
    {
      roomName: 'Room 3',
      nameOfBed: 'Single Bed',
    },

  ];
  return (
    <FramePage>
      {loading ? (
        <SkeletonRoomDetail />
      ) : 
      (
        <>
          <div className='content detail-room' >
            <div className="info-room" >
              <div className="header-room">
                <h1>{dataDetailHome.accomName}</h1>
                <div className="heading">
                  <div className="heading__left">
                    <div className="obility__room">
                      <p>{dataDetailHome.accomCateId}</p>
                      {stars}
                    </div>
                    <div className="locate__room">
                      <FmdGoodIcon className="icon_locate" />
                      <p>{dataDetailHome.addressGeneral}</p>
                    </div>
                  </div>
                  <div className="heading__right">
                    <p>Giá phòng mõi đêm từ:</p>
                    <p className='price-room'>{dataDetailHome.pricePerNight}</p>
                  </div>
                </div>

              </div>
              <ListImage {...imageData} />
              <div className="about-room" >
                <div className="row">
                  <div className="col l-8 m-7 c-12">
                    <div className="paper title-room">
                      <div className="desc-room">
                        <h2>{t('contentMain.descHome')}</h2 >
                        <p>{dataDetailHome.description}</p>
                        <h3>Địa chỉ chi tiết</h3 >
                        <p1>{dataDetailHome.addressDetail}</p1>
                        <h3>Diện tích</h3 >
                        <p1>{dataDetailHome.acreage}</p1>
                        <h3>Số người </h3 >
                        <p1>{dataDetailHome.numPeople}</p1>
                        <h3>Số phòng</h3 >
                        <p1>{dataDetailHome.numBathRoom}</p1>
                      </div>
                    
                      <hr className="divider" />
                      <h2>{t('contentMain.convenient')}</h2>
                      <Convenient listConvenient={dataDetailHome.infoFacilityResponseList} row={2} />
                      <DialogConvenient listConvenient={dataDetailHome.infoFacilityResponseList} />
                      <hr className="divider" />
                      <div className="bed-room">
                        <h2>{t('contentMain.bedroom')}</h2>
                        <BedRoomSlider listRoom={listRoomData} />
                      </div>
                    </div>

                  </div>

                  <div className="col l-4 m-7 c-12">
                    <div className="paper card-room">
                      <div className="desc-room">
                        <h2>{t('title.outstanding')}</h2 >
                        <p>Là một lựa chọn đúng đắn khi quý khách đến thăm Thắng Tam. Quầy tiếp tân 24 giờ luôn sẵn sàng phục vụ quý khách từ thủ tục nhận phòng đến trả phòng</p>
                      </div>
                      <hr className="divider" />
                      <Convenient listConvenient={listoutstandingData} row={1} />
                      <div className='button-Favorite'>
                        <Button
                          variant='outlined'
                        >
                          Thêm vào danh sách yêu thích
                          <FavoriteBorderOutlinedIcon />
                        </Button>
                      </div>
                      <div className='button-booking'>
                        <Button onClick={handleBooking}
                          variant='contained'
                          fullWidth
                        >
                          Đặt phòng
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <CommentReview />
            </div>
            </div>
          </>
          )}
        </FramePage>
      )
}
