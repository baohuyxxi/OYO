import AppBar from "~/components/AppBar/AppBar";
import Footer from "~/components/Footer/Footer";
import './FramePage.scss'

export default function FramePage({ children }) {
  return (
    <div className="background">
      <AppBar />
      <div className='content'>{children}</div>
      <Footer />
    </div>
  );
}