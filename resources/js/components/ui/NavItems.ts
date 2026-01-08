import { NavItem } from "@/types";
import { Goal, HandHelping, LayoutGrid, UserPlus, ShoppingBasket, NotepadTextDashed } from "lucide-react";

export const customerNavItems: NavItem[] = [
    {
        title: 'Customer Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'My Orders',
        href: '/customer/orders',
        icon: LayoutGrid,
    },
    {
        title: 'My Payments',
        href: '/customer/payments',
        icon: LayoutGrid,
    },
];
export const employeeNavItems: NavItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin/dashboard',
        icon: LayoutGrid,
    },
     {
        title: 'Registerations',
        href: '/admin/register-user',
        icon: UserPlus,
    },
     {
        title: 'Transactions',
        href: '/admin/transactions',
        icon: HandHelping,
    },
     {
        title: 'Orders',
        href: '/admin/orders',
        icon: ShoppingBasket,
    },
    {
        title: 'Product',
        href: '/admin/products',
        icon: ShoppingBasket,
    },
    {
        title: 'Notification',
        href: '/admin/notifications',
        icon: NotepadTextDashed,
    },
];
export const investorNavItems: NavItem[] = [
    {
        title: 'Investor Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Transactions',
        href: '/investor_transactions',
        icon: Goal,
    },
];
export const tellerNavItems: NavItem[] = [
    {
        title: 'Teller Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    
];

export const vendorNavItems: NavItem[] = [
    {
        title: 'Vendor Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    
];
