function FormField({ label, htmlFor, error, errorId, children, className = '' }) {
  const LabelWrapper = htmlFor ? 'label' : 'div'
  const wrapperClassName = htmlFor
    ? `block ${className}`.trim()
    : className

  return (
    <LabelWrapper htmlFor={htmlFor} className={wrapperClassName || undefined}>
      <span className="mb-2 block text-sm font-medium text-[#75716b]">
        {label}
      </span>
      {children}
      {error && (
        <p id={errorId} className="mt-2 text-xs font-semibold text-red-600">
          {error}
        </p>
      )}
    </LabelWrapper>
  )
}

export default FormField
