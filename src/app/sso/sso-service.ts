import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface SSOService {
  /**
   * Emits true if the user is currently signed in or whenever they do so.
   */
  isSignedIn$: Observable<boolean>;
  /**
   * Observable stream of emails associated to a newly signed in SSO account.
   * Will emit null if a user signs out (this is useful to allow a guard based on this stream).
   */
  signedInWithEmail$: Observable<string>;

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
