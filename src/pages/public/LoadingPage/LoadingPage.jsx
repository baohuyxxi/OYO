import LoadingIcon from '~/assets/imageMaster/loading.gif';
import snailLoading from '~/assets/video/snailLoading.gif'
import './LoadingPage.scss';
import FramePage from '~/components/FramePage/FramePage';
const LoadingPage = () => {
    return (
        <FramePage>
            <div className="loading__page content">
                <img src={LoadingIcon} alt="" />
            </div>
        </FramePage>
    );
};

export default LoadingPage;
