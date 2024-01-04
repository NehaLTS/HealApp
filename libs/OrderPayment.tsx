export const ClientOrderPayment = () => {


}

export const totalPrice = (services: any) => {
    if (services && services?.length > 0) {
        const servicesArray = services

        // Calculate the total service price
        const totalServicePrice = servicesArray.reduce(
            (total: number, service: { service_price: string }) => {
                // Ensure that the service_price is a number before adding it to the total
                const servicePrice = parseFloat(service.service_price) || 0;
                return total + servicePrice;
            },
            0,
        );
        console.log('totalPrice', JSON.stringify(totalServicePrice));
        return JSON.stringify(totalServicePrice);
    } else {
        return '';
    }
};
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
