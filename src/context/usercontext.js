import React, { createContext, useState } from 'react';



export const UserContext = createContext();



export const UserProvider = (props) => {

    const[user, setUser] = useState({

    });

    if (!user) {
        console.log("no user");
        
    }

    return (

        <UserContext>
            {
                props.children
            }
        </UserContext>
    );

}