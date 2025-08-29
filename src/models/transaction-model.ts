// request midtrans
export type TransactionRequestType = {
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



// transaction db response 
export type TransactionResponseType = {
    id_transaction: string;
    id_user: number;
    id_ebook: number
}
