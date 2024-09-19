// verify admin
const verifyAdmin = async (req, res) => {
  const { userName, password } = req.body;

  //validate
  if (
    userName === process.env.ADMIN_NAME &&
    password === process.env.ADMIN_PASS
  ) {
    return res.status(200).send({
      success: true,
      message: "Admin Verified",
    });
  }

  return res.status(500).send({
    success: false,
    message: "Invalid UserName or Password",
  });
};

export { verifyAdmin };
