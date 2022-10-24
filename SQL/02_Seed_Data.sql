SET IDENTITY_INSERT UserProfile ON
INSERT INTO UserProfile 
    (Id, FireBaseUserId, [Name], Email)
VALUES 
    (1, 'dOZKO3jrFofnW5gZRL63XtatmJO2', 'terrorzone03', 'first@gmail.com'), 
    (2, 'fDGpPywLP7e4cQR7kT1JRYnyPNj1', 'Leth Sewis', 'second@gmail.com'),
    (3, 'ZezzBDNqaOPD7x9gZZDpmUKGdtL2', 'Beans McBeanFace', 'third@gmail.com'), 
    (4, 'ryu8H3ThHrhn0IGz5R8syVow83h2', 'McLovin', 'fourth@gmail.com'), 
    (5, 'F9xMec3a95XCwfdTQLan7JTDxfE2', 'Barracuda', 'fifth@gmail.com'), 
    (6, 'OXg38e4hDahLIYHSqWBBuxsmqZi2', 'Ligma', 'sixth@gmail.com'), 
    (7, 'fWwGlr5fiaTK1avwWHyKtbcF5vD2', 'Goose', 'seventh@gmail.com');
SET IDENTITY_INSERT UserProfile OFF

SET IDENTITY_INSERT Category ON
INSERT INTO Category 
    (Id, [Name])
VALUES 
    (1, 'Anime'),
    (2, 'Manga'),
    (3, 'Comics'),
    (4, 'TV'),
    (5, 'Cartoons'),
    (6, 'Movies'),
    (7, 'Gaming'),
    (8, 'Internet Celebrities'),
    (9, 'Programming'),
    (10, 'Sports');
SET IDENTITY_INSERT Category OFF

SET IDENTITY_INSERT Comment ON
INSERT INTO Comment 
    (Id, Content, UserId, PostId)
VALUES 
    (1, 'This is cool!', 2, 1), 
    (2, 'I like beans', 6, 1), 
    (3, 'Great work!', 5, 2), 
    (4, 'Not enough beans smh', 3, 3), 
    (5, '@Beans_McBeanFace facts', 6, 3), 
    (6, '@Ligma @Beans_McBeanFace bruh...', 7, 3), 
    (7, 'Wow what a try hard', 6, 4), 
    (8, '@Goose is a sweaty try hard LOL', 6, 4); 
SET IDENTITY_INSERT Comment OFF

SET IDENTITY_INSERT Post ON
INSERT INTO Post
    (Id, UserId, Title, ImageURL, CreationDate, Caption, IsPublic, CategoryId)
VALUES 
    (1, 1, 'Ichigo Bankai Fanart', 'N/A', '20220719 10:34:09 AM', 'Here is some fanart of Ichigo Kurosaki from Bleach', 1, 1), 
    (2, 2, 'Git Push Origin Main', 'N/A', '20220918 12:52:17 PM', 'How I code', 1, 9), 
    (3, 5, 'Bobs Burgers Style Self Portrait', 'N/A', '20220927 10:34:09 AM', 'My GitHub avatar', 1, 5), 
    (4, 7, 'Tiffanys Titans Fanart', 'N/A', '20221018 12:05:27 PM', 'Not the best but still proud of how this turned out', 1, 10);
SET IDENTITY_INSERT Post OFF

SET IDENTITY_INSERT PostCategory ON
INSERT INTO PostCategory
    (Id, PostId, CategoryId)
VALUES 
    (1, 1, 1), 
    (2, 2, 9), 
    (3, 3, 5), 
    (4, 4, 10);
SET IDENTITY_INSERT PostCategory OFF