import { useState } from "react";
import { useDialogShowAnim } from "../hooks/useDialogAni";
import type { BaseProps } from "../types";
import { ModalId } from "../constant";
import { useEffectOnce } from "../../hooks/ustEffectOnce";

interface IProps extends BaseProps {
    addItem: (title: string, content: string) => void
}

const CreateReviewItem = (props: IProps) => {
    const { close, addItem } = props;
    const { showAnim, hideAnim } = useDialogShowAnim(ModalId.createReview);

    useEffectOnce(showAnim);

    const [inputTitle, setInputTitle] = useState('');
    const [inputContent, setInputContent] = useState('');

    const onConfirmCreate = () => {
        if (!inputTitle || !inputContent) {
            return;
        }
        addItem(inputTitle, inputContent);
        onClose();
    };

    const onClose = () => {
        hideAnim(close);
    };

    return (
        <dialog id={ModalId.createReview} className="modal">
            <div className="modal-box w-3/4 max-w-5xl">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
                <h3 className="font-bold text-lg">New review plan</h3>
                <input type="text" placeholder="Title" className="input mt-4 w-full" onChange={e => setInputTitle(e.target.value)} />
                <textarea placeholder="Content" className="textarea block mt-4 w-full min-h-16 max-h-64" onChange={e => setInputContent(e.target.value)}></textarea>
                <div className="modal-action">
                    <button className={`btn btn-outline btn-success ${(inputTitle && inputContent) ? '':'btn-disabled'}`} onClick={onConfirmCreate}>Confirm</button>
                </div>
            </div>
        </dialog>
    );
};

export default CreateReviewItem;