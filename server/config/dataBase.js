// -----------------imports-----------------
const mongoose = require('mongoose');
// -----------------end--------------------

const dbConnection = async (dbUrl) => {
  const connect = await mongoose.connect(dbUrl, {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`dataBase is connected : ${connect.connection.host}`.green.underline.bold);
};

const dbDisconnect = async () => {
  await mongoose.disconnect();
};
module.exports = {
  dbConnection,
  dbDisconnect,
};
