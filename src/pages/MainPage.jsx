import { useContext, useState, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";
import { CartContext } from "../contexts/CartContext";
import { listProductService, detailProductService } from "../services/ProductService";
import ButtonComponent from "../components/ButtonComponent";
import { Modal, Button, Offcanvas } from 'react-bootstrap';
import Swal from 'sweetalert2';

const initValues = {
    id: "",
    title: "",
    description: "",
    price: 0,
    rating: 0,
    stock: 0,
    brand: "",
    category: "",
    images: [],
};

function MainPage(){

    const {showCart, handleCloseCart} = useContext(AppContext);
    const {carrito, subtotal, agregar, quitar, limpiar} = useContext(CartContext);
    const [showModal, setShowModal] = useState(false);
    const [listProducts, setListProducts] = useState([]);
    const [detailProduct, setDetailProduct] = useState(initValues);

    const handleCloseModal = () => {
        setShowModal(false);
        setDetailProduct(initValues);
    }

    const handleShowModal = () => {
        setShowModal(true);
    }
    
    const listingProducts = async () => {
        const { data } = await listProductService();
        const nLista = data.products.map(item=>{
            return {...item, sold:false}
        })
        setListProducts(nLista);
    }
    
    const getDetailsProduct = async (id) => {
        const { data } = await detailProductService(id);
        setDetailProduct(data);
        handleShowModal();
    }
    
    const handleAddProduct = (prod) => {
        updateList(prod.id, true);
        agregar(prod);
        Swal.fire({
            icon: 'success',
            title: `Hemos agregado ${prod.title} al carrito!`,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#0d6efd'
        });
        
    };

    const handleDelProduct = (prod) => {
        Swal.fire({
            title: `¿Estás seguro de eliminar el producto "${prod.title}" del carrito?`,
            text: "¡Esta acción no se podrá revertir!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#0d6efd",
            cancelButtonColor: "#dc3545",
            confirmButtonText: "¡Sí, eliminar el producto!",
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                updateList(prod.id, false);
                quitar(prod);
                Swal.fire({
                    icon: 'success',
                    text: "¡Producto eliminado!",
                    title: `Hemos eliminado el producto "${prod.title}" del carrito`,
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#0d6efd'
                });
            }
        });
    };

    const handleCleanCart = () => {
        if(carrito.length>0){
            Swal.fire({
                title: "¿Estás seguro de vaciar el carrito?",
                text: "¡Esta acción no se podrá revertir!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#0d6efd",
                cancelButtonColor: "#dc3545",
                confirmButtonText: "¡Sí, limpiar el carrito!",
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    limpiar();
                    Swal.fire({
                        title: "¡Carrito vacío!",
                        text: "Se han eliminado todos los productos del carrito.",
                        icon: "success",
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#0d6efd'
                    });
                }
            });
        }else{
            Swal.fire({
                title: "¡Carrito vacío!",
                text: "No hay productos del carrito.",
                icon: "success",
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d6efd'
            });
        }
    };

    const updateList = (id, value) => {
        const nLista = listProducts.map(item=>{
            if(item.id==id){
                item.sold = value;
            }
            return item;
        });
        setListProducts(nLista);
    }

    useEffect(()=>{
        listingProducts(); 
    }, []);
    
    return(
        <div className="container">
            <h1 className="text-center my-4">Lista de productos</h1>
            <div className="row">
                {listProducts.map(item=>(
                <div key={item.id} className="col-md-3 mb-3 product-card">
                    <div className="card">
                        <img src={item.thumbnail} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text">{item.description}</p>
                            <p className="card-text text-end">S/ {item.price}</p>
                            <div className="d-flex justify-content-between">
                                <button onClick={()=>getDetailsProduct(item.id)} className="btn btn-outline-secondary"><i className="bi bi-search"></i> Vista previa</button>
                                <ButtonComponent prod={item} addProduct={handleAddProduct} delProduct={handleDelProduct}></ButtonComponent>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Body>
                    <div className="text-center">
                        <img src={detailProduct.images[0]} height="200" alt="imagen" />
                    </div>
                    <h4 className="d-flex justify-content-between mt-3">
                        <div>{detailProduct.title}</div>
                        <div>S/ {detailProduct.price}</div>
                    </h4>
                    <p>{detailProduct.description}</p>
                    <h5>Información Adicional</h5>
                    <p>Categoría: {detailProduct.category}</p>
                    <p>Marca: {detailProduct.brand}</p>
                    <p>Puntuación: {detailProduct.rating} ptos</p>
                    <div className="text-end">
                        <Button variant="primary" onClick={()=>handleAddProduct(detailProduct)}>
                            <i className="bi bi-cart-plus-fill"></i> Agregar
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

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
                                <button type="button" onClick={()=>handleDelProduct(item)} className="btn btn-danger btn-sm rounded-circle"><i className="bi bi-trash"></i></button>
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
                        <button type="button" onClick={handleCleanCart} className="btn btn-danger" data-bs-dismiss="offcanvas">
                            <i className="bi bi-cart-x-fill"></i> Vaciar carrito
                        </button>
                        <button type="button" className="btn btn-success" data-bs-dismiss="offcanvas">
                            <i className="bi bi-cash"></i> Comprar
                        </button>
                    </div>
                </div>
            </Offcanvas>
        </div>
    );
}

export default MainPage;