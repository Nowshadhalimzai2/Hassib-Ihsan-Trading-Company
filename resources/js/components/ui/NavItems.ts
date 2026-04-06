import { NavItem } from "@/types";
import { Goal, LayoutGrid, UserPlus, ShoppingBasket, NotepadTextDashed, Package, Receipt } from "lucide-react";

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
        title: 'Transaction',
        href: '/admin/transactions',
        icon: Receipt,
    
    },
     {
        title: 'Orders',
        href: '/admin/orders',
        icon: ShoppingBasket,
    },
    {
        title: 'Payments',
        href: '/admin/payments',
        icon: Receipt,
    
    },
    {
        title: 'Products',
        href: '/admin/products',
        icon: Package ,
    
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
