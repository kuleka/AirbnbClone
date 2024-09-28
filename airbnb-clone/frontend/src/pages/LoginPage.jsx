import {Link, Navigate} from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import {UserContext} from "../UserContext.jsx"

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);

    async function loginSubmit(ev) {
        ev.preventDefault();

        try{
            const {data} = await axios.post("/login", {
                email,
                pwd
            }); 
            setUser(data);
            alert('Log in successful!');
            setRedirect(true);
        } catch(e) {
            if (e.response) {
                if (e.response.status === 404) {
                    alert("User not found.");
                } else if (e.response.status === 422) {
                    alert("Wrong password.");
                } else {
                    alert("Log in failed.");
                }
            } else {
                alert("Log in failed.");
            }
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center m-4">Login</h1>
                <form className="max-w-md mx-auto" onSubmit={loginSubmit}>
                    <input type="email" 
                        placeholder='your@email.com'
                        value={email} 
                        onChange={ev => setEmail(ev.target.value)} />

                    <input type="password" 
                        placeholder="password"
                        value={pwd}
                        onChange={ev => setPwd(ev.target.value)} />

                    <button className="primary">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Don't have an account? <Link className="underline text-black" to={'/register'}>Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}