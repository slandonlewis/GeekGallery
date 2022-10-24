using GeekGallery.Models;
using System.Collections.Generic;

namespace GeekGallery.Repositories
{
    public interface IPostRepository
    {
        List<Post> GetAllPosts();
        Post GetByIdWithComments(int id);
        List<Post> GetMyPosts(int userProfileId);
        void Add(Post post);
        void Update(Post post);
        void Delete(int id);
    }
}