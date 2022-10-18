import type { MsalAuthenticationResult } from "@azure/msal-react";

export const ErrorComponent: React.FC<MsalAuthenticationResult> = ({
  error,
}) => {
  return <p>An Error Occurred: {error ? error.errorCode : "unknown error"}</p>;
};
