import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { useState } from 'react';
import wishAPI from '~/services/apis/clientAPI/clientWishAPI';
import { useSnackbar } from 'notistack';
import { t } from 'i18next';

const IconLoveLike = (props) => {
    const [like, setLike] = useState(true);
    const { enqueueSnackbar } = useSnackbar();
    const handleFavorite = () => {
        wishAPI.likeFavoriteRoom(props.idHome).then((res) => {
            setLike(!like);
            enqueueSnackbar(res.data.message, { variant: 'success' });
            setLove(!love);
        });
    };

    return (
        <div className="card-like" onClick={handleFavorite}>
            <FavoriteOutlinedIcon className={like ? 'icon_love__true' : 'icon_love'} />
            <p>{like ? t('common.unlove') : t('common.love')}</p>
        </div>
    );
};

export default IconLoveLike;
