import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on initial load
    const storedUser = localStorage.getItem("tradeSimUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // For demo, we'll simulate a successful login with mock user data
      const mockUser = {
        id: "123456",
        email,
        name: email.split("@")[0],
        funds: 100000, // Start with $100,000
      };

      setUser(mockUser);
      localStorage.setItem("tradeSimUser", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // For demo, we'll simulate a successful signup with mock user data
      const mockUser = {
        id: "123456",
        email,
        name,
        funds: 100000, // Start with $100,000
      };

      setUser(mockUser);
      localStorage.setItem("tradeSimUser", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("tradeSimUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
