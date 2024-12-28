const UserRouter = require('./UserRouter');
const ProductRouter = require('./ProductRouter');
const OrderRouter = require('./OrderRouter');
const CommentRouter = require('./CommentRouter');
const BannerRouter = require('./BannerRouter');
const VoucherRouter = require('./VoucherRouter');
const OrderAddressRouter = require('./OrderAddressRouter');
 const PaymentTypeRouter = require('./PaymentTypeRouter');


const routes = (app) => {
    app.use('/api/user', UserRouter);
    app.use('/api/product', ProductRouter);
    app.use('/api/order', OrderRouter);
    app.use('/api/comment', CommentRouter);
    app.use('/api/banner', BannerRouter);
    app.use('/api/voucher', VoucherRouter);
    app.use('/api/order-address', OrderAddressRouter);
    app.use('/api/payment-type', PaymentTypeRouter)
}

module.exports = routes