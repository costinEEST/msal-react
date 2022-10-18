import type { IPublicClientApplication } from "@azure/msal-browser";

export type AppProps = {
  pca: IPublicClientApplication;
};

export type GraphData = {
  displayName: string;
  jobTitle: string;
  mail: string;
  businessPhones: string[];
  officeLocation: string;
};
