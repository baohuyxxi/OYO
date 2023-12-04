import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { t } from 'i18next';

const PrivateRoute = ({ element }) => {
    const user = useSelector((state) => state.user.current);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (!user) {
            // This runs when the component mounts and if `user` changes
            enqueueSnackbar(t('message.requestSigin'), { variant: 'warning' });
        }
    }, [user, enqueueSnackbar]);

    if (!user) {
        // If user is not authenticated, navigate to the home page
        return <Navigate to="/" />;
    }

    // If user is authenticated, render the original element
    return element;
};

export default PrivateRoute;
