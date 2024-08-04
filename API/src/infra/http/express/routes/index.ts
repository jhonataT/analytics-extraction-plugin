import * as express from 'express';
import jwtMiddleware from '../../../../infra/jwt/middlewares/jwt.middleware';
import rateLimitMiddleware from '../../../rateLimiter/middlewares/rate-limit.middleware'; 
import { CreateAnalyticsDataRoute } from './analyticsData/create-analytics-data.express.route';
import { FirebaseAnalyticsDataRepository } from '../../../firebase/repositories/firebase-analytics-data.repository';
import { AnalyticsDataRepository } from '../../../../application/repositories/analytics-data-repository';
import { CreateAnalyticsData } from '../../../../application/usecases/analyticsData/create-analytics-data.usecase';
import { FirebaseResponsibleTokenRepository } from '../../../firebase/repositories/firebase-responsible-token.repository';
import { ResponsibleTokenRepository } from '../../../../application/repositories/responsible-token-repository';
import { GetAnalyticsDataRoute } from './analyticsData/get-analytics-data.express.route';
import { GetAnalyticsData } from '../../../../application/usecases/analyticsData/get-analytics-data.usecase';
import { CreateResponsibleTokenRoute } from './responsibleToken/create-responsible-token.express.route';
import { CreateResponsibleToken } from '../../../../application/usecases/responsibleToken/create-responsible-token.usecase';

const router = express.Router();

const firebaseResponsibleTokenRepository = new FirebaseResponsibleTokenRepository();
const firebaseAnalyticsDataRepository = new FirebaseAnalyticsDataRepository();

const analyticsDataRepository = new AnalyticsDataRepository(firebaseAnalyticsDataRepository);
const responsibleTokenRepository = new ResponsibleTokenRepository(firebaseResponsibleTokenRepository);

const createAnalyticsDataService = new CreateAnalyticsData(
  responsibleTokenRepository,
  analyticsDataRepository
);

const createAnalyticsDataRoute = CreateAnalyticsDataRoute.create(createAnalyticsDataService);

const responsibleTokenService = new CreateResponsibleToken(responsibleTokenRepository);
const createResponsibleTokenRoute = CreateResponsibleTokenRoute.create(responsibleTokenService);

const getAnalyticsDataService = new GetAnalyticsData(analyticsDataRepository);
const getAnalyticsDataRoute = GetAnalyticsDataRoute.create(getAnalyticsDataService);

router.post('/generate-responsible-token', createResponsibleTokenRoute.getHandler());
router.post('/collect', jwtMiddleware, rateLimitMiddleware, createAnalyticsDataRoute.getHandler());
router.get('/list', getAnalyticsDataRoute.getHandler());

export { router };
