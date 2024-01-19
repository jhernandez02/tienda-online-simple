import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { CartContext } from "../contexts/CartContext";
import { Navbar, Container } from 'react-bootstrap';

function HeaderComponent(){

    const {handleShowCart} = useContext(AppContext);
    const {carrito} = useContext(CartContext);

    return(
        <Navbar className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand><i className="bi bi-cart-fill"></i> Tienda Simple</Navbar.Brand>
                <div>
                    <button onClick={handleShowCart} className="btn btn-success me-2">
                        <i className="bi bi-cart-fill"></i> {carrito.length} productos
                    </button>
                </div>
            </Container>
        </Navbar>
    );
}

export default HeaderComponent;