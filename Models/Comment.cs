namespace GeekGallery.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int UserId { get; set; }
        public int PostId { get; set; }
        public UserProfile Profile { get; set; }
        public Post Post { get; set; }
    }
}
