import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder } from 'lucide-react';
import AppLogo from './app-logo';
import { customerNavItems, employeeNavItems, investorNavItems, tellerNavItems, vendorNavItems } from './ui/NavItems';

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const mainNavItems: NavItem[] = [];
    // every user's accessable items based on their role.

    //===========================     the role items are defined in NavItems.tsx   ===========
    const role = (usePage().props.user as { role: { name: string } }).role.name; // ROLE NAME EXTRACTION

    if (role === 'customer') {
        mainNavItems.push(...customerNavItems);
    } else if (role === 'employee') {
        mainNavItems.push(...employeeNavItems);
    } else if (role === 'investor') {
        mainNavItems.push(...investorNavItems);
    } else if (role === 'teller') {
        mainNavItems.push(...tellerNavItems);
    } else if (role === 'vendor') {
        mainNavItems.push(...vendorNavItems);
    }
    // Debugging line to check the current URL
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavUser />
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
            </SidebarFooter>
        </Sidebar>
    );
}
