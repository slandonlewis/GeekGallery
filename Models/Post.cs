using System;
using System.Collections.Generic;

namespace GeekGallery.Models
{
    public class Post
    {
        public int Id { get; set; }
        public int UserId {  get; set; }
        public int CategoryId {  get; set; }
        public string Title { get; set; }
        public string ImageURL { get; set; }
        public DateTime CreationDate { get; set; }
        public string Caption { get; set; }
        public bool IsPublic { get; set; }
        public UserProfile UserProfile { get; set; }
        public List<Comment> Comments { get; set; }
    }
}
