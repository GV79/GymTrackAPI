/* Functions for validating various inputs sent from clientside to server */

export const verifyCredentials = (email: string, password: string): boolean => {
  // Empty inputs
  if (email == null || password == null || email.length === 0 || password.length === 0) {
    return false;
  }

  // Invalid email format
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};
