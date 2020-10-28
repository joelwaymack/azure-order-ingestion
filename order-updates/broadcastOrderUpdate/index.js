module.exports = async function (context, orders) {
    if (!!orders && orders.length > 0) {
        context.bindings.orderUpdateMessages = [];
        orders.forEach(order => {
            context.log("Order ", order.id, " updated");
            context.bindings.orderUpdateMessages.push({
                "target": "orderUpdated",
                "arguments": [order]
            });
        });
    }
}
