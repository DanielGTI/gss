import { create } from 'zustand';

type AuthState = {
  isAuthenticated: boolean;
  email?: string;
  remember: boolean;
  login: (email: string, remember: boolean) => void;
  logout: () => void;
};

const getInitialAuth = () => {
  try {
    const remembered = localStorage.getItem('auth:remember') === 'true';
    const email = localStorage.getItem('auth:email') || undefined;
    return {
      isAuthenticated: Boolean(remembered && email),
      email,
      remember: remembered,
    };
  } catch {
    return { isAuthenticated: false, email: undefined, remember: false };
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  ...getInitialAuth(),
  login: (email, remember) => {
    set({ isAuthenticated: true, email, remember });
    try {
      if (remember) {
        localStorage.setItem('auth:remember', 'true');
        localStorage.setItem('auth:email', email);
      } else {
        localStorage.removeItem('auth:remember');
        localStorage.removeItem('auth:email');
      }
    } catch {
      // ignore storage failures
    }
  },
  logout: () => {
    set({ isAuthenticated: false, email: undefined, remember: false });
    try {
      localStorage.removeItem('auth:remember');
      localStorage.removeItem('auth:email');
    } catch {
      // ignore storage failures
    }
  },
}));

