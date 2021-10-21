const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost"
    : "https://social-devhouse.herokuapp.com";

module.exports = baseUrl;
