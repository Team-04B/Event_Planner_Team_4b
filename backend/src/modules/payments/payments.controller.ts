import { catchAsync } from '../../app/helper/catchAsync';
import { sendResponse } from '../../app/shared/sendResponse';
import httpStatus from 'http-status';
import { PaymentService } from './payments.service';
import config from '../../app/config';
import pick from '../../app/shared/pick';
import { paymentSearchableFields } from './payments.constant';
import { IPaymentFilterRequest } from './payments.interface';

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

const getAllPayment = catchAsync(async (req, res) => {
  const rawFilters = pick(req.query, paymentSearchableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const filters: IPaymentFilterRequest = {
    searchTerm:
      typeof rawFilters.searchTerm === 'string'
        ? rawFilters.searchTerm
        : undefined,
  };

  // If filters are empty, set them to undefined to fetch all events
  if (
    Object.keys(filters).length === 0 ||
    Object.values(filters).every((value) => value === undefined)
  ) {
    filters.searchTerm = undefined;
  }

  const result = await PaymentService.getAllPaymentFromDB(filters, options);
  console.log(result);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment retrieved successfully',
    data: result.data,
  });
});

export const PaymentController = {
  initPayment,
  validationPayment,
  paymentSuccess,
  getAllPayment,
};
