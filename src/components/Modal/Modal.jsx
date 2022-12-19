import { Modal } from '@mui/material';
import {Overlay, ModalBox, ModalImg} from './Modal.styled';
import PropTypes from 'prop-types';


export const ModalWindow = ({ onHandleClose, url, tags }) => {
    return (
        <Modal open={true} onClose={onHandleClose}>
            <Overlay onClick={onHandleClose}>
            <ModalBox>
                <ModalImg src={url} alt={tags} />
            </ModalBox>
            </Overlay>
        </Modal>
    );
};

ModalWindow.propTypes = {
    onHandleClose: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
};