import "./RoomDetail.scss";
import moment from 'moment';
import format from 'date-fns/format';
import iconStar from "~/assets/icon/star.svg";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import ListImage from "~/components/ListImage/ListImage";
import Convenient from "~/components/Convenient/Convenient";
import DialogConvenient from "~/components/DialogConvenient/DialogConvenient";
import BedRoomSlider from "~/components/BedRoomSlider/BedRoomSlider";
import DateGo from '~/components/DateGo/DateGo';
import Dropdown from '~/components/Dropdown/Dropdown';
import PopoverPrice from '~/components/PopoverPrice/PopoverPrice';
import { useSnackbar } from 'notistack';
import { Box, Button } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { t } from "i18next";
import CommentReview from "~/components/CommentReview/commentReview";
import FramePage from "~/components/FramePage/FramePage";
import { useNavigate, useParams } from 'react-router-dom';
import { getRoomDetailRequest } from '~/services/API/publicAPI'
import { useEffect, useState } from "react";
import SkeletonRoomDetail from '~/components/Skeleton/SkeletonRoomDetail';
import formatPrice from '~/utils/formatPrice';
import { checkBooking } from '~/services/API/bookingAPI'
import { useDispatch, useSelector } from 'react-redux';
import bookingSlice from "~/pages/client/BookingPage/bookingSlice";
export default function RoomDetail() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const roomId = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.current)
  const [loading, setLoading] = useState(true);
  const [dataDetailHome, setDataDetalHome] = useState("")
  const [dateBook, setDateBook] = useState([moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]);
  const [guests, setGuests] = useState([]);
  const [titleGuests, setTitleGuests] = useState(t('contentMess.countClient'));
  const [detailPrice, setDetailPrice] = useState([]);
  const [priceDay, setPriceDay] = useState('');
  const [priceTotal, setPriceTotal] = useState('');

  const dataBooking = useSelector(((state) => state.booking))
  useEffect(() => {
    console.log(dataBooking)
  }, [dataBooking]);
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
    if (user === null || user === undefined) {
      enqueueSnackbar(t('message.warningSignin'), { variant: 'warning' });
    } else {
      const dataCheck = {
        dateStart: dateBook[0],
        dateEnd: dateBook[1],
        homeId: roomId.id,
        guests: guests,
      };
      const dataBooking = {
        dateStart: dateBook[0],
        dateEnd: dateBook[1],
        homeId: roomId.id,
        priceDay: priceDay === '' ? dataDetailHome?.pricePerNight : priceDay,
        guests: guests,
        titleGuests: titleGuests,
        priceTotal: priceTotal,
      };
      console.log(guests)
      dispatch(bookingSlice.actions.addInfoBooking(dataBooking));
      // checkBooking(dataCheck)
      //   .then(() => {
      //     dispatch(bookingSlice.actions.addInfoBooking(dataBooking));
      //     // navigate('/booking');
      //   })
      //   .catch((error) => {
      //     enqueueSnackbar(error.response, { variant: 'error' });
      //   });
    }

  }

  const handleChangeDayBooking = (value) => {
    const dateFrom = format(value[0].startDate, 'yyyy-MM-dd');
    const dateTo = format(value[0].endDate, 'yyyy-MM-dd');
    setDateBook([dateFrom, dateTo]);
    // pricesOfHomeApi.showPriceByRangeDay(params?.idHome, dateFrom, dateTo).then((dataResponse) => {
    //     setPriceDay(dataResponse?.data?.totalCost);
    //     setDetailPrice(dataResponse?.data?.detail);
    //     setPriceTotal(dataResponse?.data?.totalCostWithSurcharge);
    //     setDiscount(dataResponse?.data?.percent !== null ? Number(dataResponse?.data?.percent) : 0);
    //     setPriceNoDiscount(dataResponse?.data?.totalCostWithNoDiscount);
    // });
  };
  const handleChangeGuests = (value) => {
    setGuests(value);
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
                <ListImage listImage={dataDetailHome.imageAccomsUrls} />
                <div className="about-room" >
                  <div className="row">
                    <div className="col l-8 m-7 c-12">
                      <div className="paper title-room">
                        <div className="desc-room">
                          <h2>{t('contentMain.descHome')}</h2 >
                          <p>{dataDetailHome.description}</p>
                          <h3>Địa chỉ chi tiết: {dataDetailHome.addressDetail}</h3 >
                          <h3>Diện tích: {dataDetailHome.acreage} m²</h3 >
                          <h3>Số người: {dataDetailHome.numPeople}</h3 >
                          <h3>Số phòng: {dataDetailHome.numBathRoom}</h3 >
                        </div>

                        <hr className="divider" />
                        <h2>{t('contentMain.convenient')}</h2>
                        <Convenient listConvenient={dataDetailHome.facilityCategoryList} row={2} />
                        <DialogConvenient listConvenient={dataDetailHome.facilityCategoryList} />
                        <hr className="divider" />
                        <div className="bed-room">
                          <h2>{t('contentMain.bedroom')}</h2>
                          <BedRoomSlider listRoom={listRoomData} />
                        </div>
                      </div>

                    </div>

                    {/* <div className="col l-4 m-7 c-12">
                    <div className="paper card-room">
                      <div className="desc-room">
                        <h2>{t('title.outstanding')}</h2 >
                        <p>Là một lựa chọn đúng đắn khi quý khách đến thăm Thắng Tam. Quầy tiếp tân 24 giờ luôn sẵn sàng phục vụ quý khách từ thủ tục nhận phòng đến trả phòng</p>
                      </div>
                      <hr className="divider" />
                     
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
                  </div> */}
                    <div className="col l-4 m-5 c-12">
                      <div className="card-book__detail paper">
                        <div className="price-room">{formatPrice(dataDetailHome?.pricePerNight)}</div>
                        <div className="date-book">
                          <div className="title__date-book">
                            <p>{t('contentMain.fromDay')}</p>
                            <p>{t('contentMain.toDay')}</p>
                          </div>
                          <DateGo
                            size="vertical"
                            setDataDay={handleChangeDayBooking}
                            setDateBook={setDateBook}
                          />
                        </div>
                        <div className="count__guest">
                          <p>{t('numberCount.countClient')}</p>
                          <Dropdown handleChangeGuests={handleChangeGuests} setTitleGuests={setTitleGuests} />
                        </div>

                        <div className="line">
                          <hr />
                        </div>

                        <div className="price-total">
                          <div className="title-price">
                            <PopoverPrice detailPrice={detailPrice} />
                          </div>
                          <div className="real-price">
                            <p style={{ fontWeight: '550' }}>
                              {priceDay !== ''
                                ? formatPrice(priceDay)
                                : formatPrice(dataDetailHome?.costPerNightDefault)}
                            </p>
                          </div>
                        </div>

                        {/* {dataDetailHome?.surcharges?.map((sur, index) => (
                          <div className="price-total" key={index}>
                            <div className="title-price">
                              <p className="name-surcharge">{`${sur?.surchargeCategoryName}`}</p>
                            </div>
                            <div className="real-price">
                              <p className="cost-surcharge">{formatPrice(sur?.cost)}</p>
                            </div>
                          </div>
                        ))} */}

                        <div className="line" style={{ marginTop: '10px' }}>
                          <hr />
                        </div>

                        {/* {dataDetailHome?.discounts && dataDetailHome?.discounts.length > 0 && (
                          <>
                            <div className="discount-campain">
                              <div className="discount-campain__title">
                                <h2 className="title">{t('title.discountCompain')}</h2>
                                <img src="https://img.icons8.com/emoji/30/null/fire.png" alt="" />
                              </div>
                              {dataDetailHome?.discounts?.map((discount, index) => (
                                <div
                                  key={index}
                                  style={{ display: 'flex', justifyContent: 'space-between' }}
                                >
                                  <p>{discount.category.name}</p>
                                  <p>{`${discount.config.percent}%`}</p>
                                </div>
                              ))}
                            </div>

                            <div className="line" style={{ marginTop: '10px' }}>
                              <hr />
                            </div>
                          </>
                        )} */}
                        {/* 
                        {discount !== 0 && (
                          <div className="price-total">
                            <div className="title-price">
                              <p className="name-surcharge">{t('contentMain.discount')}</p>
                            </div>
                            <div className="real-price" style={{ display: 'flex' }}>
                              <p
                                className="cost-surcharge"
                                style={{
                                  textDecoration: 'line-through',
                                  marginRight: '10px',
                                  fontSize: '13px',
                                }}
                              >{`${formatPrice(priceNoDiscount)}`}</p>
                              <p
                                className="cost-surcharge"
                                style={{ fontSize: '14px' }}
                              >{`${discount}%`}</p>
                            </div>
                          </div>
                        )} */}
                        {/* 
                        <div className="price-total">
                          <div className="title-price">
                            <p className="name-surcharge">{t('contentMain.totalPrice')}</p>
                          </div>
                          <div className="real-price">
                            <p className="cost-surcharge">
                              {formatPrice(priceTotal === '' ? '0' : priceTotal)}
                            </p>
                          </div>
                        </div> */}

                        <div className="btn-booking">
                          <button className="btn-booking-room" onClick={handleBooking}>
                            {t('common.booking')}
                          </button>
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
