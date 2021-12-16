import json


def test_register_user_success(test_app):
    """
    Given: valid data for registration
    when: /user/register api call
    then: return user information
    """
    data = json.dumps({"username": "ralf", "password": "123"})

    response = test_app.post('/user/register', data=data)

    assert 201 == response.status_code
    assert response.json()['username'] == 'ralf'
    assert response.json()['password'] != 'password'


def test_register_user_fail(test_app):
    """
    Given: user already exist
    when: /user/register api call
    then: raise an error
    """
    data = json.dumps({"username": "ralf", "password": "123"})

    test_app.post('/user/register', data=data)
    response = test_app.post('/user/register', data=data)

    assert 409 == response.status_code
