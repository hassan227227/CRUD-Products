IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[usp_CRUD_Products]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[usp_CRUD_Products]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[usp_CRUD_Products] 
	@ProductName varchar(500) = '', 
	@ProductPrice Decimal (18,2) = 0.0, 
	@pId INT = -1,
	@iMode INT = -1

As

IF (ISNULL(@iMode, -1) = 0)
 BEGIN
	Select * from products with(nolock) where productId = @pId -- If we have multiple columns then we have to select only limited columns
 END
 ELSE IF (ISNULL(@iMode, -1) = 1)
 BEGIN
	Select * from products with(nolock)
 END
 ELSE IF (ISNULL(@iMode, -1) = 2)
 BEGIN
	insert into Products(Name, price) values (@ProductName, @ProductPrice)
 END
 ELSE IF (ISNULL(@iMode, -1) = 3)
 BEGIN
	IF EXISTS(Select productId from Products with(nolock) where productId = @pId)
	BEGIN
		Update Products set Name = @ProductName , price = @ProductPrice where productId = @pId
	END
 END
 ELSE IF (ISNULL(@iMode, -1) = 4)
 BEGIN
	delete from Products where productId = @pId
 END
GO


