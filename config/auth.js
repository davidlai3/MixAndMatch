import express from 'express';
import querystring from 'querystring';
import crypto from 'crypto';
import request from 'request';

function generateRandomString(length) {
    return crypto.randomBytes(length).toString('hex').slice(0, length);
}

const client_id = process.env.client_id;
const client_secret = process.env.client_secret;
const redirect_uri = "http://localhost:3001/callback";
const stateKey = 'spotify_auth_state';
const router = express.Router();

router.get('/login', function(req, res) {

	const state = generateRandomString(16);
	const scope = 'user-read-private user-read-email user-top-read';

	res.redirect('https://accounts.spotify.com/authorize?' +
		querystring.stringify({
			response_type: 'code',
			client_id: client_id,
			scope: scope,
			redirect_uri: redirect_uri,
			state: state
		})
	);
});

router.get('/callback', function(req, res) {

  const code = req.query.code || null;
  const state = req.query.state || null;

  if (state === null) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
		res.clearCookie(stateKey);
		const authOptions = {
		  url: 'https://accounts.spotify.com/api/token',
		  form: {
			code: code,
			redirect_uri: redirect_uri,
			grant_type: 'authorization_code'
		  },
		  headers: {
			'content-type': 'application/x-www-form-urlencoded',
			'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
		  },
		  json: true
		};

		request.post(authOptions, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				const access_token = body.access_token;
				const refresh_token = body.refresh_token;
					
				res.redirect(
				  '/success?' +
					querystring.stringify({
					  access_token: access_token,
					  refresh_token: refresh_token,
					})
				);
			} else {
				res.send("There was an error during authentication");
			}
		});
	}
});


router.get('/refresh_token', function (req, res) {
	// requesting access token from refresh token
	var refresh_token = req.query.refresh_token;
	var authOptions = {
		url: 'https://accounts.spotify.com/api/token',
		headers: {
			Authorization:
			'Basic ' +
			new Buffer(client_id + ':' + client_secret).toString('base64'),
		},
		form: {
			grant_type: 'refresh_token',
			refresh_token: refresh_token,
		},
		json: true,
	};

	request.post(authOptions, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			var access_token = body.access_token;
			res.send({
				access_token: access_token,
			});
		}
	});
});


export { router };



