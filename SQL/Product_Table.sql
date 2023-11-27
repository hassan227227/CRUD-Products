CREATE DATABASE ProductDatabase;
USE ProductsDB;


CREATE TABLE Products (
    ProductId INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    Price DECIMAL(10, 2) NOT NULL
);

--insert into Products(Name,price) values ('Jar', 7.5)
--select * from products with(nolock)