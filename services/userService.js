const db = require('../config/firebase');
const User = require('../models/userModel');

exports.getUsers = async () => {
  const snapshot = await db.ref('users').once('value');
  const users = snapshot.val();
  return Object.keys(users).map(key => new User(key, users[key].name, users[key].age));
};

exports.addUser = async (newUser) => {
  const userRef = db.ref('users').push();
  await userRef.set(newUser);
  return new User(userRef.key, newUser.name, newUser.age);
};
