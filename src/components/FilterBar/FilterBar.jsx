import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { getAllAccomCategoryInfo } from '~/services/apis/accomCateAPI';
import './FilterBar.scss';
import DialogFilter from '../DialogFilter/DialogFilter';

const FilterBar = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 10,
        slidesToScroll: 10,
        initialSlide: 0
    };
    const [listAccomCateData, setListAccomCateData] = useState(null);
    const [indexActive, setIndexActive] = useState(0);
    useEffect(() => {
        async function fetchData() {
            const res = await getAllAccomCategoryInfo();
            console.log(res);
            setListAccomCateData(res.data);
        }
        fetchData();
    }, []);
    return (
        <div className="filter-bar">
            <Slider {...settings}>
                {listAccomCateData?.map((current, index) => (
                    <div key={index}>
                        <div className={`slider__item-filter`} onClick={() => handleFilter(index, filter?.id)}>
                            <div className="icon-filter">
                                <img src={current?.icon} alt="icon-filter" />
                            </div>
                            <div className="title-filter">
                                <p>{current?.accomCateName}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
            <DialogFilter />
            {/* <Button>Bộ Lọc</Button> */}
        </div>
    );
};
export default FilterBar;
