import CreateReviewItem from "./createReviewItem"
import ConfirmFinish from "./confirmFinish"
import ConfirmDelete from "./confirmDelete"
import type { FC } from "react"

export const ModalId = {
    createReview: 'create-review',
    confirmFinish: 'confirm-finish',
    confirmDelete: 'confirm-delete'
}

export const ModalMap: Record<string, FC<any>> = {
    [ModalId.createReview]: CreateReviewItem,
    [ModalId.confirmFinish]: ConfirmFinish,
    [ModalId.confirmDelete]: ConfirmDelete
}
