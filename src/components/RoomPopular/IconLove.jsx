import { useState } from 'react';
import { t } from 'i18next';
import { useSnackbar } from 'notistack';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import './RoomPopular.scss';

const IconLove = (props) => {
    const [like, setLike] = useState(props.isFavorite);
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const handleFavorite = () => {
        // Simulate API call (replace with actual API call)
        if (!loading) {
            setLoading(true);
            setTimeout(() => {
                setLike(!like);
                setLoading(false);
                if (like) {
                    enqueueSnackbar(t('message.unlove'), { variant: 'success' });
                } else {
                    enqueueSnackbar(t('message.love'), { variant: 'success' });
                }
            }, 1000); // Simulate success response after 1 second
        }
    };

    return (
        <div className="love_room">
            <FavoriteOutlinedIcon className={like ? 'icon_love__true' : 'icon_love'} onClick={handleFavorite} />
        </div>
    );
};

export default IconLove;
