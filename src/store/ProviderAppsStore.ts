import { atom, createStore } from "jotai/vanilla";
import type { ProviderApp } from "@utils/types";
const store = createStore();
export const providerAppsAtom = atom<ProviderApp[]>();
const providerAppsAtomsMap = new Map<
  number,
  ReturnType<typeof atom<ProviderApp | undefined>>
>();

export const setProviderAppsData = (providerApps: ProviderApp[]) => {
  store.set(providerAppsAtom, providerApps);
};
export const getProviderAppsData = () => {
  return store.get(providerAppsAtom);
};

export const subscribeProviderAppsData = (
  callback: (providerApps?: ProviderApp[]) => void,
) => {
  store.sub(providerAppsAtom, () => {
    const providerApps = getProviderAppsData();
    callback(providerApps);
  });
};

const providerAppAtomById = (id: number) => {
  if (!providerAppsAtomsMap.has(id)) {
    const newProviderAtom = atom<ProviderApp | undefined>(undefined);
    providerAppsAtomsMap.set(id, newProviderAtom);
  }
  return providerAppsAtomsMap.get(id)!;
};

export const setProviderAppData = (id: number, provider: ProviderApp) => {
  const providerAppAtom = providerAppAtomById(id);
  store.set(providerAppAtom, provider);
};

export const getProviderAppData = (id: number) => {
  const providerAppAtom = providerAppAtomById(id);
  return store.get(providerAppAtom);
};

export const subscribeProviderAppData = (
  id: number,
  callback: (provider?: ProviderApp) => void,
) => {
  const providerAppAtom = providerAppAtomById(id);
  store.sub(providerAppAtom, () => {
    const providerApp = getProviderAppData(id);
    callback(providerApp);
  });
};
