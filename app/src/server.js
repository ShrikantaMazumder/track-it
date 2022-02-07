import dotenv from 'dotenv';
import app from './app';
import connectWithDB from './mongo';
dotenv.config()

const port = process.env.PORT;
app
app.listen(port, () => {
    connectWithDB()
    console.log(`App is running on ${port}`);
})


