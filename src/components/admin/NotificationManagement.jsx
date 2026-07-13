import { Link } from 'react-router-dom'

import {
  getNotificationActionText,
  mockNotifications,
} from '../../data/notifications'
import {
  AdminPageHeader,
  AdminPageShell,
} from '../shared/AdminPageShell'

function NotificationManagement() {
  return (
    <AdminPageShell variant="content">
      <AdminPageHeader title="Notification" />

      <div className="min-h-0 flex-1 divide-y divide-[#dedbd6] border-b border-[#dedbd6]">
        {mockNotifications.map((notification) => (
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
