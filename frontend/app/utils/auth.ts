export const isTokenExpired = (): boolean => {
  if (typeof window === "undefined") return true; // Prevents errors during SSR

  const token = localStorage.getItem("token");
  if (!token) return true; // No token = expired

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    const expiry = payload.exp * 1000; // Convert expiry to milliseconds
    return Date.now() >= expiry; // Compare with current time
  } catch (error) {
    console.error("Invalid token format:", error);
    return true;
  }
};
