import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import SuperfluidChannel from './superfluidChannel';
import middlewares from '../../api/middlewares';
import { logger } from 'ethers';
const route = Router();

export default (app: Router) => {
  app.use('/showrunners/superfluid', route);

  // weekly status

  /**
   * @dev for sending rebalance notifications
   */
  route.post(
    '/testing',
    celebrate({
      body: Joi.object({
        simulate: [Joi.bool(), Joi.object()],
      }),
    }),
    middlewares.onlyLocalhost,
    async (req: Request, res: Response, next: NextFunction) => {
      const Logger = Container.get('logger');
      logger.debug('Calling /showrunners/superfluid/send_message ticker endpoint with body: %o', req.body);
      try {
        const superfluid = Container.get(SuperfluidChannel);
        const response = await superfluid.sendNewInboundDistribution(req.body.simulate);
        return res.status(201).json(response);
      } catch (e) {
        logger.info('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
