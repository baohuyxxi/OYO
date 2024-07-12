import './Footer1.scss';
import Logo from '~/assets/logo.svg';
import { Link } from 'react-router-dom';
import twitterIcon from '~/assets/imageMaster/twitter.png';
import youtubeicon from '~/assets/imageMaster/youtube-play--v2.png';
import facebookIcon from '~/assets/imageMaster/facebook-footer.png';
import instagramIcon from '~/assets/imageMaster/instagram-new.png';
export default function Footer() {
    return (
        <footer className="footer">
            <div className="divider-full"></div>
            <div className="footer__above">
                <div className="footer__info">
                    <div className="footer__logo">
                        <img src={Logo} alt="logo" className="footer__logo__img__logo" />
                        <img
                            src="https://staticproxy.mytourcdn.com/0x0,q90/themes/images/logo-dathongbao-bocongthuong-w165.png"
                            alt="logo"
                            className="footer__logo__img__sticker"
                        />
                    </div>
                </div>
                <div className="footer-about row">
                    <div className="footer-about__item col l-4 m-6 c-12">
                        <div className="footer-about__item__title">Công ty du lịch Việt Nam OYO</div>
                        <Link to="/#faq" className="footer-about__item__content">
                            Tổng đài chăm sóc: 1900 2083
                        </Link>
                        <Link to="/#guide" className="footer-about__item__content">
                            Email: hotro@mytour.vn
                        </Link>
                        <Link to="/#payment" className="footer-about__item__content">
                            Văn phòng Hà Nội: Tầng 11, Tòa Peakview, 36 Hoàng Cầu, Đống Đa
                        </Link>
                    </div>
                    <div className="footer-about__item col l-4 m-6 c-12">
                        <div className="footer-about__item__title">Chính sách & Quy định</div>
                        <Link to="/#policy" className="footer-about__item__content">
                            Điều khoản và điều kiện
                        </Link>
                        <Link to="/#team" className="footer-about__item__content">
                            Quy định về thanh toán
                        </Link>
                        <Link to="/#founder" className="footer-about__item__content">
                            Chính sách bảo mật thông tin
                        </Link>
                        <Link to="/#achievement" className="footer-about__item__content">
                            Quy chế hoạt động
                        </Link>
                    </div>
                    <div className="footer-about__item col l-4 m-6 c-12">
                        <div className="footer-about__item__title">Khách hàng và đối tác</div>
                        <Link to="/#contact" className="footer-about__item__content">
                            Giới thiệu nhận quà
                        </Link>
                        <Link to="https://www.facebook.com/BiSteam129" className="footer-about__item__content">
                            Hợp tác với chúng tôi
                        </Link>
                        <Link to="/#contact" className="footer-about__item__content">
                            Đăng nhập HMS
                        </Link>
                        <Link to="/#contact" className="footer-about__item__content">
                            Tuyển dụng
                        </Link>
                    </div>
                </div>
            </div>
            <div className="divider-full "></div>
            <div className="footer__below">
                <div>
                    <div className="footer__inner-contact">
                        <Link to="#" className="footer__contact-logo fab fa-twitter">
                            <img src={twitterIcon} alt="alt-t" />
                        </Link>
                        <Link
                            to="https://www.youtube.com/channel/UCUf6O2OojuB4nMBmoL3jy-Q"
                            className="footer__contact-logo fab fa-youtube"
                        >
                            <img src={youtubeicon} alt="alt-y" />
                        </Link>
                        <Link
                            to="https://www.facebook.com/maibaohuy.070620021303mbBank/"
                            className="footer__contact-logo fab fa-facebook-square"
                        >
                            <img src={facebookIcon} alt="alt-f" />
                        </Link>
                        <Link to="#" className="footer__contact-logo fab fa-instagram-square">
                            <img src={instagramIcon} alt="alt-i" />
                        </Link>
                    </div>
                </div>
                <div className="footer__contact">Copyright © MyCourse.io 2024. All Rights Reserved</div>
            </div>
        </footer>
    );
}
