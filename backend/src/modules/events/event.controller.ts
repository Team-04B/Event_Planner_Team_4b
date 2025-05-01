import { catchAsync } from '../../app/helper/catchAsync';

const createEvent = catchAsync(async (req, res) => {
  const eventData = req.body;
  console.log(eventData);
});

export const EventController = {
  createEvent,
};
