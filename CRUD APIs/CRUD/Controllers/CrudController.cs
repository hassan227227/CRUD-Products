using CRUD.DAL;
using CRUD.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Globalization;

namespace CRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CrudController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public CrudController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // GET api/<CrudController>/AllProducts
        [HttpGet("AllProducts")]
        public List<Product> AllProducts()
        {
            string connectionString = _configuration.GetConnectionString("ConnectionString");
            ProductDAL obj = new ProductDAL(connectionString);
            List<Product> products = new List<Product>();
            List<SqlParameter> param_list = new List<SqlParameter>();
            param_list.Add(new SqlParameter("iMode", 1));

            products = obj.ExecuteStoredProcedure("usp_CRUD_Products", param_list);

            if (param_list != null)
            {
                param_list.Clear();
                param_list = null;
            }
            return products;
        }

        // POST api/<CrudController>
        [HttpPost]
        public string Post( Models.ProductInput jsonObj)
        {
            string connectionString = _configuration.GetConnectionString("ConnectionString");
            ProductDAL obj = new ProductDAL(connectionString);
            int result = -1;
            string Result = "";
            List<SqlParameter> param_list = new List<SqlParameter>();
            param_list.Add(new SqlParameter("iMode", 2));
            param_list.Add(new SqlParameter("ProductName", jsonObj.Name));
            param_list.Add(new SqlParameter("ProductPrice", jsonObj.Price));

            result = obj.ExecuteStoredProcedureNonQuery("usp_CRUD_Products", param_list);

            if (param_list != null)
            {
                param_list.Clear();
                param_list = null;
            }
            if (result > 0)
            {
                Result = "[{\"Result\":\"" + "Pass" + "\"}]";
            }
            else
            {
                Result = "[{\"Result\":\"" + "Fail" + "\"}]";
            }
            return Result;
        }

        // PUT api/<CrudController>/5
        [HttpPut("{id}")]
        public string Put(int id, Models.ProductInput jsonObj)
        {
            string connectionString = _configuration.GetConnectionString("ConnectionString");
            ProductDAL obj = new ProductDAL(connectionString);
            int result = -1;
            string Result = "";
            List<SqlParameter> param_list = new List<SqlParameter>();
            param_list.Add(new SqlParameter("iMode", 3));
            param_list.Add(new SqlParameter("pId", id));
            param_list.Add(new SqlParameter("ProductName", jsonObj.Name));
            param_list.Add(new SqlParameter("ProductPrice", jsonObj.Price));

            result = obj.ExecuteStoredProcedureNonQuery("usp_CRUD_Products", param_list);

            if (param_list != null)
            {
                param_list.Clear();
                param_list = null;
            }
            if (result > 0)
            {
                Result = "[{\"Result\":\"" + "Pass" + "\"}]";
            }
            else
            {
                Result = "[{\"Result\":\"" + "Fail" + "\"}]";
            }
            return Result;
        }

        // DELETE api/<CrudController>/5
        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            string connectionString = _configuration.GetConnectionString("ConnectionString");
            ProductDAL obj = new ProductDAL(connectionString);
            int result = -1;
            string Result = "";
            List<SqlParameter> param_list = new List<SqlParameter>();
            param_list.Add(new SqlParameter("iMode", 4));
            param_list.Add(new SqlParameter("pId", id));

            result = obj.ExecuteStoredProcedureNonQuery("usp_CRUD_Products", param_list);

            if (param_list != null)
            {
                param_list.Clear();
                param_list = null;
            }
            if (result > 0)
            {
                Result = "[{\"Result\":\"" + "Pass" + "\"}]";
            }
            else
            {
                Result = "[{\"Result\":\"" + "Fail" + "\"}]";
            }
            return Result;
        }
    }
}
