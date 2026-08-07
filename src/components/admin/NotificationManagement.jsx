import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import {
  getNotificationActionText,
  getNotifications,
  markNotificationsRead,
} from '../../services/notificationService'
import {
  AdminPageHeader,
  AdminPageShell,
} from '../shared/AdminPageShell'

function NotificationManagement() {
  const [notifications, setNotifications] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true

    async function loadNotifications() {
      try {
        setIsLoading(true)
        const result = await getNotifications()

        if (isActive) {
          setNotifications(result.notifications)
          setError('')
        }

        if (result.unreadCount > 0) {
          await markNotificationsRead()
        }
      } catch (loadError) {
        if (isActive) {
          setError(loadError.message)
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    loadNotifications()

    return () => {
      isActive = false
    }
  }, [])

  return (
    <AdminPageShell variant="content">
      <AdminPageHeader title="Notification" />

      <div className="min-h-0 flex-1 divide-y divide-[#dedbd6] border-b border-[#dedbd6]">
        {isLoading && (
          <p className="px-6 py-8 text-sm font-semibold text-[#75716b] sm:px-10">
            Loading notifications...
          </p>
        )}
        {!isLoading && error && (
          <p className="px-6 py-8 text-sm font-semibold text-red-600 sm:px-10">
            {error}
          </p>
        )}
        {!isLoading && !error && notifications.length === 0 && (
          <p className="px-6 py-8 text-sm font-semibold text-[#75716b] sm:px-10">
            No notifications yet.
          </p>
        )}
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
    </AdminPageShell>
  )
}

function NotificationItem({ notification }) {
  const actionText = getNotificationActionText(notification.type)

  return (
    <article className="flex items-start justify-between gap-6 px-6 py-6 sm:px-10">
      <div className="flex min-w-0 flex-1 gap-4">
        <img
          src={notification.avatarUrl}
          alt=""
          className="h-11 w-11 shrink-0 rounded-full object-cover"
        />

        <div className="min-w-0 space-y-1">
          <p className="text-sm font-medium leading-relaxed text-[#28241f]">
            <span className="font-bold">{notification.userName}</span>{' '}
            {actionText}
          </p>
          <p className="text-sm font-medium leading-relaxed text-[#28241f]">
            {notification.articleTitle}
          </p>
          {notification.comment && (
            <p className="text-sm font-medium leading-relaxed text-[#75716b]">
              &ldquo;{notification.comment}&rdquo;
            </p>
          )}
          <p className="pt-1 text-sm font-medium text-[#ffae88]">
            {notification.timeAgo}
          </p>
        </div>
      </div>

      <Link
        to={`/article/${notification.articleId}`}
        className="shrink-0 pt-1 text-sm font-semibold text-[#28241f]! underline underline-offset-4 transition-colors visited:text-[#28241f]! hover:text-black!"
      >
        View
      </Link>
    </article>
  )
}

export default NotificationManagement
