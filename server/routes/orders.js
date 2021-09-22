const express = require('express');
const axios = require('axios');
const qs = require('qs');
const checkStaff = require('../middlewares/staffValidation');
const { Reservation, Table, State, Order, Client, OrderPosition, Position } = require('../db/models');
const isAuthenticated = require('../middlewares/authenticationValidation');
const mailer = require('../nodemailer');

const { BEARER } = process.env;

const { Router } = express;
const router = Router();

// Получение всех заказов
router.get('/', checkStaff, async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      attributes: [
        'id',
        'table_id',
        'date_time',
        'guest_count',
        'guest_name',
        'guest_phone',
        'time_interval',
      ],
      include: [
        {
          model: Table,
          key: 'id',
          attributes: ['id', 'hall_id', 'number', 'seats_limit'],
        },
        {
          model: State,
          key: 'id',
          attributes: ['id', 'state'],
        },
      ],
      raw: true,
    });

    await Order.findAll({
      attributes: ['id', 'client_id', 'reservation_id', 'state_id'],
      include: [
        {
          model: Client,
          key: 'id',
          attributes: ['id', 'name', 'phone', 'discount_id'],
        },
        {
          model: Reservation,
          key: 'id',
          attributes: [
            'id',
            'table_id',
            'date_time',
            'guest_count',
            'guest_name',
            'guest_phone',
            'time_interval',
          ],
          include: {
            model: Table,
            attributes: ['number'],
          },
        },
        {
          model: State,
          key: 'id',
          attributes: ['state'],
        },
        {
          model: OrderPosition,
          key: 'id',
          attributes: ['id', 'quantity'],
          include: {
            model: Position,
            attributes: ['name', 'price'],
          },
        },
      ],
      raw: false,
    });
    res.json({ orders, reservations });
  } catch (error) {
    console.log(`::::::::::::::::::::::DATABASE ERROR: ${error.message}`);
    res.status(500).json({ error: error.message, user: { isAuth: false } });
  }
});

// Создание заказа
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const { reservation, user, cart, StateId } = req.body.order;
    const order = await Order.create({
      ClientId: user.id,
      StateId,
      ReservationId: reservation.id || null,
    });

    const promissesArrayOfOrderPositions = cart.map(async (position) => {
      const orderPosition = await OrderPosition.create({
        OrderId: order.id,
        PositionId: position.id,
        quantity: position.quantity,
      });
      return orderPosition;
    });
    const orderPositions = await Promise.all(promissesArrayOfOrderPositions);
    res.json({ order, orderPositions });
  } catch (error) {
    console.log(`::::::::::::::::::::::DATABASE ERROR: ${error.message}`);
    res.status(500).json({ error: error.message, user: { isAuth: false } });
  }
});

router.put('/done', checkStaff, async (req, res) => {
  try {
    const { id } = req.body;
    const orderToChange = await Order.findOne({
      where: {
        id,
      },
    });
    orderToChange.StateId = 2;
    await orderToChange.save();
    // API для СМС
    const client = await Client.findOne({
      where: {
        id: orderToChange.dataValues.ClientId,
      },
      raw: true,
    });
    console.log(client);
    const message = {
      from: '"Ресторан Точка" <restiktochka@ya.ru>',
      to: `${client.email}`,
      subject: 'Подтверждение бронирования',
      text: `Уважаемый, ${client.name}! Подтверждаем бронирование заказа в ресторане Точка. Ждем Вас!`,
    };
    await mailer(message);

    const data = qs.stringify({
      phone: client.phone,
      text: `${client.name}, ваш заказ ${orderToChange.id} Подтверждён`,
    });
    const config = {
      method: 'post',
      url: 'https://api.pushsms.ru/api/v1/delivery',
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiJ9.eyJjdXN0b21lcl9pZCI6MjcxMSwiZGF0ZXRpbWUiOjE2MzIzMTkzNjh9.O4KECeIgMYb4E89WkUgjSuO5IUAZz6gpxkvcMJe0jmU',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };

    await axios(config);
    res.json({ message: 'Вы успешно подтвердили заказ' });
  } catch (error) {
    console.log(`::::::::::::::::::::::DATABASE ERROR: ${error.message}`);
    res.status(500).json({ error: error.message, user: { isAuth: false } });
  }
});

router.put('/cancel', checkStaff, async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    const orderToChange = await Order.findOne({
      where: {
        id,
      },
    });
    orderToChange.StateId = 7;
    await orderToChange.save();
    res.json({ message: 'Вы успешно отменили заказ' });
  } catch (error) {
    console.log(`::::::::::::::::::::::DATABASE ERROR: ${error.message}`);
    res.status(500).json({ error: error.message, user: { isAuth: false } });
  }
});

router.delete('/position', checkStaff, async (req, res) => {
  try {
    const { id } = req.body;
    const orderPositionToDelete = await OrderPosition.findOne({
      where: {
        id,
      },
    });
    await orderPositionToDelete.destroy();
    res.json({ message: 'Вы успешно удалили меню из заказа заказ' });
  } catch (error) {
    console.log(`::::::::::::::::::::::DATABASE ERROR: ${error.message}`);
    res.status(500).json({ error: error.message, user: { isAuth: false } });
  }
});

router.put('/edit/:id', checkStaff, async (req, res) => {
  try {
    const { id } = req.params;
    const { ReservationId } = req.body;
    console.log(id, ReservationId);
    const orderToChange = await Order.findOne({
      where: {
        id,
      },
    });
    orderToChange.ReservationId = ReservationId;
    await orderToChange.save();
    res.json({ message: 'Вы успешно изменили заказ' });
  } catch (error) {
    console.log(`::::::::::::::::::::::DATABASE ERROR: ${error.message}`);
    res.status(500).json({ error: error.message, user: { isAuth: false } });
  }
});

module.exports = router;
