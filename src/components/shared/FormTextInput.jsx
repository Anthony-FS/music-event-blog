import FormField from './FormField'
import { adminInputClassName, authInputClassName } from '../../lib/formStyles'
import { cn } from '../../lib/utils'

function FormTextInput({
  id,
  label,
  name,
  type = 'text',
  value,
  placeholder,
  error,
  onChange,
  variant = 'admin',
  className,
  ...props
}) {
  const errorId = error ? `${id}-error` : undefined
  const baseClassName =
    variant === 'auth' ? authInputClassName : adminInputClassName

  return (
    <FormField
      label={label}
      htmlFor={id}
      error={error}
      errorId={errorId}
    >
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        className={cn(baseClassName, className)}
        {...props}
      />
    </FormField>
  )
}

export default FormTextInput
