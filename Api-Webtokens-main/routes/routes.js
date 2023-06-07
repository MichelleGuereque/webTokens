const pool = require('../data/config');

const routes = (app, jwt, secretKey) => {
  const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'No se proporcionó un token' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Token inválido' });
      }

      req.user = decoded;
      next();
    });
  };

  // Rutas públicas
  app.post('/login', (req, res) => {
    // Realiza la autenticación del usuario y genera el token JWT
    const user = { id: 1, username: 'usuario' }; // Datos del usuario autenticado
    const token = jwt.sign(user, secretKey);
    res.json({ token });
  });

  // Rutas protegidas
  app.get('/users', verifyToken, (req, res) => {
    pool.query('SELECT * FROM users', (error, result) => {
      if (error) throw error;
      res.send(result);
    });
  });

  app.get('/users/:id', verifyToken, (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM users WHERE id = ?', id, (error, result) => {
      if (error) throw error;
      res.send(result);
    });
  });

  app.post('/users', verifyToken, (req, res) => {
    pool.query('INSERT INTO users SET ?', req.body, (error, result) => {
      if (error) throw error;
      res.status(201).send(`User added with ID ${result.insertId}`);
    });
  });

  app.put('/users/:id', verifyToken, (req, res) => {
    const id = req.params.id;
    pool.query('UPDATE users SET ? WHERE id = ?', [req.body, id], (error, result) => {
      if (error) throw error;
      res.send('User updated successfully');
    });
  });

  app.delete('/users/:id', verifyToken, (req, res) => {
    const id = req.params.id;
    pool.query('DELETE FROM users WHERE id = ?', id, (error, result) => {
      if (error) throw error;
      res.send('User deleted');
    });
  });

  // Rutas de productos (similar a las rutas de usuarios)

  app.get('/productos', verifyToken, (req, res) => {
    pool.query('SELECT * FROM productos', (error, result) => {
      if (error) throw error;
      res.send(result);
    });
  });

  app.get('/productos/:id', verifyToken, (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM productos WHERE id = ?', id, (error, result) => {
      if (error) throw error;
      res.send(result);
    });
  });

  app.post('/productos', verifyToken, (req, res) => {
    pool.query('INSERT INTO productos SET ?', req.body, (error, result) => {
      if (error) throw error;
      res.status(201).send(`Producto added with ID ${result.insertId}`);
    });
  });

  app.put('/productos/:id', verifyToken, (req, res) => {
    const id = req.params.id;
    pool.query('UPDATE productos SET ? WHERE id = ?', [req.body, id], (error, result) => {
      if (error) throw error;
      res.send('Product updated successfully');
    });
  });

  app.delete('/productos/:id', verifyToken, (req, res) => {
    const id = req.params.id;
    pool.query('DELETE FROM productos WHERE id = ?', id, (error, result) => {
      if (error) throw error;
      res.send('Product deleted');
    });
  });
};

module.exports = routes;
