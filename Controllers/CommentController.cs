using GeekGallery.Models;
using GeekGallery.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GeekGallery.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        public CommentController(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        [Authorize]
        [HttpGet("{postId}/comments")]
        public IActionResult GetPostComments(int postId)
        {
            var comments = _commentRepository.GetAllPostComments(postId);
            return Ok(comments);
        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_commentRepository.GetById(id));
        }

        [Authorize]
        [HttpPost]
        public IActionResult Create(Comment comment)
        {
            _commentRepository.Add(comment);
            return CreatedAtAction("Get", new { id = comment.Id }, comment);
        }

        [Authorize]
        [HttpPut("{id}")]
        public IActionResult Put(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }

            _commentRepository.Update(comment);
            return NoContent();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _commentRepository.Delete(id);
            return NoContent();
        }
    }
}
