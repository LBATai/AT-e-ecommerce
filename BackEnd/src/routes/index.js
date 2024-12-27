const UserRouter = require('./UserRouter');
const ProductRouter = require('./ProductRouter');
const OrderRouter = require('./OrderRouter');
const CommentRouter = require('./CommentRouter');
const BannerRouter = require('./BannerRouter');
const VoucherRouter = require('./VoucherRouter');
const routes = (app) => {
    app.use('/api/user', UserRouter);
    app.use('/api/product', ProductRouter);
    app.use('/api/order', OrderRouter);
    app.use('/api/comment', CommentRouter);
    app.use('/api/banner', BannerRouter);
    app.use('/api/voucher', VoucherRouter);
}

module.exports = routes