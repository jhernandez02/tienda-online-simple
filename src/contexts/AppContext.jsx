import React, { useState, useEffect } from 'react';

const AppContext = React.createContext();
const { Provider } = AppContext;

function AppProvider({children}){
    const [showCart, setShowCart] = useState(false);
    const handleCloseCart = () => setShowCart(false);
    const handleShowCart = () => setShowCart(true);
    return(
        <Provider value={{showCart, handleCloseCart, handleShowCart}}>
            {children}
        </Provider>
    );
}

export { AppProvider, AppContext };