using Microsoft.AspNetCore.Mvc;
using System;
using GeekGallery.Repositories;
using GeekGallery.Models;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;

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
        [Authorize]
        [HttpGet]
        public IActionResult GetWithComments()
        {
            var posts = _postRepository.GetAllPosts();
            return Ok(posts);
        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_postRepository.GetByIdWithComments(id));
        }

        [Authorize]
        [HttpGet("myposts")]
        public IActionResult GetMyPosts(int UserId)
        {
            return Ok(_postRepository.GetMyPosts(UserId));
        }

        [Authorize]
        [HttpPost]
        public IActionResult Create(Post post)
        {
            _postRepository.Add(post);
            return CreatedAtAction("Get", new { id = post.Id }, post);
        }

        [Authorize]
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
        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _postRepository.Delete(id);
            return NoContent();
        }
    }
}
