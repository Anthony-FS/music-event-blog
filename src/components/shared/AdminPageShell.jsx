import { cn } from '../../lib/utils'
import {
  adminContentShellClassName,
  adminFormBodyClassName,
  adminFormShellClassName,
  adminListBodyClassName,
  adminListMessageClassName,
  adminListShellClassName,
  adminListWindowClassName,
} from '../../lib/adminPageStyles'

function AdminPageShell({ variant = 'list', className, children }) {
  const shellClassName = {
    list: adminListShellClassName,
    form: adminFormShellClassName,
    content: adminContentShellClassName,
  }[variant]

  return (
    <section className={cn(shellClassName, className)}>{children}</section>
  )
}

function AdminPageHeader({ title, variant = 'list', actions }) {
  const isForm = variant === 'form'

  return (
    <header
      className={cn(
        'flex shrink-0 min-h-[88px] items-center border-b border-[#dedbd6]',
        actions && 'justify-between gap-4',
        isForm ? 'px-8 py-5 sm:px-16' : 'px-6 py-5 sm:px-10',
      )}
    >
      <h1 className="text-xl font-bold text-[#28241f]">{title}</h1>
      {actions}
    </header>
  )
}

function AdminPageContent({ variant = 'list', className, children }) {
  const bodyClassName = variant === 'form' ? adminFormBodyClassName : adminListBodyClassName

  return <div className={cn(bodyClassName, className)}>{children}</div>
}

function AdminListPanel({
  isLoading,
  error,
  isEmpty,
  loadingMessage,
  emptyMessage,
  children,
}) {
  if (isLoading) {
    return (
      <div className={adminListWindowClassName}>
        <p className={adminListMessageClassName}>{loadingMessage}</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={adminListWindowClassName}>
        <p className={adminListMessageClassName}>{error}</p>
      </div>
    )
  }

  if (isEmpty) {
    return (
      <div className={adminListWindowClassName}>
        <p className={adminListMessageClassName}>{emptyMessage}</p>
      </div>
    )
  }

  return <div className={adminListWindowClassName}>{children}</div>
}

export {
  AdminPageShell,
  AdminPageHeader,
  AdminPageContent,
  AdminListPanel,
}
