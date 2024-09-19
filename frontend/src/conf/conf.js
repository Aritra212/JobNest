const conf = {
  appApi: String(import.meta.env.VITE_API_KEY),
  authDomain: String(import.meta.env.VITE_AUTH_DOMAIN),
  projectId: String(import.meta.env.VITE_PROJECT_ID),
  bucketId: String(import.meta.env.VITE_BUCKET_ID),
  messageSenderId: String(import.meta.env.VITE_MESSAGE_SENDER_ID),
  appId: String(import.meta.env.VITE_APP_ID),
  backendURL: String(import.meta.env.VITE_BACKEND_URL),
};

export default conf;
