from werkzeug.wsgi import DispatcherMiddleware
from twirp.Account_twirp_srv import AuthServer
from internal import AuthServiceHandler
from frontend import client_auth


# define the health check uWSGI app
def health(environ, start_response):
    start_response("200 OK", [("Content-Type", "text/html")])
    return [b"ok"]


# Create uWSGI app
twirp = AuthServer(AuthServiceHandler())

server = DispatcherMiddleware(twirp, {"/health": health, "/auth": client_auth})
