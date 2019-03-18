from twirp.Account_pb2 import LoginRequest
from twirp.Account_pb2_twirp import AuthClient


def main():
    client = AuthClient('http://localhost:8080')
    res = client.login(LoginRequest(id=10000))
    print(res)


if __name__ == "__main__":
    main()