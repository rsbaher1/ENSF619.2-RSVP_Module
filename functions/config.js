/*
* **Copyright Regina Baher, 2021.**  
* Licensed under MIT License.  
* *Please see LICENSE for full license.* 
*/
"use strict";

const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

const { DB_URL, PERMISSIONS, TYPE, PROJECT_ID, PRIVATE_KEY_ID,
  PRIVATE_KEY, CLIENT_EMAIL, CLIENT_ID, AUTH_URI, TOKEN_URI,
  AUTH_PROVIDER_X509_CERT_URL, CLIENT_X509_CERT_URL, SignIn_URI
} = process.env;

assert(DB_URL, "Firebase DB URL is required.");
assert(PERMISSIONS, "Firebase Permissions file is required.");
assert(TYPE, "Firebase TYPE is required.");
assert(PROJECT_ID, "Firebase PROJECT_ID is required.");
assert(PRIVATE_KEY_ID, "Firebase PRIVATE_KEY_ID is required.");
assert(PRIVATE_KEY, "Firebase PRIVATE_KEY is required.");
assert(CLIENT_EMAIL, "Firebase CLIENT_EMAIL is required.");
assert(CLIENT_ID, "Firebase CLIENT_ID is required.");
assert(AUTH_URI, "Firebase AUTH_URI is required.");
assert(TOKEN_URI, "Firebase TOKEN_URI is required.");
assert(AUTH_PROVIDER_X509_CERT_URL, "Firebase AUTH_PROVIDER_X509_CERT_URL is required.");
assert(CLIENT_X509_CERT_URL, "Firebase CLIENT_X509_CERT_URL is required.");
assert(SignIn_URI, "Firebase SignIn_URI is required.");

const full_cred = JSON.stringify({
  "type": TYPE,
  "project_id": PROJECT_ID,
  "private_key_id": PRIVATE_KEY_ID,
  "private_key": PRIVATE_KEY,
  "client_email": CLIENT_EMAIL,
  "client_id": CLIENT_ID,
  "auth_uri": AUTH_URI,
  "token_uri": TOKEN_URI,
  "auth_provider_x509_cert_url": AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url": CLIENT_X509_CERT_URL,
})

module.exports = {
  DB_URL: DB_URL,
  PERMISSIONS: PERMISSIONS,
  FULL_CREDENTIALS: full_cred,
  SignIn_URI: SignIn_URI
}