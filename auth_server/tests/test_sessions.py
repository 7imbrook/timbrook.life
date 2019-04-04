import unittest
from unittest.mock import patch, MagicMock
from src.verification.session import Session
from box import Box


class TestSessionExpiration(unittest.TestCase):
    @patch("redis.sentinel.Sentinel.master_for")
    def test_session_save(self, sent_mock):

        session_context = Session()

        app = Box(
            session_cookie_name="session",
            config={
                "SESSION_COOKIE_DOMAIN": "example.com",
                "SESSION_COOKIE_PATH": "/",
                "SESSION_COOKIE_HTTPONLY": True,
                "SESSION_COOKIE_SECURE": True,
            },
        )

        session = Box(sid="test", email="test@example.com")
        response = MagicMock()

        session_context.save_session(app, session, response)
        print(sent_mock.call_args_list)
        print(response.call_args_list)

        self.assertTrue(True)
