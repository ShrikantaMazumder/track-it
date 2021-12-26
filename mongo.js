import mongoose from "mongoose";

const uri = 'mongodb+srv://trackit:waltongf4@cluster0.gbyyk.mongodb.net/trackit?retryWrites=true&w=majority'
const options = {}

const connectWithDB = () => {
    mongoose.connect(uri, options, (err, res) => {
        if(!err) console.log('Connected with DB')
        else console.log(err);
        
    })
}

export default connectWithDB