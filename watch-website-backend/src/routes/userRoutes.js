const express = require('express')
const router = express.Router()
const dotenv = require('dotenv')

const User = require('../models/User')
const tokenAuthentication = require('../middlewares/auth0User')
const Order = require('../models/Order')
const Cart = require('../models/Cart')
const Product = require('../models/Product')
const upload = require('../middlewares/fileUpload')

dotenv.config()


//logged in user details
router.get('/get', tokenAuthentication, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password").select('-_id')
        res.status(200).json({data: user})

    } catch (error) {
        res.status(404).json({ message: `${error}`})
    }
})

// update info
router.put('/update-info', tokenAuthentication, upload , async (req, res) => {
    const { fullName, address } = req.body
    let avartarURL 
    try {
        let user = await User.findById(req.user.id).select('-password')
        if (!user) return res.status(400).json({ message: 'Access denied' });
        if (req.file ) avartarURL = `http://${req.hostname}:${process.env.PORT || 1003}/images/${req.file.filename}`

            user.fullName = fullName || user.fullName;
            user.address = address || user.address;
            user.avartarURL = avartarURL || user.avartarURL


        const result = await user.save();
        res.status(200).json({ data: result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

router.post('/order', tokenAuthentication, async (req, res) => {
    const { items } = req.body;
    let products = [];
    let total = 0;

    try {
        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${item.productId} not found` });
            }
            if (item.quantity > product.quantity) {
                return res.status(400).json({ message: 'Insufficient inventory' });
            }
            product.quantity -= item.quantity;
            await product.save();
            products.push(product);
            total += product.price * item.quantity;

            await Cart.findOneAndDelete({ userId: req.user.id, productId: item.productId });
        }

        const order = await Order.create({
            userId: req.user.id,
            items,
            total
        });

        const orderData = order.toObject();
        delete orderData.userId;

        res.status(200).json({ data: orderData, products });
        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// get all order by user
router.get('/history-order', tokenAuthentication, async ( req, res) => {
    const  status  = req.query.status
    let orders
    try {
        if (status) {
            orders = await Order.find({ userId: req.user.id, status: status })
                .select('-userId')
                .populate({
                    path: 'items.productId', 
                    select: 'name imageURL' 
                });
        } else {
            orders = await Order.find({ userId: req.user.id })
                .select('-userId')
                .populate({
                    path: 'items.productId',
                    select: 'name imageURL price'
                });
        }
        res.status(200).json({ data: orders})
    } catch (error) {
        res.status(400).json({ message: error})
    }
})

// cancel order
router.get('/cancel-order', tokenAuthentication, async ( req, res) => {
    const  id  = req.query.id
    try {
        // cancal order
        const order = await Order.findById(id).select('-userId')
        if(order.status === 'Failed') return res.status(400).json({ message: 'Order has been cancelled'})
        order.status = 'Failed'
        await order.save()

        // update quantity for product

        for (const item of order.items) {
            const product = await Product.findById(item.productId._id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            product.quantity += item.quantity;
            await product.save();
        }

        res.status(201).json({ data: order, update: result })
    } catch (error) {
        res.status(400).json({ message: error})
    }
})


//get carts by user
router.get('/get-cart', tokenAuthentication, async ( req, res) => {
    try {
        const carts = await Cart.find({ userId: req.user.id}).select('-userId')
            .populate('productId', 'name imageURL price quantity')

        res.status(200).json({ data: carts})

    } catch (error) {
        res.status(400).json({ message: `${error}`})
    }
})

// add product to cart
router.post('/add-cart', tokenAuthentication, async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ productId: productId, userId: req.user.id })
        if (cart) cart.quantity += quantity;
        else {
            cart = new Cart({
                productId,
                userId: req.user.id,
                quantity
            });
        }
        await cart.save();

        res.status(200).json({ data: cart});

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// remove cart
router.delete('/delete-cart', tokenAuthentication, async ( req, res) => {
    const  id  = req.query.id
    try {
        const result = await Cart.findByIdAndDelete(id)
        res.json({ data : result })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error'});
    }
}) 

//update cart

router.put('/update-cart', tokenAuthentication, async ( req, res) => {
    const  {id, quantity}  = req.body
    try {
        const cart = await Cart.findById(id)
                    .populate('productId', 'name imageURL price quantity')
        cart.quantity = quantity

        const result = await cart.save()
        res.json({ data : result })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error'});
    }
}) 

module.exports = router