CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [FireBaseUserId] nvarchar(255) NOT NULL,
  [Name] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Post] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserId] int NOT NULL,
  [Title] nvarchar(255) NOT NULL,
  [Image] varbinary(max) NOT NULL,
  [CreationDate] datetime NOT NULL,
  [Caption] nvarchar(255),
  [IsPublic] bit NOT NULL
)
GO

CREATE TABLE [Comment] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Content] nvarchar(255) NOT NULL,
  [UserId] int NOT NULL,
  [PostId] int NOT NULL
)
GO

CREATE TABLE [Genre] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [PostGenre] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [PostId] int NOT NULL,
  [GenreId] int NOT NULL
)
GO

ALTER TABLE [Post] ADD FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Comment] ADD FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Comment] ADD FOREIGN KEY ([PostId]) REFERENCES [Post] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [PostGenre] ADD FOREIGN KEY ([PostId]) REFERENCES [Post] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [PostGenre] ADD FOREIGN KEY ([GenreId]) REFERENCES [Genre] ([Id])
GO
