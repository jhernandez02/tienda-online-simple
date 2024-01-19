function ButtonComponent(props){
    const { prod, addProduct, delProduct } = props;
    return(
        <>
        {(prod.sold)?(
            <button onClick={()=>delProduct(prod)} className="btn btn-danger">Eliminar</button>
        ):(
            <button onClick={()=>addProduct(prod)} className="btn btn-primary">Agregar</button>
        )}
        </>
    );
}

export default ButtonComponent;