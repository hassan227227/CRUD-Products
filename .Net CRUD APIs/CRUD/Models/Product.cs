﻿namespace CRUD.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
    }
    public class ProductInput
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
    }
}
