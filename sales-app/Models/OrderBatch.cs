using System;
using System.Collections.Generic;

namespace Sales.App.Models
{
    public class OrderBatch
    {
        public Guid Id { get; set; }
        public Guid ProducerId { get; set; }
        public IList<Order> Orders { get; set; }
        public DateTime BatchTimestamp { get; set; }
    }
}
