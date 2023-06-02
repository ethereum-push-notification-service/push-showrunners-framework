const mongoose = require('mongoose');

const GaugeBribesSchema = new mongoose.Schema({
  fee: String,
  bribe: String,
});

const GaugeSchema = new mongoose.Schema({
  apr: Number,
  projectedApr: Number,
  voteApr: Number,
  totalSupply: Number,
  address: String,
  fee: String,
  bribe: String,
  weight: Number,
  bribes: {
    fee: { type: [GaugeBribesSchema], default: null },
    bribe: { type: [GaugeBribesSchema], default: null },
  },
});

const TokenSchema = new mongoose.Schema({
  address: String,
  reserve: Number,
});

const poolSchema = new mongoose.Schema(
  {
    address: String,
    symbol: String,
    totalSupply: Number,
    isGamma: Boolean,
    type: String,
    gauge: GaugeSchema,
    token0: TokenSchema,
    token1: TokenSchema,
    isValid: Boolean,
  },
  { strict: false },
);

const PoolModel = mongoose.model('ThenaDB', poolSchema);

export default PoolModel;
