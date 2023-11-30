import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { SearchContext } from '~/contexts/searchContext';
import AccomAdmin from '~/pages/admin/LayoutAccomAdmin/AccomAdmin';
import cmsAccomPlaceAPI from '~/services/apis/adminAPI/cmsAccomPlaceAPI';

const LayoutAccomAdmin = () => {
    const searchContext = useContext(SearchContext);
    const [listAccom, setListAccom] = useState([]);

    useEffect(() => {
        cmsAccomPlaceAPI
            .getAllAcommPlaceWithPaging({
                pageNumber: 0,
                pageSize: 10
            })
            .then((dataResponse) => {
                setListAccom(dataResponse.data.content);
            });
    }, []);

    return (
        <div>
            <AccomAdmin data={listAccom} />
        </div>
    );
};

export default LayoutAccomAdmin;
