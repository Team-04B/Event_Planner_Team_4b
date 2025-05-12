"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../../app/config"));
const prisma_1 = __importDefault(require("../../app/shared/prisma"));
const ApiError_1 = __importDefault(require("../../app/error/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const client_1 = require("@prisma/client");
const initPayment = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId } = payload;
        const event = yield prisma_1.default.event.findFirstOrThrow({
            where: {
                id: eventId,
                isPaid: true
            },
        });
        const customer = yield prisma_1.default.user.findUniqueOrThrow({
            where: {
                id: userId
            }
        });
        const data = {
            store_id: config_1.default.ssl.storeId,
            store_passwd: config_1.default.ssl.storePass,
            total_amount: event.fee,
            currency: 'BDT',
            tran_id: userId + event.id, // use unique tran_id for each api call
            success_url: `${config_1.default.ssl.sslverifyUrl}?tran_id=${userId + event.id}`,
            fail_url: config_1.default.ssl.failUrl,
            cancel_url: config_1.default.ssl.cancelUrl,
            ipn_url: config_1.default.ssl.sslValidationApi,
            shipping_method: 'N/A',
            product_name: event.title,
            product_category: 'Event',
            product_profile: 'general',
            cus_name: customer === null || customer === void 0 ? void 0 : customer.name,
            cus_email: customer === null || customer === void 0 ? void 0 : customer.email,
            cus_add1: 'N/A',
            cus_add2: 'N/A',
            cus_city: 'N/A',
            cus_state: 'N/A',
            cus_postcode: 'N/A',
            cus_country: 'Bangladesh',
            cus_phone: 'N/A',
            cus_fax: 'N/A',
            ship_name: customer === null || customer === void 0 ? void 0 : customer.name,
            ship_add1: 'N/A',
            ship_add2: 'N/A',
            ship_city: 'N/A',
            ship_state: 'N/A',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        };
        const response = yield (0, axios_1.default)({
            method: "POST",
            url: config_1.default.ssl.sslPaymentApi,
            data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        const paymentInitData = yield response.data;
        if ((event === null || event === void 0 ? void 0 : event.fee) == null) {
            throw new Error("Event fee is missing.");
        }
        const isPaymentInitExist = yield prisma_1.default.payment.findFirst({
            where: {
                transactionId: userId + event.id
            }
        });
        if (isPaymentInitExist) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Already Payment Inted Created!");
        }
        yield prisma_1.default.payment.create({
            data: {
                userId,
                eventId: payload.eventId,
                provider: "SSL Commerz",
                amount: Number(event === null || event === void 0 ? void 0 : event.fee),
                transactionId: userId + event.id
            }
        });
        console.log(paymentInitData === null || paymentInitData === void 0 ? void 0 : paymentInitData.GatewayPageURL, '1');
        const paymentUrl = paymentInitData === null || paymentInitData === void 0 ? void 0 : paymentInitData.GatewayPageURL;
        console.log(paymentUrl, '2');
        return paymentUrl;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `Payment Error Occured${error === null || error === void 0 ? void 0 : error.message}`);
    }
    // const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    // sslcz.init(data).then(apiResponse => {
    //     // Redirect the user to payment gateway
    //     let GatewayPageURL = apiResponse.GatewayPageURL
    //     res.redirect(GatewayPageURL)
    //     console.log('Redirecting to: ', GatewayPageURL)
    // });
});
const validationPayment = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // if(!query || !query.status || !(query.status === "VALID")){
    //     return {
    //         message:"Invalid Payment"
    //     }
    // }
    // const response = await axios({
    //     method:"GET",
    //     url:`${config.ssl.sslValidationApi}?val_id=${query.val_id}&store_id=${config.ssl.storeId}&store_passwd=${config.ssl.storePass}&format=json`
    // })
    // if(await response?.data?.status !== "VALID"){
    //     return {
    //         message:"Payment Failed!"
    //     }
    // }
    const payment = yield prisma_1.default.payment.findFirst({
        where: {
            transactionId: query.tran_id
        },
        include: {
            user: true,
            event: true
        }
    });
    if (!payment) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Payment not found!');
    }
    yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        yield tx.payment.updateMany({
            where: {
                transactionId: query === null || query === void 0 ? void 0 : query.tran_id,
            },
            data: {
                status: client_1.PaymentStatus.SUCCESS,
                paidAt: new Date(),
            }
        });
        yield tx.invitation.updateMany({
            where: {
                userEmail: (_a = payment === null || payment === void 0 ? void 0 : payment.user) === null || _a === void 0 ? void 0 : _a.email,
                eventId: payment.event.id
            },
            data: {
                paid: true
            }
        });
        // return {
        //     message: "Payment success!"
        // }
    }));
    return true;
});
const paymentSuccess = (tran_id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(tran_id, 'helloasdfasdfasdfsadfs');
    return tran_id;
});
exports.PaymentService = {
    initPayment,
    validationPayment,
    paymentSuccess
};
