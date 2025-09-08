import { useDialogShowAnim } from "../hooks/useDialogAni";
import type { BaseProps } from "../types";
import { ModalId } from "../constant";
import { useEffectOnce } from "../../hooks/ustEffectOnce";

interface IProps extends BaseProps {
    finishReview: VoidFunction
}

const ConfirmFinish = (props: IProps) => {
    const { finishReview, close } = props;
    const { showAnim, hideAnim } = useDialogShowAnim(ModalId.confirmFinish);
    useEffectOnce(showAnim);

    const onClose = () => {
        hideAnim(close);
    };

    const onFinish = () => {
        finishReview();
        onClose();
    };

    return (
        <dialog id={ModalId.confirmFinish} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Confirm finish</h3>
                <p className="py-4">Make sure you handle the knowledge</p>
                <div className="modal-action">
                    <button className='btn btn-outline btn-success' onClick={onFinish}>Confirm</button>
                    <button className='btn btn-outline' onClick={onClose}>Cancel</button>
                </div>
            </div>
        </dialog>
    );
};

export default ConfirmFinish;