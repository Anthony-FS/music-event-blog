import { X } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '../ui/alert-dialog'

function ConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  showCloseButton = true,
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-[420px] rounded-lg bg-white px-8 py-8 text-center">
        {showCloseButton && (
          <button
            type="button"
            aria-label="Close confirmation dialog"
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 inline-flex h-7 w-7 items-center justify-center rounded-full text-[#28241f] transition-colors hover:bg-[#f1efeb]"
          >
            <X size={16} strokeWidth={1.8} />
          </button>
        )}

        <AlertDialogTitle className="text-2xl font-bold text-[#28241f]">
          {title}
        </AlertDialogTitle>
        <AlertDialogDescription className="text-sm font-medium leading-relaxed text-[#75716b]">
          {description}
        </AlertDialogDescription>
        <div className="mt-1 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            className="h-10 rounded-full! border border-[#28241f] bg-white px-6 text-sm font-semibold text-[#28241f] transition-colors hover:bg-[#f6f5f2]"
            onClick={() => onOpenChange(false)}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className="h-10 rounded-full! bg-[#28241f] px-6 text-sm font-semibold text-white transition-colors hover:bg-black"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmDialog
