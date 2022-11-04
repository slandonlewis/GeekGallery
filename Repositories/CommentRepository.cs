using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using GeekGallery.Models;
using GeekGallery.Utils;
using CloudinaryDotNet.Actions;
using Microsoft.Data.SqlClient;

namespace GeekGallery.Repositories
{
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        private readonly string _connectionString;
        public CommentRepository(IConfiguration configuration) : base(configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public List<Comment> GetAllPostComments(int postId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT c.Id AS CommentId, c.Content, c.UserId, c.PostId,
                                    up.Id, up.FireBaseUserId, up.Name, up.Email,
                                    p.Id, p.UserId, p.Title, p.ImageURL, p.CreationDate,
                                    p.Caption, p.IsPublic, p.CategoryId
                                    FROM Comment c
                                    LEFT JOIN UserProfile up ON c.UserId = up.Id
                                    LEFT JOIN Post p on c.PostId = p.Id
                                    WHERE p.Id = @postId";
                    cmd.Parameters.AddWithValue("@postId", postId);

                    List<Comment> comments = new List<Comment>();

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Comment comment = new Comment()
                        {
                            Id = DbUtils.GetInt(reader, "CommentId"),
                            Content = DbUtils.GetString(reader, "Content"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            PostId = DbUtils.GetInt(reader, "PostId"),
                            Profile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserId"),
                                FireBaseUserId = DbUtils.GetString(reader, "FireBaseUserId"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Email = DbUtils.GetString(reader, "Email")
                            },
                            Post = new Post()
                            {
                                Id = DbUtils.GetInt(reader, "PostId"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                                Title = DbUtils.GetString(reader, "Title"),
                                ImageURL = DbUtils.GetString(reader, "ImageURL"),
                                CreationDate = DbUtils.GetDateTime(reader, "CreationDate"),
                                Caption = DbUtils.GetString(reader, "Caption"),
                                IsPublic = (bool)DbUtils.GetBoolean(reader, "IsPublic")
                            }
                        };

                        comments.Add(comment);
                    }
                    reader.Close();

                    return comments;
                }
            }
        }

        public Comment GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT c.Id AS CommentId, c.Content, c.UserId, c.PostId,
                                    up.Id, up.FireBaseUserId, up.Name, up.Email,
                                    p.Id, p.UserId, p.Title, p.ImageURL, p.CreationDate,
                                    p.Caption, p.IsPublic, p.CategoryId
                                    FROM Comment c
                                    LEFT JOIN UserProfile up ON c.UserId = up.Id
                                    LEFT JOIN Post p on c.PostId = p.Id
                                    WHERE c.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        Comment comment = null;
                        if (reader.Read())
                        {
                            comment = new Comment()
                            {
                                Id = DbUtils.GetInt(reader, "CommentId"),
                                Content = DbUtils.GetString(reader, "Content"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                PostId = DbUtils.GetInt(reader, "PostId"),
                                Profile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "UserId"),
                                    FireBaseUserId = DbUtils.GetString(reader, "FireBaseUserId"),
                                    Name = DbUtils.GetString(reader, "Name"),
                                    Email = DbUtils.GetString(reader, "Email")
                                },
                                Post = new Post()
                                {
                                    Id = DbUtils.GetInt(reader, "PostId"),
                                    UserId = DbUtils.GetInt(reader, "UserId"),
                                    CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                                    Title = DbUtils.GetString(reader, "Title"),
                                    ImageURL = DbUtils.GetString(reader, "ImageURL"),
                                    CreationDate = DbUtils.GetDateTime(reader, "CreationDate"),
                                    Caption = DbUtils.GetString(reader, "Caption"),
                                    IsPublic = (bool)DbUtils.GetBoolean(reader, "IsPublic")
                                }
                            };

                        }
                        return comment;
                    }
                }
            }
        }

        public void Add(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Comment (Content, UserId, PostId)
                                        OUTPUT inserted.Id
                                        VALUES (@content, @userId, @postId)";
                    DbUtils.AddParameter(cmd, "@postId", comment.PostId);
                    DbUtils.AddParameter(cmd, "@userId", comment.UserId);
                    DbUtils.AddParameter(cmd, "@content", comment.Content);
                    comment.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Comment
                           SET Content = @content
                         WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@content", comment.Content);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Comment WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
