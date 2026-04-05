import MOCK_USERS from '../data/mockUsers';
import { getAllTransactions as getTransactionsFromData } from '../data/mockTransactions';

const LS_KEY            = 'finsight_users';
const LS_DELETED_USERS  = 'finsight_deleted_users';

/** Read all user-registered accounts from localStorage */
export function getLocalStorageUsers() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];}
}

/** Read deleted user usernames */
export function getDeletedUsers() {
  try {
    return JSON.parse(localStorage.getItem(LS_DELETED_USERS) || '[]');
  } catch {
    return [];
  }
}

/** Persist a new sign-up to localStorage (with profession + photo) */
export function saveUserToLocalStorage(user) {
  const existing = getLocalStorageUsers();
  const alreadyExists = existing.some(
    (u) => u.username.toLowerCase() === user.username.toLowerCase()
  );
  if (alreadyExists) return false;
  localStorage.setItem(LS_KEY, JSON.stringify([...existing, user]));
  return true;
}

/** Check if a username is already taken (mock + localStorage) */
export function isUsernameTaken(username) {
  const allUsers = [...MOCK_USERS, ...getLocalStorageUsers()];
  return allUsers.some(
    (u) => u.username.toLowerCase() === username.toLowerCase()
  );
}

/**
 * Get all active users (mock seed + localStorage, minus deleted).
 */
export function getAllUsers() {
  const deleted = getDeletedUsers();
  const lsUsers = getLocalStorageUsers();
  const combined = [
    ...MOCK_USERS,
    ...lsUsers.filter(u => !MOCK_USERS.some(m => m.username === u.username)),
  ];
  return combined.filter(u => !deleted.includes(u.username));
}

/**
 * Permanently delete a user (localStorage only; mock users are just flagged).
 */
export function deleteUser(username) {
  // Flag as deleted
  const deleted = getDeletedUsers();
  if (!deleted.includes(username)) {
    localStorage.setItem(LS_DELETED_USERS, JSON.stringify([...deleted, username]));
  }
  // Remove from LS registered users if present
  const lsUsers = getLocalStorageUsers();
  const filtered = lsUsers.filter(u => u.username !== username);
  localStorage.setItem(LS_KEY, JSON.stringify(filtered));
}

/**
 * Validate login credentials.
 * Checks mock users first, then localStorage users.
 */
export function validateCredentials(username, password, requiredRole) {
  const deleted  = getDeletedUsers();
  const allUsers = [...MOCK_USERS, ...getLocalStorageUsers()];

  const match = allUsers.find(
    (u) =>
      u.username   === username &&
      u.password   === password &&
      u.role       === requiredRole &&
      !deleted.includes(u.username)
  );

  return match || null;
}

/**
 * Get all transactions across all users (mock + localStorage, minus deleted).
 */
export function getAllTransactions() {
  return getTransactionsFromData();
}
