Before starting the server, put on the `.env.local` file, the config IDs from your Azure AD dashboard:

```shell
VITE_CLIENT_ID=x007look-4be0-29c0-b35d-99bi89fb1daa
VITE_AUTHORITY=https://login.microsoftonline.com/6u3f9cec-c67c-03el-j509-3bca11507148
VITE_REDIRECT_URI=http://localhost:3000
VITE_POST_LOGOUT_REDIRECT_URI=http://localhost:3000
VITE_GRAPH_ME_ENDPOINT=https://graph.microsoft.com/v1.0/me
```

Start the development server: `npm run dev` (https://koenwoortman.com/vitejs-run-dev-server-on-different-port)
