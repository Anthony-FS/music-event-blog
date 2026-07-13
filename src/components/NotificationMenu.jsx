import bellIcon from '../assets/icons/Bell_light.svg'
import { mockNotifications } from '../data/notifications'

function NotificationMenu({ isOpen, onToggle }) {
  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Notifications"
        aria-expanded={isOpen}
        aria-controls="notification-menu"
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full! border border-[#dedbd6] bg-white transition-colors hover:bg-[#eeece8]!"
        onClick={onToggle}
      >
        <img src={bellIcon} alt="" className="h-4 w-4" aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          id="notification-menu"
          className="absolute right-0 top-[calc(100%+0.75rem)] z-50 flex w-[280px] flex-col items-stretch overflow-hidden rounded-lg border border-[#dedbd6] bg-white py-2 text-left shadow-lg"
        >
          {mockNotifications.map((notification) => (
            <NotificationMenuItem
              key={notification.id}
              title={notification.title}
              message={notification.message}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function NotificationMenuItem({ title, message }) {
  return (
    <div className="px-4 py-3 text-[#43403b] transition-colors hover:bg-[#f6f5f2]">
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-xs font-medium leading-relaxed text-[#75716b]">
        {message}
      </p>
    </div>
  )
}

export default NotificationMenu
