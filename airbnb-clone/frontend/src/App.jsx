import './App.css'
import { Routes, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Layout from './Layout.jsx';
import SignupPage from './pages/SignupPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import axios from "axios";
import { UserContextProvider } from './UserContext.jsx';
import PlacesPage from "./pages/PlacesPage.jsx";
import PlacesFormPage from "./pages/PlacesFormPage.jsx";
import PlacePage from "./pages/PlacePage.jsx";
import BookingsPage from "./pages/BookingsPage.jsx";
import BookingPage from "./pages/BookingPage.jsx";

axios.defaults.baseURL = "http://localhost:3000"
axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<SignupPage />} />
          <Route path='/account/' element={<ProfilePage />} />
          <Route path='/account/places' element={<PlacesPage />} />
          <Route path='/account/places/new' element={<PlacesFormPage />} />
          <Route path='/account/places/:id' element={<PlacesFormPage />} />
          <Route path='/place/:id' element={<PlacePage />} />
          <Route path='/account/bookings' element={<BookingsPage />} />
          <Route path='/account/bookings/:id' element={<BookingPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
    
  )
}

export default App
