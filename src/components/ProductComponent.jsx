import ButtonComponent from './ButtonComponent';

function ProductComponent(props){
    const { prod, detailsProduct, addProduct, delProduct } = props;
    return(
        <div className="col-md-3 mb-3 product-card">
            <div className="card">
                <img src={prod.thumbnail} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{prod.title}</h5>
                    <p className="card-text">{prod.description}</p>
                    <p className="card-text text-end">S/ {prod.price}</p>
                    <div className="d-flex justify-content-between">
                        <button onClick={()=>{detailsProduct(prod.id, prod.sold)}} className="btn btn-outline-secondary">
                            <i className="bi bi-search"></i> Vista previa
                        </button>
                        <ButtonComponent icon={false} sold={prod.sold} prod={prod} addProduct={addProduct} delProduct={delProduct} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductComponent;