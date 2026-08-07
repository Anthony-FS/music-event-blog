import { useEffect, useState } from 'react'

import bellIcon from '../../assets/icons/Bell_light.svg'
import {
  getNotificationActionParts,
  getNotifications,
  markNotificationsRead,
} from '../../services/notificationService'

function NotificationMenu({ isOpen, onToggle }) {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const hasNotifications = notifications.length > 0

  useEffect(() => {
    let isActive = true

    getNotifications()
      .then((result) => {
        if (isActive) {
          setNotifications(result.notifications)
          setUnreadCount(result.unreadCount)
          setError('')
        }
      })
      .catch((loadError) => {
        if (isActive) {
          setError(loadError.message)
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false)
        }
      })

    return () => {
      isActive = false
    }
  }, [])

  useEffect(() => {
    if (!isOpen || unreadCount === 0) {
      return
    }

    markNotificationsRead()
      .then(() => setUnreadCount(0))
      .catch(() => {})
  }, [isOpen, unreadCount])

  async function handleToggle() {
    onToggle()

    if (isOpen) {
      return
    }

    try {
      const result = await getNotifications()
      setNotifications(result.notifications)
      setUnreadCount(result.unreadCount)
      setError('')
    } catch (loadError) {
      setError(loadError.message)
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={
          hasNotifications
            ? `Notifications, ${unreadCount} unread`
            : 'Notifications'
        }
        aria-expanded={isOpen}
        aria-controls="notification-menu"
        className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full! border border-[#dedbd6] bg-white transition-colors hover:bg-[#eeece8]!"
        onClick={handleToggle}
      >
        <img src={bellIcon} alt="" className="h-4 w-4" aria-hidden="true" />
        {unreadCount > 0 && (
          <span
            className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"
            aria-hidden="true"
          />
        )}
      </button>

      {isOpen && (
        <div
          id="notification-menu"
          className="absolute right-0 top-[calc(100%+0.75rem)] z-50 flex w-72 flex-col gap-1.5 rounded-lg border border-[#dedbd6] bg-white p-1.5 text-left shadow-lg sm:w-80"
        >
          {isLoading && (
            <p className="px-3 py-4 text-sm font-medium text-[#75716b]">
              Loading notifications...
            </p>
          )}
          {!isLoading && error && (
            <p className="px-3 py-4 text-sm font-medium text-red-600">{error}</p>
          )}
          {!isLoading && !error && !hasNotifications && (
            <p className="px-4 py-8 text-center text-sm font-medium text-[#75716b]">
              No notifications yet.
            </p>
          )}
          {notifications.map((notification) => (
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
