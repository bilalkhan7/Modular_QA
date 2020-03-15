export type expense_fact ={

    store_id :number,
    account_id :number,
    exp_date :any,
    time_id :number,
    category_id:string,
    currency_id :number,
    amount :number

}

export type sales_fact = {

    product_id :number,
    time_id :number,
    customer_id :number,
    promotion_id :number,
    store_id :number,
    store_sales :number,
    store_cost :number,
    unit_sales :number
}

export type inventory_fact = {
    product_id :number,
    time_id :number,
    warehouse_id :number,
    store_id :number,
    units_ordered :number,
    units_shipped :number,
    warehouse_sales :number,
    warehouse_cost :number,
    supply_time: number,
    store_invoice :number
}
