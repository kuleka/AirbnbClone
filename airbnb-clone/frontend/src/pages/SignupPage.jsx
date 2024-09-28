import { useState } from "react";
import {Link, Navigate} from "react-router-dom";
import axios from "axios";

export default function SignupPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [redirect, setRedirect] = useState(false);
    async function signUp(ev) {
        ev.preventDefault();

        try{
            await axios.post("/register", {
                name,
                email,
                pwd
            }); 
            alert('Sign up successful. Now you can log in!');
            setRedirect(true);
        } catch(e) {
            alert("Sign up failed.")
        }
        
    }

    if (redirect) {
        return <Navigate to={'/login'} />
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center m-4">Sign Up</h1>
                <form className="max-w-md mx-auto" onSubmit={signUp}>
                    <input type="text" 
                        placeholder='User Name' 
                        value={name} 
                        onChange={ev => setName(ev.target.value)} />

                    <input type="email" 
                        placeholder='your@email.com'
                        value={email} 
                        onChange={ev => setEmail(ev.target.value)} />

                    <input type="password" 
                        placeholder="password"
                        value={pwd}
                        onChange={ev => setPwd(ev.target.value)} />

                    <button className="primary">Continue</button>
                    <div className="text-center py-2 text-gray-500">
                        Already have an account? <Link className="underline text-black" to={'/login'}>Log in</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}