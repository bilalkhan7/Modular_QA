//declaring the table attributes
export type account = {
    account_id: number,
    account_parent: number,
    account_description: string,
    account_type: string ,
    account_rollup: string,
    Custom_Members: string 
}

export type category= {
    category_id:string,
    category_parent: string,
    category_description: string, 
    category_rollup: string
}

export type currency = {
    currency_id: number,
    date : any,
    currency : string,
    conversion_ratio: number,
}


export type customer = {

    customer_id: number ,
    account_num: number ,
    lname: string ,
    fname: string ,
    mi: string ,
    address1: string ,
    address2: string ,
    address3: string ,
    address4: string ,
    city: string ,
    state_province: string ,
    postal_code: string ,
    country: string ,
    customer_region_id: number ,
    phone1: string ,
    phone2: string ,
    birthdate: any ,
    marital_status: string ,
    yearly_income: string ,
    gender: string ,
    total_children: number ,
    num_children_at_home: number ,
    education: string ,
    date_accnt_opened: any ,
    member_card: string ,
    occupation: string ,
    houseowner: string ,
    num_cars_owned: number,
    fullname: string
}


export type days = {
    day: string ,
    week_day: string
}

export type department = {
    department_id: number ,
    department_description: string 
}

export type employee = {
    employee_id: number ,
    full_name: string ,
    first_name: string ,
    last_name: string ,
    position_id: number,
    position_title: string ,
    store_id: number ,
    department_id: number ,
    birth_date: any ,
    hire_date: any,
    end_date :any,
    salary: number ,
    supervisor_id: number,
    education_level: string ,
    marital_status: string ,
    gender: string ,
    management_role: string 

}    

export type employee_closure = {
    employee_id: number ,
    supervisor_id: number ,
    distance: number
}

export type inventory_fact = {
    product_id: number,
    time_id: number,
    warehouse_id: number,
    store_id: number,
    units_ordered: number,
    units_shipped: number,
    warehouse_sales: number,
    warehouse_cost: number,
    supply_time: number,
    store_invoice: number
}

export type product = {

    product_class_id: number ,
    product_id: number ,
    brand_name: string,
    product_name :string,
    "SKU": number ,
    "SRP" : number,
    gross_weight:number,
    net_weight:number,
    recyclable_package: boolean,
    low_fat: boolean,
    units_per_case: number,
    cases_per_pallet: number,
    shelf_width :number,
    shelf_height:number,
    shelf_depth:number
    
}

export type product_class = {

    product_class_id: number ,
    product_subcategory: string ,
    product_category: string ,
    product_department: string ,
    product_family: string 
}
export type promotion = {
    promotion_id: number ,
    promotion_district_id: number,
    promotion_name: string ,
    media_type: string ,
    cost: number,
    start_date: any,
    end_date: any
}
   
export type region = {

    region_id: number ,
    sales_city: string ,
    sales_state_province: string ,
    sales_district: string ,
    sales_region: string ,
    sales_country: string ,
    sales_district_id: number 
}

export type reserve_employee = {

    employee_id: number ,
    full_name: string ,
    first_name: string ,
    last_name: string ,
    position_id: number,
    position_title: string ,
    store_id: number ,
    department_id: number ,
    birth_date: any,
    hire_date: any,
    end_date: any,
    salary : number,
    supervisor_id: number,
    education_level: string ,
    marital_status: string ,
    gender: string ,
    
}
export type salary = {

    pay_date: any,
    employee_id: number,
    department_id:number ,
    currency_id: number ,
    salary_paid: number,
    overtime_paid : number ,
    vacation_accrued: number,
    vacation_used: number
    }

export type store ={

    store_id: number,
    store_type: string ,
    region_id: number,
    store_name: string,
    store_number: number,
    store_street_address: string,
    store_city: string,
    store_state: string,
    store_postal_code: string,
    store_country: string ,
    store_manager: string ,
    store_phone: string ,
    store_fax: string ,
    first_opened_date : any,
    last_remodel_date: any,
    store_sqft: number,
    grocery_sqft: number,
    frozen_sqft: number,
    meat_sqft: number,
    coffee_bar: boolean,
    video_store: boolean,
    salad_bar: boolean,
    prepared_food: boolean,
    florist: boolean,
}

export type store_ragged = {

    store_id: number ,
    store_type: string ,
    region_id: number,
    store_name:string ,
    store_number:number,
    store_street_address: string ,
    store_city : string ,
    store_state : string ,
    store_postal_code: string ,
    store_country: string ,
    store_manager: string ,
    store_phone: string ,
    store_fax: string ,
    first_opened_date: any,
    last_remodel_date: any,
    store_sqft: number,
    grocery_sqft: number,
    frozen_sqft: number,
    meat_sqft: number,
    coffee_bar: boolean,
    video_store: boolean,
    salad_bar: boolean,
    prepared_food: boolean,
    florist: boolean    
}

export type time_by_day = {
    time_id: number ,
    the_date: any,
    the_day: string,
    the_month: string ,
    the_year: number,
    day_of_month: number,
    week_of_year: number,
    month_of_year: number,
    quarter: string ,
    fiscal_period: string 
}

export type warehouse ={

    warehouse_id: number ,
    warehouse_class_id: number,
    stores_id: number,
    warehouse_name: string,
    wa_address1: string ,
    wa_address2: string ,
    wa_address3: string ,
    wa_address4: string ,
    warehouse_city: string ,
    warehouse_state_province: string ,
    warehouse_postal_code: string ,
    warehouse_country: string ,
    warehouse_owner_name: string ,
    warehouse_phone: string ,
    warehouse_fax: string
}
export type warehouse_class = {

    warehouse_class_id: number ,
    description: string

}
