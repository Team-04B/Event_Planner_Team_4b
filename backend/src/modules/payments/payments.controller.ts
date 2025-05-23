import { catchAsync } from '../../app/helper/catchAsync';
import { sendResponse } from '../../app/shared/sendResponse';
import httpStatus from 'http-status';
import { PaymentService } from './payments.service';
import config from '../../app/config';
import { userServices } from '../users/users.service';

const initPayment = catchAsync(async (req, res) => {
  const payload = req.body;

  const user = req.user;

  const result = await PaymentService.initPayment(payload, user.id);

  console.log(result, 'asdfsadfsdafsa');

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment Initate successfully',
    data: result,
  });
});

const validationPayment = catchAsync(async (req, res) => {
  const result = await PaymentService.validationPayment(req.query);

  if (result) {
    res.redirect(config.ssl.successUrl as string);
  }

  // sendResponse(res,{
  //     statusCode: httpStatus.OK,
  //     success:true,
  //     message:"Payment Validate successfully",
  //     data:result
  // })
});

const paymentSuccess = catchAsync(async (req, res) => {
  const result = await PaymentService.paymentSuccess(req.params.tran_id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment Validate successfully',
    data: result,
  });
});

// Controller to get admin dashboard payment stats
const getDashboardOverview = catchAsync(async (req, res) => {
  const [
    totalRevenue,
    totalPayments,
    latestPayments,
    revenueByProvider,
    monthlyRevenue,
    monthlyNewUsers,
  ] = await Promise.all([
    PaymentService.getTotalRevenue(),
    PaymentService.getTotalPayments(),
    PaymentService.getLatestPayments(5),
    PaymentService.getRevenueByProvider(),
    PaymentService.getMonthlyRevenue(),
    userServices.getMonthlyNewUsers(),
  ]);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Dashboard overview fetched successfully',
    data: {
      totalRevenue,
      totalPayments,
      latestPayments,
      revenueByProvider,
      monthlyRevenue,
      monthlyNewUsers,
    },
  });
});

export const PaymentController = {
  initPayment,
  validationPayment,
  paymentSuccess,
  getDashboardOverview,
};
