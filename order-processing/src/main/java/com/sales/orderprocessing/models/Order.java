package com.sales.orderprocessing.models;

import java.util.Date;
import java.util.UUID;

public class Order {

    public String id;
    public String batchId;
    public String producerId;
    public String processingId;
    public String shippingId;
    public OrderStatus status;
    public String firstName;
    public String lastName;
    public Address address;
    public String email;
    public String item;
    public int quantity;
    public String totalCost;
    public Date purchaseTimestamp;
    public Date processingTimestamp;
    public Date shippingTimestamp;

    public void process() {
        processingId = UUID.randomUUID().toString();
        status = OrderStatus.Processing;
        processingTimestamp = new Date();
    }

    public void ship() {
        shippingId = UUID.randomUUID().toString();
        status = OrderStatus.Shipped;
        shippingTimestamp = new Date();
    }
}