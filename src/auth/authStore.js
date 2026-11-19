const USERS_KEY = "courier-tracker:users";
const SESSION_KEY = "courier-tracker:session";

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

async function hash(text) {
  try {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } catch {
    return "plain:" + text; // fallback if crypto is unavailable
  }
}

// Demo account so there is always something to log in with
async function loadUsers() {
  const users = read(USERS_KEY, {});
  if (!users.admin) {
    users.admin = { name: "admin", hash: await hash("admin123") };
    write(USERS_KEY, users);
  }
  return users;
}

export function getSession() {
  return read(SESSION_KEY, null);
}

export function clearSession() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {}
}

export async function register(username, password) {
  const name = username.trim();
  if (name.length < 3) throw new Error("Username must be at least 3 characters.");
  if (password.length < 6) throw new Error("Password must be at least 6 characters.");

  const users = await loadUsers();
  const key = name.toLowerCase();
  if (users[key]) throw new Error("That username is already taken.");

  users[key] = { name, hash: await hash(password) };
  write(USERS_KEY, users);
  write(SESSION_KEY, name);
  return name;
}

export async function login(username, password) {
  const users = await loadUsers();
  const user = users[username.trim().toLowerCase()];
  if (!user || user.hash !== (await hash(password))) {
    throw new Error("Wrong username or password.");
  }
  write(SESSION_KEY, user.name);
  return user.name;
}
