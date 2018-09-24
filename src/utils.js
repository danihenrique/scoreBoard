const reply = (res, status = 200, message = 'ok', data = []) => {
  res.status(status);
  res.json({ message, data });
  return res;
};

module.exports = {
  reply
};
