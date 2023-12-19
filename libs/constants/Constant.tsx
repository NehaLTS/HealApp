export const ORDER_STARTED = 'Order Started';
export const ORDER_CREATED = 'Order Created';
export const ORDER_ACCEPTED = 'Order Accepted';
export const ON_THE_WAY = 'On the way';
export const ARRIVED = 'Arrived';
export const TREATMENTCOMPLETED = 'Treatment completed';
export const ESTIMATE_ARRIVAL = 'Estimated arrival';

export const providerStatusOnHeader = (statusOfArriving: string) => {
  switch (statusOfArriving) {
    case ARRIVED:
      return 'has arrived';
    case ON_THE_WAY:
      return 'on the way';
    case ORDER_ACCEPTED:
      return 'on the way';
    case ESTIMATE_ARRIVAL:
      return 'is found';
    default:
      return null;
  }
};
