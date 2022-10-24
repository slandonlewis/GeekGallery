using Microsoft.AspNetCore.Mvc;
using System;
using GeekGallery.Repositories;
using GeekGallery.Models;
using CloudinaryDotNet.Actions;

namespace GeekGallery.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        public PostController(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        [HttpGet]
        public IActionResult GetWithComments()
        {
            var posts = _postRepository.GetAllPosts();
            return Ok(posts);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_postRepository.GetByIdWithComments(id));
        }

        [HttpGet("myposts")]
        public IActionResult GetMyPosts(int UserId)
        {
            return Ok(_postRepository.GetMyPosts(UserId));
        }

        [HttpPost]
        public IActionResult Create(Post post)
        {
            _postRepository.Add(post);
            return CreatedAtAction("Get", new { id = post.Id }, post);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Post post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }

            _postRepository.Update(post);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _postRepository.Delete(id);
            return NoContent();
        }
    }
}
