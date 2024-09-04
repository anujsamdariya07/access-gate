import mongoose from "mongoose";

export async function connectDB() {
  try {
    mongoose.connect(process.env.MONGO_URI!)
    const connection = mongoose.connection
    // Read about these events
    connection.on('connected', () => {
      console.log('Mongo DB Connected!')
    })
    connection.on('error', (err) => {
      console.log('Mongo DB Connection Error!')
      console.log('Please make sure db is up and running!' + err)
      // Learn how to exit using exit code
      process.exit()
    })
  } catch (error) {
    console.log(`Something went wrong in connecting to DB...`)
    console.log(error);
  }
}
