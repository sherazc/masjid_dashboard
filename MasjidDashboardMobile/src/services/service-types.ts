export type TestMode = {
  mode: boolean;
}

export const defaultTestMode = (): TestMode =>  ({mode: false});
