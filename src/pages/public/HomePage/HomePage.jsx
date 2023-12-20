import HomeSlider from "~/components/HomeSlider/HomeSlider";
import Popular from "~/components/Popular/Popular";
import RoomPopular from "~/components/RoomPopular/RoomPopular";
import FramePage from "~/components/FramePage/FramePage";
export default function HomePage() {
  return (
    <FramePage>
      <HomeSlider />
      {/* <SearchForm /> */}
      <Popular />
      <RoomPopular />
    </FramePage>
  );
}
