using GeekGallery.Models;
using System.Collections.Generic;

namespace GeekGallery.Repositories
{
    public interface ICommentRepository
    {
        List<Comment> GetAllPostComments(int postId);
        Comment GetById(int id);
        void Add(Comment comment);
        void Update(Comment comment);
        void Delete(int id);
    }
}