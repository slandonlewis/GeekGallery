namespace GeekGallery.Models
{
    public class PostCategory
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public int GenreId { get; set; }
        public Post Post { get; set; }
        public Category Category { get; set; }
    }
}
