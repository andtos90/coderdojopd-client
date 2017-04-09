/* @flow */
import Parse from 'parse';
import { setParseLib, initializeParseSDK } from 'parse-utils';
import { action, computed, observable } from 'mobx';

import keys from 'src/config/keys';

export class User {
  @observable email: string;
  @observable sessionToken: string;

  constructor(params: any) {
    this.email = params.email;
    this.sessionToken = params.sessionToken;
  }
}

export default class SessionStore {
  @observable isInitialized: boolean = false;
  @observable user: ?User = null;
  @observable isLoading: boolean = false;

  @action initializeSession = async () => {
    this.isLoading = true;
    setParseLib(Parse);
    initializeParseSDK(keys.PARSE_SERVER_URL, keys.PARSE_APP_ID);
    this.user = new User({
      email: 'fake',
      sessionToken: 'fake',
    });
    this.isInitialized = true;
    this.isLoading = false;
  };

  @action login = async (email: string, password: string) => {
    this.isLoading = true;
    this.isLoading = false;
  };

  @action logout = async () => {
    this.isLoading = true;
    this.isLoading = false;
  };

  @computed get isAuthenticated(): boolean {
    return this.user !== null && this.user !== undefined;
  }
}
