import React, { useEffect } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from './i18n';
import Auth from './routes/Auth';
import globalSlice from '~/redux/globalSlice';
import { useDispatch, useSelector } from 'react-redux';
import LoadingDialog from '~/components/LoadingDialog/LoadingDialog';
import './App.css';
function App() {
    const dispatch = useDispatch();
        // dispatch(globalSlice.actions.setLoading(false));
    const loading = useSelector((state) => state.global.loading);
    const { t } = useTranslation();
    useEffect(() => {
        const selectedLanguage = localStorage.getItem('selectedLanguage');
        if (selectedLanguage) {
            i18n.changeLanguage(selectedLanguage);
        } else {
            localStorage.setItem('selectedLanguage', 'vi');
            i18n.changeLanguage('vi');
        }
    }, []);
    const mode = localStorage.getItem('mode');
    if (!mode || (mode && mode === 'light')) {
        localStorage.setItem('mode', 'light');
        document.documentElement.setAttribute('mode', 'light');
    } else {
        localStorage.setItem('mode', 'dark');
        document.documentElement.setAttribute('mode', 'dark');
    }
    return (
        <div>
            <Auth />
            {loading && <LoadingDialog open={loading} />}
        </div>
    );
}
export default App;
