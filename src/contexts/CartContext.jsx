import React, { useState, useEffect } from 'react';

const CartContext = React.createContext();
const { Provider } = CartContext;

function CartProvider({children}){
    const [carrito, setCarrito] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    function agregar(producto){
        const nCarrito = [...carrito, producto];
        setCarrito(nCarrito);
    }
    function quitar(prod){
        const nCarrito = carrito.filter(item=>item.id!==prod.id);
        setCarrito(nCarrito);
    }
    function limpiar(){
        setCarrito([]);
    }
    useEffect(()=>{
        let total = 0;
        carrito.forEach((item)=>{
            total += item.price;
        });
        setSubtotal(total);
    },[carrito]);
    return(
        <Provider value={{carrito, subtotal, agregar, quitar, limpiar}}>
            {children}
        </Provider>
    );
}

export { CartProvider, CartContext };