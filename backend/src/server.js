const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const SECRET_KEY = "sua_chave_secreta_aqui"; // Em produção, use variáveis de ambiente

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));



const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) return res.status(401).json({ message: "Não autorizado" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token inválido" });
  }
};

// Rota protegida
app.get('/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});



// Rota de Login (Simulada)
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // No futuro, busque o usuário no Banco de Dados aqui
  // Simulando um usuário para teste
  const fakeUser = {
    id: 1,
    email: "icaro@dev.com",
    passwordHash: await bcrypt.hash("123456", 10) // Senha "123456" hasheada
  };

  if (email !== fakeUser.email) {
    return res.status(401).json({ message: "Usuário não encontrado" });
  }

  const isPasswordValid = await bcrypt.compare(password, fakeUser.passwordHash);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Senha incorreta" });
  }

  const token = jwt.sign({ id: fakeUser.id, email: fakeUser.email }, SECRET_KEY, { expiresIn: '1h' });
  
  // Envia o token como cookie - usado para cookies HttpOnly
  // // res.cookie('token', token, { httpOnly: true, secure: false }); // Em produção, use secure: true
  res.cookie('token', token, {
    httpOnly: true,     // Impede acesso via JS (Segurança!)
    secure: false,      // Em produção (HTTPS) deve ser true. No localhost deixe false.
    sameSite: 'lax',    // Necessário para navegadores modernos
    maxAge: 3600000     // 1 hora em milissegundos
  });
  
  res.json({ token });

});

app.post('/logout', (req, res) => {
  res.clearCookie('token').json({ 
    httpOnly: true,
    secure: false,
    sameSite: 'lax'
   });
  res.json({
    message: "Saiu com sucesso" });
});

app.listen(3001, () => console.log('Backend rodando na porta 3001'));