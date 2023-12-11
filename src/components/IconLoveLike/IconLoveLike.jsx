import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { useState } from 'react';
import wishAPI from '~/services/apis/clientAPI/clientWishAPI';
import { t } from 'i18next';

const IconLoveLike = (props) => {
    const [like, setLike] = useState(true);

    const handleFavorite = () => {
        wishAPI.likeFavoriteRoom(props.idHome).then((data) => {
            setLike(!like);
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
