import axios from 'axios'
import config from '../../app/config';
import prisma from '../../app/shared/prisma';
import ApiError from '../../app/error/ApiError';
import httpStatus from 'http-status'
import { PaymentStatus } from '@prisma/client';
const initPayment = async (payload:any,userId:string) => {
    
    try {
        const {eventId} = payload

    const event = await prisma.event.findFirstOrThrow({
        where:{
            id:eventId,
            isPaid:true
        },
    })
    
    const customer = await prisma.user.findUniqueOrThrow({
        where:{
            id:userId
        }
    })

    const data = {
        store_id:config.ssl.storeId,
        store_passwd:config.ssl.storePass, 
        total_amount: event.fee,
        currency: 'BDT',
        tran_id: userId+event.id, // use unique tran_id for each api call
        success_url: `${config.ssl.successUrl}/${userId+event.id}`,
        fail_url: config.ssl.failUrl,
        cancel_url: config.ssl.cancelUrl,
        ipn_url: config.ssl.sslValidationApi,
        shipping_method: 'N/A',
        product_name: event.title,
        product_category: 'Event',
        product_profile: 'general',
        cus_name: customer?.name,
        cus_email: customer?.email,
        cus_add1: 'N/A',
        cus_add2: 'N/A',
        cus_city: 'N/A',
        cus_state: 'N/A',
        cus_postcode: 'N/A',
        cus_country: 'Bangladesh',
        cus_phone: 'N/A',
        cus_fax: 'N/A',
        ship_name: customer?.name,
        ship_add1: 'N/A',
        ship_add2: 'N/A',
        ship_city: 'N/A',
        ship_state: 'N/A',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    const response = await axios({
        method:"POST",
        url:config.ssl.sslPaymentApi,
        data,
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        }
    })
    const paymentInitData = await response.data
    
    if (event?.fee == null) {
        throw new Error("Event fee is missing.");
    }

    const isPaymentInitExist = await prisma.payment.findFirst({
        where:{
            transactionId:userId+event.id
        }
    })
    
    if(isPaymentInitExist){
        throw new ApiError(httpStatus.BAD_REQUEST,"Already Payment Inted Created!")
    }
    
    await prisma.payment.create({
        data:{
            userId,
            eventId:payload.eventId,
            provider:"SSL Commerz",
            amount:Number(event?.fee),
            transactionId:userId+event.id
        }
    })

    
    console.log(paymentInitData?.GatewayPageURL,'1')
    const paymentUrl = paymentInitData?.GatewayPageURL
    console.log(paymentUrl,'2')
    return paymentUrl
    
    } catch (error:{message:string}) {
        throw new ApiError(httpStatus.BAD_REQUEST,`Payment Error Occured${error?.message}`)
    }
    // const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    // sslcz.init(data).then(apiResponse => {
    //     // Redirect the user to payment gateway
    //     let GatewayPageURL = apiResponse.GatewayPageURL
    //     res.redirect(GatewayPageURL)
    //     console.log('Redirecting to: ', GatewayPageURL)
    // });
}


const validationPayment = async(query:any) => {
    if(!query || !query.status || !(query.status === "VALID")){
        return {
            message:"Invalid Payment"
        }
    }
    const response = await axios({
        method:"GET",
        url:`${config.ssl.sslValidationApi}?val_id=${query.val_id}&store_id=${config.ssl.storeId}&store_passwd=${config.ssl.storePass}&format=json`
    })
    if(await response?.data?.status !== "VALID"){
        return {
            message:"Payment Failed!"
        }
    }
    await prisma.$transaction(async(tx)=> {
        await tx.payment.updateMany({
            where:{
                transactionId:response?.data?.tran_id,
            },
            data:{
                status:PaymentStatus.SUCCESS,
                paidAt: new Date(),
            }
        })

        return {
            message: "Payment success!"
        }
    })
}

const paymentSuccess = async(tran_id:string) => {
    console.log(tran_id,'helloasdfasdfasdfsadfs')
    return tran_id
}

export const PaymentService = {
    initPayment,
    validationPayment,
    paymentSuccess
}