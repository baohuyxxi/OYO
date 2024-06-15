import Footer from '~/components/Footer/Footer';
import ViewIamge from '~/components/ViewImage/ViewImage';
import globalSlice from '~/redux/globalSlice';
import { useDispatch, useSelector } from 'react-redux';
import LoadingDialog from '~/components/LoadingDialog/LoadingDialog';
import NavbarOwner from '../NavbarOwner/NavbarOwner';
import './FramePage.scss';

export default function FramePageOwner({ children }) {
    const dispatch = useDispatch();
    // dispatch(globalSlice.actions.setLoading(false));
    const viewImages = useSelector((state) => state.global.viewImages);
    const loading = useSelector((state) => state.global.loading);
    return (
        <div className="background">
            <NavbarOwner />
            <div className="body-page">{children}</div>
            {viewImages && <ViewIamge viewImages={viewImages} />}
            {loading && <LoadingDialog open={loading} />}
            <Footer />
        </div>
    );
}
