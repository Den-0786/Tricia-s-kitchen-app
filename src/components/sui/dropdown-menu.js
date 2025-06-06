'use client'

import React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import  {cn}  from 'lib/utils' 

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuContent = React.forwardRef(
    ({ className, sideOffset = 4, ...props }, ref) => (
        <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
            ref={ref}
            sideOffset={sideOffset}
            className={cn(
            'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-gray-800 border-gray-700 p-1 shadow-md',
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
            'data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            className
            )}
            {...props}
        />
        </DropdownMenuPrimitive.Portal>
    )
    )
    DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

    const DropdownMenuItem = React.forwardRef(
    ({ className, inset, ...props }, ref) => (
        <DropdownMenuPrimitive.Item
        ref={ref}
        className={cn(
            'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
            'transition-colors focus:bg-gray-700 focus:text-white',
            inset && 'pl-8',
            className
        )}
        {...props}
        />
    )
    )
    DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

    export {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    }