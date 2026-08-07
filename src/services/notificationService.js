import api from '../lib/axios'
import { DEFAULT_MEMBER_AVATAR_URL } from '../lib/avatar'

export async function getNotifications() {
  try {
    const { data } = await api.get('/notifications')
    return {
      notifications: (data.notifications ?? []).map(normalizeNotification),
      unreadCount: Number(data.unreadCount ?? 0),
    }
  } catch (error) {
    throw new Error(
      error.response?.data?.message ?? 'Unable to load notifications.',
      { cause: error },
    )
  }
}

export async function markNotificationsRead() {
  try {
    await api.patch('/notifications/read')
  } catch (error) {
    throw new Error(
      error.response?.data?.message ?? 'Unable to update notifications.',
      { cause: error },
    )
  }
}

export function getNotificationActionText(type) {
  return type === 'comment'
    ? 'commented on your article:'
    : 'liked your article:'
}

export function getNotificationActionParts(type) {
  return type === 'comment'
    ? { firstLine: 'commented on', secondLine: 'your article.' }
    : { firstLine: 'liked', secondLine: 'your article.' }
}

function normalizeNotification(notification) {
  return {
    id: Number(notification.id),
    type: notification.type,
    isRead: Boolean(notification.isRead),
    createdAt: notification.createdAt,
    articleId: Number(notification.articleId),
    articleTitle: notification.articleTitle ?? '',
    userName: notification.userName ?? 'Member',
    avatarUrl: notification.avatarUrl || DEFAULT_MEMBER_AVATAR_URL,
    comment: notification.comment ?? '',
    timeAgo: formatTimeAgo(notification.createdAt),
  }
}

function formatTimeAgo(value) {
  const timestamp = new Date(value).getTime()

  if (!Number.isFinite(timestamp)) {
    return ''
  }

  const elapsedSeconds = Math.max(
    0,
    Math.floor((Date.now() - timestamp) / 1000),
  )

  if (elapsedSeconds < 60) return 'Just now'

  const elapsedMinutes = Math.floor(elapsedSeconds / 60)
  if (elapsedMinutes < 60) {
    return `${elapsedMinutes} minute${elapsedMinutes === 1 ? '' : 's'} ago`
  }

  const elapsedHours = Math.floor(elapsedMinutes / 60)
  if (elapsedHours < 24) {
    return `${elapsedHours} hour${elapsedHours === 1 ? '' : 's'} ago`
  }

  const elapsedDays = Math.floor(elapsedHours / 24)
  return `${elapsedDays} day${elapsedDays === 1 ? '' : 's'} ago`
}
