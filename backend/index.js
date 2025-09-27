const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const app=express()
app.use(cors())
app.use(express.json())
app.use('/images', express.static('images'));
mongoose.connect("mongodb+srv://reshmashameem:sajree06062002@ecommercecluster.rt1krnd.mongodb.net/ecommerceDB?retryWrites=true&w=majority&appName=EcommerceCluster").then(()=>
console.log("Connected to DB")
).catch(()=>
console.log("Failed to Connect")
)

const JWT_TOKEN='styliza31072004'
const productSchema= new mongoose.Schema({
name:{type:String,required:true},
price:{type:Number,required:true},
category:{type:String},
img:{type:String},
  desc: { type: String }
})
const Product=mongoose.model('product',productSchema)

 
  const cartSchema=new mongoose.Schema(
    {
     productId:{type:mongoose.Schema.Types.ObjectId,ref:'product',required:true},
     name:String,
     price:Number,
     img:String,
    quantity: { type: Number, default: 1 }

    }
    
  )

  const Cart=mongoose.model('cart',cartSchema)

  
  
  const orderSchema=new mongoose.Schema({
    items:Array,
    totalNumber:Number,
    createdAt:{type:Date,default:Date.now}
  })
  
  const Order=mongoose.model('order',orderSchema)

  const userSchema=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true}
  })
  const User=mongoose.model('user',userSchema)

  const verifyToken=(req,res,next)=>{
      const authHeader=req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1];
      if(!token){
        return res.status(401).json('No token provided')
      }
      try{
            const verified=jwt.verify(token,JWT_TOKEN)
      req.user=verified
      next()
      }
      catch(err){
          res.status(400).json({ message: "Invalid Token", error: err.message })
      }
    
  }

    app.post('/products', async function(req,res){
    try{
        const product=new Product(req.body);
    const savedProduct= await product.save()
     res.status(201).json(savedProduct)
    }
   catch(err){
        res.status(400).json("Error",err)
   }
    
  })
  app.get('/products', async function(req,res){
    try{
   const products= await Product.find()
    res.status(200).json(products)
    }
   catch(err){
    res.status(500).json("Failed to fetch products")
   }

  })
  app.get('/products/:id',async function(req,res){
   try{
    const product= await Product.findById(req.params.id)
    if(!product){
      return  res.status(404).json("Product not found")
    }
    res.status(200).json(product)
   }
   catch(err){
    res.status(500).json("Failed to fetch product")
   }
    
   
  })
  app.put('/products/:id', async function(req,res){
    try{
        const updatedProduct= await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    if(!updatedProduct){
        return res.status(404).json("Product not found")
    }
    res.status(200).json(updatedProduct)
    }
   catch(err){
    res.status(500).json("Failed to update product")
   }

  })
  app.delete('/products/:id', async function(req,res){
    try{
           const deletedProducts= await Product.findByIdAndDelete(req.params.id)
    if(!deletedProducts){
        return res.status(404).json("Product not found")
    }
    res.status(200).json(deletedProducts)
    }
    catch(err){
        res.status(500).json("Failed to delete product")
    }
  
  })
    app.post('/cart',async function(req,res){
        try{
           const cartItem= new Cart(req.body)
        const savedItem=await cartItem.save()
        res.status(201).json(savedItem)
        }
    catch(err){
        res.status(400).json(err)
    }

    })
    
    app.get('/cart',async function(req,res){
        try{
           const cartItems= await Cart.find()
           res.status(200).json(cartItems)
        }
        catch(err){
           res.status(500).json(err)
        }
         
        
    })


     app.put('/cart/:id', async function(req,res){
        try{
            const updatedItem=await Cart.findByIdAndUpdate(
            req.params.id,
            {quantity:req.body.quantity},
            {new:true}
        )
        if(!updatedItem){
            return res.status(404).json("Item not found")
        }
          res.status(200).json(updatedItem)
        }
        catch(err){
           res.status(500).json(err)
        } 
       
     })

     app.delete('/cart/:id',async function(req,res){
        try{
            const deletedItems= await Cart.findByIdAndDelete(req.params.id)
        if(!deletedItems){
            return res.status(404).json("Item not found")
        }
        res.status(200).json(deletedItems)
        }
       catch(err){
        res.status(500).json(err)
       }
     })

     app.post('/order',verifyToken, async function(req,res){
      try{
         const {items}=req.body;
      if(!items||items.length==0){
        return res.status(400).json("Items not found in the order")
      }
      
      const totalNumber=items.reduce((sum,item)=>sum+item.price*item.quantity,0)
      const order= new Order({items,totalNumber})
      const savedOrder= await order.save()
      res.status(201).json(savedOrder)
      }
      catch(err){
        res.status(500).json("Error",err)
      }
      
     })

    app.get('/order', async function(req,res){
      try{
           const orders= await Order.find().sort({createdAt:-1})
      res.status(200).json(orders)
      }
       
      catch(err){
          res.status(500).json("Error",err)
      }
    })
    
    app.post('/user/register',async function(req,res){
      try{
          const {username,email}=req.body
      const existingUser=await User.findOne({email})
      if(existingUser){
       return res.status(400).json("User already exists")
      }
      const newUser= new User({username,email})
      const savedUser= await newUser.save()
      const token=jwt.sign({id:savedUser._id},JWT_TOKEN)
      res.status(201).json({savedUser,token})
      }
      catch(err){
        res.status(500).json(err)
      }
    })
     
    app.post('/user/login', async function(req,res){
      try{
          const {email}=req.body
      const user= await User.findOne({email})
   if(!user){
    return res.status(404).json("User not found")
   }
   const token=jwt.sign({id:user._id},JWT_TOKEN)
   res.status(201).json({user,token})
      }
      catch(err){
         res.status(500).json(err)
      }
    })

app.listen(5000,function(){
    console.log('Server Started...')
})