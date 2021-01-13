from app import app
from flask import request
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
from flask_restful import abort
import datetime,jwt


class AuthError(Exception):
    def __init__(self, error, status_code):
        self.error = error
        self.status_code = status_code

secret_key = app.config.get('SECRET_KEY')

def encode_auth_token(user_id,role):
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
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
    return generate_hash(password)

def check_hash(password,hash):
    if check_password_hash(password,hash):
        return
    raise AuthError({
        'code': 'invalid_password',
        'description': 'Password is incorrect.'
    })

def get_token_auth_header():
    auth = request.headers.get('Authorization', None)
    if not auth:
        raise AuthError({
            'code': 'authorization_header_missing',
            'description': 'Authorization header is expected.'
        }, 401)

    parts = auth.split()
    if parts[0].lower() != 'bearer':
        raise AuthError({
            'code': 'invalid_header',
            'description': 'Authorization header must start with "Bearer".'
        }, 401)

    elif len(parts) == 1:
        raise AuthError({
            'code': 'invalid_header',
            'description': 'Token not found.'
        }, 401)

    elif len(parts) > 2:
        raise AuthError({
            'code': 'invalid_header',
            'description': 'Authorization header must be bearer token.'
        }, 401)

    token = parts[1]
    return token

def check_permissions(permission, payload):

    if 'permissions' not in payload.keys():
        raise AuthError({
            'code': 'permission_parameter_not_found_in_payload',
            'description': 'Permission parameter missing in payload.'
        }, 401)
    
    if permission not in payload['permissions']:
        raise AuthError({
            'code': 'unauthorized',
            'description': 'Permission not found.'
        }, 401)
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
            raise AuthError({
                'code': 'token_expired',
                'description': 'Token expired.'
            }, 401)

        except jwt.InvalidTokenError:
            raise AuthError({
                'code': 'invalid_claims',
                'description': 'Incorrect claims. Please, check the audience and issuer.'
            }, 401)
        except Exception:
            raise AuthError({
                'code': 'invalid_header',
                'description': 'Unable to parse authentication token.'
            }, 400)



def requires_auth(permission=''):
    def requires_auth_decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            token = get_token_auth_header()
            payload = verify_decode_jwt(token)
            check_permissions(permission, payload)
            return f(*args, **kwargs)
        return wrapper
    return requires_auth_decorator
