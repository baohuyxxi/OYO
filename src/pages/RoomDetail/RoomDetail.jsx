import "./RoomDetail.scss";
import AppBar from "~/components/AppBar/AppBar";
import Footer from "~/components/Footer/Footer";
import SearchForm from "~/components/SearchForm/SearchForm";
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

import { Grid } from "antd";
export default function RoomDetail() {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <img key={i} src={iconStar} alt="icon__star" className="star" />
    );
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

  const listConvenientData = [
    {
      name: 'Máy lạnh',
      icon: 'https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2016/12/21/1482301285653-0a04df7d3f807b32484ceec10d9681c6.png', // Đường dẫn đến biểu tượng máy lạnh (nếu có)
      isConfig: true, // Hoặc false tùy thuộc vào việc máy lạnh đã được cấu hình hay chưa
    },
    {
      name: 'Nhà hàng',
      icon: 'https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2017/06/07/1496833794378-eb51eee62d46110b712e327108299ea6.png', // Đường dẫn đến biểu tượng nhà hàng (nếu có)
      isConfig: true, // Hoặc false tùy thuộc vào việc nhà hàng đã được cấu hình hay chưa
    },
    {
      name: 'Hồ bơi',
      icon: 'https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2017/06/07/1496833772013-929572dff57d1755878aa79dc46e6be5.png', // Đường dẫn đến biểu tượng hồ bơi (nếu có)
      isConfig: true, // Hoặc false tùy thuộc vào việc hồ bơi đã được cấu hình hay chưa
    },
    {
      name: 'Lễ tân 24h',
      icon: 'https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2016/12/21/1482301381776-c014a3111a6de5236d903c93b7647e4c.png', // Đường dẫn đến biểu tượng lễ tân (nếu có)
      isConfig: true, // Hoặc false tùy thuộc vào việc lễ tân 24h đã được cấu hình hay chưa
    },
    {
      name: 'Chỗ đậu xe',
      icon: 'https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2017/06/07/1496833756238-56e24fb64a964d38b8f393bf093a77a9.png', // Đường dẫn đến biểu tượng chỗ đậu xe (nếu có)
      isConfig: true, // Hoặc false tùy thuộc vào việc chỗ đậu xe đã được cấu hình hay chưa
    },
    {
      name: 'Thang máy',
      icon: 'https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2017/06/07/1496833714411-48c9b7565018d02dc32837738df1c917.png', // Đường dẫn đến biểu tượng thang máy (nếu có)
      isConfig: true, // Hoặc false tùy thuộc vào việc thang máy đã được cấu hình hay chưa
    },
    {
      name: 'WiFi',
      icon: 'https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2017/06/07/1496833833458-7b6ab67bc5df6ef9f2caee150aae1f43.png', // Đường dẫn đến biểu tượng WiFi (nếu có)
      isConfig: true, // Hoặc false tùy thuộc vào việc WiFi đã được cấu hình hay chưa
    },
  ];
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
      <SearchForm className='search-bar' />
      <div className='content detail-room' >
        <div className="info-room" >
          <div className="header-room">
            <h1>Tên Khách sạn</h1>
            <div className="heading">
              <div className="heading__left">
                <div className="obility__room">
                  <p>Resort</p>
                  {stars}
                </div>
                <div className="locate__room">
                  <FmdGoodIcon className="icon_locate" />
                  <p>Địa chỉ</p>
                </div>
              </div>
              <div className="heading__right">
                <p>Giá phòng mõi đêm từ:</p>
                <p className='price-room'>300.000 VND</p>
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
                    <p>Là một lựa chọn đúng đắn khi quý khách đến thăm Thắng Tam. Quầy tiếp tân 24 giờ luôn sẵn sàng phục vụ quý khách từ thủ tục nhận phòng đến trả phòng</p>
                  </div>
                  <hr className="divider" />
                  <h2>{t('contentMain.convenient')}</h2>
                  <Convenient listConvenient={listConvenientData} row={2} />
                  <DialogConvenient listConvenient={listConvenientData} />
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
                    <Button
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
    </FramePage>
  )
}
