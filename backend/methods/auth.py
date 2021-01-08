from backend.app import app
from werkzeug.security import generate_password_hash, check_password_hash
import jwt,datetime

class AuthError(Exception):
    def __init__(self, error, status_code):
        self.error = error
        self.status_code = status_code

class Auth:
    def __init__(self):
        self.secret_key = app.config.get('SECRET_KEY')

    def encode_auth_token(self,user_id):
                payload = {
                    'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, seconds=5),
                    'iat': datetime.datetime.utcnow(),
                    'id': user_id
                }
                return jwt.encode(
                    payload,
                    self.secret_key,
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

    def get_token_auth_header(self):
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


    def verify_decode_jwt(self,token):
            try:
                payload = jwt.decode(
                    token,
                    self.secret_key,
                    algorithms='HS256'
                )
                return payload

            except jwt.ExpiredSignatureError:
                raise AuthError({
                    'code': 'token_expired',
                    'description': 'Token expired.'
                }, 401)

            except jwt.JWTClaimsError:
                raise AuthError({
                    'code': 'invalid_claims',
                    'description': 'Incorrect claims. Please, check the audience and issuer.'
                }, 401)
            except Exception:
                raise AuthError({
                    'code': 'invalid_header',
                    'description': 'Unable to parse authentication token.'
                }, 400)


def requires_auth(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        auth = Auth()
        token = auth.get_token_auth_header()
        try:
            payload = auth.verify_decode_jwt(token)
        except:
            abort(401)
        return f(payload, *args, **kwargs)

    return wrapper