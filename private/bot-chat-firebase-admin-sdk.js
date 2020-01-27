module.exports = {
  "type": process.env.SDK_TYPE,
  "project_id": process.env.SDK_PROJECT_ID,
  "private_key_id": process.env.SDK_PRIVATE_KEY_ID,
  "private_key": process.env.SDK_PRIVATE_KEY.replace(/\\n/g, '\n'),
  "client_email": process.env.SDK_CLIENT_EMAIL,
  "client_id": process.env.SDK_CLIENT_ID,
  "auth_uri": process.env.SDK_AUTH_URI,
  "token_uri": process.env.SDK_TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.SDK_AUTH_PROVIDER_CERT_URL,
  "client_x509_cert_url": process.env.SDK_CLIENT_CERT_URL
};
