using CRUD.Models;
using Microsoft.Data.SqlClient;
using System.Data;

namespace CRUD.DAL
{
    public class ProductDAL : IDisposable
    {
        public SqlConnection conn = null;
        string connection_string = "";

        public ProductDAL(string connection_config_settings = "")
        {
            connection_string = connection_config_settings;
            this.CreateConnection();
        }
        public void CloseConnection()
        {
            try
            {
                if (conn != null)
                {
                    conn.Close();
                    conn.Dispose();
                }
            }
            catch
            {
            }
        }
        public void Dispose()
        {
            try
            {
                if (conn != null)
                {
                    conn.Close();
                    conn.Dispose();
                }
            }
            catch
            {
            }
        }
        private void CreateConnection()
        {
            if (conn == null)
                conn = new SqlConnection(connection_string);

            if (conn.State == ConnectionState.Open)
                return;
            else if (conn.State != ConnectionState.Open)
                conn.Open();
            else
            {
                try { conn.Close(); } catch { }
                conn.Open();
            }
        }
        public List<Product> ExecuteStoredProcedure(string storedProcedureName, IEnumerable<SqlParameter> parameters)
        {
            DataTable dt = null;
            List<Product> products = new List<Product>();
            CreateConnection();
            using (SqlCommand cmd = conn.CreateCommand())
            {
                cmd.CommandText = storedProcedureName;
                cmd.CommandType = CommandType.StoredProcedure;
                foreach (var parameter in parameters)
                {
                    cmd.Parameters.Add(parameter);
                }
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    dt = new DataTable();
                    dt.Load(reader);
                    reader.Close();
                    foreach (DataRow row in dt.Rows)
                    {
                        Product product = new Product
                        {
                            ProductId = Convert.ToInt32(row["ProductId"]),
                            Name = row["Name"].ToString(),
                            Price = Convert.ToDecimal(row["Price"])
                        };

                        products.Add(product);
                    }
                }
                
            }

            return products;
        }
        public int ExecuteStoredProcedureNonQuery(string storedProcedureName, IEnumerable<SqlParameter> parameters)
        {
            int out_put = 0;

            CreateConnection();

            using (SqlCommand cmd = conn.CreateCommand())
            {
                cmd.CommandText = storedProcedureName;
                cmd.CommandType = CommandType.StoredProcedure;
                foreach (var parameter in parameters)
                {
                    cmd.Parameters.Add(parameter);
                }
                out_put = cmd.ExecuteNonQuery();
            }
            return out_put;
        }
    }
}
