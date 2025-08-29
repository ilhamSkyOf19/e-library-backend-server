// request midtrans
export type TransactionRequestType = {
    id_user: number;
    id_ebook: number;
}

// payment request 
export type PaymentRequestType = {
    id_user: number;
    id_ebook: number;
    email: string;
    price: number
}


// midtrans url 
export type MidtransUrl = {
    redirect_url: string
}


// midtrans response
export type MidtransHook = {
    transaction_status: string;
    transaction_id: string;
    transaction_time: string;
    order_id: string;
    gross_amount: string;
}


// transaction db response 
export type TransactionResponseType = {
    id_transaction: string;
    id_user: number;
    id_ebook: number
}
