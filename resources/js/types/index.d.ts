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
    
    role:Role;
    avatar?: string;
    email_verified_at: string | null;
    source_id?: number;
    destination_id?: number[];
    created_at: string;
    profit_percentage:number;
    updated_at: string;
    transactions_as_source?: Transaction[];
    transactions_as_destination?: Transaction[];
    [key: string]: unknown; // This allows for additional properties...
}

interface Role {
    id: number;
    name: string;
}

export interface Transaction{
    id: number;
    dealing_entity_id: number;
    amount: number;
    currency_id: number;
    source_id: number;
   
    destination_id?: number;
    business_account?: number;
    notes?: string;
    created_at: string;
    updated_at: string;
    
    dealingEntity?: DealingEntity;
    [key: string]: unknown; // This allows for additional properties...
}
interface DealingEntity{
    id: number;
    name: string;
}
interface Currency{
    id: number;
    name: string;
}

export interface Product{
    id: number
      user_id: number
      name: string
      description?: string
      quantity_in_stock: number
      unit_price: number
      currency_id: number
      category_id: number
      is_featured: number
      deleted_at?: date
      created_at: date
      updated_at: date
    [key: string]: unknown; // This allows for additional properties...
}