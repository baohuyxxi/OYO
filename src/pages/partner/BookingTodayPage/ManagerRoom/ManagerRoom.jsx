import ImageSetting from '~/pages/partner/BookingTodayPage/ManagerRoom/GallerySetting/ImageSetting/ImageSetting';
import LocationSetting from '~/components/HostSetting/LocationSetting/LocationSetting';
import NavbarOwner from '~/components/NavbarOwner/NavbarOwner';
import ScrollspyComponent from '~/components/Scrollspy/Scrollspy';
import GeneralInfoSetting from '~/pages/partner/BookingTodayPage/ManagerRoom/GeneralInfoSetting/GeneralInfoSetting';
import './ManagerRoom.scss';
import CountRoomSetting from '~/pages/partner/BookingTodayPage/ManagerRoom/CountRoomSetting/CountRoomSetting';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import publicAccomPlaceAPI from '~/services/apis/publicAPI/publicAccomPlaceAPI';
import PriceDiscountSurchagre from '~/pages/test/PriceDiscountSurchagre/PriceDiscountSurchagre';
import { useSelector, useDispatch } from 'react-redux';
import VideoIntroSetting from '~/pages/partner/BookingTodayPage/ManagerRoom/GallerySetting/VideoIntroSetting/VideoIntroSetting';
import PolicySetting from './PolicySetting/PolicySetting';
import PaymentInfoSetting from './PaymentInfoSetting/PaymentInfoSetting';
import FacilitySetting from '~/components/HostSetting/FacilitySetting/FacilitySetting';
import partnerManageAccomAPI from '~/services/apis/partnerAPI/partnerManageAccomAPI';

const infoLink = {
    name: 'Chi tiết nhà cho thuê',
    urlLink: '/host/setting'
};

const backUrl = '/host/setting';

// , 'section2', 'section3', 'section4', 'section5', 'section6', 'section7'

const item = ['', 'section1', 'section2', 'section3', 'section4', 'section5'];

const ManagerRoom = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const [galleryAccom, setGalleryAccom] = useState(null);

    // const dataHomeDetail = useSelector((state) => state.settingaccom.accom);

    useEffect(() => {
        partnerManageAccomAPI.getGallery(params.idHome).then((dataResponse) => {
            setGalleryAccom(dataResponse.data);
        });
    }, [params.idHome]);

    // const infoRoom = {
    //     accomName: dataHomeDetail?.accomName ? dataHomeDetail?.accomName : '',
    //     description: dataHomeDetail?.description,
    //     guide: dataHomeDetail?.guide,
    //     refundPolicy: dataHomeDetail?.refundPolicy
    // };

    // const detailPriceRoom = {
    //     pricePerNight: dataHomeDetail?.pricePerNight,
    //     discount: dataHomeDetail?.discount ? dataHomeDetail?.discount : 0,
    //     surchargeList: dataHomeDetail?.surchargeList ? dataHomeDetail?.surchargeList : []
    // };

    // const locationRoom = {
    //     addressGeneral: dataHomeDetail?.addressGeneral,
    //     addressDetail: dataHomeDetail?.addressDetail
    // };

    // const policyHomestay = {
    //     cancellationPolicy: {
    //         code: 'CANCEL_24H',
    //         cancellationFeeRate: 10
    //     },
    //     generalPolicy: {
    //         allowEvent: true,
    //         allowPet: true,
    //         allowSmoking: true
    //     }
    // };

    const children = [
        {
            id: '#section1',
            to: 'section1',
            info: 'Hình ảnh & Video',
            comp: (
                <>
                    <ImageSetting
                        listImage={galleryAccom?.imageAccomUrls}
                        thumbnail={galleryAccom?.imageAccomUrls ? galleryAccom?.imageAccomUrls[0] : null}
                    />
                    <VideoIntroSetting cldVideoId={galleryAccom?.cldVideoId} />
                </>
            )
        },
        {
            id: '#section2',
            to: 'section2',
            info: 'Thông tin chung',
            comp: <GeneralInfoSetting accomId={params.idHome} />
        },
        {
            id: '#section3',
            to: 'section3',
            info: 'Thiết lập phòng',
            comp: <CountRoomSetting accomId={params.idHome} />
        },
        {
            id: '#section4',
            to: 'section4',
            info: 'Vị trí',
            comp: <LocationSetting />
        },
        {
            id: '#section5',
            to: 'section5',
            info: 'Tiện ích',
            comp: <FacilitySetting />
        }
        // {
        //     id: '#section6',
        //     to: 'section6',
        //     info: 'Chính sách',
        //     comp: <PolicySetting accomId={params.idHome} />
        // },
        // {
        //     id: '#section7',
        //     to: 'section7',
        //     info: 'Thông tin thanh toán',
        //     comp: <PaymentInfoSetting accomId={params.idHome} />
        // }
    ];

    return (
        <div className="manager-room">
            <NavbarOwner />
            <ScrollspyComponent children={children} item={item} infoLink={infoLink} backUrl={backUrl} />
        </div>
    );
};

export default ManagerRoom;
