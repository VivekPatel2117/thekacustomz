import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as userService from "../services/user.service.js";
export const register = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;

    const existingUser = await userService.findUserByEmail(email);
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userService.createUser({
      full_name,
      email,
      password: hashedPassword,
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message, success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userService.findUserByEmail(email);
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email, full_name: user.full_name ,is_verified: user.is_verified},
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
export const getProfileWithOrders = async (req, res) => {
  try {
    const user = await userService.getUserWithOrders(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProfile = async (req, res) => {
  const user = await userService.getUserById(req.user.id);
  res.json(user);
};

export const updateProfile = async (req, res) => {
  const updatedUser = await userService.updateUser(
    req.user.id,
    req.body
  );

  res.json(updatedUser);
};