import './TypeAccomPopular.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const data = [
    {
        title: 'Biệt thự bể bơi',
        content: 'Biệt thự sang trọng, hiện đại, diện tích lớn có bể bơi mini ngoài trời',
        image: 'https://gcs.tripi.vn/tripi-assets/mytour/icons/image_homestay_biet_thu.png'
    },
    {
        title: 'Chung cu cao cấp',
        content: 'Biệt thự sang trọng, hiện đại, diện tích lớn có bể bơi mini ngoài trời',
        image: 'https://gcs.tripi.vn/tripi-assets/mytour/icons/image_homestay_chung_cu.png'
    },
    {
        title: 'Homestay',
        content: 'Biệt thự sang trọng, hiện đại, diện tích lớn có bể bơi mini ngoài trời',
        image: 'https://gcs.tripi.vn/tripi-assets/mytour/icons/image_homestay_homestay.png'
    },
    {
        title: 'Bungalow',
        content: 'Biệt thự sang trọng, hiện đại, diện tích lớn có bể bơi mini ngoài trời',
        image: 'https://gcs.tripi.vn/tripi-assets/mytour/icons/image_homestay_bungalow.png'
    },
    {
        title: 'Biệt thự bể bơi',
        content: 'Biệt thự sang trọng, hiện đại, diện tích lớn có bể bơi mini ngoài trời',
        image: 'https://gcs.tripi.vn/tripi-assets/mytour/icons/image_homestay_biet_thu.png'
    },
    {
        title: 'Chung cu cao cấp',
        content: 'Biệt thự sang trọng, hiện đại, diện tích lớn có bể bơi mini ngoài trời',
        image: 'https://gcs.tripi.vn/tripi-assets/mytour/icons/image_homestay_chung_cu.png'
    },
    {
        title: 'Homestay',
        content: 'Biệt thự sang trọng, hiện đại, diện tích lớn có bể bơi mini ngoài trời',
        image: 'https://gcs.tripi.vn/tripi-assets/mytour/icons/image_homestay_homestay.png'
    },
    {
        title: 'Bungalow',
        content: 'Biệt thự sang trọng, hiện đại, diện tích lớn có bể bơi mini ngoài trời',
        image: 'https://gcs.tripi.vn/tripi-assets/mytour/icons/image_homestay_bungalow.png'
    }
];

const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

const TypeAccomPopupar = () => {
    return (
        <div className="type-accom-popular">
            <div className="type-accom-popular__head">
                <h1>Home stay bạn có thể thích</h1>
            </div>
            <Slider {...settings}>
                {data.map((item, index) => (
                    <div key={index} style={{ width: '100%' }}>
                        <div className="slide" style={{ backgroundImage: `url(${item.image})`, height: '279px' }}>
                            <h1>{item.title}</h1>
                            <span>{item.content}</span>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default TypeAccomPopupar;
