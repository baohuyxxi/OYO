import AppBar from '../../components/AppBar/AppBar'
import HomeSlider from '../../components/HomeSlider/HomeSlider'
import Footer from '../../components/Footer/Footer'
import SearchForm from '../../components/SearchForm/SearchForm'
export default function HomePage() {

  return (
    <div>
      <AppBar />
      <HomeSlider />
      <div
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-duration="1000"
        data-aos-delay="20"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
        data-aos-anchor-placement="top-center"
      >
      </div>
      <SearchForm />
      <Footer />
    </div>
  )
}
