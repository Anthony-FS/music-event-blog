import { Link } from 'react-router-dom'

import bellIcon from '../../assets/icons/Bell_light.svg'
import fileIcon from '../../assets/icons/File_light.svg'
import folderIcon from '../../assets/icons/Img_box_light.svg'
import logo from '../../assets/icons/logo.svg'
import websiteIcon from '../../assets/icons/Out_light.svg'
import refreshIcon from '../../assets/icons/Refresh_light.svg'
import signOutIcon from '../../assets/icons/Sign_out_squre_light.svg'
import userIcon from '../../assets/icons/User_duotone.svg'

const adminLinks = [
  { id: 'articles', label: 'Article management', icon: fileIcon },
  { id: 'categories', label: 'Category management', icon: folderIcon },
  { id: 'profile', label: 'Profile', icon: userIcon },
  { id: 'notifications', label: 'Notification', icon: bellIcon },
  { id: 'reset-password', label: 'Reset password', icon: refreshIcon },
]

function AdminControlPanel({ activeView, onViewChange, onLogOut }) {
  return (
    <aside className="flex min-h-screen w-[300px] shrink-0 flex-col bg-[#f0f0f0]">
      <div className="px-6 py-8">
        <Link to="/" aria-label="Home" className="inline-flex items-center">
          <img src={logo} alt="meb" className="h-12 w-16" />
        </Link>
        <p className="mt-3 text-sm font-bold text-[#ffae88]">Admin panel</p>
      </div>

      <nav
        aria-label="Admin settings"
        className="flex flex-1 flex-col gap-1 px-3"
      >
        {adminLinks.map((link) => (
          <AdminSideButton
            key={link.id}
            icon={link.icon}
            label={link.label}
            isActive={activeView === link.id}
            onClick={() => onViewChange(link.id)}
          />
        ))}
      </nav>

      <div className="mt-auto border-t border-[#dedbd6] px-3 py-5">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-[#28241f]! no-underline! transition-colors visited:text-[#28241f]! hover:bg-[#e8e8e8]/60"
        >
          <img
            src={websiteIcon}
            alt=""
            className="h-4 w-4"
            aria-hidden="true"
          />
          <span>meb website</span>
        </Link>
        <button
          type="button"
          onClick={onLogOut}
          className="flex! w-full items-center justify-start! gap-3 rounded-lg px-3 py-2.5 text-left! text-sm font-semibold text-[#28241f] transition-colors hover:bg-[#e8e8e8]/60"
        >
          <img src={signOutIcon} alt="" className="h-4 w-4" aria-hidden="true" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  )
}

function AdminSideButton({ icon, label, isActive = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex! w-full items-center justify-start! gap-3 rounded-lg px-3 py-2.5 text-left! text-sm transition-colors ${
        isActive
          ? 'border-r-2 border-[#dedbd6] bg-[#e8e8e8] font-bold text-[#28241f]'
          : 'font-semibold text-[#28241f] hover:bg-[#e8e8e8]/60'
      }`}
    >
      <img src={icon} alt="" className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span className="whitespace-nowrap">{label}</span>
    </button>
  )
}

export default AdminControlPanel
