import jsonwebtoken from 'jsonwebtoken';

interface JwtPayload extends jsonwebtoken.JwtPayload {
  groups: string[];
  userId: number;
}

const isValidJwtPayload = (
  payload: string | jsonwebtoken.JwtPayload | null
): payload is JwtPayload => {
  return (
    payload !== null &&
    typeof payload !== 'string' &&
    (payload as JwtPayload).groups !== undefined
  );
};

export const decodeToken = (token: string): JwtPayload | null => {
  const decoded = jsonwebtoken.decode(token);
  if (isValidJwtPayload(decoded)) {
    return decoded;
  }
  return null;
};
