const SENSITIVE_KEYS = [
  "access_token",
  "id_user",
  "rol_user",
  "role_user",
  "id_account_type",
  "name_user",
  "last_name_user",
  "email_user",
  "photo_user",
  "date_birth_user",
  "country_user",
  "biography_user",
  "city",
  "status_preference",
  "status_user",
];

const storage = typeof sessionStorage !== "undefined" ? sessionStorage : null;

function isSensitive(key) {
  return SENSITIVE_KEYS.includes(key);
}

export const authGet = (key) => {
  if (!isSensitive(key)) {
    return localStorage.getItem(key);
  }
  return storage ? storage.getItem(key) : null;
};

export const authSet = (key, value) => {
  if (!isSensitive(key)) {
    localStorage.setItem(key, value);
    return;
  }
  if (storage) {
    storage.setItem(key, value);
  }
};

export const authRemove = (key) => {
  if (!isSensitive(key)) {
    localStorage.removeItem(key);
    return;
  }
  if (storage) {
    storage.removeItem(key);
  }
};

export const clearAuth = () => {
  SENSITIVE_KEYS.forEach((key) => {
    if (storage) {
      storage.removeItem(key);
    }
    localStorage.removeItem(key);
  });
};

export default {
  get: authGet,
  set: authSet,
  remove: authRemove,
  clear: clearAuth,
};
