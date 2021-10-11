import express from 'express';

// import { authMiddleware } from '../middlewares/authMiddleware.js';
const postingRouter = express.Router();

postingRouter.route('/');

postingRouter.route('/:id');

postingRouter.route('/:id/comments');

export default postingRouter;
