import mongoose from "mongoose";

let isConnected = false;        //tracking connection

export const connectToDb = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log("MongoDB is already connected");
        return;
    }

    try {
        await mongoose.connect("mongodb+srv://misirat:LkZNmT-je3sP-jK@cluster0.qy4nl1b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
            dbName: 'db_plot_forge',
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        isConnected = true;

        console.log("MongoDB connected!");
    } catch (error) {
        console.log(error);
    }
}
