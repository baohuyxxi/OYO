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
import ChatAI from '../ChatAI/ChatAI';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import React, { useState } from 'react';
import ChatBox from '../ChatBox/ChatBox';

export default function FramePage({ children }) {
    const viewImages = useSelector((state) => state.global.viewImages);
    const chatbox = useSelector((state) => state.global.chatbox);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className="background__frame-page">
            <NavBar />
            <div className="body-page">{children}</div>
            {viewImages && <ViewIamge viewImages={viewImages} />}

            {/* <ChatAI onClose={handleClose} /> */}
            {chatbox.open === true && <ChatBox />}
            <Footer />
        </div>
    );
}
