import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role_id: Role;
    avatar?: string;
    email_verified_at: string | null;
    source_id?: Transaction[];
    destination_id?: Transaction[];
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

interface Role {
    id: number;
    name: string;
}

export interface Transaction{
    id: number;
    dealing_entity_id: DealingEntity;
    amount: number;
    currency: Currency;
    source_id: User;
    destination_id?: User;
    business_account?: number;
    notes?: string;
    created_at: string;
    updated_at: string;
}
interface DealingEntity{
    id: number;
    name: string;
}
interface Currency{
    id: number;
    name: string;
}