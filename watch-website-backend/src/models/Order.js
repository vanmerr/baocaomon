const StatusOrderEnum = require("../enums/StatusOrder");
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemSchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' 
    },
    quantity: {
        type: Number,
        required: true
    }
});

const OrderSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [ItemSchema], 
    status:{ 
        type: String, 
        enum: Object.values(StatusOrderEnum),
        default: 'Pending'
    },
    total : {
        type: Number
    }
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
