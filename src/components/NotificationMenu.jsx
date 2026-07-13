import bellIcon from '../assets/icons/Bell_light.svg'
import {
  getNotificationActionParts,
  mockNotifications,
} from '../data/notifications'

function NotificationMenu({ isOpen, onToggle }) {
  const hasNotifications = mockNotifications.length > 0

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={
          hasNotifications
            ? `Notifications, ${mockNotifications.length} new`
            : 'Notifications'
        }
        aria-expanded={isOpen}
        aria-controls="notification-menu"
        className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full! border border-[#dedbd6] bg-white transition-colors hover:bg-[#eeece8]!"
        onClick={onToggle}
      >
        <img src={bellIcon} alt="" className="h-4 w-4" aria-hidden="true" />
        {hasNotifications && (
          <span
            className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"
            aria-hidden="true"
          />
        )}
      </button>

      {isOpen && (
        <div
          id="notification-menu"
          className="absolute right-0 top-[calc(100%+0.75rem)] z-50 flex w-[300px] flex-col gap-1.5 rounded-lg border border-[#dedbd6] bg-white p-1.5 text-left shadow-lg"
        >
          {mockNotifications.map((notification) => (
            <NotificationMenuItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function NotificationMenuItem({ notification }) {
  const { firstLine, secondLine } = getNotificationActionParts(notification.type)

  return (
    <div className="flex items-center gap-2.5 rounded-lg bg-[#f6f5f2] px-2.5 py-2">
      <img
        src={notification.avatarUrl}
        alt=""
        className="h-8 w-8 shrink-0 rounded-full object-cover"
      />

      <div className="min-w-0 space-y-0.5">
        <p className="m-0 text-sm leading-snug text-[#28241f]">
          <span className="font-bold">{notification.userName}</span>{' '}
          <span className="font-medium text-[#75716b]">{firstLine}</span>
        </p>
        <p className="m-0 text-sm font-medium leading-snug text-[#75716b]">
          {secondLine}
        </p>
        <p className="m-0 text-xs font-medium leading-snug text-[#ffae88]">
          {notification.timeAgo}
        </p>
      </div>
    </div>
  )
}

export default NotificationMenu
