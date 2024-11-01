const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const SECRET_KEY = process.env.JWT_SECRET
const usersFilePath = "./data/users.json";

// Functions to read & write in JSON.
const readUsers = () => JSON.parse(fs.readFileSync(usersFilePath));
const writeUsers = (data) => fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2));

//RegisterFunction
exports.register = async (req, res) => {
    const { username, password, role = "user" } = req.body;
    const users = readUsers();
    
    const userExists = users.some((user) => user.username === username);
        if(userExists)
            return res.status(400).json({ message: "Användarnamnet är upptaget" });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword, role });
    writeUsers(users);
    res.status(201).json({ message: "Registrering lyckades!" });    
};


// Inloggningsfunktion
exports.login = async (req, res) => {
    const { username, password } = req.body;
    const users = readUsers();
  
    const user = users.find((user) => user.username === username);
    if (!user) return res.status(400).json({ message: "Användare hittades inte" });
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Fel lösenord" });
  
    const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ message: "Inloggning lyckades", token });
  };