export const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const payload = JSON.parse(atob(token.split(".")[1]));
  return {
    userId: payload.userId,
    username: payload.username, // must exist in JWT
  };
};
