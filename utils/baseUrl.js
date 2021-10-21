const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost"
    : "https://social-clubhouse.herokuapp.com";

module.exports = baseUrl;
