using GeekGallery.Models;
using System.Collections.Generic;

namespace GeekGallery.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAll();
        Category GetById(int id);
    }
}