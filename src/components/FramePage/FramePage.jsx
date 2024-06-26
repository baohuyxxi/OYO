// FramePage.jsx
import './FramePage.scss';
import { useSelector } from 'react-redux';
import NavBar from './NavBar/NavBar';
import NavbarOwner from '../NavbarOwner/NavbarOwner';
import Footer from '~/components/Footer/Footer';
import ViewImage from '~/components/ViewImage/ViewImage';
import ChatBox from '../ChatBox/ChatBox';
import LoadingDialog from '~/components/LoadingDialog/LoadingDialog';
import { useEffect } from 'react';

export default function FramePage({ ownerPage = false, children }) {
    const viewImages = useSelector((state) => state.global.viewImages);
    const chatbox = useSelector((state) => state.global.chatbox);
    const loading = useSelector((state) => state.global.loading);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={`background${ownerPage ? '__frame-page' : ''}`}>
            {ownerPage ? <NavbarOwner /> : <NavBar />}
            <div className="body-page">{children}</div>
            {viewImages && <ViewImage viewImages={viewImages} />}
            {chatbox.open === true && <ChatBox />}
            {loading && <LoadingDialog open={loading} />}
            <Footer />
        </div>
    );
}
