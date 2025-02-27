import mongoose, { Schema } from "mongoose";

// Define the schema for cart
const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model (assuming you have a User model)
      required: true,
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product", // Reference to the Product model (assuming you have a Product model)
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1, // Minimum 1 product per cart item
        },
        price: {
          type: Number,
          required: true,
        },
        totalPrice: {
          type: Number,
          required: true,
          default: function () {
            return this.price * this.quantity; // Automatically calculate total price for each item
          },
        },
      },
    ],
    total: {
      type: Number,
      default: 0, // The total cost of all items in the cart
    },
    status: {
      type: String,
      enum: ["active", "purchased", "abandoned"], // Cart status: active, purchased, or abandoned
      default: "active",
    },
  },
  { timestamps: true } // This will add `createdAt` and `updatedAt` fields to your schema
);

// // Method to update the cart's total price
// cartSchema.methods.updateTotal = function () {
//   this.total = this.items.reduce((acc, item) => acc + item.totalPrice, 0); // Recalculate the total price
//   return this.save();
// };

// // Method to add an item to the cart
// cartSchema.methods.addToCart = function (productId, quantity) {
//   const productIndex = this.items.findIndex(
//     (item) => item.product.toString() === productId.toString()
//   );

//   if (productIndex !== -1) {
//     // If product exists, update the quantity and recalculate the total price
//     this.items[productIndex].quantity += quantity;
//     this.items[productIndex].totalPrice = this.items[productIndex].price * this.items[productIndex].quantity;
//   } else {
//     // If product doesn't exist, add a new item to the cart
//     this.items.push({
//       product: productId,
//       quantity,
//       price: 100, // For example, you can fetch the product price from the Product model
//       totalPrice: 100 * quantity, // Calculate total price for this product
//     });
//   }

//   return this.updateTotal();
// };

// // Method to remove an item from the cart
// cartSchema.methods.removeFromCart = function (productId) {
//   this.items = this.items.filter(
//     (item) => item.product.toString() !== productId.toString()
//   );
//   return this.updateTotal();
// };

// Export the Cart model
export const Cart = mongoose.model("Cart", cartSchema);
