import HomeSlider from '~/components/HomeSlider/HomeSlider';
import Popular from '~/components/Popular/Popular';
import RoomPopular from '~/components/RoomPopular/RoomPopular';
import FramePage from '~/components/FramePage/FramePage';
import TypeAccomPopupar from '~/components/TypeAccomPopular/TypeAccomPopupar';

export default function HomePage() {
    return (
        <FramePage>
            <HomeSlider />
            {/* <SearchForm /> */}
           
            <TypeAccomPopupar />
            <RoomPopular />
            <Popular />
        </FramePage>
    );
}
