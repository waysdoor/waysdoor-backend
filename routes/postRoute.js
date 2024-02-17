const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const postController = require('../controller/postController')
router.post('/api/add-post', upload.single('image'), postController.addPost)
router.get('/api/posts',postController.getPosts)

module.exports = router
