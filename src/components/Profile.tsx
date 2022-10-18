import {
  InteractionStatus,
  InteractionType,
  InteractionRequiredAuthError,
} from "@azure/msal-browser";
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";

import type { AccountInfo } from "@azure/msal-browser";
import type { GraphData } from "../types";

import { loginRequest } from "../authConfig";
import { callMsGraph } from "../MsGraphApiCall";

import { ErrorComponent } from "./ErrorComponent";
import { Loading } from "./Loading";

const ProfileContent = () => {
  const { instance, inProgress } = useMsal();
  const [graphData, setGraphData] = useState<null | GraphData>(null);

  useEffect(() => {
    if (!graphData && inProgress === InteractionStatus.None) {
      callMsGraph()
        .then((response: GraphData) => setGraphData(response))
        .catch((e: Error) => {
          if (e instanceof InteractionRequiredAuthError) {
            instance.acquireTokenRedirect({
              ...loginRequest,
              account: instance.getActiveAccount() as AccountInfo,
            });
          }
        });
    }
  }, [inProgress, graphData, instance]);

  return graphData ? (
    <ul>
      {graphData.displayName && <li>Name: {graphData.displayName}</li>}
      {graphData.jobTitle && <li>Job title: {graphData.jobTitle}</li>}
      {graphData.mail && <li>Email: {graphData.mail}</li>}
      {graphData.businessPhones.length > 0 && (
        <li>Phone: {graphData.businessPhones[0]}</li>
      )}
      {graphData.officeLocation && <li>Office: {graphData.officeLocation}</li>}
    </ul>
  ) : null;
};

export function Profile() {
  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={{ ...loginRequest }}
      errorComponent={ErrorComponent}
      loadingComponent={Loading}
    >
      <ProfileContent />
    </MsalAuthenticationTemplate>
  );
}
