import {useContext, useState} from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage.jsx";
import AccountNav from "../AccountNav.jsx";

export default function ProfilePage(){
    const [redirect, setRedirect] = useState(null);
    const {ready, user, setUser} = useContext(UserContext);
    let {subpage} = useParams();
    if(subpage === undefined) {
        subpage = 'profile';
    }


    async function logout() {
        await axios.post('/logout', {}, { withCredentials: true });
        setRedirect('/');
        setUser(null);
    }
    if(redirect) {
        return <Navigate to={redirect} />
    }

    if(!ready) {
        return(
            'Loading...'
        )
    }

    if(ready && !user) {
        return(
            <Navigate to={'/login'} />
        )
    }


    return (
        <div>
            <AccountNav />
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email})<br />
                    <button className="primary max-w-sm mt-2" onClick={logout}>Log Out</button>
                </div>
            )}
            {subpage === 'places' && (
                <PlacesPage />
            )}
        </div>
    )
}
