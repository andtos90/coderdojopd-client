/* @flow */
import Parse from 'parse';
import { getUserById, isUserInRole } from 'parse-utils';

type User = any;

type UserAnswer = {
  user: User,
  isAdmin: boolean,
};

export const fetchUsers = async (): Promise<Array<User>> => {
  const users = await new Parse.Query('User').limit(10000).find();
  return users.map(user => user.toJSON());
};

export const getCurrentUser = async (): Promise<?User> => {
  const userInSession = await Parse.User.currentAsync();
  if (userInSession) {
    const user = await getUserById(userInSession.id);
    return user ? user.toJSON() : null;
  } else {
    return null;
  }
};

export const signup = async (email: string, password: string): Promise<UserAnswer> => {
  const user = new Parse.User();
  user.set('username', email);
  user.set('email', email);
  user.set('password', password);
  const loggedUser = await user.signUp();
  return { user: loggedUser.toJSON(), isAdmin: false };
};

export const login = async (email: string, password: string): Promise<UserAnswer> => {
  const parseUser = await Parse.User.logIn(email, password);
  const user = parseUser.toJSON();
  const isAdmin = await isUserInRole(user.objectId, 'admin');
  return { user, isAdmin };
};

export const resetPassword = async (email: string): Promise<any> => {
  await Parse.User.requestPasswordReset(email);
  return;
};

export const logout = async (): Promise<boolean> => {
  Parse.User.logOut();
  return true;
};

export const isAdmin = async (userId: ?string): Promise<boolean> => {
  return !userId ? false : await isUserInRole(userId, 'admin');
};
