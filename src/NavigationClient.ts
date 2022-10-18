import { NavigationClient } from "@azure/msal-browser";

import type { NavigationOptions } from "@azure/msal-browser";
import type { NavigateFunction } from "react-router-dom";

/**
 * This is an example for overriding the default function MSAL uses to navigate to other urls in your webpage
 */
export class CustomNavigationClient extends NavigationClient {
  private history: NavigateFunction;

  constructor(history: NavigateFunction) {
    super();
    this.history = history;
  }

  /**
   * Navigates to other pages within the same web application
   * You can use the useHistory hook provided by react-router-dom to take advantage of client-side routing
   * @param url
   * @param options
   */
  async navigateInternal(url: string, options: NavigationOptions) {
    const relativePath = url.replace(window.location.origin, "");
    if (options.noHistory) {
      this.history(relativePath, {
        replace: true,
      });
    } else {
      this.history(relativePath);
    }

    return false;
  }
}
