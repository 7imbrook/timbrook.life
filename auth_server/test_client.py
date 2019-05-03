from twirp.Account_pb2 import LoginRequest
from twirp.Account_pb2_twirp import AuthClient


def main():
    client = AuthClient("http://localhost:5000")
    res = client.login(LoginRequest(service_name="postprocessor"))
    print(res.token)


if __name__ == "__main__":
    main()
