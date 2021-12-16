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
    then: return HTTP error
    """
    data = json.dumps({"username": "ralf", "password": "123"})

    test_app.post('/user/register', data=data)
    response = test_app.post('/user/register', data=data)

    assert 409 == response.status_code


def test_login_success(test_app):
    """
    Given: existed user
    when: /user/login api call
    then: return user information
    """
    data = json.dumps({"username": "ralf", "password": "123"})
    test_app.post('/user/register', data=data)
    response = test_app.post('/user/login', data=data)

    assert 200 == response.status_code
    assert 'ralf' == response.json()['username']


def test_login_fail(test_app):
    """
    Given: user did not exist
    when: /user/login api call
    then: return HTTP error
    """
    data = json.dumps({"username": "ralf123123", "password": "123"})
    response = test_app.post('/user/login', data=data)

    assert 404 == response.status_code


def test_update_user(test_app):
    """
    Given: existed user and valid data for update
    when: /user/{id}/update api call
    then: return user information
    """
    data = json.dumps({"username": "updateralf",
                       "password": "123",
                       "email": "test@mail.com"})

    user_id = test_app.post('/user/register', data=data).json()['id']
    response = test_app.put(f'/user/{user_id}/update', data=data)

    assert 200 == response.status_code


def test_update_user_fail(test_app):
    """
    Given: non-existed user
    when: /user/{id}/update api call
    then: return HTTP error
    """
    data = json.dumps({"username": "updateralf",
                       "password": "123",
                       "email": "test@mail.com"})
    user_id = 123123
    response = test_app.put(f'/user/{user_id}/update', data=data)

    assert 404 == response.status_code


def test_get_user(test_app):
    """
    Given: existed user
    when: /user/{id} api call
    then: return user information
    """
    data = json.dumps({"username": "ralfget", "password": "123"})

    user_id = test_app.post('/user/register', data=data).json()['id']
    response = test_app.get(f'/user/{user_id}')

    assert 200 == response.status_code
    assert 'ralfget' == response.json()['username']


def test_get_user_fail(test_app):
    """
    Given: non-existed user
    when: /user/{id} api call
    then: return user information
    """

    user_id = 132312
    response = test_app.get(f'/user/{user_id}')

    assert 404 == response.status_code
