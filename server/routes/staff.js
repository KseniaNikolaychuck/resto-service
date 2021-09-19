const express = require('express');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { Staff, File } = require('../db/models');

const { Router } = express;
const router = Router();

// Регистрация персонала
router.post('/new', async (req, res) => {
  const { file } = req.files;
  console.log('[INCOMING BODY TO REG STA]', file);
  const { name, login, phone, password, position } = req.body;
  try {
    const image = await File.create(
      {
        name: `${name}`,
        type: file.mimetype,
        size: file.size,
        data: file.data,
      },
      { raw: true },
    );
    console.log('-----------------IMAGE CREATED', image.id, name, login, phone, password, position);
    const [, isNew] = await Staff.findOrCreate({
      where: {
        [Op.or]: [{ login }, { phone }],
      },
      defaults: {
        name,
        login,
        phone,
        password: await bcrypt.hash(password, 10),
        PostId: Number(position),
        FileId: image.id,
      },
      raw: true,
    });
    // If new - that's ok? Proceed to session creating
    if (isNew) {
      const user = { name, login, phone, isAdmin: Number(position) === 1 }; // postId 1 = admin
      req.session.isAuthorized = true;
      req.session.user = user;
      res.json({ user }); // send user back
    } else {
      res.status(409).json({ error: 'User already exists', user: {} });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message, user: {} });
  }
});

// Логин
router.post('/', async (req, res) => {
  console.log('[INCOMING BODY TO LOGIN STAFF]', req.body);
  const { credentials, password } = req.body;
  try {
    const user = await Staff.findOne({ where: { login: credentials }, raw: true });
    if (user) {
      // Если клиент с таким логином существует, тогда сравниваем пароли
      if (await bcrypt.compare(password, user.password)) {
        // Если пароль подходит, то пишем юзера в сессию
        req.session.isAuthorized = true;
        if (user.PostId === 1) {
          // post_id 1 - это Админ
          req.session.user = { ...user, isAdmin: true, password: '' };
        } else {
          req.session.user = { ...user, isAdmin: false, password: '' };
        }
        res.json({ user: { ...user, password: '' } });
      } else {
        // Если не подходит - кидаем на фронт ошибку
        res.status(403).json({ error: 'Wrong password', user: {} });
      }
    } else {
      // Если такого пользователя не существует, кидам на фронт ошибку
      res.status(404).json({ error: 'User not found', user: {} });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, user: {} });
  }
});

module.exports = router;
