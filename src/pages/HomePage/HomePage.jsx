import AppBar from '~/components/AppBar/AppBar'
import HomeSlider from '~/components/HomeSlider/HomeSlider'
import Footer from '~/components/Footer/Footer'
import SearchForm from '~/components/SearchForm/SearchForm'
export default function HomePage() {

  return (
    <div>
      <AppBar />
      <HomeSlider />
      <SearchForm />
      <Footer/>
    </div>
  )
}
