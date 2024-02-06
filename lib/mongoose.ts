// lib/mongoose.ts
import mongoose from "mongoose";

// // const MONGODB_URI =
// //   "mongodb+srv://astabidasaaa:107MongodbSangs@votesss.vhmzrgn.mongodb.net/?retryWrites=true&w=majority";

// const mongodbURI: string = process.env.MONGODB_URI as string;

// const dbConnect = async () => {
//   try {
//     await mongoose.connect(mongodbURI);
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
// };

// export default dbConnect;

// lib/mongoose.ts
// import mongoose from "mongoose";

const MONGODB_URI: string = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    // const opts: {
    //   useNewUrlParser: boolean;
    //   useUnifiedTopology: boolean;
    // } = {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // };

    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
