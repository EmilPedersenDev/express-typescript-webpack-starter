import express, { Router } from 'express';
import { testApiCall } from '../controllers/test-controller';

const testRouter = Router();

testRouter.route('/').get(testApiCall);

export default testRouter;
