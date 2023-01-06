import { model, Schema } from 'mongoose';

export interface ISuperfluidData {
  //   assets?: object[];
  //   timestamp?: number;
  //   basePrice?: number;
  tokenId?: string;
  subscriber?: string;
  lastTimestamp?: string;
}

export interface ISuperfluidStreams {
  id?: string;
  lastTimestamp?: number;
  lastBlockNumber?: number; // for IDA distribution
}

const superfluidSchema = new Schema({
  tokenId: {
    type: String,
  },
  subscriber: {
    type: String,
  },
  lastTimestamp: {
    type: String,
  },
});

const superFluidStreamSchema = new Schema({
  id: {
    type: String,
  },
  lastTimestamp: {
    type: Number,
  },
  lastBlockNumber: {
    type: Number,
  },
});

export const superFluidStreamModel = model<ISuperfluidStreams>('superfluidStream', superFluidStreamSchema);

export default model<ISuperfluidData>('SuperfluidDataDB', superfluidSchema);
