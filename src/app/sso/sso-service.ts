
export interface SSOService {
  /**
   * Emits true if the user is currently signed in.
   */
  isSignedIn: boolean;
  /**
   * If not null, the email associated to the SSO account used to sign in.
   */
  email: string;

  /**
   * Attempts to sign in with the default SSO provider (currently the only implementation of this interface
   * only uses Google).
   */
  signIn(): Promise<boolean>;

  /**
   * Signs out with the currently signed in provider. Returns true if successfully signed out.
   */
  signOut(): Promise<boolean>;
}
