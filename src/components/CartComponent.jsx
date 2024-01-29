import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { CartContext } from "../contexts/CartContext";
import { Offcanvas } from 'react-bootstrap';

function CartComponent(props){
    const { delProduct, cleanCart } = props;
    const {showCart, handleCloseCart } = useContext(AppContext);
    const {carrito, subtotal } = useContext(CartContext);
    return(
        <Offcanvas show={showCart} onHide={handleCloseCart} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        Tu Carrito<br/>
                        <small className="fs-6">{carrito.length} productos en total</small>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                {carrito.map(item=>
                    <div key={item.id} className="d-flex pb-3 mb-3 item_product">
                        <div className="flex-shrink-0">
                            <img src={item.thumbnail} width="60" className="rounded" alt="producto" />
                        </div>
                        <div className="flex-grow-1 ms-3">
                            <div className="d-flex justify-content-between">
                                <strong>{item.title}</strong>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>${item.price}</span>
                                <button type="button" onClick={()=>delProduct(item)} className="btn btn-danger btn-sm rounded-circle"><i className="bi bi-trash"></i></button>
                            </div>
                        </div>
                    </div>
                )}
                </Offcanvas.Body>
                <div className="p-3 border-top">
                    <div className="line-height-fixed font-size-sm bg-light p-4 d-flex justify-content-between">
                        <strong>Subtotal</strong> <strong className="ml-auto">$ {subtotal}</strong>
                    </div>
                    <div className="d-grid gap-2 carrito_footer">
                        <button type="button" onClick={cleanCart} className="btn btn-danger" data-bs-dismiss="offcanvas">
                            <i className="bi bi-cart-x-fill"></i> Vaciar carrito
                        </button>
                        <button type="button" className="btn btn-success" data-bs-dismiss="offcanvas">
                            <i className="bi bi-cash"></i> Comprar
                        </button>
                    </div>
                </div>
            </Offcanvas>
    );
}

export default CartComponent;