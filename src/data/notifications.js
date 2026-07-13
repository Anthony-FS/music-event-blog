export const mockNotifications = [
  {
    id: 1,
    type: 'comment',
    userName: 'Jacob Lash',
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    articleTitle:
      'The Fascinating World of Cats: Why We Love Our Furry Friends',
    articleId: 2,
    comment:
      'I loved this article! It really explains why cats make such amazing pets.',
    timeAgo: '4 hours ago',
  },
  {
    id: 2,
    type: 'like',
    userName: 'Jacob Lash',
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    articleTitle:
      'The Fascinating World of Cats: Why We Love Our Furry Friends',
    articleId: 2,
    timeAgo: '4 hours ago',
  },
]

export function getNotificationActionText(type) {
  if (type === 'comment') {
    return 'Commented on your article:'
  }

  return 'liked your article:'
}

export function getNotificationActionParts(type) {
  if (type === 'comment') {
    return {
      firstLine: 'Commented on',
      secondLine: 'your article.',
    }
  }

  return {
    firstLine: 'liked',
    secondLine: 'your article.',
  }
}
