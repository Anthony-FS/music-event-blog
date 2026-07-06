import { NavigationMenu as NavigationMenuPrimitive } from 'radix-ui'

import { cn } from '../../lib/utils'

function NavigationMenu({ className, ...props }) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      className={cn('relative z-10 flex max-w-max flex-1 items-center justify-center', className)}
      {...props}
    />
  )
}

function NavigationMenuList({ className, ...props }) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn('group flex flex-1 list-none items-center justify-center', className)}
      {...props}
    />
  )
}

function NavigationMenuItem({ className, ...props }) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn('relative', className)}
      {...props}
    />
  )
}

function NavigationMenuTrigger({ className, ...props }) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={className}
      {...props}
    />
  )
}

function NavigationMenuContent({ className, ...props }) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={className}
      {...props}
    />
  )
}

function NavigationMenuLink({ className, ...props }) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={className}
      {...props}
    />
  )
}

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
}
