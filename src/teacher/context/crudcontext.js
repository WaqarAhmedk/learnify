import React, { createContext ,useState } from "react";



export const CrudContext = createContext({
   
});


const modalobj={
    component: null,
    props: {},
    showModal: () => {},
    hideModal: () => {}

};
const [modal ,setmodal]=useState(false);




export const CrudContextProvider = (props) => {
    return <CrudContext.Provider value={modalobj}>
        {
            props.children
        }
    </CrudContext.Provider>
}