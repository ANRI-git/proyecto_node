import { User } from '../models/mongoDB/users.js';
import bcrypt from 'bcrypt';
import { token } from '../services/jwt.js';
const saltRounds = 10;

export const userController = {
  registerUser: async (req, res) => {
    const { fullName, email } = req.body;
    const password = await bcrypt.hash(req.body.password, saltRounds);
    const data = { fullName, email, password };
    const newUser = new User(data);
    try {
      const savedUser = await newUser.save();
      res.status(201).json({
        success: true,
        message: 'New User registered',
        data: savedUser,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
  loginUser: async (req, res) => {
    const { email, password } = req.body;
    const user = await User.find().where({ email: email });
    if (!user.length)
      return res.status(401).json({
        success: false,
        message: 'Wrong Email or Password',
      });
    const hashedPassword = user[0].password;
    const match = await bcrypt.compare(password, hashedPassword);
    if (!match)
      return res.status(401).json({
        success: false,
        message: 'Wrong Email or Password',
      });
    try {
      const accessToken = await token.generate(user[0]);
      res
        .status(200)
        .json({ success: true, message: 'User logged in', data: accessToken });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
};
