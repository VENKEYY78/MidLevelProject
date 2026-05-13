from jose import jwt , JWTError # pip install python-jose["Cryptgraphy"]
from datetime import datetime , timedelta , timezone
from fastapi.security import OAuth2PasswordBearer , OAuth2PasswordRequestForm


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")



SECRET_KEY = "MID_LEVEL_PROJECT"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30



def create_access_token(data:dict, expires_delta: timedelta | None=None):
    to_encode = data.copy()
    expiry = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp":expiry})
    return jwt.encode(to_encode, SECRET_KEY ,algorithm=ALGORITHM )

def verify_token(token:str):
    try:
        payload = jwt.decode(token,SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
    

    
"""
def get_current_user(token: Annotated[str, Depends[oauth2_scheme]], session:SessionDep):
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="invalid token")
    user = session.exec(se)
"""












