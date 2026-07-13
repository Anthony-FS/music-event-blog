import { mockNotifications } from '../data/notifications'

function NotificationManagement() {
  return (
    <section className="min-h-screen min-w-0 bg-[#f9f9f9]">
      <header className="flex min-h-[88px] items-center border-b border-[#dedbd6] px-6 py-5 sm:px-10">
        <h1 className="text-xl font-bold text-[#28241f]">Notification</h1>
      </header>

      <div className="px-6 py-8 sm:px-10">
        <div className="overflow-hidden rounded-lg border border-[#dedbd6] bg-white">
          {mockNotifications.map((notification, index) => (
            <article
              key={notification.id}
              className={`px-6 py-5 ${
                index % 2 === 1 ? 'bg-[#f5f5f5]' : 'bg-white'
              } ${index > 0 ? 'border-t border-[#dedbd6]' : ''}`}
            >
              <h2 className="text-sm font-bold text-[#28241f]">
                {notification.title}
              </h2>
              <p className="mt-1 text-sm font-medium text-[#75716b]">
                {notification.message}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NotificationManagement
