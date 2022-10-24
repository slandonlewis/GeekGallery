using GeekGallery.Models;
using GeekGallery.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace GeekGallery.Repositories
{
    public class CategoryRepository : BaseRepository, ICategoryRepository
    {
        public CategoryRepository(IConfiguration configuration) : base(configuration) { }

        public List<Category> GetAll()
        {
            var conn = Connection;
            {
                conn.Open();
                {
                    var cmd = conn.CreateCommand();
                    cmd.CommandText = @"SELECT Id, Name FROM Category ORDER By Name";
                    var reader = cmd.ExecuteReader();

                    List<Category> categoryList = new();
                    while (reader.Read())
                    {
                        Category category = new Category()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name"))
                        };
                        categoryList.Add(category);
                    }
                    return categoryList;
                }
            }
        }

        public Category GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                    SELECT Id, Name FROM Category
                                    WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        Category category = null;
                        if (reader.Read())
                        {
                            category = new Category()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("Name"))
                            };
                        }
                        return category;
                    }
                }
            }
        }
    }
}
