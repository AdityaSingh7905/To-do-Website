import { jwtDecode } from "jwt-decode";

export function getCurrentUser() {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      return jwtDecode(token); // Decodes the token
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  }
  return null;
}

export default getCurrentUser;
