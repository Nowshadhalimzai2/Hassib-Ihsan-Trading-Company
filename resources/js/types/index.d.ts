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
    phone:string;
    address:string;
    role:Role;
    orders:Order[];
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
    source:{id:number;name:string};
    destination:{id:number;name:string};
    dealing_entity_id: number;
    amount: number;
    currency_id: number;
    source_id: number;
    destination_id?: number;
    business_account_id?: number;
    notes?: string;
    created_at: string;
    updated_at: string;
    
    dealing_entity?: DealingEntity;
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
    user: {id:number,name:string,company_name:string}
    name: string
    description?: string
    quantity_in_stock: number
    unit_price: number
    currency_id: number
    is_featured: number 
    images:Image[];
    created_at: Date;
    category:{name:string}
   
}
export interface Category{
    id:number;
    name:string;
    description:string;
    products:Product[];
    images:Image[];
}
export interface Image{
    id:number;
    image_path:string;
    is_primary:boolean;
}

export interface Order{
    id:number;
    total_amount:number;
    status: 'pending'|'completed' | 'confirmed' | 'cancelled';
    delivery_time:string | null;
    should_call:boolean;
    delivery_address:string;
    order_date:Date;
    unknown_user:UKUser;
    order_items:OrderItem[];
    user:User;
    currency_id:number;
    note?:string;
    created_at:Date;
}
export interface OrderItem{
    id:number;
    product:Product;
    quantity:number;
    unit_price:number;
    subtotal:number;
}
export interface UKUser{
    id:number;
    first_name:string;
    last_name:string;
    phone:string;
    address:string;
}

export interface Invoice{
    id:number;
    invoice_number:string;
    order?:Order;
    sale?:Sale;
    paid_amount:number;
    notes?:string;
    payment_status:'unpaid' | 'paid' | 'partially_paid';
    invoice_date:Date;
}

export interface Sale{
    id:number;
    // total_amount:number; the amount fisrt should be added to the sales table
    delivery_address:string;
    sale_date:Date;
    order_items:SaleItem[];
    user:User;
    customer_name:string;
    currency_id:number;
    created_at:Date;
}
export interface SaleItem{
    id:number;
    product:Product;
    quantity:number;
    unit_price:number;
    subtotal:number;
}

export interface Payment{
    id:number;
    amount:number;
    currency_id:number;
    invoice_id:number;
    invoice:Invoice;
    payment_method:PaymentMethod;  
    notes?:string; 
    payment_date:Date;
    user:{id:number;name:string;}

 }
 export interface PaymentMethod{
    id:number;
    name:'Cash ' | 'Credit Card' | 'Bank Transfer' | 'Mobile Payment' | 'HessabPay' ;
 }