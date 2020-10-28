using Microsoft.Azure.EventGrid;
using Microsoft.Azure.EventGrid.Models;
using Sales.App.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sales.App.Services
{
    public class OrderBatchService
    {
        private readonly EventGridClient eventGridClient;
        private readonly string topicUri;
        
        public OrderBatchService(EventGridClient eventGridClient, string topicUri)
        {
            this.eventGridClient = eventGridClient;
            this.topicUri = topicUri;
        }

        public async Task<OrderBatch> PublishAsync(string producerId, int batchSize = 0)
        {
            var orderBatch = CreateBatch(producerId, batchSize);
            var events = Convert(orderBatch.Orders);
            await eventGridClient.PublishEventsAsync(topicUri, events);

            return orderBatch;
        }

        private IList<EventGridEvent> Convert(IList<Order> orders)
        {
            var events = new List<EventGridEvent>();

            foreach(var order in orders)
            {
                events.Add(new EventGridEvent
                {
                    Id = Guid.NewGuid().ToString(),
                    EventType = "NewOrder",
                    Data = order,
                    EventTime = DateTime.UtcNow,
                    Subject = "New Order",
                    DataVersion = "1.0"
                });
            }

            return events;
        }

        private OrderBatch CreateBatch(string producerId, int batchSize = 0)
        {
            if (batchSize <= 0)
            {
                var rand = new Random();
                batchSize = rand.Next(1, 1000);
            }

            var batchId = Guid.NewGuid();
            return new OrderBatch
            {
                Id = batchId,
                Orders = Order.CreateOrders(batchId, producerId, batchSize),
                BatchTimestamp = DateTime.UtcNow
            };
        }
    }
}
