using GeekGallery.Models;
using System.Collections.Generic;

namespace GeekGallery.Repositories
{
    public interface ICommentRepository
    {
        List<Comment> GetAllPostComments(int postId);
    }
}