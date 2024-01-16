import { model, Schema } from 'mongoose';

export interface EthTickerData {
    lastCycle?: number;
    subscriber?: string;
  }

export interface EthTickerGlobal {
  prevEthPrice?: number;
  cycles?: number;
}

  const ethTickerSchema = new Schema<EthTickerData>({
    subscriber: {
      type: String,
    },
    lastCycle: {
      type: Number,
    }
  });

  const ethTickerGlobalSchema = new Schema<EthTickerGlobal>({
    id: {
      type: String,
    },
    prevEthPrice: {
      type: Number,
    },
    cycles: {
      type: Number,
    }
  });

  export const ethTickerModel = model<EthTickerData>('ethTickerDB', ethTickerSchema);
  export const ethTickerGlobalModel = model<EthTickerGlobal>('ethTickerDB', ethTickerGlobalSchema);