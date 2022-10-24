using GeekGallery.Models;
using System.Collections.Generic;

namespace GeekGallery.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        void Delete(int id);
        List<UserProfile> GetAll();
        UserProfile GetById(int id);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
    }
}