import mongoose, {ConnectOptions} from 'mongoose'

export default async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URL as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
    )
    console.log('MongoDB connected')
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}
