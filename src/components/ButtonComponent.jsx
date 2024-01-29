function ButtonComponent(props){
    const { icon, sold, prod, addProduct, delProduct } = props;
    const handleAddProduct = () => {
        addProduct(prod);
    }
    const handleDelProduct = () => {
        delProduct(prod);
    }
    return(
        <>
        {(sold)?(
            <button onClick={handleDelProduct} className="btn btn-danger">{icon && <i className="bi bi-cart-dash-fill"></i>} Eliminar</button>
        ):(
            <button onClick={handleAddProduct} className="btn btn-primary">{icon && <i className="bi bi-cart-plus-fill"></i>} Agregar</button>
        )}
        </>
    );
}

export default ButtonComponent;