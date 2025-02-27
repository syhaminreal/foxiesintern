import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String, // Can be used to filter by product category
      required: true,
      enum: ["Electronics", "Clothing", "Accessories", "Home", "Sports", "Beauty"], // Example categories
    },
    image: {
      type: String, // URL of the product image (could be stored on Cloudinary or any storage)
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0, // Number of items in stock
    },
    sold: {
      type: Number,
      default: 0, // Track number of units sold
    },
    tags: {
      type: [String], // Array of strings to hold tags/keywords
      default: [], // Tags like ['gaming', 'laptop', '2023']
    },
    isActive: {
      type: Boolean,
      default: true, // If the product is active or discontinued
    },
   
  },
  {
    timestamps: true,
  }
);

//aggregate piplines
productSchema.plugin(mongooseAggregatePaginate)

// // Optional: Indexing for better search performance on tags, name, and description
// productSchema.index({ name: "text", description: "text", category: 1, tags: 1 });

// // Method to update sales count
// productSchema.methods.incrementSales = function (quantity) {
//   this.sold += quantity;
//   this.stock -= quantity;
//   this.updatedAt = Date.now(); // Updating the timestamp
//   return this.save();
// };

export const Product = mongoose.model("Product", productSchema);
