import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import middlewares from '../../api/middlewares';
import { celebrate, Joi } from 'celebrate';
import ApeswapChannel from './apeswapChannel';

const route = Router();

export default (app: Router) => {
  app.use('/showrunners/apeswap', route);

  route.post(
    '/trigger_pools_check',
    celebrate({
      body: Joi.object({
        simulate: [Joi.bool(), Joi.object()],
      }),
    }),
    middlewares.onlyLocalhost,
    async (req: Request, res: Response, next: NextFunction) => {
      const Logger: any = Container.get('logger');

      try {
        const apeswap = Container.get(ApeswapChannel);
        const response = await apeswap.sendPoolNotificationToUsers(req.body.simulate);
        return res.status(201).json({ success: true, data: response });
      } catch (e) {
        Logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.post(
    '/trigger_bonds_check',
    celebrate({
      body: Joi.object({
        simulate: [Joi.bool(), Joi.object()],
      }),
    }),
    middlewares.onlyLocalhost,
    async (req: Request, res: Response, next: NextFunction) => {
      const Logger: any = Container.get('logger');

      try {
        const apeswap = Container.get(ApeswapChannel);
        const response = await apeswap.sendBondNotificationToUsers(req.body.simulate);
        return res.status(201).json({ success: true, data: response });
      } catch (e) {
        Logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.post(
    '/trigger_discount_check',
    celebrate({
      body: Joi.object({
        simulate: [Joi.bool(), Joi.object()],
      }),
    }),
    middlewares.onlyLocalhost,
    async (req: Request, res: Response, next: NextFunction) => {
      const Logger: any = Container.get('logger');

      try {
        const apeswap = Container.get(ApeswapChannel);
        const response = await apeswap.sendDiscountNotifications(req.body.simulate);
        return res.status(201).json({ success: true, data: response });
      } catch (e) {
        Logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
