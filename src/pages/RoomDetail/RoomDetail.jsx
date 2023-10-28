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
import "./RoomDetail.scss";
import Paper from "@mui/material/Paper";
import { Grid } from "antd";
import { Height } from "@mui/icons-material";
export default function RoomDetail() {
  //Sao của khách sạn
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

  //Tiện ích
  const listConvenientData = [
    {
      name: "Máy lạnh",
      icon: "https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2016/12/21/1482301285653-0a04df7d3f807b32484ceec10d9681c6.png", // Đường dẫn đến biểu tượng máy lạnh (nếu có)
      isConfig: true, // Hoặc false tùy thuộc vào việc máy lạnh đã được cấu hình hay chưa
    },
    {
      name: "Nhà hàng",
      icon: "https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2017/06/07/1496833794378-eb51eee62d46110b712e327108299ea6.png", // Đường dẫn đến biểu tượng nhà hàng (nếu có)
      isConfig: true, // Hoặc false tùy thuộc vào việc nhà hàng đã được cấu hình hay chưa
    },
    {
      name: "Hồ bơi",
      icon: "https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2017/06/07/1496833772013-929572dff57d1755878aa79dc46e6be5.png", // Đường dẫn đến biểu tượng hồ bơi (nếu có)
      isConfig: true, // Hoặc false tùy thuộc vào việc hồ bơi đã được cấu hình hay chưa
    },
    {
      name: "Lễ tân 24h",
      icon: "https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2016/12/21/1482301381776-c014a3111a6de5236d903c93b7647e4c.png", // Đường dẫn đến biểu tượng lễ tân (nếu có)
      isConfig: true, // Hoặc false tùy thuộc vào việc lễ tân 24h đã được cấu hình hay chưa
    },
    {
      name: "Chỗ đậu xe",
      icon: "https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2017/06/07/1496833756238-56e24fb64a964d38b8f393bf093a77a9.png", // Đường dẫn đến biểu tượng chỗ đậu xe (nếu có)
      isConfig: true, // Hoặc false tùy thuộc vào việc chỗ đậu xe đã được cấu hình hay chưa
    },
    {
      name: "Thang máy",
      icon: "https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2017/06/07/1496833714411-48c9b7565018d02dc32837738df1c917.png", // Đường dẫn đến biểu tượng thang máy (nếu có)
      isConfig: true, // Hoặc false tùy thuộc vào việc thang máy đã được cấu hình hay chưa
    },
    {
      name: "WiFi",
      icon: "https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2017/06/07/1496833833458-7b6ab67bc5df6ef9f2caee150aae1f43.png", // Đường dẫn đến biểu tượng WiFi (nếu có)
      isConfig: true, // Hoặc false tùy thuộc vào việc WiFi đã được cấu hình hay chưa
    },
  ];
  const listoutstandingData = [
    {
      name: "Nằm ngay trung tâm TP. Hồ Chí Minh, khách sạn này có điểm vị trí tuyệt vời 9,4",
      icon: "data:image/png;base64,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", // Đường dẫn đến biểu tượng máy lạnh (nếu có)
      isConfig: true, // Hoặc false tùy thuộc vào việc máy lạnh đã được cấu hình hay chưa
    },
    {
      name: "Có bãi đậu xe riêng miễn phí ở khách sạn này",
      icon: "https://png.pngtree.com/png-vector/20190621/ourlarge/pngtree-parking-lot-icon-graphic-design-template-vector-png-image_1497687.jpg", // Đường dẫn đến biểu tượng nhà hàng (nếu có)
      isConfig: true, // Hoặc false tùy thuộc vào việc nhà hàng đã được cấu hình hay chưa
    },
  ];
  const listRoomData = [
    {
      roomName: "Room 1",
      nameOfBed: "Queen Size Bed",
    },
    {
      roomName: "Room 2",
      nameOfBed: "Double Bed",
    },
    {
      roomName: "Room 3",
      nameOfBed: "Single Bed",
    },
    // Add more room data as needed
  ];
  return (
    <div>
      <AppBar />
      <SearchForm />
      <div className="background">
        <Box position={Grid} style={{ width: "90%", margin: "auto" }}>
          <div className="info-room">
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
                    <p>Tên khách sạn</p>
                  </div>
                </div>
                <div className="heading__right"></div>
              </div>
            </div>
            <ListImage {...imageData} />
            <div className="about-room">
              <div className="row">
                <div className="col l-8 m-7 c-12">
                  <Paper className="title-room">
                    <div className="desc-room">
                      <h2>{t("contentMain.descHome")}</h2>

                      <p>
                        Là một lựa chọn đúng đắn khi quý khách đến thăm Thắng
                        Tam. Quầy tiếp tân 24 giờ luôn sẵn sàng phục vụ quý
                        khách từ thủ tục nhận phòng đến trả phòng
                      </p>
                    </div>
                    <hr className="line" />
                    <h2>{t("contentMain.convenient")}</h2>
                    <Convenient listConvenient={listConvenientData} row={2} />
                    <DialogConvenient listConvenient={listConvenientData} />
                    <hr className="line" />
                    <div className="bed-room">
                      <h2>{t("contentMain.bedroom")}</h2>
                      <BedRoomSlider listRoom={listRoomData} />
                    </div>
                  </Paper>
                  <hr className="line" />
                  <h1
                    style={{
                      marginTop: "5px",
                      padding: "8px 10px",
                      borderLeft: "7px solid blue",
                    }}
                  >
                    {t("contentMain.rateTitle")}
                  </h1>
                  <hr className="line" />
                </div>

                <div className="col l-4 m-7 c-12">
                  <Paper className="card-room">
                    <div className="desc-room">
                      <h2>{t("title.outstanding")}</h2>
                      <p>
                        Là một lựa chọn đúng đắn khi quý khách đến thăm Thắng
                        Tam. Quầy tiếp tân 24 giờ luôn sẵn sàng phục vụ quý
                        khách từ thủ tục nhận phòng đến trả phòng
                      </p>
                    </div>
                    <hr className="line" />
                    <Convenient listConvenient={listoutstandingData} row={1} />
                    <div className="button-Favorite">
                      <Button variant="outlined">
                        Thêm vào danh sách yêu thích
                        <FavoriteBorderOutlinedIcon />
                      </Button>
                    </div>
                  </Paper>
                </div>
              </div>
              <div className="col">
                <Paper>
                  <h1>a</h1>
                </Paper>
              </div>
            </div>
          </div>
        </Box>
      </div>
      {/* <Footer/> */}
    </div>
  );
}
