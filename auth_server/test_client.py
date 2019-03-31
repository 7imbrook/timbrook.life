from twirp.Account_pb2 import LoginRequest
from twirp.Account_pb2_twirp import AuthClient


def main():
    client = AuthClient("http://10.245.71.91")
    res = client.login(LoginRequest(id=10000))
    print(res.token)


if __name__ == "__main__":
    main()
