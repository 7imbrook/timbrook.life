from util import log_request
from werkzeug.wsgi import DispatcherMiddleware 
from twirp.Account_pb2 import Account
from twirp.Account_twirp_srv import AuthImpl, AuthServer


class AuthServiceHandler(AuthImpl):

    @log_request
    def Login(self, login_request, ctx={}):
        return Account(id=login_request.id)


# define the health check uWSGI app
def health(environ, start_response):
    start_response('200 OK', [('Content-Type','text/html')])
    return [b"ok"]


# Create uWSGI app
twirp = AuthServer(AuthServiceHandler())

server = DispatcherMiddleware(twirp, {
    '/health': health
})



