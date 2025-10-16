/**
 * JWT Decoder Utilities
 * Helper functions to decode and extract information from JWT tokens
 */

interface DecodedToken {
  sub: string;
  email?: string;
  email_verified?: boolean;
  exp: number;
  iat: number;
  [key: string]: any;
}

/**
 * Decode a JWT token (without verification - for client-side use only)
 * @param token - JWT token string
 * @returns Decoded token payload
 */
export function decodeJWT(token: string): DecodedToken | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }

    // Decode the payload (second part)
    const payload = parts[1];
    const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decodedPayload) as DecodedToken;
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
}

/**
 * Extract email from ID token
 * @param idToken - Cognito ID token
 * @returns User's email or null
 */
export function getEmailFromToken(idToken: string): string | null {
  const decoded = decodeJWT(idToken);
  return decoded?.email ?? null;
}

/**
 * Extract user sub (user ID) from token
 * @param token - JWT token
 * @returns User's sub (unique identifier)
 */
export function getUserSubFromToken(token: string): string | null {
  const decoded = decodeJWT(token);
  return decoded?.sub ?? null;
}

/**
 * Check if token is expired
 * @param token - JWT token
 * @returns true if token is expired
 */
export function isTokenExpired(token: string): boolean {
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) {
    return true;
  }
  // exp is in seconds, Date.now() is in milliseconds
  return Date.now() >= decoded.exp * 1000;
}


