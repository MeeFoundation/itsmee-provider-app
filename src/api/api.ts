import {
  object,
  type,
  string,
  boolean,
  array,
  assert,
  type Describe,
} from "superstruct";
import type { User, ProviderApp } from "@utils/types";

const User: Describe<User> = type({
  gender: string(),
  email: string(),
  name: object({ title: string(), first: string(), last: string() }),
  picture: object({ large: string(), medium: string(), thumbnail: string() }),
});
const ProviderApp: Describe<ProviderApp> = type({
  name: string(),
  url: string(),
  agent_service_url: string(),
  agent_service_id: string(),
  enabled: boolean(),
});

const ProviderApps: Describe<ProviderApp[]> = array(ProviderApp);


export const getUser = async () => {
  const responseUser = await fetch("https://randomuser.me/api");
  const dataUser = await responseUser.json();
  const randomUser = dataUser.results[0];
  assert(randomUser, User);
  return randomUser;
};

export const getProviderApps = async () => {
  const response = await fetch("/apps.json");
  const data = await response.json();
  assert(data, ProviderApps);
  return data;
};

export const getProviderApp = async (id: number) => {
  const providerApps = await getProviderApps();
  return providerApps[id];
};

