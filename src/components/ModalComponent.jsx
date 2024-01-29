import { Modal, Button } from 'react-bootstrap';
import ButtonComponent from './ButtonComponent';

function ModalComponent(props){
    const { show, onHide, prod, sold, addProduct, delProduct } = props;
    const handleAddProduct = () => {
        addProduct(prod);
    }
    const handleDelProduct = () => {
        delProduct(prod);
    }
    const handleClose = () => {
        onHide();
    }
    return(
        <Modal show={show} onHide={onHide}>
            <Modal.Body>
                <div className="text-center">
                    <img src={prod.images[0]} height="200" alt="imagen" />
                </div>
                <h4 className="d-flex justify-content-between mt-3">
                    <div>{prod.title}</div>
                    <div>S/ {prod.price}</div>
                </h4>
                <p>{prod.description}</p>
                <h5>Información Adicional</h5>
                <p>Categoría: {prod.category}</p>
                <p>Marca: {prod.brand}</p>
                <p>Puntuación: {prod.rating} ptos</p>
                <div className="text-end">
                    <ButtonComponent icon={true} sold={sold} prod={prod} addProduct={handleAddProduct} delProduct={handleDelProduct} />
                    <Button onClick={handleClose} variant="secondary" className='ms-2'>Cancelar</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default ModalComponent;