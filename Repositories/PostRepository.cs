using System;
using System.Collections.Generic;
using CloudinaryDotNet.Actions;
using System.Linq;
using GeekGallery.Models;
using GeekGallery.Repositories;
using GeekGallery.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System.Reflection.PortableExecutable;

namespace GeekGallery.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        private readonly string _connectionString;
        public PostRepository(IConfiguration configuration) : base(configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public List<Post> GetAllPosts()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.UserId, p.Title, p.ImageURL, p.CreationDate, p.Caption, 
                            p.IsPublic, p.CategoryId, 
                            ca.Id, ca.Name AS CategoryName,
                            up.Id, up.FireBaseUserId, up.Name AS UserName, up.Email,
                            co.Id AS CommentId, co.Content, co.UserId, co.PostId
                          FROM Post p
                            LEFT JOIN UserProfile up on p.UserId = up.Id
                            LEFT JOIN Category ca on p.CategoryId = ca.Id
                            LEFT JOIN Comment co on co.PostId = p.Id
                          WHERE p.IsPublic = 'True'
                            ORDER BY p.CreationDate;";
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var posts = new List<Post>();
                        while (reader.Read())
                        {
                            var postId = DbUtils.GetInt(reader, "Id");

                            var existingPost = posts.FirstOrDefault(p => p.Id == postId);
                            if (existingPost == null)
                            {
                                existingPost = new Post()
                                {
                                    Id = postId,
                                    UserId = DbUtils.GetInt(reader, "UserId"),
                                    CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                                    Title = DbUtils.GetString(reader, "Title"),
                                    ImageURL = DbUtils.GetString(reader, "ImageURL"),
                                    CreationDate = DbUtils.GetDateTime(reader, "CreationDate"),
                                    Caption = DbUtils.GetString(reader, "Caption"),
                                    IsPublic = (bool)DbUtils.GetBoolean(reader, "IsPublic"),
                                    UserProfile = new UserProfile()
                                    {
                                        Id = DbUtils.GetInt(reader, "UserId"),
                                        FireBaseUserId = DbUtils.GetString(reader, "FireBaseUserId"),
                                        Name = DbUtils.GetString(reader, "UserName"),
                                        Email = DbUtils.GetString(reader, "Email")
                                    }
                                };

                                posts.Add(existingPost);
                            }
                        }

                        return posts;
                    }
                }
            }
        }

        public Post GetByIdWithComments(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.UserId, p.Title, p.ImageURL, p.CreationDate, p.Caption, 
                            p.IsPublic, p.CategoryId, 
                            ca.Id, ca.Name AS CategoryName,
                            up.Id, up.FireBaseUserId, up.Name AS UserName, up.Email,
                            co.Id AS CommentId, co.Content, co.UserId, co.PostId
                          FROM Post p
                            LEFT JOIN UserProfile up on p.UserId = up.Id
                            LEFT JOIN Category ca on p.CategoryId = ca.Id
                            LEFT JOIN Comment co on co.PostId = p.Id
                          WHERE p.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var posts = new List<Post>();
                        while (reader.Read())
                        {
                            var postId = DbUtils.GetInt(reader, "Id");

                            var existingPost = posts.FirstOrDefault(p => p.Id == postId);
                            if (existingPost == null)
                            {
                                existingPost = new Post()
                                {
                                    Id = postId,
                                    UserId = DbUtils.GetInt(reader, "UserId"),
                                    CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                                    Title = DbUtils.GetString(reader, "Title"),
                                    ImageURL = DbUtils.GetString(reader, "ImageURL"),
                                    CreationDate = DbUtils.GetDateTime(reader, "CreationDate"),
                                    Caption = DbUtils.GetString(reader, "Caption"),
                                    IsPublic = (bool)DbUtils.GetBoolean(reader, "IsPublic"),
                                    UserProfile = new UserProfile()
                                    {
                                        Id = DbUtils.GetInt(reader, "UserId"),
                                        FireBaseUserId = DbUtils.GetString(reader, "FireBaseUserId"),
                                        Name = DbUtils.GetString(reader, "UserName"),
                                        Email = DbUtils.GetString(reader, "Email")
                                    },
                                    Comments = new List<Comment>()
                                };

                                posts.Add(existingPost);
                            }

                            if (DbUtils.IsNotDbNull(reader, "CommentId"))
                            {
                                existingPost.Comments.Add(new Comment()
                                {
                                    Id = DbUtils.GetInt(reader, "CommentId"),
                                    Content = DbUtils.GetString(reader, "Content"),
                                    UserId = DbUtils.GetInt(reader, "UserId"),
                                    PostId = postId,
                                });
                            }
                        }

                        return posts[0];
                    }
                }
            }

        }

        public List<Post> GetMyPosts(int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.UserId, p.Title, p.ImageURL, p.CreationDate, p.Caption, 
                            p.IsPublic, p.CategoryId, 
                            ca.Id, ca.Name AS CategoryName,
                            up.Id, up.FireBaseUserId, up.Name AS UserName, up.Email,
                            co.Id AS CommentId, co.Content, co.UserId, co.PostId
                          FROM Post p
                            LEFT JOIN UserProfile up on p.UserId = up.Id
                            LEFT JOIN Category ca on p.CategoryId = ca.Id
                            LEFT JOIN Comment co on co.PostId = p.Id
                          WHERE p.UserId = @UserId
                            ORDER BY p.CreationDate;";

                    cmd.Parameters.AddWithValue("@UserId", userProfileId);
                    var posts = new List<Post>();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var postId = DbUtils.GetInt(reader, "Id");

                            var existingPost = posts.FirstOrDefault(p => p.Id == postId);
                            if (existingPost == null)
                            {
                                existingPost = new Post()
                                {
                                    Id = postId,
                                    UserId = DbUtils.GetInt(reader, "UserId"),
                                    CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                                    Title = DbUtils.GetString(reader, "Title"),
                                    ImageURL = DbUtils.GetString(reader, "ImageURL"),
                                    CreationDate = DbUtils.GetDateTime(reader, "CreationDate"),
                                    Caption = DbUtils.GetString(reader, "Caption"),
                                    IsPublic = (bool)DbUtils.GetBoolean(reader, "IsPublic"),
                                    UserProfile = new UserProfile()
                                    {
                                        Id = DbUtils.GetInt(reader, "UserId"),
                                        FireBaseUserId = DbUtils.GetString(reader, "FireBaseUserId"),
                                        Name = DbUtils.GetString(reader, "UserName"),
                                        Email = DbUtils.GetString(reader, "Email")
                                    }
                                };

                                posts.Add(existingPost);
                            }
                        }

                        return posts;
                    }
                }
            }
        }

        // needs to set creation date to current time
        public void Add(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Post (
                            UserId, Title, ImageURL, CreationDate, Caption, IsPublic, CategoryId )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @UserId, @Title, @ImageURL, @CreationDate, @Caption, @IsPublic, @CategoryId)";
                    cmd.Parameters.AddWithValue("@UserId", post.UserId);
                    cmd.Parameters.AddWithValue("@Title", post.Title);
                    cmd.Parameters.AddWithValue("@ImageURL", post.ImageURL);
                    cmd.Parameters.AddWithValue("@CreationDate", post.CreationDate);
                    cmd.Parameters.AddWithValue("@Caption", post.Caption);
                    cmd.Parameters.AddWithValue("@IsPublic", post.IsPublic);
                    cmd.Parameters.AddWithValue("@CategoryId", post.CategoryId);

                    post.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Post
                               SET Title = @Title,
                                   Caption = @Caption,
                                    IsPublic = @IsPublic,
                                    CategoryId = @CategoryId
                         WHERE Id = @Id";
                    cmd.Parameters.AddWithValue("@Title", post.Title);
                    cmd.Parameters.AddWithValue("@Caption", post.Caption);
                    cmd.Parameters.AddWithValue("@IsPublic", post.IsPublic);
                    cmd.Parameters.AddWithValue("@CategoryId", post.CategoryId);
                    DbUtils.AddParameter(cmd, "@Id", post.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        //update post goes below this line
        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Post WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}