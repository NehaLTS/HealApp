export const ClientOrderPayment = () => {


}

export const paymentsendToApi = (vistingAmount: number, shotAmount: number) => {
    const orderAmount = vistingAmount + shotAmount;
    const appAmount = 0.025 * orderAmount;
    const totalAmount = appAmount + orderAmount;
    return {
        orderAmount,
        appAmount,
        totalAmount
    }

}
