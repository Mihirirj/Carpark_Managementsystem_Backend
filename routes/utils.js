const query_string = require ('querystring');
const dotenv = require('dotenv');
dotenv.config()
const axios = require("axios")
const google_access_token_endpoint = 'https://oauth2.googleapis.com/token';
const google_auth_token_endpoint ='https://accounts.google.com/o/oauth2/v2/auth';
const query_params_owner = {
  client_id: process.env.CLIENT_APP_ID,
  redirect_uri: `http://localhost:3002${process.env.REDIRECT_URI_REGISTER_OWNER}`,
};
const auth_token_params_owner= {
    ...query_params_owner,
    response_type: 'code',
  };
  const scopes = ['profile', 'email', 'openid'];
// a url formed with the auth token endpoint and the
const request_get_auth_code_url_owner_signup = `${google_auth_token_endpoint}?${query_string.stringify (auth_token_params_owner)}&scope=${scopes.join (' ')}`;

const query_params_user = {
  client_id: process.env.CLIENT_APP_ID,
  redirect_uri: `http://localhost:3002${process.env.REDIRECT_URI_REGISTER_USER}`,
};
const auth_token_params_user= {
    ...query_params_user,
    response_type: 'code',
  };
// a url formed with the auth token endpoint and the
const request_get_auth_code_url_user_signup = `${google_auth_token_endpoint}?${query_string.stringify (auth_token_params_user)}&scope=${scopes.join (' ')}`;

const query_params = {
  client_id: process.env.CLIENT_APP_ID,
  redirect_uri: `http://localhost:3002${process.env.REDIRECT_URI_LOGIN}`,
};
const auth_token_params = {
    ...query_params,
    response_type: 'code',
  };
// a url formed with the auth token endpoint and the
const request_get_auth_code_url = `${google_auth_token_endpoint}?${query_string.stringify (auth_token_params)}&scope=${scopes.join (' ')}`;

const get_access_token = async auth_code => {
    const access_token_params = {
      ...query_params,
      client_secret: process.env.CLIENT_APP_SECRET,
      code: auth_code,
      grant_type: 'authorization_code',
    };
    return await axios ({
      method: 'post',
      url: `${google_access_token_endpoint}?${query_string.stringify (access_token_params)}`,
    });
  };

  const get_profile_data = async access_token => {
    return await axios ({
      method: 'post',
      url: `https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${access_token}`,
    });
  };

  const logout = async () => {
    return await axios ({
      method: 'get',
      url: `https://www.google.com/accounts/Logout?continue=http://www.example.com`,
    });
  };
  
  module.exports = {request_get_auth_code_url,request_get_auth_code_url_owner_signup , request_get_auth_code_url_user_signup, get_access_token , get_profile_data , logout};