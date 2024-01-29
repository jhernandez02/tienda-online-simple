import { useContext, useState, useEffect } from "react";
import { CartContext } from "../contexts/CartContext";
import { listProductService, detailProductService } from "../services/ProductService";
import ProductComponent from "../components/ProductComponent";
import CartComponent from "../components/CartComponent";
import ModalComponent from "../components/ModalComponent";
import { Spinner } from 'react-bootstrap';
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
    sold: 0,
};

function MainPage(){
    const {carrito, agregar, quitar, limpiar} = useContext(CartContext);
    const [showModal, setShowModal] = useState(false);
    const [soldProduct, setSoldProduct] = useState(0);
    const [listProducts, setListProducts] = useState([]);
    const [detailProduct, setDetailProduct] = useState(initValues);

    const handleCloseModal = () => {
        setShowModal(false);
        setSoldProduct(0);
        setDetailProduct(initValues);
    }

    const handleShowModal = () => {
        setShowModal(true);
    }
    
    const listingProducts = async () => {
        const { data } = await listProductService();
        const nLista = data.products.map(item=>{
            return {...item, sold:0}
        })
        setListProducts(nLista);
    }
    
    const getDetailsProduct = async (id, sold) => {
        const { data } = await detailProductService(id);
        data.sold = sold;
        setDetailProduct(data);
        setSoldProduct(sold);
        handleShowModal();
    }
    
    const handleAddProduct = (prod) => {
        if(!prod.sold){
            updateListProducts(prod.id, 1);
            setSoldProduct(1);
            agregar(prod);
            Swal.fire({
                icon: 'success',
                title: `Hemos agregado ${prod.title} al carrito!`,
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d6efd'
            });
        }
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
                updateListProducts(prod.id, 0);
                setSoldProduct(0);
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
                    const nLista = listProducts.map(item=>{
                        return {...item, sold:0}
                    })
                    setListProducts(nLista);
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

    const updateListProducts = (id, value) => {
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
            {listProducts.length>0 ? (
                listProducts.map(item=>(
                <ProductComponent 
                    key={item.id} 
                    prod={item} 
                    detailsProduct = {getDetailsProduct} 
                    addProduct={handleAddProduct} 
                    delProduct={handleDelProduct} 
                />
                ))
            ) : (
                <div className="text-center">
                    <Spinner animation="border" />
                    <p>Cargando...</p>
                </div>
            )}
            </div>

            <ModalComponent 
                show={showModal} 
                onHide={handleCloseModal} 
                prod={detailProduct} 
                sold={soldProduct}
                addProduct={handleAddProduct} 
                delProduct={handleDelProduct} 
            />

            <CartComponent 
                delProduct={handleDelProduct} 
                cleanCart={handleCleanCart} 
            />
        </div>
    );
}

export default MainPage;