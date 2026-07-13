import { X } from 'lucide-react'
import { Link } from 'react-router-dom'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '../ui/alert-dialog'

function AuthRequiredDialog({ open, onOpenChange }) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-[420px] rounded-lg bg-white px-8 py-9 text-center">
        <button
          type="button"
          aria-label="Close login prompt"
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 inline-flex h-7 w-7 items-center justify-center rounded-full text-[#28241f] transition-colors hover:bg-[#f1efeb]"
        >
          <X size={16} strokeWidth={1.8} />
        </button>

        <AlertDialogTitle className="text-3xl font-bold leading-tight text-[#28241f]">
          Create an account to continue
        </AlertDialogTitle>

        <AlertDialogDescription className="sr-only">
          Please create an account or log in before continuing.
        </AlertDialogDescription>

        <Link
          to="/signup"
          className="mx-auto inline-flex h-10 items-center justify-center rounded-full bg-[#28241f] px-8 text-sm font-semibold text-white no-underline!"
        >
          Create account
        </Link>

        <p className="mt-7 text-sm font-medium text-[#75716b]">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-[#28241f] underline">
            Log in
          </Link>
        </p>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AuthRequiredDialog
