using System;
using System.Collections.Generic;
using Bogus;

namespace Sales.App.Models
{
    public class Order
    {
        private static string[] items = new[] {"Bike", "Shoes", "T-Shirt", "Apples", "Sewing Kit", "Pencils"};

        public Guid Id { get; set; }
        public Guid BatchId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Address Address { get; set; }
        public string Email { get; set; }
        public string Item { get; set; }
        public int Quantity { get; set; }
        public string TotalCost { get; set; }
        public string Status { get; set; } = "New";
        public DateTime PurchaseTimestamp { get; set; }
        public string ProducerId { get; set; }

        public static IList<Order> CreateOrders(Guid batchId, string producerId, int count = 10)
        {
            var orderGenerator = new Faker<Order>()
                .RuleFor(o => o.Id, f => Guid.NewGuid())
                .RuleFor(o => o.BatchId, f => batchId)
                .RuleFor(o => o.ProducerId, f => producerId)
                .RuleFor(o => o.FirstName, (f,o) => f.Name.FirstName())
                .RuleFor(o => o.LastName, f => f.Name.LastName())
                .RuleFor(o => o.Email, (f, o) => f.Internet.Email(o.FirstName, o.LastName))
                .RuleFor(o => o.Item, f => f.PickRandom(items))
                .RuleFor(o => o.Quantity, f => f.Random.Number(1, 10))
                .RuleFor(o => o.TotalCost, f => f.Commerce.Price())
                .RuleFor(o => o.PurchaseTimestamp, f => DateTime.UtcNow)
                .RuleFor(o => o.Address, 
                    f => new Address {
                        StreetAddress = f.Address.StreetAddress(),
                        City = f.Address.City(),
                        State = f.Address.StateAbbr(),
                        Zip = f.Address.ZipCode()
                    });

            return orderGenerator.Generate(count);
        }
    }
}
