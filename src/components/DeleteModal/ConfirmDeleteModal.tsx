import React from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { ModalContainer, WarningIcon, ModalText, ModalDescription, ModalFooter, CustomModal, CancelButton, DeleteButton } from "./ConfirmDeleteModal.styled";

interface ConfirmDeleteModalProps {
    visible: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ visible, onCancel, onConfirm }) => {
    return (
        <CustomModal
            open={visible}
            onCancel={onCancel}
            footer={null}
            centered
            closable={true}
        >
            <ModalContainer>
                <WarningIcon>
                    <ExclamationCircleOutlined />
                </WarningIcon>
                <ModalText>Are you sure?</ModalText>
                <ModalDescription>
                    This action cannot be undone. All values associated with this field will be lost.
                </ModalDescription>
                <ModalFooter>
                    <DeleteButton type="primary" danger block onClick={onConfirm}>
                        Delete field
                    </DeleteButton>
                    <CancelButton block onClick={onCancel}>
                        Cancel
                    </CancelButton>
                </ModalFooter>
            </ModalContainer>
        </CustomModal>
    );
};

export default ConfirmDeleteModal;
