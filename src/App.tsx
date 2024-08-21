import MovieList from './components/MovieList'
import logo from '../public/assets/logo.svg'

const App = () => {
  return (  
    <>
      <img src={logo} alt="" />
      <MovieList />    
    </>
  )
}

export default App
