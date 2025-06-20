// const express = require('express');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const fileUpload = require('express-fileupload');
// const errorMiddleware = require('./middlewares/error');

// const app = express();

// // config
// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config({ path: 'backend/config/config.env' });
// }

// app.use(express.json());
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(fileUpload());

// const user = require('./routes/userRoute');
// const product = require('./routes/productRoute');
// const order = require('./routes/orderRoute');
// const payment = require('./routes/paymentRoute');

// app.use('/api/v1', user);
// app.use('/api/v1', product);
// app.use('/api/v1', order);
// app.use('/api/v1', payment);

// // error middleware
// app.use(errorMiddleware);

// module.exports = app;
const express = require('express');
const cors = require('cors'); // Import CORS
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const errorMiddleware = require('./middlewares/error');

const app = express();

// config
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: 'backend/config/config.env' });
}

// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true, // Allow credentials if needed
}));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

const user = require('./routes/userRoute');
const product = require('./routes/productRoute');
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute');
// app.js or your main server file
const cartRoutes = require('./routes/cartRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
app.use('/api/v1', cartRoutes);

app.use('/api/v1', user);
app.use('/api/v1', product);
app.use('/api/v1', order);
app.use('/api/v1', payment);


app.use('/api/v1', categoryRoutes);
// error middleware
app.use(errorMiddleware);

module.exports = app;
