import AppBar from "~/components/AppBar/AppBar";
import HomeSlider from "~/components/HomeSlider/HomeSlider";
import Footer from "~/components/Footer/Footer";
import SearchForm from "~/components/SearchForm/SearchForm";
import Popular from "~/components/Popular/Popular";
import RoomPopular from "~/components/RoomPopular/RoomPopular";
export default function HomePage() {
  return (
    <div>
      <AppBar />
      <HomeSlider />
      <SearchForm />
      <Popular />
      <RoomPopular />
      <Footer />
    </div>
  );
}
