import { Router, Request, Response, NextFunction } from 'express';
import Container from 'typedi';
import middlewares from '../../api/middlewares';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import ThenaChannel from './thenaChannel';

const route = Router();

export default (app: Router) => {
  app.use('/showrunners/thena', route);

  route.post(
    '/test',
    celebrate({
      body: Joi.object({
        simulate: [Joi.bool(), Joi.object()],
      }),
    }),
    middlewares.onlyLocalhost,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling /showrunners/decentraland ticker endpoint with body: %o', req.body);
      try {
        const thenaChannel = Container.get(ThenaChannel);
        await thenaChannel.sendMessageToContract(req.body.simulate);
        res.status(201).send('success');
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
  route.post(
    '/newpools',
    celebrate({
      body: Joi.object({
        simulate: [Joi.bool(), Joi.object()],
      }),
    }),
    middlewares.onlyLocalhost,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling /showrunners/thena/newpools endpoint with body: %o', req.body);
      try {
        const thenaChannel = Container.get(ThenaChannel);
        await thenaChannel.sendNotifsForNewPools(req.body.simulate);
        res.status(201).send('success');
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
  route.post(
    '/bribe',
    celebrate({
      body: Joi.object({
        simulate: [Joi.bool(), Joi.object()],
      }),
    }),
    middlewares.onlyLocalhost,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling /showrunners/thena/bribe endpoint with body: %o', req.body);
      try {
        const thenaChannel = Container.get(ThenaChannel);
        await thenaChannel.sendNotifsForBribedPools(req.body.simulate);
        res.status(201).send('success');
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
  route.post(
    '/medium',
    celebrate({
      body: Joi.object({
        simulate: [Joi.bool(), Joi.object()],
      }),
    }),
    middlewares.onlyLocalhost,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling /showrunners/thena/medium endpoint with body: %o', req.body);
      try {
        const thenaChannel = Container.get(ThenaChannel);
        await thenaChannel.sendNotifsForNewMediumPosts(req.body.simulate);
        res.status(201).send('success');
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
