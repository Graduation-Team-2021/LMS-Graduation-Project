from flask import request, jsonify
from flask_restful import abort
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
from methods.errors import ErrorHandler
import datetime, jwt, os

secret_key = "ANy HABDDDDDDDDD"


def encode_auth_token(user_id, role):
    payload = {
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=30),
        'iat': datetime.datetime.utcnow(),
        'id': user_id,
        'permissions': role
    }
    return jwt.encode(
        payload,
        secret_key,
        algorithm='HS256'
    )


def generate_hash(password):
    return generate_password_hash(password)


def check_hash(hash, password):
    if check_password_hash(hash, password):
        return True
    # raise ErrorHandler({
    #     'status_code': 404,
    #     'description': 'Password is incorrect.'
    # })
    else:
        return False


def get_token_auth_header():
    auth = request.headers.get('Authorization', None)
    if not auth:
        raise ErrorHandler({
            'status_code': 401,
            'description': 'Authorization header is expected.'
        })

    parts = auth.split()
    if parts[0].lower() != 'bearer':
        raise ErrorHandler({
            'status_code': 401,
            'description': 'Authorization header must start with "Bearer".'
        })

    elif len(parts) == 1:
        raise ErrorHandler({
            'status_code': 401,
            'description': 'Token not found.'
        })

    elif len(parts) > 2:
        raise ErrorHandler({
            'status_code': 401,
            'description': 'Authorization header must be bearer token.'
        })

    token = parts[1]
    return token


def check_permissions(permission, payload):
    if 'permissions' not in payload.keys():
        raise ErrorHandler({
            'status_code': 401,
            'description': 'Permission parameter missing in payload.'
        })

    if permission not in payload['permissions']:
        raise ErrorHandler({
            'status_code': 401,
            'description': 'Permission not found.'
        })
    return True


def verify_decode_jwt(token):
    try:
        payload = jwt.decode(
            token,
            secret_key,
            algorithms='HS256'
        )

        return payload

    except jwt.ExpiredSignatureError:
        raise ErrorHandler({
            'status_code': 402,
            'description': 'Token expired.'
        })

    except jwt.InvalidTokenError:
        raise ErrorHandler({
            'status_code': 401,
            'description': 'Incorrect claims. Please, check the audience and issuer.'
        })
    except Exception:
        raise ErrorHandler({
            'status_code': 400,
            'description': 'Unable to parse authentication token.'
        })


def requires_auth(permission=''):
    def requires_auth_decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            try:
                token = get_token_auth_header()
                payload = verify_decode_jwt(token)
                check_permissions(permission, payload)
            except ErrorHandler as e:
                return jsonify(e.error)
            user_id = payload['id']
            role = payload['permissions']
            return f(*args, **kwargs)

        return wrapper

    return requires_auth_decorator


def requires_auth_identity(permission=''):
    def requires_auth_decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            try:
                token = get_token_auth_header()
                payload = verify_decode_jwt(token)
                check_permissions(permission, payload)
            except ErrorHandler as e:
                return jsonify(e.error)
            user_id = payload['id']
            role = payload['permissions']
            return f(user_id, role, *args, **kwargs)

        return wrapper

    return requires_auth_decorator
