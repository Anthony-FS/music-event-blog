import { Link } from 'react-router-dom'

import refreshIcon from '../assets/icons/Refresh_light.svg'
import userIcon from '../assets/icons/User_duotone.svg'

function MembersControlPanel({ memberName, activeView }) {
  return (
    <aside className="space-y-8">
      <div className="flex items-center gap-4">
        <img
          src="/images/myphoto.jpg"
          alt=""
          className="h-16 w-16 rounded-full object-cover"
        />
        <p className="text-xl font-bold text-[#75716b]">
          {memberName ?? 'Anthony FS.'}
        </p>
      </div>

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
    </aside>
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
