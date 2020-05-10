import React from "react";
import Modal from "react-awesome-modal";

import "./styles.css";

const SynonymModal = ({isModalOpen, closeModal, synonym, setSynonym, synonymList}) => {
    return (
        <Modal visible={isModalOpen} width="400" height="300" effect="fadeInUp" onClick={closeModal}>
            <div className="modal">
                <label>Choose your favorite synonym for your phrase</label>
                <select value={synonym} onChange={setSynonym}>
                    <option value="" key="">select</option>
                    {
                        synonymList.map((item, idx) => <option key={idx} value={item.word}>{item.word}</option>)
                    }
                </select>
                <button onClick={closeModal}>Close</button>
            </div>
        </Modal>
    )
}

export default SynonymModal;