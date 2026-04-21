// src/data/orders.js
const orders = [
  {
    orderId: 1001,
    customerName: "Arun",
    restaurant: "Spice Hub",
    items: [
      { name: "Chicken Biryani", price: 250, quantity: 2 },
      { name: "Raita", price: 50, quantity: 1 }
    ],
    totalAmount: 550,
    status: "delivered",
    deliveryTime: "30 mins",
    rating: 4.5
  },
  {
    orderId: 1002,
    customerName: "Priya",
    restaurant: "Burger King",
    items: [
      { name: "Whopper", price: 180, quantity: 3 },
      { name: "Fries", price: 80, quantity: 2 }
    ],
    totalAmount: 700,
    status: "delivered",
    deliveryTime: "25 mins",
    rating: 4.0
  },
  {
    orderId: 1003,
    customerName: "",
    restaurant: "Pizza Palace",
    items: [
      { name: "Margherita Pizza", price: 300, quantity: 1 },
      { name: "Garlic Bread", price: 100, quantity: 2 }
    ],
    totalAmount: 500,
    status: "cancelled",
    deliveryTime: "N/A",
    rating: null
  },
  {
    orderId: 1004,
    customerName: "Rahul",
    restaurant: "Dosa Corner",
    items: [
      { name: "Masala Dosa", price: 120, quantity: -1 },
      { name: "Filter Coffee", price: 40, quantity: 2 }
    ],
    totalAmount: 80,
    status: "delivered",
    deliveryTime: "20 mins",
    rating: 3.8
  },
  {
    orderId: 1005,
    customerName: "Sneha",
    restaurant: "Chinese Wok",
    items: [
      { name: "Hakka Noodles", price: 160, quantity: 2 },
      { name: "Manchurian", price: 180, quantity: 1 }
    ],
    totalAmount: 500,
    status: "pending",
    deliveryTime: "40 mins",
    rating: null
  },
  {
    orderId: 1006,
    customerName: "Vikram",
    restaurant: "North India Kitchen",
    items: [
      { name: "Butter Chicken", price: 320, quantity: 2 },
      { name: "Naan", price: 40, quantity: 4 }
    ],
    totalAmount: 800,
    status: "cancelled",
    deliveryTime: "N/A",
    rating: null
  },
  {
    orderId: 1007,
    customerName: "Ananya",
    restaurant: "Spice Hub",
    items: [
      { name: "Paneer Tikka", price: 280, quantity: 1 },
      { name: "Dal Makhani", price: 200, quantity: 1 },
      { name: "Roti", price: 30, quantity: 4 }
    ],
    totalAmount: 600,
    status: "delivered",
    deliveryTime: "35 mins",
    rating: 4.8
  },
  {
    orderId: 1008,
    customerName: "Karthik",
    restaurant: "Seafood Shack",
    items: [
      { name: "Fish Curry", price: 350, quantity: 1 },
      { name: "Prawn Fry", price: 400, quantity: -2 }
    ],
    totalAmount: 350,
    status: "delivered",
    deliveryTime: "45 mins",
    rating: 4.2
  },
  {
    orderId: 1009,
    customerName: null,
    restaurant: "Taco Fiesta",
    items: [
      { name: "Beef Tacos", price: 200, quantity: 3 },
      { name: "Nachos", price: 150, quantity: 1 }
    ],
    totalAmount: 750,
    status: "pending",
    deliveryTime: "50 mins",
    rating: null
  },
  {
    orderId: 1010,
    customerName: "Divya",
    restaurant: "Burger King",
    items: [
      { name: "Chicken Wings", price: 250, quantity: 2 },
      { name: "Pepsi", price: 60, quantity: 2 }
    ],
    totalAmount: 620,
    status: "delivered",
    deliveryTime: "28 mins",
    rating: 4.1
  }
];

export default orders;
