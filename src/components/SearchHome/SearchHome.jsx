import React, { useState, useRef, useEffect } from 'react';
import './SearchHome.scss';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import formatPrice from '~/utils/formatPrice';
import removeVietnameseTones from '~/utils/convertStringVietNamese';
import publicAccomPlaceAPI from '~/services/apis/publicAPI/publicAccomPlaceAPI';

function SearchHome({ placeholder, data }) {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState('');
    const refOne = useRef(null);

    useEffect(() => {
        document.addEventListener('click', hideOnClickOutside, true);
    }, []);

    const hideOnClickOutside = (e) => {
        if (refOne.current && !refOne.current.contains(e.target)) {
            setFilteredData([]);
        }
        setWordEntered('');
    };

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);

        const convertStringToEnglish = removeVietnameseTones(searchWord);
        const text = convertStringToEnglish.replace(' ', '%20');
        if (text.length > 1) {
            publicAccomPlaceAPI.getSearchHome(text).then((dataResponse) => {
                if (dataResponse.data?.content) {
                    setFilteredData(dataResponse.data?.content);
                }
            });
        }
        if (searchWord === '') {
            setFilteredData([]);
        }
    };

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered('');
    };

    return (
        <div className="search-home">
            <div className="searchInputs-home">
                <div className="searchIcon">
                    <SearchIcon />
                </div>

                <input type="text" placeholder={placeholder} value={wordEntered} onChange={handleFilter} />

                <div className="searchIcon-clear">
                    {filteredData.length === 0 ? '' : <CloseIcon id="clearBtn" onClick={clearInput} />}
                </div>
            </div>
            {filteredData.length !== 0 && (
                <div className="dataResult" ref={refOne}>
                    {filteredData?.map((value, index) => {
                        return (
                            <Link className="dataItem" to={`room-detail/${value.id}`} target="_blank" key={index}>
                                <div className="image-item-search">
                                    <img src={value?.imageAccomsUrls[0]} alt="" />
                                </div>
                                <p>{value?.accomName} </p>
                                <p className="price-item-search">{`Từ ${formatPrice(value?.pricePerNight)}`}</p>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default SearchHome;
