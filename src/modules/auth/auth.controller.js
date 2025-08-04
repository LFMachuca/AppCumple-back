const register = async (req, res) => {
  const { _id } = req.user;
  res.json201(_id, "Registered");
};

const loginAdmin = async (req, res) => {
  const { _id } = req.user;
  const opts = {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: "None",
  };
  res.cookie("token", req.user.token, opts).json200(_id, "Logged in");
};

const logoutAdmin = async (req, res) => {
  res.clearCookie("token").json200(req.user._id, "Logged out");
};

const isOnline = async (req, res) => {
  res.json200(req.user, "Is online");
};
const badAuth = async (req, res) => {
  res.json401();
};
const forbidden = async (req, res) => {
  res.json403();
};

export { loginAdmin, logoutAdmin, forbidden, badAuth, isOnline, register };
