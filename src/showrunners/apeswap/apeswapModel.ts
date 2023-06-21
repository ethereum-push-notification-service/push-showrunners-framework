import { model, Schema } from 'mongoose';

export interface IApeSwap {
  _id: String;
  data: any[];
}

const ApeswapSchema = new Schema<IApeSwap>({
  _id: String,
  data: Array,
});

export default model<IApeSwap>('ApeSwap', ApeswapSchema);
