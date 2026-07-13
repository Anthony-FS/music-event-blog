import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'

function SignUpSuccessCard() {
  return (
    <div className="flex w-full max-w-[700px] flex-col items-center rounded-lg bg-[#f6f5f2] px-6 py-16 text-center sm:px-16 sm:py-20">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#28b47e]">
        <Check className="h-8 w-8 text-white" strokeWidth={2.5} />
      </div>

      <h1 className="mt-4 text-2xl font-bold text-[#28241f] sm:text-3xl">
        Registration success
      </h1>

      <Link
        to="/login"
        className="mt-10 inline-flex h-11 min-w-[124px] items-center justify-center rounded-full! bg-[#28241f] px-8 text-sm font-semibold text-white no-underline! transition-colors hover:bg-black"
      >
        Continue
      </Link>
    </div>
  )
}

export default SignUpSuccessCard
