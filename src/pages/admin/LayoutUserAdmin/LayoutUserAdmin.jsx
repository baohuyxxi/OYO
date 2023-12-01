import { use } from 'i18next';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { SearchContext } from '~/contexts/searchContext';
import UserAdmin from '~/pages/admin/LayoutUserAdmin/UserAdmin';
import cmsUserAPI from '~/services/apis/adminAPI/cmsUserAPI';

const LayoutUserAdmin = () => {
    const searchContext = useContext(SearchContext);
    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        cmsUserAPI
            .getAllUserWithPaging(0, 10)
            .then((dataResponse) => {
                console.log(dataResponse);
                setListUser(dataResponse.data.content);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <UserAdmin data={listUser} setListUser={setListUser} />
        </div>
    );
};

export default LayoutUserAdmin;
