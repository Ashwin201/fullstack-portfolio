"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from "@/components/ui/sidebar"

export function NavMain({
    items,
}: {
    items: {
        title: string
        url: string
        icon?: any
        isActive?: boolean
        items?: {
            title: string
            url: string
        }[]
    }[]
}) {

    const { open } = useSidebar()
    return (
        <SidebarGroup>
            <SidebarGroupLabel className=" text-sm mb-2 font-medium "> Links</SidebarGroupLabel>
            <SidebarMenu className=" flex flex-col gap-2">
                {items.map((item) => (
                    <Collapsible
                        key={item.title}
                        asChild
                        defaultOpen={item.isActive}
                        className="group/collapsible"
                    >
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <a href={item.url} className={`${open && "py-1 px-2"} flex gap-2 text-[14.5px] font-medium  items-center`}>
                                    <SidebarMenuButton tooltip={item.title} className={`${!open && "-ml-3"}`}>
                                        {item.icon && item.icon}
                                        {
                                            open &&
                                            <span>{item.title}</span>
                                        }
                                        {/* <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" /> */}
                                    </SidebarMenuButton>
                                </a>
                            </CollapsibleTrigger>

                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
