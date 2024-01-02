export const ClientOrderPayment = () => {


}

export const paymentsendToApi = (vistingAmount: number, shotAmount: number) => {
    const orderAmount = vistingAmount + shotAmount;
    const amoutToHeal = 0.025 * orderAmount
    const appAmount = Number(amoutToHeal.toFixed(5));
    const totalAmountToCut = amoutToHeal + orderAmount
    const totalAmount = Number(totalAmountToCut.toFixed(5));
    const minimumBalance = totalAmountToCut * 0.40
    const amountNeddToOrder = totalAmountToCut + minimumBalance
    const walletMinimumAmount = Number(amountNeddToOrder.toFixed(5))
    console.log("paymentsendToApi", "orderAmount: ", orderAmount, "appAmount: ", appAmount, "totalAmount: ", totalAmount, "walletMinimumAmount", walletMinimumAmount)
    return {
        orderAmount,
        appAmount,
        totalAmount,
        walletMinimumAmount
    }
}
