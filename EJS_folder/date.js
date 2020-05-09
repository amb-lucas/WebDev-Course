const getDay = () => {
  const options = { weekday: "long" };
  const day = new Date().toLocaleDateString("en-US", options);
  return day;
};

module.exports = { getDay };
