import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        axios.get('/profile', { withCredentials: true }).then(({ data }) => {
            setUser(data);
            setReady(true);
        }).catch((error) => {
            console.error('Error fetching profile:', error);
            setReady(true); // Set ready to true even if there's an error
        });
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    );
}
