from werkzeug.wsgi import DispatcherMiddleware

from src.entrypoints.frontend import client_auth
from src.entrypoints.internal import AuthServiceHandler
from twirp.Account_twirp_srv import AuthServer


# define the health check uWSGI app
def health(environ, start_response):
    start_response("200 OK", [("Content-Type", "text/html")])
    return [b"ok"]


# Create uWSGI app
twirp = AuthServer(AuthServiceHandler())

server = DispatcherMiddleware(twirp, {"/health": health, "/auth": client_auth})
