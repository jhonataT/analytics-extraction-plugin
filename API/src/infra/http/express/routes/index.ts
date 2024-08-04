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
import { GetResponsibleTokenRoute } from './responsibleToken/get-responsible-token.express.route';
import { GetResponsibleToken } from '../../../../application/usecases/responsibleToken/get-responsible-token.usecase';

// Applied Singleton Pattern: by @jhonataT
// Applied Dependency Injection pattern: by @jhonataT
// Applied Middleware Pattern: by @jhonataT

const router = express.Router();

const firebaseResponsibleTokenRepository = FirebaseResponsibleTokenRepository.init();
const firebaseAnalyticsDataRepository = FirebaseAnalyticsDataRepository.init();

const analyticsDataRepository = AnalyticsDataRepository.init(firebaseAnalyticsDataRepository);
const responsibleTokenRepository = ResponsibleTokenRepository.init(firebaseResponsibleTokenRepository);

const createAnalyticsDataService = CreateAnalyticsData.init(responsibleTokenRepository, analyticsDataRepository);

const createAnalyticsDataRoute = CreateAnalyticsDataRoute.create(createAnalyticsDataService);

const responsibleTokenService = CreateResponsibleToken.init(responsibleTokenRepository);
const createResponsibleTokenRoute = CreateResponsibleTokenRoute.create(responsibleTokenService);

const getResponsibleTokenService = GetResponsibleToken.init(responsibleTokenRepository);
const getResponsibleTokenRoute = GetResponsibleTokenRoute.create(getResponsibleTokenService);

const getAnalyticsDataService = GetAnalyticsData.init(analyticsDataRepository);
const getAnalyticsDataRoute = GetAnalyticsDataRoute.create(getAnalyticsDataService);

router.get('/get-responsible-token', jwtMiddleware, getResponsibleTokenRoute.getHandler());
// router.post('/generate-responsible-token', createResponsibleTokenRoute.getHandler());
router.post('/collect', jwtMiddleware, rateLimitMiddleware, createAnalyticsDataRoute.getHandler());
router.get('/list', getAnalyticsDataRoute.getHandler());

export { router };
