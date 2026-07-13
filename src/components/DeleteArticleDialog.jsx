import { X } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from './ui/alert-dialog'

function DeleteArticleDialog({ open, onOpenChange, onConfirm }) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-[420px] rounded-lg bg-white px-8 py-8 text-center">
        <button
          type="button"
          aria-label="Close delete confirmation"
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 inline-flex h-7 w-7 items-center justify-center rounded-full text-[#28241f] transition-colors hover:bg-[#f1efeb]"
        >
          <X size={16} strokeWidth={1.8} />
        </button>

        <AlertDialogTitle className="text-2xl font-bold text-[#28241f]">
          Delete article
        </AlertDialogTitle>
        <AlertDialogDescription className="text-sm font-medium leading-relaxed text-[#75716b]">
          Do you want to delete this article?
        </AlertDialogDescription>
        <div className="mt-1 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            className="h-10 rounded-full! border border-[#28241f] bg-white px-6 text-sm font-semibold text-[#28241f] transition-colors hover:bg-[#f6f5f2]"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="h-10 rounded-full! bg-[#28241f] px-6 text-sm font-semibold text-white transition-colors hover:bg-black"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteArticleDialog
