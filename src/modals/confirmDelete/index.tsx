import { useDialogShowAnim } from "../hooks/useDialogAni";
import { useEffectOnce } from "../../hooks/ustEffectOnce";
import type { BaseProps } from "../types";
import { ModalId } from "../constant";

interface IProps extends BaseProps {
    delReview: VoidFunction
}

const ConfirmDelete = (props: IProps) => {
    const { delReview, close } = props;
    const { showAnim, hideAnim } = useDialogShowAnim(ModalId.confirmDelete)
    useEffectOnce(showAnim)

    const onClose = () => {
        hideAnim(close);
    }

    const onConfirm = () => {
        delReview()
        onClose()
    }

    return (
        <dialog id={ModalId.confirmDelete} className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm delete</h3>
            <p className="py-4">The record can not be restored</p>
            <div className="modal-action">
                <button className='btn btn-outline btn-error' onClick={onConfirm}>Confirm</button>
                <button className='btn btn-outline' onClick={onClose}>Cancel</button>
            </div>
        </div>
        </dialog>
    )
}

export default ConfirmDelete;