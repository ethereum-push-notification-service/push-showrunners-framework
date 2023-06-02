import ThenaChannel from './thenaChannel';
import fakeCache from './mockCache';
import Container from 'typedi';

// mock logger object
const mockLogger: any = {
  info: (...___: any[]) => true,
  debug: (...___: any[]) => true,
  error: (...value: any[]) => console.log('test', ...value),
};

describe('ThenaFi', () => {
  beforeAll(() => {
    Container.set('cached', fakeCache);
  });
  it('should send notifications for new pools', async () => {
    // Arrange
    const simulate = {
      payloadMode: 'simulate',
      txMode: 'simulate',
      logicOverride: {
        mode: true,
        oldPools: [
          {
            address: '0x9698e0c7af13b6cef8017a5c34eb2b3d053c491c',
            symbol: 'vAMM-BNBx/SD',
            totalSupply: 1913.6445575721416,
            isGamma: false,
            type: 'Volatile',
            gauge: {
              apr: 59.65830984228517,
              projectedApr: 0,
              voteApr: 0,
              totalSupply: 1462.7562722493517,
              address: '0xcC51Cf273D7Bf3A9318C2Db35beCAc9EB2ef7D0a',
              fee: '0x849061dDE9a2f2f37Dd8e8eA3862d1500488d8f4',
              bribe: '0x9b2bA26F83bD4c639a323064A66A96c18CE5D2B5',
              weight: 0,
              bribes: {
                fee: null,
                bribe: null,
              },
            },
            token0: {
              address: '0x1bdd3Cf7F79cfB8EdbB955f20ad99211551BA275',
              reserve: 100.2337512449166,
            },
            token1: {
              address: '0x3BC5AC0dFdC871B365d159f728dd1B9A0B5481E8',
              reserve: 36612.60564801329,
            },
            isValid: true,
          },
          {
            address: '0x1f3ca66c98d682fa1bec31264692dad4f17340bc',
            symbol: 'sAMM-HAY/USD+',
            totalSupply: 0.04776734484522372,
            isGamma: false,
            type: 'Stable',
            gauge: {
              apr: 20.223895492142876,
              projectedApr: 83.43586920075816,
              voteApr: 509.6663421660913,
              totalSupply: 0.04726581325784352,
              address: '0xB0a69681d82c90B80B689BaF43ccfa6270f1DdE5',
              fee: '0xDf668DE731E524EBfCAb57E91a739E357352a244',
              bribe: '0x1c5f9A3464371B441AeAb28E4ed2a23cd1A9c6c3',
              weight: 25469.058487525937,
              bribes: {
                fee: null,
                bribe: [
                  {
                    amount: '549.828236',
                    symbol: 'USD+',
                    address: '0xe80772Eaf6e2E18B651F160Bc9158b2A5caFCA65',
                    decimals: 6,
                  },
                ],
              },
            },
            token0: {
              address: '0x0782b6d8c4551B9760e74c0545a9bCD90bdc41E5',
              reserve: 43932.98874568394,
            },
            token1: {
              address: '0xe80772Eaf6e2E18B651F160Bc9158b2A5caFCA65',
              reserve: 51638.799334,
            },
            isValid: true,
          },
        ],
        latestPools: [
          {
            address: '0x9698e0c7af13b6cef8017a5c34eb2b3d053c491c',
            symbol: 'vAMM-BNBx/SD',
            totalSupply: 1913.6445575721416,
            isGamma: false,
            type: 'Volatile',
            gauge: {
              apr: 59.65830984228517,
              projectedApr: 0,
              voteApr: 0,
              totalSupply: 1462.7562722493517,
              address: '0xcC51Cf273D7Bf3A9318C2Db35beCAc9EB2ef7D0a',
              fee: '0x849061dDE9a2f2f37Dd8e8eA3862d1500488d8f4',
              bribe: '0x9b2bA26F83bD4c639a323064A66A96c18CE5D2B5',
              weight: 0,
              bribes: {
                fee: null,
                bribe: null,
              },
            },
            token0: {
              address: '0x1bdd3Cf7F79cfB8EdbB955f20ad99211551BA275',
              reserve: 100.2337512449166,
            },
            token1: {
              address: '0x3BC5AC0dFdC871B365d159f728dd1B9A0B5481E8',
              reserve: 36612.60564801329,
            },
            isValid: true,
          },
          {
            address: '0x1f3ca66c98d682ebec31264692dad4f17340bc',
            symbol: 'sAMM-HAY/USD+',
            totalSupply: 0.04776734484522372,
            isGamma: false,
            type: 'Stable',
            gauge: {
              apr: 20.223895492142876,
              projectedApr: 83.43586920075816,
              voteApr: 509.6663421660913,
              totalSupply: 0.04726581325784352,
              address: '0xB0a69681d82c90B80B689BaF43ccfa6270f1DdE5',
              fee: '0xDf668DE731E524EBfCAb57E91a739E357352a244',
              bribe: '0x1c5f9A3464371B441AeAb28E4ed2a23cd1A9c6c3',
              weight: 25469.058487525937,
              bribes: {
                fee: null,
                bribe: [
                  {
                    amount: '549.828236',
                    symbol: 'USD+',
                    address: '0xe80772Eaf6e2E18B651F160Bc9158b2A5caFCA65',
                    decimals: 6,
                  },
                ],
              },
            },
            token0: {
              address: '0x0782b6d8c4551B9760e74c0545a9bCD90bdc41E5',
              reserve: 43932.98874568394,
            },
            token1: {
              address: '0xe80772Eaf6e2E18B651F160Bc9158b2A5caFCA65',
              reserve: 51638.799334,
            },
            isValid: true,
          },
        ],
      },
      txOverride: {
        mode: true,
        notificationType: 1,
        recipient: ['0x78906ad82D666981c246Ed7a562Acd69fb49610A'],
      },
    };

    const thenaChannel = new ThenaChannel(mockLogger as any, fakeCache);

    // Act
    const response = await thenaChannel.sendNotifsForNewPools(simulate);
    expect(response.notifSent).toEqual(true);
  });

  it('should not send notifications for existing pools', async () => {
    // Arrange
    const simulate = {
      payloadMode: 'simulate',
      txMode: 'simulate',
      logicOverride: {
        mode: true,
        oldPools: [
          {
            address: '0x9698e0c7af13b6cef8017a5c34eb2b3d053c491c',
            symbol: 'vAMM-BNBx/SD',
            totalSupply: 1913.6445575721416,
            isGamma: false,
            type: 'Volatile',
            gauge: {
              apr: 59.65830984228517,
              projectedApr: 0,
              voteApr: 0,
              totalSupply: 1462.7562722493517,
              address: '0xcC51Cf273D7Bf3A9318C2Db35beCAc9EB2ef7D0a',
              fee: '0x849061dDE9a2f2f37Dd8e8eA3862d1500488d8f4',
              bribe: '0x9b2bA26F83bD4c639a323064A66A96c18CE5D2B5',
              weight: 0,
              bribes: {
                fee: null,
                bribe: null,
              },
            },
            token0: {
              address: '0x1bdd3Cf7F79cfB8EdbB955f20ad99211551BA275',
              reserve: 100.2337512449166,
            },
            token1: {
              address: '0x3BC5AC0dFdC871B365d159f728dd1B9A0B5481E8',
              reserve: 36612.60564801329,
            },
            isValid: true,
          },
          {
            address: '0x1f3ca66c98d682ebec31264692dad4f17340bc',
            symbol: 'sAMM-HAY/USD+',
            totalSupply: 0.04776734484522372,
            isGamma: false,
            type: 'Stable',
            gauge: {
              apr: 20.223895492142876,
              projectedApr: 83.43586920075816,
              voteApr: 509.6663421660913,
              totalSupply: 0.04726581325784352,
              address: '0xB0a69681d82c90B80B689BaF43ccfa6270f1DdE5',
              fee: '0xDf668DE731E524EBfCAb57E91a739E357352a244',
              bribe: '0x1c5f9A3464371B441AeAb28E4ed2a23cd1A9c6c3',
              weight: 25469.058487525937,
              bribes: {
                fee: null,
                bribe: [
                  {
                    amount: '549.828236',
                    symbol: 'USD+',
                    address: '0xe80772Eaf6e2E18B651F160Bc9158b2A5caFCA65',
                    decimals: 6,
                  },
                ],
              },
            },
            token0: {
              address: '0x0782b6d8c4551B9760e74c0545a9bCD90bdc41E5',
              reserve: 43932.98874568394,
            },
            token1: {
              address: '0xe80772Eaf6e2E18B651F160Bc9158b2A5caFCA65',
              reserve: 51638.799334,
            },
            isValid: true,
          },
        ],
        latestPools: [
          {
            address: '0x9698e0c7af13b6cef8017a5c34eb2b3d053c491c',
            symbol: 'vAMM-BNBx/SD',
            totalSupply: 1913.6445575721416,
            isGamma: false,
            type: 'Volatile',
            gauge: {
              apr: 59.65830984228517,
              projectedApr: 0,
              voteApr: 0,
              totalSupply: 1462.7562722493517,
              address: '0xcC51Cf273D7Bf3A9318C2Db35beCAc9EB2ef7D0a',
              fee: '0x849061dDE9a2f2f37Dd8e8eA3862d1500488d8f4',
              bribe: '0x9b2bA26F83bD4c639a323064A66A96c18CE5D2B5',
              weight: 0,
              bribes: {
                fee: null,
                bribe: null,
              },
            },
            token0: {
              address: '0x1bdd3Cf7F79cfB8EdbB955f20ad99211551BA275',
              reserve: 100.2337512449166,
            },
            token1: {
              address: '0x3BC5AC0dFdC871B365d159f728dd1B9A0B5481E8',
              reserve: 36612.60564801329,
            },
            isValid: true,
          },
          {
            address: '0x1f3ca66c98d682ebec31264692dad4f17340bc',
            symbol: 'sAMM-HAY/USD+',
            totalSupply: 0.04776734484522372,
            isGamma: false,
            type: 'Stable',
            gauge: {
              apr: 20.223895492142876,
              projectedApr: 83.43586920075816,
              voteApr: 509.6663421660913,
              totalSupply: 0.04726581325784352,
              address: '0xB0a69681d82c90B80B689BaF43ccfa6270f1DdE5',
              fee: '0xDf668DE731E524EBfCAb57E91a739E357352a244',
              bribe: '0x1c5f9A3464371B441AeAb28E4ed2a23cd1A9c6c3',
              weight: 25469.058487525937,
              bribes: {
                fee: null,
                bribe: [
                  {
                    amount: '549.828236',
                    symbol: 'USD+',
                    address: '0xe80772Eaf6e2E18B651F160Bc9158b2A5caFCA65',
                    decimals: 6,
                  },
                ],
              },
            },
            token0: {
              address: '0x0782b6d8c4551B9760e74c0545a9bCD90bdc41E5',
              reserve: 43932.98874568394,
            },
            token1: {
              address: '0xe80772Eaf6e2E18B651F160Bc9158b2A5caFCA65',
              reserve: 51638.799334,
            },
            isValid: true,
          },
        ],
      },
      txOverride: {
        mode: true,
        notificationType: 1,
        recipient: ['0x78906ad82D666981c246Ed7a562Acd69fb49610A'],
      },
    };

    const thenaChannel = new ThenaChannel(mockLogger as any, fakeCache);

    // Act
    const reponse = await thenaChannel.sendNotifsForNewPools(simulate);

    // Assert
    expect(reponse.notifSent).toEqual(false);
  });
  it('should send notifications for bribed pools', async () => {
    // Arrange
    const simulate = {
      payloadMode: 'simulate',
      txMode: 'simulate',
      logicOverride: {
        mode: true,
        oldPools: [
          {
            address: '0x9698e0c7af13b6cef8017a5c34eb2b3d053c491c',
            symbol: 'vAMM-BNBx/SD',
            totalSupply: 1913.6445575721416,
            isGamma: false,
            type: 'Volatile',
            gauge: {
              apr: 59.65830984228517,
              projectedApr: 0,
              voteApr: 0,
              totalSupply: 1462.7562722493517,
              address: '0xcC51Cf273D7Bf3A9318C2Db35beCAc9EB2ef7D0a',
              fee: '0x849061dDE9a2f2f37Dd8e8eA3862d1500488d8f4',
              bribe: '0x9b2bA26F83bD4c639a323064A66A96c18CE5D2B5',
              weight: 0,
              bribes: {
                fee: null,
                bribe: null,
              },
            },
            token0: {
              address: '0x1bdd3Cf7F79cfB8EdbB955f20ad99211551BA275',
              reserve: 100.2337512449166,
            },
            token1: {
              address: '0x3BC5AC0dFdC871B365d159f728dd1B9A0B5481E8',
              reserve: 36612.60564801329,
            },
            isValid: true,
          },
          {
            address: '0x1f3ca66c98d682fa1bec31264692dad4f17340bc',
            symbol: 'sAMM-HAY/USD+',
            totalSupply: 0.04776734484522372,
            isGamma: false,
            type: 'Stable',
            gauge: {
              apr: 20.223895492142876,
              projectedApr: 83.43586920075816,
              voteApr: 509.6663421660913,
              totalSupply: 0.04726581325784352,
              address: '0xB0a69681d82c90B80B689BaF43ccfa6270f1DdE5',
              fee: '0xDf668DE731E524EBfCAb57E91a739E357352a244',
              bribe: '0x1c5f9A3464371B441AeAb28E4ed2a23cd1A9c6c3',
              weight: 25469.058487525937,
              bribes: {
                fee: null,
                bribe: [
                  {
                    amount: '549.828236',
                    symbol: 'USD+',
                    address: '0xe80772Eaf6e2E18B651F160Bc9158b2A5caFCA65',
                    decimals: 6,
                  },
                ],
              },
            },
            token0: {
              address: '0x0782b6d8c4551B9760e74c0545a9bCD90bdc41E5',
              reserve: 43932.98874568394,
            },
            token1: {
              address: '0xe80772Eaf6e2E18B651F160Bc9158b2A5caFCA65',
              reserve: 51638.799334,
            },
            isValid: true,
          },
        ],
        latestPools: [
          {
            address: '0x9698e0c7af13b6cef8017a5c34eb2b3d053c491c',
            symbol: 'vAMM-BNBx/SD',
            totalSupply: 1913.6445575721416,
            isGamma: false,
            type: 'Volatile',
            gauge: {
              apr: 59.65830984228517,
              projectedApr: 0,
              voteApr: 0,
              totalSupply: 1462.7562722493517,
              address: '0xcC51Cf273D7Bf3A9318C2Db35beCAc9EB2ef7D0a',
              fee: '0x849061dDE9a2f2f37Dd8e8eA3862d1500488d8f4',
              bribe: '0x9b2bA26F83bD4c639a323064A66A96c18CE5D2B5',
              weight: 0,
              bribes: {
                fee: null,
                bribe: null,
              },
            },
            token0: {
              address: '0x1bdd3Cf7F79cfB8EdbB955f20ad99211551BA275',
              reserve: 100.2337512449166,
            },
            token1: {
              address: '0x3BC5AC0dFdC871B365d159f728dd1B9A0B5481E8',
              reserve: 36612.60564801329,
            },
            isValid: true,
          },
          {
            address: '0x1f3ca66c98d682ebec31264692dad4f17340bc',
            symbol: 'sAMM-HAY/USD+',
            totalSupply: 0.04776734484522372,
            isGamma: false,
            type: 'Stable',
            gauge: {
              apr: 20.223895492142876,
              projectedApr: 83.43586920075816,
              voteApr: 509.6663421660913,
              totalSupply: 0.04726581325784352,
              address: '0xB0a69681d82c90B80B689BaF43ccfa6270f1DdE5',
              fee: '0xDf668DE731E524EBfCAb57E91a739E357352a244',
              bribe: '0x1c5f9A3464371B441AeAb28E4ed2a23cd1A9c6c3',
              weight: 25469.058487525937,
              bribes: {
                fee: null,
                bribe: [
                  {
                    amount: '549.828236',
                    symbol: 'USD+',
                    address: '0xe80772Eaf6e2E18B651F160Bc9158b2A5caFCA65',
                    decimals: 6,
                  },
                ],
              },
            },
            token0: {
              address: '0x0782b6d8c4551B9760e74c0545a9bCD90bdc41E5',
              reserve: 43932.98874568394,
            },
            token1: {
              address: '0xe80772Eaf6e2E18B651F160Bc9158b2A5caFCA65',
              reserve: 51638.799334,
            },
            isValid: true,
          },
        ],
      },
      txOverride: {
        mode: true,
        notificationType: 1,
        recipient: ['0x78906ad82D666981c246Ed7a562Acd69fb49610A'],
      },
    };

    const thenaChannel = new ThenaChannel(mockLogger as any, fakeCache);

    // Act
    const response = await thenaChannel.sendNotifsForBribedPools(simulate);
    expect(response.notifSent).toEqual(true);
  });

  it('should not send notifications for existing bribed pools', async () => {
    // Arrange
    const simulate = {
      payloadMode: 'simulate',
      txMode: 'simulate',
      logicOverride: {
        mode: true,
        oldPools: [
          {
            address: '0x9698e0c7af13b6cef8017a5c34eb2b3d053c491c',
            symbol: 'vAMM-BNBx/SD',
            totalSupply: 1913.6445575721416,
            isGamma: false,
            type: 'Volatile',
            gauge: {
              apr: 59.65830984228517,
              projectedApr: 0,
              voteApr: 0,
              totalSupply: 1462.7562722493517,
              address: '0xcC51Cf273D7Bf3A9318C2Db35beCAc9EB2ef7D0a',
              fee: '0x849061dDE9a2f2f37Dd8e8eA3862d1500488d8f4',
              bribe: '0x9b2bA26F83bD4c639a323064A66A96c18CE5D2B5',
              weight: 0,
              bribes: {
                fee: null,
                bribe: null,
              },
            },
            token0: {
              address: '0x1bdd3Cf7F79cfB8EdbB955f20ad99211551BA275',
              reserve: 100.2337512449166,
            },
            token1: {
              address: '0x3BC5AC0dFdC871B365d159f728dd1B9A0B5481E8',
              reserve: 36612.60564801329,
            },
            isValid: true,
          },
          {
            address: '0x1f3ca66c98d682fa1bec31264692dad4f17340bc',
            symbol: 'sAMM-HAY/USD+',
            totalSupply: 0.04776734484522372,
            isGamma: false,
            type: 'Stable',
            gauge: {
              apr: 20.223895492142876,
              projectedApr: 83.43586920075816,
              voteApr: 509.6663421660913,
              totalSupply: 0.04726581325784352,
              address: '0xB0a69681d82c90B80B689BaF43ccfa6270f1DdE5',
              fee: '0xDf668DE731E524EBfCAb57E91a739E357352a244',
              bribe: '0x1c5f9A3464371B441AeAb28E4ed2a23cd1A9c6c3',
              weight: 25469.058487525937,
              bribes: {
                fee: null,
                bribe: [
                  {
                    amount: '549.828236',
                    symbol: 'USD+',
                    address: '0xe80772Eaf6e2E18B651F160Bc9158b2A5caFCA65',
                    decimals: 6,
                  },
                ],
              },
            },
            token0: {
              address: '0x0782b6d8c4551B9760e74c0545a9bCD90bdc41E5',
              reserve: 43932.98874568394,
            },
            token1: {
              address: '0xe80772Eaf6e2E18B651F160Bc9158b2A5caFCA65',
              reserve: 51638.799334,
            },
            isValid: true,
          },
        ],
        latestPools: [
          {
            address: '0x9698e0c7af13b6cef8017a5c34eb2b3d053c491c',
            symbol: 'vAMM-BNBx/SD',
            totalSupply: 1913.6445575721416,
            isGamma: false,
            type: 'Volatile',
            gauge: {
              apr: 59.65830984228517,
              projectedApr: 0,
              voteApr: 0,
              totalSupply: 1462.7562722493517,
              address: '0xcC51Cf273D7Bf3A9318C2Db35beCAc9EB2ef7D0a',
              fee: '0x849061dDE9a2f2f37Dd8e8eA3862d1500488d8f4',
              bribe: '0x9b2bA26F83bD4c639a323064A66A96c18CE5D2B5',
              weight: 0,
              bribes: {
                fee: null,
                bribe: null,
              },
            },
            token0: {
              address: '0x1bdd3Cf7F79cfB8EdbB955f20ad99211551BA275',
              reserve: 100.2337512449166,
            },
            token1: {
              address: '0x3BC5AC0dFdC871B365d159f728dd1B9A0B5481E8',
              reserve: 36612.60564801329,
            },
            isValid: true,
          },
          {
            address: '0x1f3ca66c98d682fa1bec31264692dad4f17340bc',
            symbol: 'sAMM-HAY/USD+',
            totalSupply: 0.04776734484522372,
            isGamma: false,
            type: 'Stable',
            gauge: {
              apr: 20.223895492142876,
              projectedApr: 83.43586920075816,
              voteApr: 509.6663421660913,
              totalSupply: 0.04726581325784352,
              address: '0xB0a69681d82c90B80B689BaF43ccfa6270f1DdE5',
              fee: '0xDf668DE731E524EBfCAb57E91a739E357352a244',
              bribe: '0x1c5f9A3464371B441AeAb28E4ed2a23cd1A9c6c3',
              weight: 25469.058487525937,
              bribes: {
                fee: null,
                bribe: [
                  {
                    amount: '549.828236',
                    symbol: 'USD+',
                    address: '0xe80772Eaf6e2E18B651F160Bc9158b2A5caFCA65',
                    decimals: 6,
                  },
                ],
              },
            },
            token0: {
              address: '0x0782b6d8c4551B9760e74c0545a9bCD90bdc41E5',
              reserve: 43932.98874568394,
            },
            token1: {
              address: '0xe80772Eaf6e2E18B651F160Bc9158b2A5caFCA65',
              reserve: 51638.799334,
            },
            isValid: true,
          },
        ],
      },
      txOverride: {
        mode: true,
        notificationType: 1,
        recipient: ['0x78906ad82D666981c246Ed7a562Acd69fb49610A'],
      },
    };

    const thenaChannel = new ThenaChannel(mockLogger as any, fakeCache);

    // Act
    const reponse = await thenaChannel.sendNotifsForBribedPools(simulate);

    // Assert
    expect(reponse.notifSent).toEqual(false);
  });
  it('should send notifications for medium posts', async () => {
    // Arrange
    const simulate = {
      payloadMode: 'simulate',
      txMode: 'simulate',
      logicOverride: {
        mode: true,
        apiResponse: [
          {
            title: 'Demystifying FUSION — A Closer Look at THENA’s Concentrated Liquidity Revolution',
            pubDate: '2023-07-19 21:03:17',
            link: 'https://medium.com/@ThenaFi/demystifying-fusion-a-closer-look-at-thenas-concentrated-liquidity-revolution-6f46978a1dab?source=rss-ea602b0c5af7------2',
            guid: 'https://medium.com/p/6f46978a1dab',
            author: 'Thena.fi',
            thumbnail: 'https://cdn-images-1.medium.com/max/1024/0*BfXoBD1iI48uz_R8',
            description:
              '\n<h3>Demystifying FUSION: A Closer Look at THENA’s Concentrated Liquidity Revolution</h3>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/0*BfXoBD1iI48uz_R8"><figcaption>FUSION combines the strengths of three industry leaders</figcaption></figure><h3>TL<strong>;</strong>DR</h3>\n<ul>\n<li>THENA V2 represents a major platform upgrade, featuring enhanced gauges and the integration of FUSION pools.</li>\n<li>Concentrated Liquidity (CL) enables LPs to focus their funds within a specific price range, providing deeper liquidity and potentially higher trading fee earnings.</li>\n<li>Impermanent Loss (IL) is a temporary decrease in LPs’ asset value due to price fluctuations; however, trading fees can offset this loss, ensuring profitability despite the risk.</li>\n<li>FUSION, a DeFi innovation by THENA, Gamma Strategies, and Algebra, improves CL management, capital efficiency, and user experience.</li>\n<li>FUSION addresses CL challenges by simplifying complexity, minimizing impermanent loss risk, adapting to market volatility, and optimizing dynamic fees.</li>\n<li>It offers six LP strategies catering to different assets and user preferences: wide, narrow, manual, pegged price, correlated, and stable.</li>\n<li>Strategic collaboration with Three Sigma drives THENA towards market leadership on BNB Chain</li>\n<li>FUSION’s advantages include a modular design, cost-efficiency for protocols and traders, a user-friendly platform, market-making capabilities, and dynamic fees.</li>\n<li>THENA pioneers Solidly-based automated CL with an exclusive collaboration with Gamma Strategies on BNB Chain.</li>\n<li>Users with liquidity positions must migrate to continue earning THE, either by transitioning to the same gauge type or a FUSION gauge, using our Migration UI for guidance.</li>\n</ul>\n<h3>Introduction</h3>\n<p>As the decentralized finance (DeFi) landscape evolves, innovative solutions like FUSION are emerging to address the challenges and limitations of traditional liquidity models. FUSION, developed in collaboration by THENA, Gamma Strategies, and Algebra, simplifies the management of Concentrated Liquidity (CL) while enhancing capital efficiency and user experience.</p>\n<p>In this follow-up article, we explore the concept of concentrated liquidity, the roles of Gamma Strategies and Algebra in FUSION, and the benefits and potential drawbacks of this DeFi innovation.</p>\n<p>If you haven’t read the previous article on FUSION, read it <a href="https://medium.com/@ThenaFi/fusion-spark-a-new-era-in-defi-with-thenas-concentrated-liquidity-breakthrough-1f6d647dc60c">here</a>.</p>\n<p>If you’d rather skip the details and go straight to the migration guide, simply scroll to the end of this article.</p>\n<h3>Understanding Concentrated Liquidity</h3>\n<p>Imagine a farmer watering their crops. Instead of using sprinklers that sprays water across the entire field, the farmer selectively waters the plants that need it the most.</p>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/0*vf3CRtTQWzLkB8Av"></figure><p>Similarly, in DeFi, CL allows Liquidity Providers (LPs) to focus their funds within specific price ranges where they are most needed, rather than spreading them across the entire price spectrum. This targeted approach results in more efficient trades and higher fees for LPs while reducing slippage for traders.</p>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/562/0*Nq_mtjBKEL0PVRAo"><figcaption><em>Concentrated Liquidity concentrates liquidity into a tighter price range</em></figcaption></figure><h3>The Importance of Concentrated Liquidity</h3>\n<p>CL offers several advantages over traditional liquidity models:</p>\n<ol>\n<li>\n<strong>Capital efficiency: </strong>By focusing liquidity within specific price ranges, it can achieve up to 10x capital efficiency compared to traditional models. As a result, the protocol can rely on fewer incentives to attract LPs, freeing up resources to expand their offerings or generate more fees.</li>\n<li>\n<strong>More efficient trading: </strong>CL enables better price execution for traders and protocols, reducing slippage and promoting more efficient trades.</li>\n<li>\n<strong>Enhanced flexibility:</strong> LPs have greater control over their risk exposure and returns by choosing the price range within which they want to provide liquidity.</li>\n</ol>\n<p>However, CL also has some drawbacks:</p>\n<ol>\n<li>\n<strong>Complexity: </strong>Managing CL can be challenging, as it requires constant monitoring and adjustments to stay within the optimal price range.</li>\n<li>\n<strong>Risk of impermanent loss: </strong>If asset prices move beyond the chosen range, LPs may face a higher risk of impermanent loss and miss out on fee generation, making CL less suitable for highly volatile assets.</li>\n<li>\n<strong>Barriers to entry: </strong>Some CL solutions can be overwhelming for new users, as they require a deeper understanding of market dynamics and strategies to manage liquidity effectively.</li>\n</ol>\n<h3>Impermanent Loss and Concentrated Liquidity</h3>\n<p>Returning to the farmer metaphor: The farmer waters crops that need water the most. Unpredictable factors, such as weather (price fluctuations), can result in some crops within the watered area growing slower, while those in other areas experience surprising growth. The farmer encounters an impermanent loss (IL) due to missing potential growth from the unwatered regions. This loss is temporary since, if conditions change and the watered crops catch up in growth, the loss vanishes, and the farmer still profits from the harvest (trading fees).</p>\n<p>Enter Gamma Strategies, a highly intelligent swarm of drones that oversee the farm and closely monitors every plant to provide each one with the optimal amount of water without wasting any resources.</p>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/0*SHOcTf1baDC0e7cE"></figure><p>Impermanent loss occurs in CL pools when asset prices shift significantly, causing LPs to have imbalanced token pairs. Gamma mitigates this issue by actively rebalancing the price ranges of LPs, maximizing fee generation and minimizing impermanent losses. See simple example how Gamma rebalances price ranges with market price volatility:</p>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/0*MJFkHPbfRaOeZhpS"></figure><p>That’s the essence of Gamma’s role in FUSION — automating the LP management process to simplify life for LPs while minimizing impermanent loss.</p>\n<h3>Balancing Pros and Cons with FUSION</h3>\n<p>At THENA, we recognize the importance of maximizing Concentrated Liquidity benefits while minimizing its drawbacks. FUSION tackles these challenges and makes CL more efficient and accessible for all users.</p>\n<p><strong>1. Simplifying Complexity:</strong> FUSION incorporates Gamma’s automated strategies, which constantly manage and adjust positions to stay within the optimal range. This eliminates the need for active management by LPs, saving time and effort while reducing the risk of impermanent loss.</p>\n<p>FUSION’s user-friendly platform makes concentrated liquidity accessible to a wider audience, including V2 farmers who might lack the expertise to effectively manage their strategies, catering to users of all experience levels.</p>\n<p><strong>2. Reducing Impermanent Loss Risk:</strong> FUSION mitigates the risk of impermanent loss with built-in Gamma Strategies, which automatically adjust liquidity positions based on market conditions. This ensures users’ investments stay within the chosen range and continue to generate fees.</p>\n<p><strong>3. Adapting to Market Volatility:</strong> FUSION, in collaboration with Algebra and Gamma Strategies, offers multiple strategies for managing liquidity, such as wide and narrow ranges for volatile assets and stable ranges for pegged assets. This flexibility allows users to choose the best strategy for their investments, regardless of market conditions.</p>\n<p><strong>4. Dynamic Fee Optimization:</strong> FUSION incorporates Algebra’s dynamic fees that adapt to market conditions, optimizing revenue for LPs without requiring them to switch pools. This eliminates the need for multiple pools for each fee tier and maximizes revenue for the protocol by considering factors like volatility and trading volume. The fee structure increases in response to higher volatility and decreases to capture more trading volumes on DEX aggregators.</p>\n<p>Manual market making can be challenging and less user-friendly. Although significant profits can be achieved with the right knowledge, our automated solution offers greater ease and profitability compared to competitors. Most users will likely benefit more from allowing Gamma to manage everything rather than attempting it themselves. In essence, we’ve simplified concentrated liquidity for you.</p>\n<p>By addressing these challenges, FUSION makes concentrated liquidity more accessible and user-friendly, ultimately revolutionizing the DeFi ecosystem and creating a more efficient and profitable experience for both traders and liquidity providers.</p>\n<h3>Six Pathways to Optimal Strategy</h3>\n<p>FUSION presents a versatile range of LP strategies for both <em>volatile </em>and other assets. The platform features three primary strategies for <em>volatile </em>assets— narrow, wide, and manual modes — while offering pegged price, correlated, and stable strategies for other asset types. These diverse approaches enable beginner and experienced users alike to customize their investments based on personal preferences, risk tolerance, and the particular assets they are working with.</p>\n<p>For a simpler launch, FUSION will initially not support distinct categories for Pegged Price and Correlated pools.</p>\n<p>Refer to the summary table for a quick comparison below:</p>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/1*9euoVR5tt02LxyEiOojtWA.png"></figure><p>Let’s explore the narrow, wide and manual strategies in more detail — examining their benefits, trade-offs, and factors to consider when selecting the most suitable approach for your needs.</p>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/0*VqRtXDSgh33eCIuV"></figure><p><strong>1. Narrow Range: For assets with high price correlation and low price fluctuations</strong></p>\n<p>The narrow range strategy focuses on a tighter price range between two assets.</p>\n<p>This strategy works well for assets with high and positive price correlation as it concentrates the price range where most trading activity occurs. The Narrow Range also maximizes the fee-earning potential during periods of low market volatility. However, in the long term, higher fees may not compensate for the higher impermanent loss risk.</p>\n<p><strong>2. Wide Range: For assets with low price correlation and high price fluctuations</strong></p>\n<p>In contrast, the wide range strategy involves spreading liquidity over a broad price range between two assets.</p>\n<p>This method is particularly effective for assets with low price correlation and significant price fluctuations. The strategy generates consistent fees during periods of market volatility, especially when high token volatility is anticipated, such as following a key release or unexpected news. Over the long run, the savings in impermanent loss will likely outweigh the higher fees in a narrow range.</p>\n<p>For example, consider asset pairs like BNB-BTC or BTC-ETH. Although these pairs are volatile against USD, they display a strong positive price correlation. In such cases, the narrow range strategy might be more suitable due to the correlated nature of the assets.</p>\n<p><strong>3. Manual Range (Custom Strategy): Geared towards experienced users seeking more control over their investments</strong></p>\n<p>The manual range strategy allows LPs to set their preferred price range and adjust it based on market conditions. Note that opting for this approach means forgoing the automated Gamma system and associated staking rewards in THE tokens. Users will only earn trading fees from the pool while actively managing their positions to optimize returns. This strategy is best suited for skilled investors confident in their market navigation abilities.</p>\n<p>By offering these distinct LP strategies, FUSION enables LPs to customize their investments according to their specific needs and preferences, providing a flexible and user-friendly platform for all.</p>\n<h3>Pool Types and UI</h3>\n<p>With THENA V2, the user interface is updated with changed pool categories. In THENA V1, there were stable and volatile pool categories. In THENA V2, the new categories are:</p>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/0*C8jJ8_EfGOON6JUW"></figure><p>With the introduction of THENA V2, we have the following new categories:</p>\n<ul>\n<li>\n<strong>Stable</strong>: Combines both Solidly and FUSION stable pools, referred to as <em>Stable</em> and <em>GAMMA_STABLE</em>. <em>Stable</em> is a UniV2-style pool with a full range, while <em>GAMMA_STABLE</em> features FUSION support, concentrated liquidity, and automated LP management. This way all the stablecoins can be still found in the same category.</li>\n<li>\n<strong>V1</strong>: Includes only Solidly pools with volatile tokens. This is essentially the “Volatile” category renamed to “V1”.</li>\n<li>\n<strong>FUSION</strong>: Contains only FUSION pools, including <em>V3_Narrow</em> &amp; <em>V3_Wide</em>.</li>\n</ul>\n<p>Once the Epoch changes, migrated pools will be visible as active.</p>\n<h3>Key Advantages of FUSION</h3>\n<p>FUSION has been artfully assembled to cater to your desires, combining strategic parameter optimization and a clear, user-friendly design, pioneered through our partnership with <strong>Three Sigma</strong>, a leading blockchain engineering, research, and investment organization, to capture market share, achieve the best price execution, and excel against competitors on BNB Chain.</p>\n<p>FUSION stands out due to its<strong> modular design</strong>, allowing it to easily integrate with multiple liquidity managers, not just limited to Gamma. When providing liquidity through Gamma, users receive a fungible ERC-20 LP token that presents various ways to earn:</p>\n<ol>\n<li>Staking in FUSION gauges to earn $THE rewards</li>\n<li>Staking in partner vaults for optimized yields (auto-compounding, leverage farming, etc.)</li>\n<li>Keeping unstaked LP tokens to earn trading fees, but with a higher risk profile (manual “wild” mode)</li>\n</ol>\n<p>FUSION offers superior capital efficiency. Better price execution for traders, and less resources spent by protocols to incentivize their liquidity.</p>\n<p>Additionally, FUSION allows protocols to engage in <strong>market-making activities</strong> by incentivizing Gamma-powered strategies, adding value to the ecosystem. This innovative approach fosters a better alignment between protocols and users’ interests.</p>\n<p>FUSION’s <strong>user-friendly</strong> platform is designed for users of all experience levels, making it simple to provide liquidity and stake, similar to using UniV2. This lowers barriers to entry, making concentrated liquidity more accessible to a wider audience.</p>\n<p>THENA possesses a<strong> first mover advantage</strong> as the leading DEX on BNB Chain to integrate Solidly mechanics with automated concentrated liquidity. Furthermore, THENA is the only platform on BNB Chain offering Algebra’s premium solution, secured through an <strong>exclusive partnership</strong> with Gamma specifically for BNB Chain.</p>\n<p>Furthermore, FUSION features <strong>dynamic fees</strong> that adapt to market conditions, optimizing revenue for LPs without the need to switch pools. This eliminates multiple pools for each fee tier, maximizing protocol revenue by considering factors like volatility and trading volume.</p>\n<h3>Migration</h3>\n<h4><strong>TL;DR</strong></h4>\n<ul>\n<li>Only users with liquidity staked need to migrate</li>\n<li>Migration is necessary to keep earning THE</li>\n<li>Pool categories in UI changed to: Stable, V1, and FUSION</li>\n<li>There are two types of migrations</li>\n<li>Same gauge type: Moving from an old gauge to a new gauge for the same type of pool</li>\n<li>FUSION gauge: Moving from an old gauge to a new FUSION gauge</li>\n<li>Migration must be carried out for each gauge individually</li>\n<li>Our dedicated <a href="https://www.thena.fi/liquidity/migration">Migration UI</a> will guide you through the migration process</li>\n</ul>\n<p>Before diving into the migration process, it’s crucial to understand why migration is necessary for THENA V2. Our platform has undergone significant improvements to optimize performance and enhance the user experience with the introduction of THENA V2. To take advantage of these upgrades, all users must migrate their liquidity positions to the new gauge system (old gauges stop receiving emissions at the end of this Epoch), which supports both old and new pools. While this process may require some extra effort, the outcome will be a more efficient and seamless experience on our platform.</p>\n<p>Migration refers to transferring liquidity positions from the old to the new gauges, allowing continued platform participation and enjoyment of upgraded benefits. The user interface makes things super simple. Note that migration is required to keep earning THE, as all old gauges will be replaced with new ones, and users must migrate to the new system supporting both old and new types of pools, with majority of the liquidity moving to the new pools over the coming weeks.</p>\n<h3>Migration Guide</h3>\n<p>Migration is applicable only if you have liquidity staked in THENA’s gauges. The migration process will also claim your rewards for you.</p>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/1*VuXy2IZGvNNEViKThM8AvQ.png"><figcaption>Easy and smooth migration thanks to the dedicated Migration UI</figcaption></figure><p>To complete the migration process, follow these steps:</p>\n<ol>\n<li>Visit <a href="https://thena.fi/liquidity/migration">thena.fi/liquidity/migration</a> to access the migration user interface (UI)</li>\n<li>Locate the gauges you’ve staked into by clicking “<strong>Staked Only</strong>”</li>\n<li>Click on “<strong>Migrate</strong>” on any gauge</li>\n<li>Depending on your gauge, there are <strong>two migration types </strong>(up to 3 options, 2 of them FUSION)</li>\n</ol>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/586/1*bHvFo5KVoojr7m1pe5mMIA.gif"></figure><p>Migration type 1: <strong>Old pool but new gauge</strong></p>\n<p>Migration type 2: <strong>From old pool to FUSION</strong></p>\n<p>If the pool has FUSION available, that option will be displayed when you click Migrate. You can choose any of the options presented and then proceed to approve all the transactions.</p>\n<p>For type 1 migration, once you’ve approved everything, you’re done. For type 2, you’ll be presented with the option to stake into FUSION after the liquidity is withdrawn.</p>\n<h3>THENA V2: A Powerful Synergy with Gamma Strategies and Algebra</h3>\n<p>Experience the future of DeFi with THENA V2. THENA’s upgrade to V2 is significant, incorporating major changes and improvements, which warrants the new version designation. This comprehensive update includes upgrading all gauges and migrating some to FUSION pools.</p>\n<p>FUSION combines the strengths of Gamma and Algebra protocols to offer a unique concentrated liquidity solution. Algebra’s model enables LPs to allocate funds in narrower price ranges, increasing capital efficiency and improving price execution. Simultaneously, Gamma simplifies management by providing automated strategies that keep the position within the optimal range, offering a hassle-free investment experience.</p>\n<p>THENA’s FUSION transforms the DeFi landscape by making concentrated liquidity more approachable, efficient, and user-friendly. By merging Algebra’s capital efficiency model with Gamma’s automated strategies, FUSION delivers a powerful solution that overcomes the limitations of traditional liquidity models. Although concentrated liquidity has its pros and cons, FUSION’s inventive approach lays the foundation for a more dynamic and inclusive DeFi ecosystem.</p>\n<p>We’ve simplified concentrated liquidity for you, paving the way to become the #1 DEX on BNB Chain.</p>\n<img src="https://medium.com/_/stat?event=post.clientViewed&amp;referrerSource=full_rss&amp;postId=6f46978a1dab" width="1" height="1" alt="">\n',
            content:
              '\n<h3>Demystifying FUSION: A Closer Look at THENA’s Concentrated Liquidity Revolution</h3>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/0*BfXoBD1iI48uz_R8"><figcaption>FUSION combines the strengths of three industry leaders</figcaption></figure><h3>TL<strong>;</strong>DR</h3>\n<ul>\n<li>THENA V2 represents a major platform upgrade, featuring enhanced gauges and the integration of FUSION pools.</li>\n<li>Concentrated Liquidity (CL) enables LPs to focus their funds within a specific price range, providing deeper liquidity and potentially higher trading fee earnings.</li>\n<li>Impermanent Loss (IL) is a temporary decrease in LPs’ asset value due to price fluctuations; however, trading fees can offset this loss, ensuring profitability despite the risk.</li>\n<li>FUSION, a DeFi innovation by THENA, Gamma Strategies, and Algebra, improves CL management, capital efficiency, and user experience.</li>\n<li>FUSION addresses CL challenges by simplifying complexity, minimizing impermanent loss risk, adapting to market volatility, and optimizing dynamic fees.</li>\n<li>It offers six LP strategies catering to different assets and user preferences: wide, narrow, manual, pegged price, correlated, and stable.</li>\n<li>Strategic collaboration with Three Sigma drives THENA towards market leadership on BNB Chain</li>\n<li>FUSION’s advantages include a modular design, cost-efficiency for protocols and traders, a user-friendly platform, market-making capabilities, and dynamic fees.</li>\n<li>THENA pioneers Solidly-based automated CL with an exclusive collaboration with Gamma Strategies on BNB Chain.</li>\n<li>Users with liquidity positions must migrate to continue earning THE, either by transitioning to the same gauge type or a FUSION gauge, using our Migration UI for guidance.</li>\n</ul>\n<h3>Introduction</h3>\n<p>As the decentralized finance (DeFi) landscape evolves, innovative solutions like FUSION are emerging to address the challenges and limitations of traditional liquidity models. FUSION, developed in collaboration by THENA, Gamma Strategies, and Algebra, simplifies the management of Concentrated Liquidity (CL) while enhancing capital efficiency and user experience.</p>\n<p>In this follow-up article, we explore the concept of concentrated liquidity, the roles of Gamma Strategies and Algebra in FUSION, and the benefits and potential drawbacks of this DeFi innovation.</p>\n<p>If you haven’t read the previous article on FUSION, read it <a href="https://medium.com/@ThenaFi/fusion-spark-a-new-era-in-defi-with-thenas-concentrated-liquidity-breakthrough-1f6d647dc60c">here</a>.</p>\n<p>If you’d rather skip the details and go straight to the migration guide, simply scroll to the end of this article.</p>\n<h3>Understanding Concentrated Liquidity</h3>\n<p>Imagine a farmer watering their crops. Instead of using sprinklers that sprays water across the entire field, the farmer selectively waters the plants that need it the most.</p>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/0*vf3CRtTQWzLkB8Av"></figure><p>Similarly, in DeFi, CL allows Liquidity Providers (LPs) to focus their funds within specific price ranges where they are most needed, rather than spreading them across the entire price spectrum. This targeted approach results in more efficient trades and higher fees for LPs while reducing slippage for traders.</p>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/562/0*Nq_mtjBKEL0PVRAo"><figcaption><em>Concentrated Liquidity concentrates liquidity into a tighter price range</em></figcaption></figure><h3>The Importance of Concentrated Liquidity</h3>\n<p>CL offers several advantages over traditional liquidity models:</p>\n<ol>\n<li>\n<strong>Capital efficiency: </strong>By focusing liquidity within specific price ranges, it can achieve up to 10x capital efficiency compared to traditional models. As a result, the protocol can rely on fewer incentives to attract LPs, freeing up resources to expand their offerings or generate more fees.</li>\n<li>\n<strong>More efficient trading: </strong>CL enables better price execution for traders and protocols, reducing slippage and promoting more efficient trades.</li>\n<li>\n<strong>Enhanced flexibility:</strong> LPs have greater control over their risk exposure and returns by choosing the price range within which they want to provide liquidity.</li>\n</ol>\n<p>However, CL also has some drawbacks:</p>\n<ol>\n<li>\n<strong>Complexity: </strong>Managing CL can be challenging, as it requires constant monitoring and adjustments to stay within the optimal price range.</li>\n<li>\n<strong>Risk of impermanent loss: </strong>If asset prices move beyond the chosen range, LPs may face a higher risk of impermanent loss and miss out on fee generation, making CL less suitable for highly volatile assets.</li>\n<li>\n<strong>Barriers to entry: </strong>Some CL solutions can be overwhelming for new users, as they require a deeper understanding of market dynamics and strategies to manage liquidity effectively.</li>\n</ol>\n<h3>Impermanent Loss and Concentrated Liquidity</h3>\n<p>Returning to the farmer metaphor: The farmer waters crops that need water the most. Unpredictable factors, such as weather (price fluctuations), can result in some crops within the watered area growing slower, while those in other areas experience surprising growth. The farmer encounters an impermanent loss (IL) due to missing potential growth from the unwatered regions. This loss is temporary since, if conditions change and the watered crops catch up in growth, the loss vanishes, and the farmer still profits from the harvest (trading fees).</p>\n<p>Enter Gamma Strategies, a highly intelligent swarm of drones that oversee the farm and closely monitors every plant to provide each one with the optimal amount of water without wasting any resources.</p>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/0*SHOcTf1baDC0e7cE"></figure><p>Impermanent loss occurs in CL pools when asset prices shift significantly, causing LPs to have imbalanced token pairs. Gamma mitigates this issue by actively rebalancing the price ranges of LPs, maximizing fee generation and minimizing impermanent losses. See simple example how Gamma rebalances price ranges with market price volatility:</p>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/0*MJFkHPbfRaOeZhpS"></figure><p>That’s the essence of Gamma’s role in FUSION — automating the LP management process to simplify life for LPs while minimizing impermanent loss.</p>\n<h3>Balancing Pros and Cons with FUSION</h3>\n<p>At THENA, we recognize the importance of maximizing Concentrated Liquidity benefits while minimizing its drawbacks. FUSION tackles these challenges and makes CL more efficient and accessible for all users.</p>\n<p><strong>1. Simplifying Complexity:</strong> FUSION incorporates Gamma’s automated strategies, which constantly manage and adjust positions to stay within the optimal range. This eliminates the need for active management by LPs, saving time and effort while reducing the risk of impermanent loss.</p>\n<p>FUSION’s user-friendly platform makes concentrated liquidity accessible to a wider audience, including V2 farmers who might lack the expertise to effectively manage their strategies, catering to users of all experience levels.</p>\n<p><strong>2. Reducing Impermanent Loss Risk:</strong> FUSION mitigates the risk of impermanent loss with built-in Gamma Strategies, which automatically adjust liquidity positions based on market conditions. This ensures users’ investments stay within the chosen range and continue to generate fees.</p>\n<p><strong>3. Adapting to Market Volatility:</strong> FUSION, in collaboration with Algebra and Gamma Strategies, offers multiple strategies for managing liquidity, such as wide and narrow ranges for volatile assets and stable ranges for pegged assets. This flexibility allows users to choose the best strategy for their investments, regardless of market conditions.</p>\n<p><strong>4. Dynamic Fee Optimization:</strong> FUSION incorporates Algebra’s dynamic fees that adapt to market conditions, optimizing revenue for LPs without requiring them to switch pools. This eliminates the need for multiple pools for each fee tier and maximizes revenue for the protocol by considering factors like volatility and trading volume. The fee structure increases in response to higher volatility and decreases to capture more trading volumes on DEX aggregators.</p>\n<p>Manual market making can be challenging and less user-friendly. Although significant profits can be achieved with the right knowledge, our automated solution offers greater ease and profitability compared to competitors. Most users will likely benefit more from allowing Gamma to manage everything rather than attempting it themselves. In essence, we’ve simplified concentrated liquidity for you.</p>\n<p>By addressing these challenges, FUSION makes concentrated liquidity more accessible and user-friendly, ultimately revolutionizing the DeFi ecosystem and creating a more efficient and profitable experience for both traders and liquidity providers.</p>\n<h3>Six Pathways to Optimal Strategy</h3>\n<p>FUSION presents a versatile range of LP strategies for both <em>volatile </em>and other assets. The platform features three primary strategies for <em>volatile </em>assets— narrow, wide, and manual modes — while offering pegged price, correlated, and stable strategies for other asset types. These diverse approaches enable beginner and experienced users alike to customize their investments based on personal preferences, risk tolerance, and the particular assets they are working with.</p>\n<p>For a simpler launch, FUSION will initially not support distinct categories for Pegged Price and Correlated pools.</p>\n<p>Refer to the summary table for a quick comparison below:</p>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/1*9euoVR5tt02LxyEiOojtWA.png"></figure><p>Let’s explore the narrow, wide and manual strategies in more detail — examining their benefits, trade-offs, and factors to consider when selecting the most suitable approach for your needs.</p>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/0*VqRtXDSgh33eCIuV"></figure><p><strong>1. Narrow Range: For assets with high price correlation and low price fluctuations</strong></p>\n<p>The narrow range strategy focuses on a tighter price range between two assets.</p>\n<p>This strategy works well for assets with high and positive price correlation as it concentrates the price range where most trading activity occurs. The Narrow Range also maximizes the fee-earning potential during periods of low market volatility. However, in the long term, higher fees may not compensate for the higher impermanent loss risk.</p>\n<p><strong>2. Wide Range: For assets with low price correlation and high price fluctuations</strong></p>\n<p>In contrast, the wide range strategy involves spreading liquidity over a broad price range between two assets.</p>\n<p>This method is particularly effective for assets with low price correlation and significant price fluctuations. The strategy generates consistent fees during periods of market volatility, especially when high token volatility is anticipated, such as following a key release or unexpected news. Over the long run, the savings in impermanent loss will likely outweigh the higher fees in a narrow range.</p>\n<p>For example, consider asset pairs like BNB-BTC or BTC-ETH. Although these pairs are volatile against USD, they display a strong positive price correlation. In such cases, the narrow range strategy might be more suitable due to the correlated nature of the assets.</p>\n<p><strong>3. Manual Range (Custom Strategy): Geared towards experienced users seeking more control over their investments</strong></p>\n<p>The manual range strategy allows LPs to set their preferred price range and adjust it based on market conditions. Note that opting for this approach means forgoing the automated Gamma system and associated staking rewards in THE tokens. Users will only earn trading fees from the pool while actively managing their positions to optimize returns. This strategy is best suited for skilled investors confident in their market navigation abilities.</p>\n<p>By offering these distinct LP strategies, FUSION enables LPs to customize their investments according to their specific needs and preferences, providing a flexible and user-friendly platform for all.</p>\n<h3>Pool Types and UI</h3>\n<p>With THENA V2, the user interface is updated with changed pool categories. In THENA V1, there were stable and volatile pool categories. In THENA V2, the new categories are:</p>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/0*C8jJ8_EfGOON6JUW"></figure><p>With the introduction of THENA V2, we have the following new categories:</p>\n<ul>\n<li>\n<strong>Stable</strong>: Combines both Solidly and FUSION stable pools, referred to as <em>Stable</em> and <em>GAMMA_STABLE</em>. <em>Stable</em> is a UniV2-style pool with a full range, while <em>GAMMA_STABLE</em> features FUSION support, concentrated liquidity, and automated LP management. This way all the stablecoins can be still found in the same category.</li>\n<li>\n<strong>V1</strong>: Includes only Solidly pools with volatile tokens. This is essentially the “Volatile” category renamed to “V1”.</li>\n<li>\n<strong>FUSION</strong>: Contains only FUSION pools, including <em>V3_Narrow</em> &amp; <em>V3_Wide</em>.</li>\n</ul>\n<p>Once the Epoch changes, migrated pools will be visible as active.</p>\n<h3>Key Advantages of FUSION</h3>\n<p>FUSION has been artfully assembled to cater to your desires, combining strategic parameter optimization and a clear, user-friendly design, pioneered through our partnership with <strong>Three Sigma</strong>, a leading blockchain engineering, research, and investment organization, to capture market share, achieve the best price execution, and excel against competitors on BNB Chain.</p>\n<p>FUSION stands out due to its<strong> modular design</strong>, allowing it to easily integrate with multiple liquidity managers, not just limited to Gamma. When providing liquidity through Gamma, users receive a fungible ERC-20 LP token that presents various ways to earn:</p>\n<ol>\n<li>Staking in FUSION gauges to earn $THE rewards</li>\n<li>Staking in partner vaults for optimized yields (auto-compounding, leverage farming, etc.)</li>\n<li>Keeping unstaked LP tokens to earn trading fees, but with a higher risk profile (manual “wild” mode)</li>\n</ol>\n<p>FUSION offers superior capital efficiency. Better price execution for traders, and less resources spent by protocols to incentivize their liquidity.</p>\n<p>Additionally, FUSION allows protocols to engage in <strong>market-making activities</strong> by incentivizing Gamma-powered strategies, adding value to the ecosystem. This innovative approach fosters a better alignment between protocols and users’ interests.</p>\n<p>FUSION’s <strong>user-friendly</strong> platform is designed for users of all experience levels, making it simple to provide liquidity and stake, similar to using UniV2. This lowers barriers to entry, making concentrated liquidity more accessible to a wider audience.</p>\n<p>THENA possesses a<strong> first mover advantage</strong> as the leading DEX on BNB Chain to integrate Solidly mechanics with automated concentrated liquidity. Furthermore, THENA is the only platform on BNB Chain offering Algebra’s premium solution, secured through an <strong>exclusive partnership</strong> with Gamma specifically for BNB Chain.</p>\n<p>Furthermore, FUSION features <strong>dynamic fees</strong> that adapt to market conditions, optimizing revenue for LPs without the need to switch pools. This eliminates multiple pools for each fee tier, maximizing protocol revenue by considering factors like volatility and trading volume.</p>\n<h3>Migration</h3>\n<h4><strong>TL;DR</strong></h4>\n<ul>\n<li>Only users with liquidity staked need to migrate</li>\n<li>Migration is necessary to keep earning THE</li>\n<li>Pool categories in UI changed to: Stable, V1, and FUSION</li>\n<li>There are two types of migrations</li>\n<li>Same gauge type: Moving from an old gauge to a new gauge for the same type of pool</li>\n<li>FUSION gauge: Moving from an old gauge to a new FUSION gauge</li>\n<li>Migration must be carried out for each gauge individually</li>\n<li>Our dedicated <a href="https://www.thena.fi/liquidity/migration">Migration UI</a> will guide you through the migration process</li>\n</ul>\n<p>Before diving into the migration process, it’s crucial to understand why migration is necessary for THENA V2. Our platform has undergone significant improvements to optimize performance and enhance the user experience with the introduction of THENA V2. To take advantage of these upgrades, all users must migrate their liquidity positions to the new gauge system (old gauges stop receiving emissions at the end of this Epoch), which supports both old and new pools. While this process may require some extra effort, the outcome will be a more efficient and seamless experience on our platform.</p>\n<p>Migration refers to transferring liquidity positions from the old to the new gauges, allowing continued platform participation and enjoyment of upgraded benefits. The user interface makes things super simple. Note that migration is required to keep earning THE, as all old gauges will be replaced with new ones, and users must migrate to the new system supporting both old and new types of pools, with majority of the liquidity moving to the new pools over the coming weeks.</p>\n<h3>Migration Guide</h3>\n<p>Migration is applicable only if you have liquidity staked in THENA’s gauges. The migration process will also claim your rewards for you.</p>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/1*VuXy2IZGvNNEViKThM8AvQ.png"><figcaption>Easy and smooth migration thanks to the dedicated Migration UI</figcaption></figure><p>To complete the migration process, follow these steps:</p>\n<ol>\n<li>Visit <a href="https://thena.fi/liquidity/migration">thena.fi/liquidity/migration</a> to access the migration user interface (UI)</li>\n<li>Locate the gauges you’ve staked into by clicking “<strong>Staked Only</strong>”</li>\n<li>Click on “<strong>Migrate</strong>” on any gauge</li>\n<li>Depending on your gauge, there are <strong>two migration types </strong>(up to 3 options, 2 of them FUSION)</li>\n</ol>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/586/1*bHvFo5KVoojr7m1pe5mMIA.gif"></figure><p>Migration type 1: <strong>Old pool but new gauge</strong></p>\n<p>Migration type 2: <strong>From old pool to FUSION</strong></p>\n<p>If the pool has FUSION available, that option will be displayed when you click Migrate. You can choose any of the options presented and then proceed to approve all the transactions.</p>\n<p>For type 1 migration, once you’ve approved everything, you’re done. For type 2, you’ll be presented with the option to stake into FUSION after the liquidity is withdrawn.</p>\n<h3>THENA V2: A Powerful Synergy with Gamma Strategies and Algebra</h3>\n<p>Experience the future of DeFi with THENA V2. THENA’s upgrade to V2 is significant, incorporating major changes and improvements, which warrants the new version designation. This comprehensive update includes upgrading all gauges and migrating some to FUSION pools.</p>\n<p>FUSION combines the strengths of Gamma and Algebra protocols to offer a unique concentrated liquidity solution. Algebra’s model enables LPs to allocate funds in narrower price ranges, increasing capital efficiency and improving price execution. Simultaneously, Gamma simplifies management by providing automated strategies that keep the position within the optimal range, offering a hassle-free investment experience.</p>\n<p>THENA’s FUSION transforms the DeFi landscape by making concentrated liquidity more approachable, efficient, and user-friendly. By merging Algebra’s capital efficiency model with Gamma’s automated strategies, FUSION delivers a powerful solution that overcomes the limitations of traditional liquidity models. Although concentrated liquidity has its pros and cons, FUSION’s inventive approach lays the foundation for a more dynamic and inclusive DeFi ecosystem.</p>\n<p>We’ve simplified concentrated liquidity for you, paving the way to become the #1 DEX on BNB Chain.</p>\n<img src="https://medium.com/_/stat?event=post.clientViewed&amp;referrerSource=full_rss&amp;postId=6f46978a1dab" width="1" height="1" alt="">\n',
            enclosure: {},
            categories: ['concentrated-liquidity', 'bnb-chain', 'bsc', 'binance-smart-chain', 'bnb'],
          },
          {
            title: 'FUSION — Spark a New Era in DeFi with THENA’s Concentrated Liquidity Breakthrough',
            pubDate: '2023-03-28 12:55:15',
            link: 'https://medium.com/@ThenaFi/fusion-spark-a-new-era-in-defi-with-thenas-concentrated-liquidity-breakthrough-1f6d647dc60c?source=rss-ea602b0c5af7------2',
            guid: 'https://medium.com/p/1f6d647dc60c',
            author: 'Thena.fi',
            thumbnail: 'https://cdn-images-1.medium.com/max/1024/0*E3jm9c_EDjiz_30v',
            description:
              '\n<h3>FUSION — Spark a New Era in DeFi with THENA’s Concentrated Liquidity Breakthrough</h3>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/0*E3jm9c_EDjiz_30v"><figcaption>Partnering with the best</figcaption></figure><p>In the world of DeFi, protocols that can adapt rapidly and innovate seamlessly are usually the most successful. In just over two months, THENA, the native liquidity layer on BNB Chain, has become a serious contender in the ecosystem:</p>\n<ul>\n<li>Gone from 0 to $170 million in TVL</li>\n<li>Reached $100 million in weekly trading volume</li>\n<li>Became the number three DEX on BNB (and number one community-owned protocol) — A chain boasting nearly 600 projects</li>\n</ul>\n<p>THENA’s mission is to bring ultimate modularity to the liquidity layer by catering to the diverse needs of the DeFi space with a powerful suite of products for both protocols and users.</p>\n<p>Our goal is to revolutionize DeFi by embracing the following principles:</p>\n<ol>\n<li>Accessibility</li>\n<li>Efficiency</li>\n<li>Versatility</li>\n<li>Safety</li>\n</ol>\n<p>Introducing FUSION, which makes concentrated liquidity accessible for the average user. Discover who we’re collaborating with and how they’re helping us shape the future. Let’s dive in!</p>\n<h3>Algebra — The Math Behind the Curtain</h3>\n<p>For years, the Uniswap’s V2 model has dominated DeFi as the go-to liquidity and reward system. Its main drawback? Capital inefficiency.</p>\n<h3>The Traditional Model</h3>\n<p>Users add liquidity, receiving tokens and trading fees in return, but the infinite price range leaves most liquidity untouched. To overcome poor price execution, DEXs need as much liquidity as possible in these pools.</p>\n<h3>The New Solution</h3>\n<p>Algebra’s model introduces next-level capital efficiency by allowing users to focus their funds with a tighter price range, focusing liquidity in these pools at the prices where it will be needed most. Not only will users be rewarded more effectively, but traders and protocols will also see better price execution.</p>\n<p>FUSION pools go beyond a simple hard fork. They introduce dynamic fees, eliminating the need for users to switch pools to optimize fee revenue. Additionally, they support limit orders, enhancing functionality and elevating the overall user experience.</p>\n<p>The bottom line for liquidity providers, traders, and protocols?</p>\n<p>Collaborating with cutting-edge DeFi protocols, FUSION places the power of concentrated liquidity at everyone’s fingertips — all while simplifying the process to engage even new users.</p>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/0*j0UPM9-I8Fynk1Tw"><figcaption>FUSION levels the playfield</figcaption></figure><h3>Gamma — Supercharging Active Liquidity Management</h3>\n<p>Although UniV3 addresses capital efficiency issues, it’s not perfect. Users must continuously set and reset price ranges manually to optimize liquidity, claim fees, and monitor impermanent loss risk.</p>\n<p>Enter Gamma — who provides the composable, seamless, and user-friendly solution we’ve been looking for.</p>\n<p>Gamma resolves these problems, allowing users to adopt the V3 model while taking a hands-off approach to their investment strategy.</p>\n<p>Thanks to Gamma, you’ll be able to choose your range — narrow or wide — and let automation do the rest, differing from competing solutions which require active management. Time is money.</p>\n<p>The partnerships we’re forging are dismantling previous barriers to entry, delivering profitable, retail-friendly solutions, and offering users a plethora of options to manage their funds.</p>\n<h3>Unleashing the Synergy of ve(3,3) and FUSION</h3>\n<p>At THENA, we’re committed to pushing the boundaries of innovation, striving to create the ultimate DeFi experience for liquidity providers (LPs), traders, and protocols.</p>\n<p>Our ve(3,3) model works in harmony with the new features, completely transforming the DeFi landscape. FUSION brings together:</p>\n<ul>\n<li>\n<strong>Gamma</strong>: Delivering a composable and retail-friendly platform, we eliminate barriers to entry for users of all levels.</li>\n<li>\n<strong>Algebra</strong>: Enhancing revenue for veTHE holders through dynamic fees and achieving 10x capital efficiency via concentrated liquidity, we ensure top-tier price execution for traders.</li>\n<li>\n<strong>ve(3,3)</strong>: Providing the most cost-effective liquidity layer for protocols, adding value to emissions, and enabling effortless pool scaling.</li>\n</ul>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/0*oWVCNWJQGJgRCE22"></figure><p>As we continue our mission to build the best DeFi ecosystem, we’re dedicated to partnering with exceptional organizations that share our vision of bridging the gap between retail investors and decentralized applications.</p>\n<p>Aim for the stars with us.</p>\n<h4><strong>About THENA</strong></h4>\n<p>THENA is a trailblazing decentralized exchange (DEX) and liquidity layer built on BNB Chain, committed to revolutionizing the DeFi ecosystem. Offering a user-friendly, permissionless platform, THENA enables seamless token swaps and liquidity provision for a diverse range of assets. Our mission is to empower users and protocols with innovative solutions that cater to the ever-evolving needs of the DeFi space.</p>\n<p>At the core of THENA’s offerings is FUSION, our groundbreaking concentrated liquidity solution developed in collaboration with Algebra and GAMMA protocols. FUSION redefines capital efficiency, dynamic fees, and limit orders, providing an unparalleled DeFi experience for users, traders, and protocols alike.</p>\n<p><a href="https://link3.to/thena">Join the THENA community</a> as we continually innovate and strive to create THE best protocol in DeFi. Together, we’ll shape the future.</p>\n<img src="https://medium.com/_/stat?event=post.clientViewed&amp;referrerSource=full_rss&amp;postId=1f6d647dc60c" width="1" height="1" alt="">\n',
            content:
              '\n<h3>FUSION — Spark a New Era in DeFi with THENA’s Concentrated Liquidity Breakthrough</h3>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/0*E3jm9c_EDjiz_30v"><figcaption>Partnering with the best</figcaption></figure><p>In the world of DeFi, protocols that can adapt rapidly and innovate seamlessly are usually the most successful. In just over two months, THENA, the native liquidity layer on BNB Chain, has become a serious contender in the ecosystem:</p>\n<ul>\n<li>Gone from 0 to $170 million in TVL</li>\n<li>Reached $100 million in weekly trading volume</li>\n<li>Became the number three DEX on BNB (and number one community-owned protocol) — A chain boasting nearly 600 projects</li>\n</ul>\n<p>THENA’s mission is to bring ultimate modularity to the liquidity layer by catering to the diverse needs of the DeFi space with a powerful suite of products for both protocols and users.</p>\n<p>Our goal is to revolutionize DeFi by embracing the following principles:</p>\n<ol>\n<li>Accessibility</li>\n<li>Efficiency</li>\n<li>Versatility</li>\n<li>Safety</li>\n</ol>\n<p>Introducing FUSION, which makes concentrated liquidity accessible for the average user. Discover who we’re collaborating with and how they’re helping us shape the future. Let’s dive in!</p>\n<h3>Algebra — The Math Behind the Curtain</h3>\n<p>For years, the Uniswap’s V2 model has dominated DeFi as the go-to liquidity and reward system. Its main drawback? Capital inefficiency.</p>\n<h3>The Traditional Model</h3>\n<p>Users add liquidity, receiving tokens and trading fees in return, but the infinite price range leaves most liquidity untouched. To overcome poor price execution, DEXs need as much liquidity as possible in these pools.</p>\n<h3>The New Solution</h3>\n<p>Algebra’s model introduces next-level capital efficiency by allowing users to focus their funds with a tighter price range, focusing liquidity in these pools at the prices where it will be needed most. Not only will users be rewarded more effectively, but traders and protocols will also see better price execution.</p>\n<p>FUSION pools go beyond a simple hard fork. They introduce dynamic fees, eliminating the need for users to switch pools to optimize fee revenue. Additionally, they support limit orders, enhancing functionality and elevating the overall user experience.</p>\n<p>The bottom line for liquidity providers, traders, and protocols?</p>\n<p>Collaborating with cutting-edge DeFi protocols, FUSION places the power of concentrated liquidity at everyone’s fingertips — all while simplifying the process to engage even new users.</p>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/0*j0UPM9-I8Fynk1Tw"><figcaption>FUSION levels the playfield</figcaption></figure><h3>Gamma — Supercharging Active Liquidity Management</h3>\n<p>Although UniV3 addresses capital efficiency issues, it’s not perfect. Users must continuously set and reset price ranges manually to optimize liquidity, claim fees, and monitor impermanent loss risk.</p>\n<p>Enter Gamma — who provides the composable, seamless, and user-friendly solution we’ve been looking for.</p>\n<p>Gamma resolves these problems, allowing users to adopt the V3 model while taking a hands-off approach to their investment strategy.</p>\n<p>Thanks to Gamma, you’ll be able to choose your range — narrow or wide — and let automation do the rest, differing from competing solutions which require active management. Time is money.</p>\n<p>The partnerships we’re forging are dismantling previous barriers to entry, delivering profitable, retail-friendly solutions, and offering users a plethora of options to manage their funds.</p>\n<h3>Unleashing the Synergy of ve(3,3) and FUSION</h3>\n<p>At THENA, we’re committed to pushing the boundaries of innovation, striving to create the ultimate DeFi experience for liquidity providers (LPs), traders, and protocols.</p>\n<p>Our ve(3,3) model works in harmony with the new features, completely transforming the DeFi landscape. FUSION brings together:</p>\n<ul>\n<li>\n<strong>Gamma</strong>: Delivering a composable and retail-friendly platform, we eliminate barriers to entry for users of all levels.</li>\n<li>\n<strong>Algebra</strong>: Enhancing revenue for veTHE holders through dynamic fees and achieving 10x capital efficiency via concentrated liquidity, we ensure top-tier price execution for traders.</li>\n<li>\n<strong>ve(3,3)</strong>: Providing the most cost-effective liquidity layer for protocols, adding value to emissions, and enabling effortless pool scaling.</li>\n</ul>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/0*oWVCNWJQGJgRCE22"></figure><p>As we continue our mission to build the best DeFi ecosystem, we’re dedicated to partnering with exceptional organizations that share our vision of bridging the gap between retail investors and decentralized applications.</p>\n<p>Aim for the stars with us.</p>\n<h4><strong>About THENA</strong></h4>\n<p>THENA is a trailblazing decentralized exchange (DEX) and liquidity layer built on BNB Chain, committed to revolutionizing the DeFi ecosystem. Offering a user-friendly, permissionless platform, THENA enables seamless token swaps and liquidity provision for a diverse range of assets. Our mission is to empower users and protocols with innovative solutions that cater to the ever-evolving needs of the DeFi space.</p>\n<p>At the core of THENA’s offerings is FUSION, our groundbreaking concentrated liquidity solution developed in collaboration with Algebra and GAMMA protocols. FUSION redefines capital efficiency, dynamic fees, and limit orders, providing an unparalleled DeFi experience for users, traders, and protocols alike.</p>\n<p><a href="https://link3.to/thena">Join the THENA community</a> as we continually innovate and strive to create THE best protocol in DeFi. Together, we’ll shape the future.</p>\n<img src="https://medium.com/_/stat?event=post.clientViewed&amp;referrerSource=full_rss&amp;postId=1f6d647dc60c" width="1" height="1" alt="">\n',
            enclosure: {},
            categories: ['bsc', 'defi', 'uniswap', 'bnb', 'bnb-chain'],
          },
        ],
      },
      txOverride: {
        mode: true,
        notificationType: 1,
        recipient: ['0x78906ad82D666981c246Ed7a562Acd69fb49610A'],
      },
    };
    const thenaChannel = new ThenaChannel(mockLogger as any, fakeCache);

    // Act
    const response = await thenaChannel.sendNotifsForNewMediumPosts(simulate);
    expect(response.notifSent).toEqual(true);
  });

  it('should not send notifications for existing medium posts', async () => {
    // Arrange
    const simulate = {
      payloadMode: 'simulate',
      txMode: 'simulate',
      logicOverride: {
        mode: true,
        apiResponse: [
          {
            title: 'Demystifying FUSION — A Closer Look at THENA’s Concentrated Liquidity Revolution',
            pubDate: '2023-04-19 21:03:17',
            link: 'https://medium.com/@ThenaFi/demystifying-fusion-a-closer-look-at-thenas-concentrated-liquidity-revolution-6f46978a1dab?source=rss-ea602b0c5af7------2',
            guid: 'https://medium.com/p/6f46978a1dab',
            author: 'Thena.fi',
            thumbnail: 'https://cdn-images-1.medium.com/max/1024/0*BfXoBD1iI48uz_R8',
            description:
              '\n<h3>Demystifying FUSION: A Closer Look at THENA’s Concentrated Liquidity Revolution</h3>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/0*BfXoBD1iI48uz_R8"><figcaption>FUSION combines the strengths of three industry leaders</figcaption></figure><h3>TL<strong>;</strong>DR</h3>\n<ul>\n<li>THENA V2 represents a major platform upgrade, featuring enhanced gauges and the integration of FUSION pools.</li>\n<li>Concentrated Liquidity (CL) enables LPs to focus their funds within a specific price range, providing deeper liquidity and potentially higher trading fee earnings.</li>\n<li>Impermanent Loss (IL) is a temporary decrease in LPs’ asset value due to price fluctuations; however, trading fees can offset this loss, ensuring profitability despite the risk.</li>\n<li>FUSION, a DeFi innovation by THENA, Gamma Strategies, and Algebra, improves CL management, capital efficiency, and user experience.</li>\n<li>FUSION addresses CL challenges by simplifying complexity, minimizing impermanent loss risk, adapting to market volatility, and optimizing dynamic fees.</li>\n<li>It offers six LP strategies catering to different assets and user preferences: wide, narrow, manual, pegged price, correlated, and stable.</li>\n<li>Strategic collaboration with Three Sigma drives THENA towards market leadership on BNB Chain</li>\n<li>FUSION’s advantages include a modular design, cost-efficiency for protocols and traders, a user-friendly platform, market-making capabilities, and dynamic fees.</li>\n<li>THENA pioneers Solidly-based automated CL with an exclusive collaboration with Gamma Strategies on BNB Chain.</li>\n<li>Users with liquidity positions must migrate to continue earning THE, either by transitioning to the same gauge type or a FUSION gauge, using our Migration UI for guidance.</li>\n</ul>\n<h3>Introduction</h3>\n<p>As the decentralized finance (DeFi) landscape evolves, innovative solutions like FUSION are emerging to address the challenges and limitations of traditional liquidity models. FUSION, developed in collaboration by THENA, Gamma Strategies, and Algebra, simplifies the management of Concentrated Liquidity (CL) while enhancing capital efficiency and user experience.</p>\n<p>In this follow-up article, we explore the concept of concentrated liquidity, the roles of Gamma Strategies and Algebra in FUSION, and the benefits and potential drawbacks of this DeFi innovation.</p>\n<p>If you haven’t read the previous article on FUSION, read it <a href="https://medium.com/@ThenaFi/fusion-spark-a-new-era-in-defi-with-thenas-concentrated-liquidity-breakthrough-1f6d647dc60c">here</a>.</p>\n<p>If you’d rather skip the details and go straight to the migration guide, simply scroll to the end of this article.</p>\n<h3>Understanding Concentrated Liquidity</h3>\n<p>Imagine a farmer watering their crops. Instead of using sprinklers that sprays water across the entire field, the farmer selectively waters the plants that need it the most.</p>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/0*vf3CRtTQWzLkB8Av"></figure><p>Similarly, in DeFi, CL allows Liquidity Providers (LPs) to focus their funds within specific price ranges where they are most needed, rather than spreading them across the entire price spectrum. This targeted approach results in more efficient trades and higher fees for LPs while reducing slippage for traders.</p>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/562/0*Nq_mtjBKEL0PVRAo"><figcaption><em>Concentrated Liquidity concentrates liquidity into a tighter price range</em></figcaption></figure><h3>The Importance of Concentrated Liquidity</h3>\n<p>CL offers several advantages over traditional liquidity models:</p>\n<ol>\n<li>\n<strong>Capital efficiency: </strong>By focusing liquidity within specific price ranges, it can achieve up to 10x capital efficiency compared to traditional models. As a result, the protocol can rely on fewer incentives to attract LPs, freeing up resources to expand their offerings or generate more fees.</li>\n<li>\n<strong>More efficient trading: </strong>CL enables better price execution for traders and protocols, reducing slippage and promoting more efficient trades.</li>\n<li>\n<strong>Enhanced flexibility:</strong> LPs have greater control over their risk exposure and returns by choosing the price range within which they want to provide liquidity.</li>\n</ol>\n<p>However, CL also has some drawbacks:</p>\n<ol>\n<li>\n<strong>Complexity: </strong>Managing CL can be challenging, as it requires constant monitoring and adjustments to stay within the optimal price range.</li>\n<li>\n<strong>Risk of impermanent loss: </strong>If asset prices move beyond the chosen range, LPs may face a higher risk of impermanent loss and miss out on fee generation, making CL less suitable for highly volatile assets.</li>\n<li>\n<strong>Barriers to entry: </strong>Some CL solutions can be overwhelming for new users, as they require a deeper understanding of market dynamics and strategies to manage liquidity effectively.</li>\n</ol>\n<h3>Impermanent Loss and Concentrated Liquidity</h3>\n<p>Returning to the farmer metaphor: The farmer waters crops that need water the most. Unpredictable factors, such as weather (price fluctuations), can result in some crops within the watered area growing slower, while those in other areas experience surprising growth. The farmer encounters an impermanent loss (IL) due to missing potential growth from the unwatered regions. This loss is temporary since, if conditions change and the watered crops catch up in growth, the loss vanishes, and the farmer still profits from the harvest (trading fees).</p>\n<p>Enter Gamma Strategies, a highly intelligent swarm of drones that oversee the farm and closely monitors every plant to provide each one with the optimal amount of water without wasting any resources.</p>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/0*SHOcTf1baDC0e7cE"></figure><p>Impermanent loss occurs in CL pools when asset prices shift significantly, causing LPs to have imbalanced token pairs. Gamma mitigates this issue by actively rebalancing the price ranges of LPs, maximizing fee generation and minimizing impermanent losses. See simple example how Gamma rebalances price ranges with market price volatility:</p>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/0*MJFkHPbfRaOeZhpS"></figure><p>That’s the essence of Gamma’s role in FUSION — automating the LP management process to simplify life for LPs while minimizing impermanent loss.</p>\n<h3>Balancing Pros and Cons with FUSION</h3>\n<p>At THENA, we recognize the importance of maximizing Concentrated Liquidity benefits while minimizing its drawbacks. FUSION tackles these challenges and makes CL more efficient and accessible for all users.</p>\n<p><strong>1. Simplifying Complexity:</strong> FUSION incorporates Gamma’s automated strategies, which constantly manage and adjust positions to stay within the optimal range. This eliminates the need for active management by LPs, saving time and effort while reducing the risk of impermanent loss.</p>\n<p>FUSION’s user-friendly platform makes concentrated liquidity accessible to a wider audience, including V2 farmers who might lack the expertise to effectively manage their strategies, catering to users of all experience levels.</p>\n<p><strong>2. Reducing Impermanent Loss Risk:</strong> FUSION mitigates the risk of impermanent loss with built-in Gamma Strategies, which automatically adjust liquidity positions based on market conditions. This ensures users’ investments stay within the chosen range and continue to generate fees.</p>\n<p><strong>3. Adapting to Market Volatility:</strong> FUSION, in collaboration with Algebra and Gamma Strategies, offers multiple strategies for managing liquidity, such as wide and narrow ranges for volatile assets and stable ranges for pegged assets. This flexibility allows users to choose the best strategy for their investments, regardless of market conditions.</p>\n<p><strong>4. Dynamic Fee Optimization:</strong> FUSION incorporates Algebra’s dynamic fees that adapt to market conditions, optimizing revenue for LPs without requiring them to switch pools. This eliminates the need for multiple pools for each fee tier and maximizes revenue for the protocol by considering factors like volatility and trading volume. The fee structure increases in response to higher volatility and decreases to capture more trading volumes on DEX aggregators.</p>\n<p>Manual market making can be challenging and less user-friendly. Although significant profits can be achieved with the right knowledge, our automated solution offers greater ease and profitability compared to competitors. Most users will likely benefit more from allowing Gamma to manage everything rather than attempting it themselves. In essence, we’ve simplified concentrated liquidity for you.</p>\n<p>By addressing these challenges, FUSION makes concentrated liquidity more accessible and user-friendly, ultimately revolutionizing the DeFi ecosystem and creating a more efficient and profitable experience for both traders and liquidity providers.</p>\n<h3>Six Pathways to Optimal Strategy</h3>\n<p>FUSION presents a versatile range of LP strategies for both <em>volatile </em>and other assets. The platform features three primary strategies for <em>volatile </em>assets— narrow, wide, and manual modes — while offering pegged price, correlated, and stable strategies for other asset types. These diverse approaches enable beginner and experienced users alike to customize their investments based on personal preferences, risk tolerance, and the particular assets they are working with.</p>\n<p>For a simpler launch, FUSION will initially not support distinct categories for Pegged Price and Correlated pools.</p>\n<p>Refer to the summary table for a quick comparison below:</p>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/1*9euoVR5tt02LxyEiOojtWA.png"></figure><p>Let’s explore the narrow, wide and manual strategies in more detail — examining their benefits, trade-offs, and factors to consider when selecting the most suitable approach for your needs.</p>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/0*VqRtXDSgh33eCIuV"></figure><p><strong>1. Narrow Range: For assets with high price correlation and low price fluctuations</strong></p>\n<p>The narrow range strategy focuses on a tighter price range between two assets.</p>\n<p>This strategy works well for assets with high and positive price correlation as it concentrates the price range where most trading activity occurs. The Narrow Range also maximizes the fee-earning potential during periods of low market volatility. However, in the long term, higher fees may not compensate for the higher impermanent loss risk.</p>\n<p><strong>2. Wide Range: For assets with low price correlation and high price fluctuations</strong></p>\n<p>In contrast, the wide range strategy involves spreading liquidity over a broad price range between two assets.</p>\n<p>This method is particularly effective for assets with low price correlation and significant price fluctuations. The strategy generates consistent fees during periods of market volatility, especially when high token volatility is anticipated, such as following a key release or unexpected news. Over the long run, the savings in impermanent loss will likely outweigh the higher fees in a narrow range.</p>\n<p>For example, consider asset pairs like BNB-BTC or BTC-ETH. Although these pairs are volatile against USD, they display a strong positive price correlation. In such cases, the narrow range strategy might be more suitable due to the correlated nature of the assets.</p>\n<p><strong>3. Manual Range (Custom Strategy): Geared towards experienced users seeking more control over their investments</strong></p>\n<p>The manual range strategy allows LPs to set their preferred price range and adjust it based on market conditions. Note that opting for this approach means forgoing the automated Gamma system and associated staking rewards in THE tokens. Users will only earn trading fees from the pool while actively managing their positions to optimize returns. This strategy is best suited for skilled investors confident in their market navigation abilities.</p>\n<p>By offering these distinct LP strategies, FUSION enables LPs to customize their investments according to their specific needs and preferences, providing a flexible and user-friendly platform for all.</p>\n<h3>Pool Types and UI</h3>\n<p>With THENA V2, the user interface is updated with changed pool categories. In THENA V1, there were stable and volatile pool categories. In THENA V2, the new categories are:</p>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/0*C8jJ8_EfGOON6JUW"></figure><p>With the introduction of THENA V2, we have the following new categories:</p>\n<ul>\n<li>\n<strong>Stable</strong>: Combines both Solidly and FUSION stable pools, referred to as <em>Stable</em> and <em>GAMMA_STABLE</em>. <em>Stable</em> is a UniV2-style pool with a full range, while <em>GAMMA_STABLE</em> features FUSION support, concentrated liquidity, and automated LP management. This way all the stablecoins can be still found in the same category.</li>\n<li>\n<strong>V1</strong>: Includes only Solidly pools with volatile tokens. This is essentially the “Volatile” category renamed to “V1”.</li>\n<li>\n<strong>FUSION</strong>: Contains only FUSION pools, including <em>V3_Narrow</em> &amp; <em>V3_Wide</em>.</li>\n</ul>\n<p>Once the Epoch changes, migrated pools will be visible as active.</p>\n<h3>Key Advantages of FUSION</h3>\n<p>FUSION has been artfully assembled to cater to your desires, combining strategic parameter optimization and a clear, user-friendly design, pioneered through our partnership with <strong>Three Sigma</strong>, a leading blockchain engineering, research, and investment organization, to capture market share, achieve the best price execution, and excel against competitors on BNB Chain.</p>\n<p>FUSION stands out due to its<strong> modular design</strong>, allowing it to easily integrate with multiple liquidity managers, not just limited to Gamma. When providing liquidity through Gamma, users receive a fungible ERC-20 LP token that presents various ways to earn:</p>\n<ol>\n<li>Staking in FUSION gauges to earn $THE rewards</li>\n<li>Staking in partner vaults for optimized yields (auto-compounding, leverage farming, etc.)</li>\n<li>Keeping unstaked LP tokens to earn trading fees, but with a higher risk profile (manual “wild” mode)</li>\n</ol>\n<p>FUSION offers superior capital efficiency. Better price execution for traders, and less resources spent by protocols to incentivize their liquidity.</p>\n<p>Additionally, FUSION allows protocols to engage in <strong>market-making activities</strong> by incentivizing Gamma-powered strategies, adding value to the ecosystem. This innovative approach fosters a better alignment between protocols and users’ interests.</p>\n<p>FUSION’s <strong>user-friendly</strong> platform is designed for users of all experience levels, making it simple to provide liquidity and stake, similar to using UniV2. This lowers barriers to entry, making concentrated liquidity more accessible to a wider audience.</p>\n<p>THENA possesses a<strong> first mover advantage</strong> as the leading DEX on BNB Chain to integrate Solidly mechanics with automated concentrated liquidity. Furthermore, THENA is the only platform on BNB Chain offering Algebra’s premium solution, secured through an <strong>exclusive partnership</strong> with Gamma specifically for BNB Chain.</p>\n<p>Furthermore, FUSION features <strong>dynamic fees</strong> that adapt to market conditions, optimizing revenue for LPs without the need to switch pools. This eliminates multiple pools for each fee tier, maximizing protocol revenue by considering factors like volatility and trading volume.</p>\n<h3>Migration</h3>\n<h4><strong>TL;DR</strong></h4>\n<ul>\n<li>Only users with liquidity staked need to migrate</li>\n<li>Migration is necessary to keep earning THE</li>\n<li>Pool categories in UI changed to: Stable, V1, and FUSION</li>\n<li>There are two types of migrations</li>\n<li>Same gauge type: Moving from an old gauge to a new gauge for the same type of pool</li>\n<li>FUSION gauge: Moving from an old gauge to a new FUSION gauge</li>\n<li>Migration must be carried out for each gauge individually</li>\n<li>Our dedicated <a href="https://www.thena.fi/liquidity/migration">Migration UI</a> will guide you through the migration process</li>\n</ul>\n<p>Before diving into the migration process, it’s crucial to understand why migration is necessary for THENA V2. Our platform has undergone significant improvements to optimize performance and enhance the user experience with the introduction of THENA V2. To take advantage of these upgrades, all users must migrate their liquidity positions to the new gauge system (old gauges stop receiving emissions at the end of this Epoch), which supports both old and new pools. While this process may require some extra effort, the outcome will be a more efficient and seamless experience on our platform.</p>\n<p>Migration refers to transferring liquidity positions from the old to the new gauges, allowing continued platform participation and enjoyment of upgraded benefits. The user interface makes things super simple. Note that migration is required to keep earning THE, as all old gauges will be replaced with new ones, and users must migrate to the new system supporting both old and new types of pools, with majority of the liquidity moving to the new pools over the coming weeks.</p>\n<h3>Migration Guide</h3>\n<p>Migration is applicable only if you have liquidity staked in THENA’s gauges. The migration process will also claim your rewards for you.</p>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/1*VuXy2IZGvNNEViKThM8AvQ.png"><figcaption>Easy and smooth migration thanks to the dedicated Migration UI</figcaption></figure><p>To complete the migration process, follow these steps:</p>\n<ol>\n<li>Visit <a href="https://thena.fi/liquidity/migration">thena.fi/liquidity/migration</a> to access the migration user interface (UI)</li>\n<li>Locate the gauges you’ve staked into by clicking “<strong>Staked Only</strong>”</li>\n<li>Click on “<strong>Migrate</strong>” on any gauge</li>\n<li>Depending on your gauge, there are <strong>two migration types </strong>(up to 3 options, 2 of them FUSION)</li>\n</ol>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/586/1*bHvFo5KVoojr7m1pe5mMIA.gif"></figure><p>Migration type 1: <strong>Old pool but new gauge</strong></p>\n<p>Migration type 2: <strong>From old pool to FUSION</strong></p>\n<p>If the pool has FUSION available, that option will be displayed when you click Migrate. You can choose any of the options presented and then proceed to approve all the transactions.</p>\n<p>For type 1 migration, once you’ve approved everything, you’re done. For type 2, you’ll be presented with the option to stake into FUSION after the liquidity is withdrawn.</p>\n<h3>THENA V2: A Powerful Synergy with Gamma Strategies and Algebra</h3>\n<p>Experience the future of DeFi with THENA V2. THENA’s upgrade to V2 is significant, incorporating major changes and improvements, which warrants the new version designation. This comprehensive update includes upgrading all gauges and migrating some to FUSION pools.</p>\n<p>FUSION combines the strengths of Gamma and Algebra protocols to offer a unique concentrated liquidity solution. Algebra’s model enables LPs to allocate funds in narrower price ranges, increasing capital efficiency and improving price execution. Simultaneously, Gamma simplifies management by providing automated strategies that keep the position within the optimal range, offering a hassle-free investment experience.</p>\n<p>THENA’s FUSION transforms the DeFi landscape by making concentrated liquidity more approachable, efficient, and user-friendly. By merging Algebra’s capital efficiency model with Gamma’s automated strategies, FUSION delivers a powerful solution that overcomes the limitations of traditional liquidity models. Although concentrated liquidity has its pros and cons, FUSION’s inventive approach lays the foundation for a more dynamic and inclusive DeFi ecosystem.</p>\n<p>We’ve simplified concentrated liquidity for you, paving the way to become the #1 DEX on BNB Chain.</p>\n<img src="https://medium.com/_/stat?event=post.clientViewed&amp;referrerSource=full_rss&amp;postId=6f46978a1dab" width="1" height="1" alt="">\n',
            content:
              '\n<h3>Demystifying FUSION: A Closer Look at THENA’s Concentrated Liquidity Revolution</h3>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/0*BfXoBD1iI48uz_R8"><figcaption>FUSION combines the strengths of three industry leaders</figcaption></figure><h3>TL<strong>;</strong>DR</h3>\n<ul>\n<li>THENA V2 represents a major platform upgrade, featuring enhanced gauges and the integration of FUSION pools.</li>\n<li>Concentrated Liquidity (CL) enables LPs to focus their funds within a specific price range, providing deeper liquidity and potentially higher trading fee earnings.</li>\n<li>Impermanent Loss (IL) is a temporary decrease in LPs’ asset value due to price fluctuations; however, trading fees can offset this loss, ensuring profitability despite the risk.</li>\n<li>FUSION, a DeFi innovation by THENA, Gamma Strategies, and Algebra, improves CL management, capital efficiency, and user experience.</li>\n<li>FUSION addresses CL challenges by simplifying complexity, minimizing impermanent loss risk, adapting to market volatility, and optimizing dynamic fees.</li>\n<li>It offers six LP strategies catering to different assets and user preferences: wide, narrow, manual, pegged price, correlated, and stable.</li>\n<li>Strategic collaboration with Three Sigma drives THENA towards market leadership on BNB Chain</li>\n<li>FUSION’s advantages include a modular design, cost-efficiency for protocols and traders, a user-friendly platform, market-making capabilities, and dynamic fees.</li>\n<li>THENA pioneers Solidly-based automated CL with an exclusive collaboration with Gamma Strategies on BNB Chain.</li>\n<li>Users with liquidity positions must migrate to continue earning THE, either by transitioning to the same gauge type or a FUSION gauge, using our Migration UI for guidance.</li>\n</ul>\n<h3>Introduction</h3>\n<p>As the decentralized finance (DeFi) landscape evolves, innovative solutions like FUSION are emerging to address the challenges and limitations of traditional liquidity models. FUSION, developed in collaboration by THENA, Gamma Strategies, and Algebra, simplifies the management of Concentrated Liquidity (CL) while enhancing capital efficiency and user experience.</p>\n<p>In this follow-up article, we explore the concept of concentrated liquidity, the roles of Gamma Strategies and Algebra in FUSION, and the benefits and potential drawbacks of this DeFi innovation.</p>\n<p>If you haven’t read the previous article on FUSION, read it <a href="https://medium.com/@ThenaFi/fusion-spark-a-new-era-in-defi-with-thenas-concentrated-liquidity-breakthrough-1f6d647dc60c">here</a>.</p>\n<p>If you’d rather skip the details and go straight to the migration guide, simply scroll to the end of this article.</p>\n<h3>Understanding Concentrated Liquidity</h3>\n<p>Imagine a farmer watering their crops. Instead of using sprinklers that sprays water across the entire field, the farmer selectively waters the plants that need it the most.</p>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/0*vf3CRtTQWzLkB8Av"></figure><p>Similarly, in DeFi, CL allows Liquidity Providers (LPs) to focus their funds within specific price ranges where they are most needed, rather than spreading them across the entire price spectrum. This targeted approach results in more efficient trades and higher fees for LPs while reducing slippage for traders.</p>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/562/0*Nq_mtjBKEL0PVRAo"><figcaption><em>Concentrated Liquidity concentrates liquidity into a tighter price range</em></figcaption></figure><h3>The Importance of Concentrated Liquidity</h3>\n<p>CL offers several advantages over traditional liquidity models:</p>\n<ol>\n<li>\n<strong>Capital efficiency: </strong>By focusing liquidity within specific price ranges, it can achieve up to 10x capital efficiency compared to traditional models. As a result, the protocol can rely on fewer incentives to attract LPs, freeing up resources to expand their offerings or generate more fees.</li>\n<li>\n<strong>More efficient trading: </strong>CL enables better price execution for traders and protocols, reducing slippage and promoting more efficient trades.</li>\n<li>\n<strong>Enhanced flexibility:</strong> LPs have greater control over their risk exposure and returns by choosing the price range within which they want to provide liquidity.</li>\n</ol>\n<p>However, CL also has some drawbacks:</p>\n<ol>\n<li>\n<strong>Complexity: </strong>Managing CL can be challenging, as it requires constant monitoring and adjustments to stay within the optimal price range.</li>\n<li>\n<strong>Risk of impermanent loss: </strong>If asset prices move beyond the chosen range, LPs may face a higher risk of impermanent loss and miss out on fee generation, making CL less suitable for highly volatile assets.</li>\n<li>\n<strong>Barriers to entry: </strong>Some CL solutions can be overwhelming for new users, as they require a deeper understanding of market dynamics and strategies to manage liquidity effectively.</li>\n</ol>\n<h3>Impermanent Loss and Concentrated Liquidity</h3>\n<p>Returning to the farmer metaphor: The farmer waters crops that need water the most. Unpredictable factors, such as weather (price fluctuations), can result in some crops within the watered area growing slower, while those in other areas experience surprising growth. The farmer encounters an impermanent loss (IL) due to missing potential growth from the unwatered regions. This loss is temporary since, if conditions change and the watered crops catch up in growth, the loss vanishes, and the farmer still profits from the harvest (trading fees).</p>\n<p>Enter Gamma Strategies, a highly intelligent swarm of drones that oversee the farm and closely monitors every plant to provide each one with the optimal amount of water without wasting any resources.</p>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/0*SHOcTf1baDC0e7cE"></figure><p>Impermanent loss occurs in CL pools when asset prices shift significantly, causing LPs to have imbalanced token pairs. Gamma mitigates this issue by actively rebalancing the price ranges of LPs, maximizing fee generation and minimizing impermanent losses. See simple example how Gamma rebalances price ranges with market price volatility:</p>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/0*MJFkHPbfRaOeZhpS"></figure><p>That’s the essence of Gamma’s role in FUSION — automating the LP management process to simplify life for LPs while minimizing impermanent loss.</p>\n<h3>Balancing Pros and Cons with FUSION</h3>\n<p>At THENA, we recognize the importance of maximizing Concentrated Liquidity benefits while minimizing its drawbacks. FUSION tackles these challenges and makes CL more efficient and accessible for all users.</p>\n<p><strong>1. Simplifying Complexity:</strong> FUSION incorporates Gamma’s automated strategies, which constantly manage and adjust positions to stay within the optimal range. This eliminates the need for active management by LPs, saving time and effort while reducing the risk of impermanent loss.</p>\n<p>FUSION’s user-friendly platform makes concentrated liquidity accessible to a wider audience, including V2 farmers who might lack the expertise to effectively manage their strategies, catering to users of all experience levels.</p>\n<p><strong>2. Reducing Impermanent Loss Risk:</strong> FUSION mitigates the risk of impermanent loss with built-in Gamma Strategies, which automatically adjust liquidity positions based on market conditions. This ensures users’ investments stay within the chosen range and continue to generate fees.</p>\n<p><strong>3. Adapting to Market Volatility:</strong> FUSION, in collaboration with Algebra and Gamma Strategies, offers multiple strategies for managing liquidity, such as wide and narrow ranges for volatile assets and stable ranges for pegged assets. This flexibility allows users to choose the best strategy for their investments, regardless of market conditions.</p>\n<p><strong>4. Dynamic Fee Optimization:</strong> FUSION incorporates Algebra’s dynamic fees that adapt to market conditions, optimizing revenue for LPs without requiring them to switch pools. This eliminates the need for multiple pools for each fee tier and maximizes revenue for the protocol by considering factors like volatility and trading volume. The fee structure increases in response to higher volatility and decreases to capture more trading volumes on DEX aggregators.</p>\n<p>Manual market making can be challenging and less user-friendly. Although significant profits can be achieved with the right knowledge, our automated solution offers greater ease and profitability compared to competitors. Most users will likely benefit more from allowing Gamma to manage everything rather than attempting it themselves. In essence, we’ve simplified concentrated liquidity for you.</p>\n<p>By addressing these challenges, FUSION makes concentrated liquidity more accessible and user-friendly, ultimately revolutionizing the DeFi ecosystem and creating a more efficient and profitable experience for both traders and liquidity providers.</p>\n<h3>Six Pathways to Optimal Strategy</h3>\n<p>FUSION presents a versatile range of LP strategies for both <em>volatile </em>and other assets. The platform features three primary strategies for <em>volatile </em>assets— narrow, wide, and manual modes — while offering pegged price, correlated, and stable strategies for other asset types. These diverse approaches enable beginner and experienced users alike to customize their investments based on personal preferences, risk tolerance, and the particular assets they are working with.</p>\n<p>For a simpler launch, FUSION will initially not support distinct categories for Pegged Price and Correlated pools.</p>\n<p>Refer to the summary table for a quick comparison below:</p>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/1*9euoVR5tt02LxyEiOojtWA.png"></figure><p>Let’s explore the narrow, wide and manual strategies in more detail — examining their benefits, trade-offs, and factors to consider when selecting the most suitable approach for your needs.</p>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/0*VqRtXDSgh33eCIuV"></figure><p><strong>1. Narrow Range: For assets with high price correlation and low price fluctuations</strong></p>\n<p>The narrow range strategy focuses on a tighter price range between two assets.</p>\n<p>This strategy works well for assets with high and positive price correlation as it concentrates the price range where most trading activity occurs. The Narrow Range also maximizes the fee-earning potential during periods of low market volatility. However, in the long term, higher fees may not compensate for the higher impermanent loss risk.</p>\n<p><strong>2. Wide Range: For assets with low price correlation and high price fluctuations</strong></p>\n<p>In contrast, the wide range strategy involves spreading liquidity over a broad price range between two assets.</p>\n<p>This method is particularly effective for assets with low price correlation and significant price fluctuations. The strategy generates consistent fees during periods of market volatility, especially when high token volatility is anticipated, such as following a key release or unexpected news. Over the long run, the savings in impermanent loss will likely outweigh the higher fees in a narrow range.</p>\n<p>For example, consider asset pairs like BNB-BTC or BTC-ETH. Although these pairs are volatile against USD, they display a strong positive price correlation. In such cases, the narrow range strategy might be more suitable due to the correlated nature of the assets.</p>\n<p><strong>3. Manual Range (Custom Strategy): Geared towards experienced users seeking more control over their investments</strong></p>\n<p>The manual range strategy allows LPs to set their preferred price range and adjust it based on market conditions. Note that opting for this approach means forgoing the automated Gamma system and associated staking rewards in THE tokens. Users will only earn trading fees from the pool while actively managing their positions to optimize returns. This strategy is best suited for skilled investors confident in their market navigation abilities.</p>\n<p>By offering these distinct LP strategies, FUSION enables LPs to customize their investments according to their specific needs and preferences, providing a flexible and user-friendly platform for all.</p>\n<h3>Pool Types and UI</h3>\n<p>With THENA V2, the user interface is updated with changed pool categories. In THENA V1, there were stable and volatile pool categories. In THENA V2, the new categories are:</p>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/0*C8jJ8_EfGOON6JUW"></figure><p>With the introduction of THENA V2, we have the following new categories:</p>\n<ul>\n<li>\n<strong>Stable</strong>: Combines both Solidly and FUSION stable pools, referred to as <em>Stable</em> and <em>GAMMA_STABLE</em>. <em>Stable</em> is a UniV2-style pool with a full range, while <em>GAMMA_STABLE</em> features FUSION support, concentrated liquidity, and automated LP management. This way all the stablecoins can be still found in the same category.</li>\n<li>\n<strong>V1</strong>: Includes only Solidly pools with volatile tokens. This is essentially the “Volatile” category renamed to “V1”.</li>\n<li>\n<strong>FUSION</strong>: Contains only FUSION pools, including <em>V3_Narrow</em> &amp; <em>V3_Wide</em>.</li>\n</ul>\n<p>Once the Epoch changes, migrated pools will be visible as active.</p>\n<h3>Key Advantages of FUSION</h3>\n<p>FUSION has been artfully assembled to cater to your desires, combining strategic parameter optimization and a clear, user-friendly design, pioneered through our partnership with <strong>Three Sigma</strong>, a leading blockchain engineering, research, and investment organization, to capture market share, achieve the best price execution, and excel against competitors on BNB Chain.</p>\n<p>FUSION stands out due to its<strong> modular design</strong>, allowing it to easily integrate with multiple liquidity managers, not just limited to Gamma. When providing liquidity through Gamma, users receive a fungible ERC-20 LP token that presents various ways to earn:</p>\n<ol>\n<li>Staking in FUSION gauges to earn $THE rewards</li>\n<li>Staking in partner vaults for optimized yields (auto-compounding, leverage farming, etc.)</li>\n<li>Keeping unstaked LP tokens to earn trading fees, but with a higher risk profile (manual “wild” mode)</li>\n</ol>\n<p>FUSION offers superior capital efficiency. Better price execution for traders, and less resources spent by protocols to incentivize their liquidity.</p>\n<p>Additionally, FUSION allows protocols to engage in <strong>market-making activities</strong> by incentivizing Gamma-powered strategies, adding value to the ecosystem. This innovative approach fosters a better alignment between protocols and users’ interests.</p>\n<p>FUSION’s <strong>user-friendly</strong> platform is designed for users of all experience levels, making it simple to provide liquidity and stake, similar to using UniV2. This lowers barriers to entry, making concentrated liquidity more accessible to a wider audience.</p>\n<p>THENA possesses a<strong> first mover advantage</strong> as the leading DEX on BNB Chain to integrate Solidly mechanics with automated concentrated liquidity. Furthermore, THENA is the only platform on BNB Chain offering Algebra’s premium solution, secured through an <strong>exclusive partnership</strong> with Gamma specifically for BNB Chain.</p>\n<p>Furthermore, FUSION features <strong>dynamic fees</strong> that adapt to market conditions, optimizing revenue for LPs without the need to switch pools. This eliminates multiple pools for each fee tier, maximizing protocol revenue by considering factors like volatility and trading volume.</p>\n<h3>Migration</h3>\n<h4><strong>TL;DR</strong></h4>\n<ul>\n<li>Only users with liquidity staked need to migrate</li>\n<li>Migration is necessary to keep earning THE</li>\n<li>Pool categories in UI changed to: Stable, V1, and FUSION</li>\n<li>There are two types of migrations</li>\n<li>Same gauge type: Moving from an old gauge to a new gauge for the same type of pool</li>\n<li>FUSION gauge: Moving from an old gauge to a new FUSION gauge</li>\n<li>Migration must be carried out for each gauge individually</li>\n<li>Our dedicated <a href="https://www.thena.fi/liquidity/migration">Migration UI</a> will guide you through the migration process</li>\n</ul>\n<p>Before diving into the migration process, it’s crucial to understand why migration is necessary for THENA V2. Our platform has undergone significant improvements to optimize performance and enhance the user experience with the introduction of THENA V2. To take advantage of these upgrades, all users must migrate their liquidity positions to the new gauge system (old gauges stop receiving emissions at the end of this Epoch), which supports both old and new pools. While this process may require some extra effort, the outcome will be a more efficient and seamless experience on our platform.</p>\n<p>Migration refers to transferring liquidity positions from the old to the new gauges, allowing continued platform participation and enjoyment of upgraded benefits. The user interface makes things super simple. Note that migration is required to keep earning THE, as all old gauges will be replaced with new ones, and users must migrate to the new system supporting both old and new types of pools, with majority of the liquidity moving to the new pools over the coming weeks.</p>\n<h3>Migration Guide</h3>\n<p>Migration is applicable only if you have liquidity staked in THENA’s gauges. The migration process will also claim your rewards for you.</p>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/1*VuXy2IZGvNNEViKThM8AvQ.png"><figcaption>Easy and smooth migration thanks to the dedicated Migration UI</figcaption></figure><p>To complete the migration process, follow these steps:</p>\n<ol>\n<li>Visit <a href="https://thena.fi/liquidity/migration">thena.fi/liquidity/migration</a> to access the migration user interface (UI)</li>\n<li>Locate the gauges you’ve staked into by clicking “<strong>Staked Only</strong>”</li>\n<li>Click on “<strong>Migrate</strong>” on any gauge</li>\n<li>Depending on your gauge, there are <strong>two migration types </strong>(up to 3 options, 2 of them FUSION)</li>\n</ol>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/586/1*bHvFo5KVoojr7m1pe5mMIA.gif"></figure><p>Migration type 1: <strong>Old pool but new gauge</strong></p>\n<p>Migration type 2: <strong>From old pool to FUSION</strong></p>\n<p>If the pool has FUSION available, that option will be displayed when you click Migrate. You can choose any of the options presented and then proceed to approve all the transactions.</p>\n<p>For type 1 migration, once you’ve approved everything, you’re done. For type 2, you’ll be presented with the option to stake into FUSION after the liquidity is withdrawn.</p>\n<h3>THENA V2: A Powerful Synergy with Gamma Strategies and Algebra</h3>\n<p>Experience the future of DeFi with THENA V2. THENA’s upgrade to V2 is significant, incorporating major changes and improvements, which warrants the new version designation. This comprehensive update includes upgrading all gauges and migrating some to FUSION pools.</p>\n<p>FUSION combines the strengths of Gamma and Algebra protocols to offer a unique concentrated liquidity solution. Algebra’s model enables LPs to allocate funds in narrower price ranges, increasing capital efficiency and improving price execution. Simultaneously, Gamma simplifies management by providing automated strategies that keep the position within the optimal range, offering a hassle-free investment experience.</p>\n<p>THENA’s FUSION transforms the DeFi landscape by making concentrated liquidity more approachable, efficient, and user-friendly. By merging Algebra’s capital efficiency model with Gamma’s automated strategies, FUSION delivers a powerful solution that overcomes the limitations of traditional liquidity models. Although concentrated liquidity has its pros and cons, FUSION’s inventive approach lays the foundation for a more dynamic and inclusive DeFi ecosystem.</p>\n<p>We’ve simplified concentrated liquidity for you, paving the way to become the #1 DEX on BNB Chain.</p>\n<img src="https://medium.com/_/stat?event=post.clientViewed&amp;referrerSource=full_rss&amp;postId=6f46978a1dab" width="1" height="1" alt="">\n',
            enclosure: {},
            categories: ['concentrated-liquidity', 'bnb-chain', 'bsc', 'binance-smart-chain', 'bnb'],
          },
          {
            title: 'FUSION — Spark a New Era in DeFi with THENA’s Concentrated Liquidity Breakthrough',
            pubDate: '2023-03-28 12:55:15',
            link: 'https://medium.com/@ThenaFi/fusion-spark-a-new-era-in-defi-with-thenas-concentrated-liquidity-breakthrough-1f6d647dc60c?source=rss-ea602b0c5af7------2',
            guid: 'https://medium.com/p/1f6d647dc60c',
            author: 'Thena.fi',
            thumbnail: 'https://cdn-images-1.medium.com/max/1024/0*E3jm9c_EDjiz_30v',
            description:
              '\n<h3>FUSION — Spark a New Era in DeFi with THENA’s Concentrated Liquidity Breakthrough</h3>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/0*E3jm9c_EDjiz_30v"><figcaption>Partnering with the best</figcaption></figure><p>In the world of DeFi, protocols that can adapt rapidly and innovate seamlessly are usually the most successful. In just over two months, THENA, the native liquidity layer on BNB Chain, has become a serious contender in the ecosystem:</p>\n<ul>\n<li>Gone from 0 to $170 million in TVL</li>\n<li>Reached $100 million in weekly trading volume</li>\n<li>Became the number three DEX on BNB (and number one community-owned protocol) — A chain boasting nearly 600 projects</li>\n</ul>\n<p>THENA’s mission is to bring ultimate modularity to the liquidity layer by catering to the diverse needs of the DeFi space with a powerful suite of products for both protocols and users.</p>\n<p>Our goal is to revolutionize DeFi by embracing the following principles:</p>\n<ol>\n<li>Accessibility</li>\n<li>Efficiency</li>\n<li>Versatility</li>\n<li>Safety</li>\n</ol>\n<p>Introducing FUSION, which makes concentrated liquidity accessible for the average user. Discover who we’re collaborating with and how they’re helping us shape the future. Let’s dive in!</p>\n<h3>Algebra — The Math Behind the Curtain</h3>\n<p>For years, the Uniswap’s V2 model has dominated DeFi as the go-to liquidity and reward system. Its main drawback? Capital inefficiency.</p>\n<h3>The Traditional Model</h3>\n<p>Users add liquidity, receiving tokens and trading fees in return, but the infinite price range leaves most liquidity untouched. To overcome poor price execution, DEXs need as much liquidity as possible in these pools.</p>\n<h3>The New Solution</h3>\n<p>Algebra’s model introduces next-level capital efficiency by allowing users to focus their funds with a tighter price range, focusing liquidity in these pools at the prices where it will be needed most. Not only will users be rewarded more effectively, but traders and protocols will also see better price execution.</p>\n<p>FUSION pools go beyond a simple hard fork. They introduce dynamic fees, eliminating the need for users to switch pools to optimize fee revenue. Additionally, they support limit orders, enhancing functionality and elevating the overall user experience.</p>\n<p>The bottom line for liquidity providers, traders, and protocols?</p>\n<p>Collaborating with cutting-edge DeFi protocols, FUSION places the power of concentrated liquidity at everyone’s fingertips — all while simplifying the process to engage even new users.</p>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/0*j0UPM9-I8Fynk1Tw"><figcaption>FUSION levels the playfield</figcaption></figure><h3>Gamma — Supercharging Active Liquidity Management</h3>\n<p>Although UniV3 addresses capital efficiency issues, it’s not perfect. Users must continuously set and reset price ranges manually to optimize liquidity, claim fees, and monitor impermanent loss risk.</p>\n<p>Enter Gamma — who provides the composable, seamless, and user-friendly solution we’ve been looking for.</p>\n<p>Gamma resolves these problems, allowing users to adopt the V3 model while taking a hands-off approach to their investment strategy.</p>\n<p>Thanks to Gamma, you’ll be able to choose your range — narrow or wide — and let automation do the rest, differing from competing solutions which require active management. Time is money.</p>\n<p>The partnerships we’re forging are dismantling previous barriers to entry, delivering profitable, retail-friendly solutions, and offering users a plethora of options to manage their funds.</p>\n<h3>Unleashing the Synergy of ve(3,3) and FUSION</h3>\n<p>At THENA, we’re committed to pushing the boundaries of innovation, striving to create the ultimate DeFi experience for liquidity providers (LPs), traders, and protocols.</p>\n<p>Our ve(3,3) model works in harmony with the new features, completely transforming the DeFi landscape. FUSION brings together:</p>\n<ul>\n<li>\n<strong>Gamma</strong>: Delivering a composable and retail-friendly platform, we eliminate barriers to entry for users of all levels.</li>\n<li>\n<strong>Algebra</strong>: Enhancing revenue for veTHE holders through dynamic fees and achieving 10x capital efficiency via concentrated liquidity, we ensure top-tier price execution for traders.</li>\n<li>\n<strong>ve(3,3)</strong>: Providing the most cost-effective liquidity layer for protocols, adding value to emissions, and enabling effortless pool scaling.</li>\n</ul>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/0*oWVCNWJQGJgRCE22"></figure><p>As we continue our mission to build the best DeFi ecosystem, we’re dedicated to partnering with exceptional organizations that share our vision of bridging the gap between retail investors and decentralized applications.</p>\n<p>Aim for the stars with us.</p>\n<h4><strong>About THENA</strong></h4>\n<p>THENA is a trailblazing decentralized exchange (DEX) and liquidity layer built on BNB Chain, committed to revolutionizing the DeFi ecosystem. Offering a user-friendly, permissionless platform, THENA enables seamless token swaps and liquidity provision for a diverse range of assets. Our mission is to empower users and protocols with innovative solutions that cater to the ever-evolving needs of the DeFi space.</p>\n<p>At the core of THENA’s offerings is FUSION, our groundbreaking concentrated liquidity solution developed in collaboration with Algebra and GAMMA protocols. FUSION redefines capital efficiency, dynamic fees, and limit orders, providing an unparalleled DeFi experience for users, traders, and protocols alike.</p>\n<p><a href="https://link3.to/thena">Join the THENA community</a> as we continually innovate and strive to create THE best protocol in DeFi. Together, we’ll shape the future.</p>\n<img src="https://medium.com/_/stat?event=post.clientViewed&amp;referrerSource=full_rss&amp;postId=1f6d647dc60c" width="1" height="1" alt="">\n',
            content:
              '\n<h3>FUSION — Spark a New Era in DeFi with THENA’s Concentrated Liquidity Breakthrough</h3>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/0*E3jm9c_EDjiz_30v"><figcaption>Partnering with the best</figcaption></figure><p>In the world of DeFi, protocols that can adapt rapidly and innovate seamlessly are usually the most successful. In just over two months, THENA, the native liquidity layer on BNB Chain, has become a serious contender in the ecosystem:</p>\n<ul>\n<li>Gone from 0 to $170 million in TVL</li>\n<li>Reached $100 million in weekly trading volume</li>\n<li>Became the number three DEX on BNB (and number one community-owned protocol) — A chain boasting nearly 600 projects</li>\n</ul>\n<p>THENA’s mission is to bring ultimate modularity to the liquidity layer by catering to the diverse needs of the DeFi space with a powerful suite of products for both protocols and users.</p>\n<p>Our goal is to revolutionize DeFi by embracing the following principles:</p>\n<ol>\n<li>Accessibility</li>\n<li>Efficiency</li>\n<li>Versatility</li>\n<li>Safety</li>\n</ol>\n<p>Introducing FUSION, which makes concentrated liquidity accessible for the average user. Discover who we’re collaborating with and how they’re helping us shape the future. Let’s dive in!</p>\n<h3>Algebra — The Math Behind the Curtain</h3>\n<p>For years, the Uniswap’s V2 model has dominated DeFi as the go-to liquidity and reward system. Its main drawback? Capital inefficiency.</p>\n<h3>The Traditional Model</h3>\n<p>Users add liquidity, receiving tokens and trading fees in return, but the infinite price range leaves most liquidity untouched. To overcome poor price execution, DEXs need as much liquidity as possible in these pools.</p>\n<h3>The New Solution</h3>\n<p>Algebra’s model introduces next-level capital efficiency by allowing users to focus their funds with a tighter price range, focusing liquidity in these pools at the prices where it will be needed most. Not only will users be rewarded more effectively, but traders and protocols will also see better price execution.</p>\n<p>FUSION pools go beyond a simple hard fork. They introduce dynamic fees, eliminating the need for users to switch pools to optimize fee revenue. Additionally, they support limit orders, enhancing functionality and elevating the overall user experience.</p>\n<p>The bottom line for liquidity providers, traders, and protocols?</p>\n<p>Collaborating with cutting-edge DeFi protocols, FUSION places the power of concentrated liquidity at everyone’s fingertips — all while simplifying the process to engage even new users.</p>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/0*j0UPM9-I8Fynk1Tw"><figcaption>FUSION levels the playfield</figcaption></figure><h3>Gamma — Supercharging Active Liquidity Management</h3>\n<p>Although UniV3 addresses capital efficiency issues, it’s not perfect. Users must continuously set and reset price ranges manually to optimize liquidity, claim fees, and monitor impermanent loss risk.</p>\n<p>Enter Gamma — who provides the composable, seamless, and user-friendly solution we’ve been looking for.</p>\n<p>Gamma resolves these problems, allowing users to adopt the V3 model while taking a hands-off approach to their investment strategy.</p>\n<p>Thanks to Gamma, you’ll be able to choose your range — narrow or wide — and let automation do the rest, differing from competing solutions which require active management. Time is money.</p>\n<p>The partnerships we’re forging are dismantling previous barriers to entry, delivering profitable, retail-friendly solutions, and offering users a plethora of options to manage their funds.</p>\n<h3>Unleashing the Synergy of ve(3,3) and FUSION</h3>\n<p>At THENA, we’re committed to pushing the boundaries of innovation, striving to create the ultimate DeFi experience for liquidity providers (LPs), traders, and protocols.</p>\n<p>Our ve(3,3) model works in harmony with the new features, completely transforming the DeFi landscape. FUSION brings together:</p>\n<ul>\n<li>\n<strong>Gamma</strong>: Delivering a composable and retail-friendly platform, we eliminate barriers to entry for users of all levels.</li>\n<li>\n<strong>Algebra</strong>: Enhancing revenue for veTHE holders through dynamic fees and achieving 10x capital efficiency via concentrated liquidity, we ensure top-tier price execution for traders.</li>\n<li>\n<strong>ve(3,3)</strong>: Providing the most cost-effective liquidity layer for protocols, adding value to emissions, and enabling effortless pool scaling.</li>\n</ul>\n<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/0*oWVCNWJQGJgRCE22"></figure><p>As we continue our mission to build the best DeFi ecosystem, we’re dedicated to partnering with exceptional organizations that share our vision of bridging the gap between retail investors and decentralized applications.</p>\n<p>Aim for the stars with us.</p>\n<h4><strong>About THENA</strong></h4>\n<p>THENA is a trailblazing decentralized exchange (DEX) and liquidity layer built on BNB Chain, committed to revolutionizing the DeFi ecosystem. Offering a user-friendly, permissionless platform, THENA enables seamless token swaps and liquidity provision for a diverse range of assets. Our mission is to empower users and protocols with innovative solutions that cater to the ever-evolving needs of the DeFi space.</p>\n<p>At the core of THENA’s offerings is FUSION, our groundbreaking concentrated liquidity solution developed in collaboration with Algebra and GAMMA protocols. FUSION redefines capital efficiency, dynamic fees, and limit orders, providing an unparalleled DeFi experience for users, traders, and protocols alike.</p>\n<p><a href="https://link3.to/thena">Join the THENA community</a> as we continually innovate and strive to create THE best protocol in DeFi. Together, we’ll shape the future.</p>\n<img src="https://medium.com/_/stat?event=post.clientViewed&amp;referrerSource=full_rss&amp;postId=1f6d647dc60c" width="1" height="1" alt="">\n',
            enclosure: {},
            categories: ['bsc', 'defi', 'uniswap', 'bnb', 'bnb-chain'],
          },
        ],
      },
      txOverride: {
        mode: true,
        notificationType: 1,
        recipient: ['0x78906ad82D666981c246Ed7a562Acd69fb49610A'],
      },
    };
    const thenaChannel = new ThenaChannel(mockLogger as any, fakeCache);

    // Act
    const reponse = await thenaChannel.sendNotifsForNewMediumPosts(simulate);

    // Assert
    expect(reponse.notifSent).toEqual(false);
  });
});
