import dotenv from 'dotenv';
import app from './app';
dotenv.config()

const port = process.env.PORT;
app
app.listen(port, () => {
    console.log(`App is running on ${port}`);
})


