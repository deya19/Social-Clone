export const queryList = {
  GET_USER_NAME:"SELECT * FROM users WHERE username = ?",

  INSERT_USER_NAME:"INSERT INTO users (`username`,`email`,`password`,`name`) VALUE (?)",

  AUDIT_QUERY: "INSERT INTO app_audit (`audit_action`, `audit_data`, `audit_status`, `audit_error`, `audit_by`, `audit_on`) VALUE (?)",

  GET_COMMENT_QUERY:`SELECT c.*, u.id AS userId, name, profilePi FROM comments AS c JOIN users AS u ON (u.id = c.userId)
  WHERE c.postId = ? ORDER BY c.createdAt DESC`,

  ADD_COMMENT_QUERY:"INSERT INTO comments (`desc`,`createdAt`,`userId`,`postId`) VALUES (?)",

  DELETE_COMMENT_QUERY:"DELETE FROM comments WHERE `id`=? and `userId` =?",

  GET_LIKES_QUERY:"SELECT userId From likes WHERE postId = ?",
  
  ADD_LIKE_QUERY:"INSERT INTO likes (`userId`,`postId`) VALUES (?)",
  
  DELETE_LIKE_QUERY:"DELETE FROM likes WHERE `userId`= ? AND `postId` = ?",
  
  GET_PERSONAL_POST:`SELECT p.*, u.id AS userId, name, profilePi FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createAt DESC`,
  
  
  GET_PERSONALPOST_WITH_FOLLOWER_POST:`SELECT p.*, u.id AS userId, name, profilePi FROM posts AS p JOIN users AS u ON (u.id = p.userId)
  LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ?
  ORDER BY p.createAt DESC`,
  
  ADD_POST_QUERY:"INSERT INTO posts (`desc`,`img`,`createAt`,`userId`) VALUES (?)",
  
  DELETE_POST_QUERY:"DELETE FROM posts WHERE `id`=? and `userId` =? ",
  
  GET_RELATIONSHIPS_QUERY:"SELECT followerUserId From relationships WHERE followedUserId = ?",
  
  ADD_RELATIONSHIPS_QUERY:"INSERT INTO relationships (`followerUserId`,`followedUserId`) VALUES (?)",
  
  DELETET_RELATIONSHIPS_QUERY:"DELETE FROM relationships WHERE `followerUserId`= ? AND `followedUserId` = ?",
  
  GET_USER_QUERY:"SELECT * FROM users WHERE id = ?",
  
  UPDATE_USER_QUERY:"UPDATE users SET `name`=?,`city`=?,`website`=?,`email`=?,`profilePi`=?,`coverPi`=? WHERE id=?",
  
  GET_STORIES_QUERY:`SELECT s.*, name From stories AS s JOIN users u ON (u.id = s.userId) 
  LEFT JOIN relationships AS r ON (s.userId = r.followedUserId and r.followerUserId = ?) LIMIT 4 `,
  
  GET_ONE_STORY_QUERY:"SELECT * FROM stories WHERE id = ?",
  
  ADD_STORY_QUERIE:"INSERT INTO stories(`img`,`createdAt`,`userId`) VALUES (?)",
  
  DELETE_STORY_QUERIE:"DELETE FROM stories WHERE `id` = ? AND `userId` = ?",
}