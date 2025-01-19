import { NavLink } from 'react-router-dom'

interface SidebarMenuItemProps {
  to: string
  icon: string
  title: string
  description: string
}

export const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  to,
  title,
  icon,
  description,
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? 'flex justify-center items-center bg-gray-800 rounded-md p-2 transition-color'
          : 'flex justify-center items-center hover:bg-gray-800 rounded-md p-2 transition-color'
      }
    >
      <i className={`${icon} text-2xl mr-4 text-indigo-400`} />
      <div className="flex flex-col flex-grow">
        <span className="text-white text-lg font-semibold">{title}</span>
        <span className="text-gray-400 text-sm">{description}</span>
      </div>
    </NavLink>
  )
}
