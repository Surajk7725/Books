import mongoose from 'mongoose';

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.log('Error Connecting To MongoDB',error);
        process.exit(1);
    }
};

export default connectDB;