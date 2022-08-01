import { Modal, Button } from 'react-bootstrap';
import {useRef, useState } from 'react';


const ModalForm = (props) => {

    const usernameRef = useRef();

    const [show, setShow] = useState(true);

    const handleSave = () => {
        if(usernameRef.current.value.length > 0) {
            props.setUsername(usernameRef.current.value);
            setShow(false);
         }
    }

    return (
        <Modal show={show} onHide={() => {}}>
            <Modal.Header> 
                <Modal.Title>Enter username</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input ref={usernameRef} type="text" id="username" />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button> 
            </Modal.Footer>
        </Modal>
    );
}

export default ModalForm;