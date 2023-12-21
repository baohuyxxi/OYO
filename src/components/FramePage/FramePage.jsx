import NavBar from './NavBar/NavBar';
import Footer from '~/components/Footer/Footer';
import ViewIamge from '~/components/ViewImage/ViewImage';
import globalSlice from '~/redux/globalSlice';
import { useDispatch, useSelector } from 'react-redux';
import LoadingDialog from '~/components/LoadingDialog/LoadingDialog';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './FramePage.scss';
import { vi } from 'date-fns/locale';

export default function FramePage({ children }) {

    const viewImages = useSelector((state) => state.global.viewImages);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="background__frame-page">
            <NavBar />
            <div className="body-page">{children}</div>
            {viewImages && <ViewIamge viewImages={viewImages} />}
          
            <Footer />
        </div>
    );
}
