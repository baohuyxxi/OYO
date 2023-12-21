import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import publicAccomPlaceAPI from '~/services/apis/publicAPI/publicAccomPlaceAPI';
import Button from '@mui/material/Button';
import { t } from 'i18next';
import './FilterBar.scss';
import DialogFilter from '../DialogFilter/DialogFilter';
import {useNavigate} from 'react-router-dom'

const FilterBar = (props) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 10,
        slidesToScroll: 10,
        initialSlide: 0
    };
    const nagavite = useNavigate()
    const [listAccomCateData, setListAccomCateData] = useState(null);
    const [indexActive, setIndexActive] = useState(-1);
    useEffect(() => {
        async function fetchData() {
            const res = await publicAccomPlaceAPI.getAllAccomCategoryInfo();
            setListAccomCateData(res.data);
        }
        fetchData();
    }, []);
    const handleFilterCate = (index, current) => {
        setIndexActive(index);
        if (current === null) {
            publicAccomPlaceAPI
                .getAllRoomsWithFilter({ queryParams: ``, pageSize: props?.pagi })
                .then((dataResponse) => {
                    props.filterData(dataResponse.data.content);
                });
        } else {
            props.setLoading(true);
            publicAccomPlaceAPI
                .getAllRoomsWithFilter({
                    queryParams: `accomCateName=${current?.accomCateName}`,
                    pageSize: props?.pagi
                })
                .then((dataResponse) => {
                    props.filterData(dataResponse.data.content);
                    props.setLoading(false);
                });
        }
    };
    const handleReset = async (e) => {
        e.preventDefault();
        nagavite('/list-accom')
        setIndexActive(-1)
        await publicAccomPlaceAPI.getAllRoomsWithFilter({ queryParams: ``, pageSize: props?.pagi }).then((dataResponse) => {
            props.filterData(dataResponse.data.content);
          
        });
      
    };
   
    return (
        <div className="filter-bar">
            <Slider {...settings}>
                {listAccomCateData?.map((current, index) => (
                    <div key={index}>
                        <div
                            className={`slider__item-filter  ${index === indexActive && 'active'}`}
                            onClick={() => handleFilterCate(index, current)}
                        >
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
            <DialogFilter filterData={props.filterData} pagi={props.pagi} dataQueryDefauld={props.dataQueryDefauld} />
            <Button className='btn-all' variant='outlined' onClick={handleReset}>{t('common.reload')} </Button>
            
           
        </div>
    );
};
export default FilterBar;
