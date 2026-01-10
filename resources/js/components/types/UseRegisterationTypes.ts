type RegisterFormType = {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    password: string;
    password_confirmation: string;
};
export type ExmployeeFormType = RegisterFormType & {
    salary: number;
};
export type FormType = RegisterFormType & {
    company: string;
};

export type InvestorFormType = RegisterFormType & {
    profit_percentage: number | null;
};
