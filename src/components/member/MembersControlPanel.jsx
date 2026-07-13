import { Link } from 'react-router-dom'

import bellIcon from '../../assets/icons/Bell_light.svg'
import fileIcon from '../../assets/icons/File_light.svg'
import folderIcon from '../../assets/icons/Img_box_light.svg'
import refreshIcon from '../../assets/icons/Refresh_light.svg'
import userIcon from '../../assets/icons/User_duotone.svg'

const adminLinks = [
  {
    id: 'articles',
    label: 'Article management',
    icon: fileIcon,
  },
  {
    id: 'categories',
    label: 'Category management',
    icon: folderIcon,
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: userIcon,
  },
  {
    id: 'notifications',
    label: 'Notification',
    icon: bellIcon,
  },
  {
    id: 'reset-password',
    label: 'Reset password',
    icon: refreshIcon,
  },
]

function MembersControlPanel({
  memberName,
  avatarUrl,
  activeView,
  isAdmin = false,
  onAdminViewChange,
}) {
  return (
    <aside className="space-y-8">
      <div className="flex items-center gap-4">
        <img
          src={avatarUrl ?? '/images/myphoto.jpg'}
          alt=""
          className="h-16 w-16 rounded-full object-cover"
        />
        <p className="text-xl font-bold text-[#75716b]">
          {memberName ?? 'Anthony FS.'}
        </p>
      </div>

      {isAdmin ? (
        <nav aria-label="Admin settings" className="space-y-4 pl-4">
          {adminLinks.map((link) => (
            <MemberSideButton
              key={link.id}
              icon={link.icon}
              label={link.label}
              isActive={activeView === link.id}
              onClick={() => onAdminViewChange?.(link.id)}
            />
          ))}
        </nav>
      ) : (
        <nav aria-label="Member settings" className="space-y-4 pl-4">
          <MemberSideLink
            icon={userIcon}
            label="Profile"
            href="/member-management"
            isActive={activeView === 'profile'}
          />
          <MemberSideLink
            icon={refreshIcon}
            label="Reset password"
            href="/member-management/reset-password"
            isActive={activeView === 'reset-password'}
          />
        </nav>
      )}
    </aside>
  )
}

function MemberSideButton({ icon, label, isActive = false, onClick }) {
  return (
    <button
      type="button"
      className={`flex w-full items-center gap-3 text-left text-sm text-[#28241f]! transition-colors hover:text-[#28241f]! ${
        isActive ? 'font-bold' : 'font-semibold'
      }`}
      onClick={onClick}
    >
      <img src={icon} alt="" className="h-4 w-4" aria-hidden="true" />
      <span>{label}</span>
    </button>
  )
}

function MemberSideLink({ icon, label, href, isActive = false }) {
  return (
    <Link
      to={href}
      className={`flex items-center gap-3 text-sm text-[#28241f]! no-underline! visited:text-[#28241f]! hover:text-[#28241f]! ${
        isActive ? 'font-bold' : 'font-semibold'
      }`}
    >
      <img src={icon} alt="" className="h-4 w-4" aria-hidden="true" />
      <span>{label}</span>
    </Link>
  )
}

export default MembersControlPanel
