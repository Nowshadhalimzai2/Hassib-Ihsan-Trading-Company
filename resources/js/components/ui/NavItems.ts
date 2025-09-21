import { NavItem } from "@/types";
import { Goal, LayoutGrid } from "lucide-react";

export const customerNavItems: NavItem[] = [
    {
        title: 'Customer Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'My Orders',
        href: '/orders',
        icon: LayoutGrid,
    },
];
export const employeeNavItems: NavItem[] = [
    {
        title: 'Employee Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
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