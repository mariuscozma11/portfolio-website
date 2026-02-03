import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import api, {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from "../services/api";

export interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface AuthContextType {
  authState: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    if (accessToken && refreshToken) {
      setAuthState({
        isAuthenticated: true,
        accessToken,
        refreshToken,
      });
    }
    setIsLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      // API expects { email, password } and returns { acess_token } (typo in API)
      // Refresh token is set via cookie by the API
      const response = await api.post("/login", { email, password });

      // Handle API's typo: "acess_token" instead of "access_token"
      const accessToken = response.data.acess_token || response.data.access_token;

      if (accessToken) {
        setTokens(accessToken, "cookie"); // Refresh token handled via cookies
        setAuthState({
          isAuthenticated: true,
          accessToken: accessToken,
          refreshToken: "cookie",
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearTokens();
    setAuthState({
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
