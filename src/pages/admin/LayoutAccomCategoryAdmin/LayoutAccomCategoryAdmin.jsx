import { useState, useEffect, useContext } from 'react';
import AccomCategoryAdmin from '~/pages/admin/LayoutAccomCategoryAdmin/AccomCategoryAdmin';
import publicAccomPlaceAPI from '~/services/apis/publicAPI/publicAccomPlaceAPI';
import { SearchContext } from '../../contexts/searchContext';

const LayoutAccomCategoryAdmin = () => {
    const [listAccomCategory, setListAccomCategory] = useState([]);

    useEffect(() => {
        publicAccomPlaceAPI.getAllAccomCategoryInfo().then((dataResponse) => {
            setListAccomCategory(dataResponse);
            // searchContext?.setHanldSearch(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChangeData = (data) => {
        setListAccomCategory(data);
    };

    return <div>{<AccomCategoryAdmin data={listAccomCategory} setList={handleChangeData} />}</div>;
};

export default LayoutAccomCategoryAdmin;
