const mongoose = require('mongoose');
const Cart = require('../models/CartModel');

module.exports.post_addToCart= async(req,res) => {
    try{
      const addtocart = await Cart.create(req.body);
       res.status(201).json({
         success:true,
         data:addtocart,
       });
    }
        
    catch(err){
      console.error(err);
      res.status(400);
        
      };
    
    }

    module.exports.get_cart_details_by_id=async(req,res,next)=>{
        try{
            const users_addToCart=await Cart.find({user: res.locals.user},{plan:1,extras:1,tiffinservice:1,totalPrice:1})
                if(users_addToCart.length !== 0){
                    res.status(201).json({
                       users_addToCart
                     });
                }
                else{
                  res.status(200).json({
                    msg: 'No Items Added yet'
                  })
                }
        }
        catch(err){
            console.error(err);
            res.status(500).json({
              error: 'Server error',
            });
          }
    }
  
    module.exports.delete_cart_by_id=async(req,res,next)=>{
      try{
           const delete_cart=await Cart.findByIdAndDelete({_id:req.params.id})
           if(delete_cart){
             res.status(201).json({
              msg: "Item deleted from cart",
             });
           }
           else{
             res.json({
               msg:"item not in cart",
             });
           }
      }
      catch(err)
      {
        console.error(err);
        res.status(500).json({
          error: 'Server error',
        });
      }

      }
    