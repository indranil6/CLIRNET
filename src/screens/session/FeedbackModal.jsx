import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import closeIcon from '../../images/responsive-icon-active.png';
import StarRating from './StarRating.jsx'

export default function FeedbackModal({ data, onCloseModal }) {
    const [modalVisibility, setModalVisibility] = useState(true);

    useEffect(() => {

    }, [data])

    return (
        <div>
            <Modal id="root-modal" backdrop={'static'} keyboard={false} className="in feedbackModal" centered="true" animation="slide" show={modalVisibility} onHide={() => { setModalVisibility(false) }}>
                <Modal.Header className="align-items-center justify-content-between">
                    <Modal.Title className="font600 font_16px colorBlack">Please Share Your Experience</Modal.Title>
                    <a href="javascript:void(0)" className="radius-100 dicussRefferDtlsPopclose" variant="secondary" onClick={() => { setModalVisibility(false); onCloseModal() }}> <img src={closeIcon} />
                    </a>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                    <StarRating />
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

