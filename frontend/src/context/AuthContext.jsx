import React, { createContext, useState, useEffect } from "react";
import { API_URL } from "../components/Apiconfiguration/config";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [addCartBut, setaddCartBut] = useState(true);
  const [CartItemsCount, setCartItemsCount] = useState(0); // List of cart products
  const [load, setload] = useState(true); // Initialize as true to fetch products on first render
  const [maxId, setMaxId] = useState(0); // List of cart products
  const [countId, setCountId] = useState(0); // List of cart products
  const [loadMaxId, setloadMaxId] = useState(true); // Initialize as true to fetch products on first render
  useEffect(() => {
    if (load && username && isAuthorized) {
      fetchCartQty();
    }
  }, [load, username, isAuthorized]);

  useEffect(() => {
    if (loadMaxId) {
      fetchTaskId();
    }
  }, [loadMaxId]);

  const fetchTaskId = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`);
      const data = await response.json();
      setCountId(data.updated_tasks.length);
      setMaxId(
        data.updated_tasks.length
          ? Math.max(...data.updated_tasks.map((task) => task.cart_id || 0))
          : 0
      );
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setloadMaxId(false);
    }
  };

  const fetchCartQty = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks?email=${username}`);
      const data = await response.json();
      setCartItemsCount(data.total_tasks_count || 0);
      setIsLogin(false);
    } catch (error) {
      console.error("Error fetching cart quantity:", error);
    } finally {
      setload(false); // Ensure `load` is set to false regardless of success or failure
    }
  };

  const checkAuthorization = async () => {
    try {
      const response = await fetch(`${API_URL}/protected-endpoint`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setUsername(data.username);
        setIsAuthorized(data.authorized);
        console.log("Authorized =", data.authorized);
      } else if (response.status === 401) {
        await refreshAccessToken();
      }
    } catch (error) {
      console.error("Error checking authorization:", error);
    }
  };

  const refreshAccessToken = async () => {
    try {
      const response = await fetch(`${API_URL}/refresh-token`, {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      setIsAuthorized(data.authorized);
    } catch (error) {
      console.error("Error refreshing access token:", error);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include", // Ensure cookies are included
      });

      if (response.ok) {
        setCartItemsCount(0);
        setIsAuthorized(false);
        // Clear the username regardless of authorization status
        setUsername("Please Login..");
        setIsLogin(true);
        alert("Logged out successfully");
        console.log("Logged out successfully");
        navigate("/login");
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    checkAuthorization();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthorized,
        username,
        isLogin,
        addCartBut,
        CartItemsCount,
        setload,
        setaddCartBut,
        setIsLogin,
        checkAuthorization,
        logout,
        setUsername,
        setIsAuthorized,

        
        loadMaxId,
        setloadMaxId,
        maxId,
        setMaxId,
        countId,
        setCountId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
