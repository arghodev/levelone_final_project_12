const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const port = process.env.PORT || 3000;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY || "key-yourkeyhere",
});

// middleware

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

//? ============================================

//* payment intent
//? ============================================

app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;

  if (!price || isNaN(price)) {
    return res.status(400).send({ error: "Invalid price" });
  }

  const amount = parseInt(price * 100); // converting dollars to cents

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

//? ============================================

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const e = require("express");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster.jxvjbeo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const userCollection = client.db("bistroDB").collection("users");
    const menuCollection = client.db("bistroDB").collection("menu");
    const cartCollection = client.db("bistroDB").collection("carts");
    const paymentCollection = client.db("bistroDB").collection("payments");

    //! jwt
    app.post("/jwt", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });
      res.send({ token });
    });

    //! middleware
    const verifyJWT = (req, res, next) => {
      const authorization = req.headers.authorization;

      if (!authorization) {
        return res
          .status(401)
          .send({ error: true, message: "unauthorized access" });
      }
      const token = authorization.split(" ")[1];
      // console.log("authorization =>", token);
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res
            .status(403)
            .send({ error: true, message: "unauthorized access" });
        }
        req.decoded = decoded;
        next();
      });
    };

    const isAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      if (user?.role !== "admin") {
        return res
          .status(403)
          .send({ error: true, message: "unauthorized access" });
      }
      next();
    };

    app.get("/users/admin/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;

      if (req.decoded.email !== email) {
        res.status(403).send({ admin: false, message: "unauthorized access" });
      }
      const query = { email: email };
      const user = await userCollection.findOne(query);
      if (user) {
        admin = user?.role === "admin" ? true : false;
      }
      res.send({ admin });
    });

    app.get("/admin-stats", verifyJWT, isAdmin, async (req, res) => {
      const users = await userCollection.estimatedDocumentCount();
      const menuItems = await menuCollection.estimatedDocumentCount();
      const orders = await paymentCollection.estimatedDocumentCount();

      // this is not the best way
      // const payments = await paymentCollection.find().toArray();
      // const revenue = payments.reduce((total, payment) => total + payment.price, 0);

      const result = await paymentCollection
        .aggregate([
          {
            $group: {
              _id: null,
              totalRevenue: {
                $sum: "$price",
              },
            },
          },
        ])
        .toArray();

      const revenue = result.length > 0 ? result[0].totalRevenue : 0;

      // console.log("revenue =>", revenue, users, menuItems, orders);

      res.send({
        users,
        menuItems,
        orders,
        revenue,
      });
    });

    // app.get("/order-stats", verifyJWT, isAdmin, async (req, res) => {
    //   const result = await paymentCollection
    //     .aggregate([
    //       {
    //         $unwind: "$menuItemIds",
    //       },
    //       {
    //         $lookup: {
    //           from: "menu",
    //           localField: "menuItemIds",
    //           foreignField: "_id",
    //           as: "menuItems",
    //         },
    //       },
    //       {
    //         $unwind: "$menuItems",
    //       },
    //       {
    //         $group: {
    //           _id: "$menuItems.category",
    //           quantity: { $sum: 1 },
    //           revenue: { $sum: "$menuItems.price" },
    //         },
    //       },
    //       {
    //         $project: {
    //           _id: 0,
    //           category: "$_id",
    //           quantity: "$quantity",
    //           revenue: "$revenue",
    //         },
    //       },
    //     ])
    //     .toArray();

    //   res.send(result);
    // });

    // payments api

    app.get("/payments/:email", verifyJWT, async (req, res) => {
      const email = req.params.email; // ✅ Fix: declare email from URL
      const query = { email }; // ✅ Now email is defined

      // console.log("query =>", query);

      if (req.decoded.email !== email) {
        res.status(403).send({ admin: false, message: "unauthorized access" });
      }
      const result = await paymentCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/payments", async (req, res) => {
      const payment = req.body;
      const insertResult = await paymentCollection.insertOne(payment);

      const query = {
        _id: {
          $in: payment.cartIds.map((id) => new ObjectId(id)),
        },
      };
      const deleteResult = await cartCollection.deleteMany(query);
      console.log("payment ==>", payment);

      //todo: send email

      mg.messages
        .create("sandbox-123.mailgun.org", {
          from: process.env.MAIL_SENDING_DOMAIN,
          to: ["arghodev@gmail.com"],
          subject: "Bistro Boss Order Confirmation",
          text: "Testing some Mailgun awesomness!",
          //           html: `
          //           <!DOCTYPE html>
          // <html lang="en">
          //   <head>
          //     <meta charset="UTF-8" />
          //     <title>Order Confirmation</title>
          //     <style>
          //       body {
          //         margin: 0;
          //         padding: 0;
          //         font-family: Arial, sans-serif;
          //         background-color: #f4f4f4;
          //       }

          //       .email-container {
          //         max-width: 600px;
          //         margin: 20px auto;
          //         background-color: #ffffff;
          //         border-radius: 8px;
          //         overflow: hidden;
          //         box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          //       }

          //       .header {
          //         background-color: #4f46e5;
          //         color: #ffffff;
          //         padding: 20px;
          //         text-align: center;
          //       }

          //       .header h1 {
          //         margin: 0;
          //         font-size: 24px;
          //       }

          //       .content {
          //         padding: 30px;
          //       }

          //       .content h2 {
          //         margin-top: 0;
          //         color: #333333;
          //       }

          //       .content p {
          //         color: #555555;
          //         line-height: 1.6;
          //       }

          //       table {
          //         width: 100%;
          //         border-collapse: collapse;
          //         margin-top: 20px;
          //       }

          //       th,
          //       td {
          //         text-align: left;
          //         padding: 12px;
          //         border-bottom: 1px solid #e0e0e0;
          //       }

          //       th {
          //         background-color: #f0f0f0;
          //         font-weight: bold;
          //       }

          //       .total-row td {
          //         font-weight: bold;
          //         color: #000;
          //       }

          //       .footer {
          //         background-color: #f0f0f0;
          //         text-align: center;
          //         font-size: 14px;
          //         color: #888888;
          //         padding: 15px;
          //       }
          //     </style>
          //   </head>
          //   <body>
          //     <div class="email-container">
          //       <div class="header">
          //         <h1>Order Confirmation</h1>
          //       </div>

          //       <div class="content">
          //         <h2>Hi {{customerName}},</h2>
          //         <p>
          //           Thank you for your order <strong>#{{orderId}}</strong> placed on
          //           <strong>{{orderDate}}</strong>. Here is your order summary:
          //         </p>

          //         <table>
          //           <thead>
          //             <tr>
          //               <th>Item</th>
          //               <th>Qty</th>
          //               <th>Price</th>
          //             </tr>
          //           </thead>
          //           <tbody>
          //             {{orderRows}}
          //             <tr class="total-row">
          //               <td colspan="2">Total</td>
          //               <td>${""}</td>
          //             </tr>
          //           </tbody>
          //         </table>

          //         <p>
          //           If you have any questions about your order, simply reply to this
          //           email—we’re happy to help.
          //         </p>
          //       </div>

          //       <div class="footer">
          //         &copy; {{year}} Your Company Name. All rights reserved.
          //       </div>
          //     </div>
          //   </body>
          // </html>

          //           `,
          html: `
       <div>
        <h1>
          Thank you for visiting our website and we hope you find what you are
          looking for.
        </h1>
        <h2>Your Transiton ID: ${payment.transitionId}</h2>
        <p>We would like to know your feedback</p>
        </div>

          `,
        })
        .then((msg) => console.log(msg)) // logs response data
        .catch((err) => console.error(err)); // logs any error

      // console.log("payment  ==>", payment);
      res.send({ insertResult, deleteResult });
    });

    //! users api

    app.get("/users", verifyJWT, isAdmin, async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        return res.send({
          message: "User already exists",
          insertedId: null,
        });
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.delete("/users/admin/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });

    app.patch("/users/admin/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          role: "admin",
        },
      };
      const result = await userCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    //! menu api
    app.get("/menu", async (req, res) => {
      const result = await menuCollection.find().toArray();
      res.send(result);
    });

    app.get("/menu/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await menuCollection.findOne(query);
      res.send(result);
    });

    app.post("/menu", verifyJWT, isAdmin, async (req, res) => {
      const newItem = req.body;
      const result = await menuCollection.insertOne(newItem);
      res.send(result);
    });

    app.patch("/menu/:id", verifyJWT, isAdmin, async (req, res) => {
      const id = req.params.id;
      const item = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          name: item.name,
          recipeDetails: item.recipeDetails,
          image: item.image,
          category: item.category,
          price: item.price,
        },
      };
      const result = await menuCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    app.delete("/menu/:id", verifyJWT, isAdmin, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await menuCollection.deleteOne(query);
      console.log("backend ==>", result, typeof id, query);
      res.send(result);
    });

    //! cart api
    app.get("/carts", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const result = await cartCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/carts", async (req, res) => {
      const cartItem = req.body;
      const result = await cartCollection.insertOne(cartItem);
      res.send(result);
    });

    app.delete("/carts/:id", async (req, res) => {
      const id = req.params.id;
      // console.log(id);

      const query = { _id: new ObjectId(id) };
      const result = await cartCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// ===========================================
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
