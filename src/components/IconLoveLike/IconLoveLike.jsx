import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { useState } from 'react';
import wishAPI from '~/services/apis/clientAPI/clientWishAPI';
import { useSnackbar } from 'notistack';
import { t } from 'i18next';

const IconLoveLike = ({idHome, handleDelete, index }) => {
    const { enqueueSnackbar } = useSnackbar();
    const handleFavorite = () => {
        wishAPI.likeFavoriteRoom(idHome).then((res) => {
            enqueueSnackbar(res.data.message, { variant: 'success' });
            handleDelete(index);
        });
    };

    return (
        <div className="card-like" onClick={handleFavorite}>
            <FavoriteOutlinedIcon className={'icon_love__true' } />
            <p>{t('common.unlove')} </p>
        </div>
    );
};

export default IconLoveLike;
