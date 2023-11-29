import React from 'react';
import UserAdmin from '~/pages/admin/LayoutUserAdmin/UserAdmin';

const LayoutUserAdmin = () => {
    return (
        <div>
            <UserAdmin data={listUser} />
        </div>
    );
};

export default LayoutUserAdmin;
