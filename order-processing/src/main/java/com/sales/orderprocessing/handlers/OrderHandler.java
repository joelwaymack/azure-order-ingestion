package com.sales.orderprocessing.handlers;

import com.sales.orderprocessing.models.*;
import com.microsoft.azure.functions.annotation.Cardinality;
import com.microsoft.azure.functions.annotation.CosmosDBOutput;
import com.microsoft.azure.functions.annotation.EventGridTrigger;
import com.microsoft.azure.functions.annotation.FunctionName;
import com.microsoft.azure.functions.annotation.TimerTrigger;
import com.microsoft.azure.functions.ExecutionContext;
import com.microsoft.azure.functions.OutputBinding;

public class OrderHandler {
    @FunctionName("ProcessOrder")
    @CosmosDBOutput(name = "database",
        databaseName = "Sales",
        collectionName = "Orders",
        connectionStringSetting = "AzureCosmosDBConnection")
    public Order ProcessOrder(
        @EventGridTrigger(
            name="event")
            EventSchema event,
        final ExecutionContext context) {
            Order order = event.data;
            
            order.process();
            order.ship();
            context.getLogger().info(event.toString());
    
        return order;
    }
}