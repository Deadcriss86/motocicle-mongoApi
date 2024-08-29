import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userFound = await User.findOne({ email });

    if (userFound)
      return res.status(400).json({ message: ["The email is already in use"] });

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save();

    const token = await createAccessToken({ id: userSaved._id });

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });

    if (!userFound)
      return res.status(400).json({ message: ["The email does not exist"] });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: ["The password or email is incorrect"] });
    }

    const token = await createAccessToken({ id: userFound._id });

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      token: token,
      isadmin: userFound.isAdmin ? userFound.isAdmin : undefined,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
    sameSite: "none",
  });

  if (req.cookies.isadmin) {
    res.cookie("isadmin", "", {
      secure: true,
      expires: new Date(0),
      sameSite: "none",
    });
  }

  return res.status(200).json({ message: "Logged out successfully" });
};

export const getUserProfile = async (req, res) => {
  try {
    const { token } = req.cookies;

    // Verificar si el token existe
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verificar y decodificar el token
    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
      if (error) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      try {
        // Obtener el usuario de la base de datos
        const userFound = await User.findById(user.id);
        if (!userFound) {
          return res.status(404).json({ message: "User not found" });
        }

        // Devolver los datos del usuario
        return res.json({
          id: userFound._id,
          username: userFound.username,
          nombre: userFound.nombre,
          apellido: userFound.apellido,
          nacionalidad: userFound.nacionalidad,
          celular: userFound.celular,
          cp: userFound.cp,
          ciudad: userFound.ciudad,
          calle: userFound.calle,
          delegacion: userFound.delegacion,
          referencias: userFound.referencias,
          avatar: userFound.avatar,
          isAdmin: userFound.isAdmin,
        });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const editUser = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      nacionalidad,
      celular,
      cp,
      ciudad,
      calle,
      delegacion,
      referencias,
      avatar, // Agrega el campo avatar aquí
    } = req.body;
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
      if (error) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      try {
        const updatedUser = await User.findByIdAndUpdate(
          user.id,
          {
            nombre,
            apellido,
            nacionalidad,
            celular,
            cp,
            ciudad,
            calle,
            delegacion,
            referencias,
            avatar, // Asegúrate de actualizar el campo avatar
            updatedAt: new Date(),
          },
          { new: true }
        );

        if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
        }

        return res.json({
          id: updatedUser._id,
          nombre: updatedUser.nombre,
          apellido: updatedUser.apellido,
          nacionalidad: updatedUser.nacionalidad,
          celular: updatedUser.celular,
          cp: updatedUser.cp,
          ciudad: updatedUser.ciudad,
          calle: updatedUser.calle,
          delegacion: updatedUser.delegacion,
          referencias: updatedUser.referencias,
          avatar: updatedUser.avatar, // Incluye el avatar en la respuesta
        });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
