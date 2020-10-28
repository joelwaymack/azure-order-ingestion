using Sales.App.Models;
using Microsoft.AspNetCore.Mvc;
using Sales.App.Services;
using System.Threading.Tasks;
using System;

namespace Sales.App.Controllers
{
    [ApiController]
    [Route("orderbatches")]
    public class OrderBatchController : ControllerBase
    {
        private readonly OrderBatchService orderService;
        
        public OrderBatchController(OrderBatchService orderService)
        {
            this.orderService = orderService;
        }

        [HttpPost("{producerId}")]
        public async Task<OrderBatch> PostAsync(string producerId, int batchSize = 0)
        {
            // Restrict batch size to 10.
            batchSize = batchSize <= 10 ? batchSize : 10;

            var orderBatch = await orderService.PublishAsync(producerId, batchSize);

            return orderBatch;
        }
    }
}
