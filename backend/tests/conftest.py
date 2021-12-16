import os
import pytest

from fastapi.testclient import TestClient

from app.main import app


@pytest.fixture(scope="module")
def test_app():
    """Testclient to make test in request"""

    with TestClient(app) as test_client:
        yield test_client

    # tear down
    if os.path.isfile('./test.db'):
        os.remove('./test.db')
