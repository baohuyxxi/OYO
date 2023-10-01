import NavBar from '../../components/Navbar/NavBar'
import HomeSlider from '../../components/HomeSlider/HomeSlider'
import Footer from '../../components/Footer/Footer'
import SearchForm from '../../components/SearchForm/SearchForm'
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
  useColorScheme
} from '@mui/material/styles'
const theme = extendTheme({
})
// const defaultTheme = createTheme()

export default function HomePage() {

  return (
    <div>
      <CssVarsProvider theme={theme}>
        <NavBar />
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
        <SearchForm/>
        <Footer />
      </CssVarsProvider>
    </div>
  )
}
