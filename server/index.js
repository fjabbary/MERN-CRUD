const express = require('express')
const app = express();
const PORT = 3001;
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./models/users')

app.use(express.json())
app.use(cors())

mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://user123:!Password123@cluster0.tmyyhqs.mongodb.net/mern-crud-db?retryWrites=true&w=majority')


app.get('/getUsers', (req, res) => {
    UserModel.find({}, (err, result) => {
        res.send(result)
    })
})

app.post('/createUser', async (req, res) => {
    const user = new UserModel(req.body);
    try {
        await user.save();
        res.send(user)
    } catch (error) {
        res.send(error)
    }
})

app.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await UserModel.deleteOne({ _id: id })
})

app.put('/update', (req, res) => {
    const { id, newUsername } = req.body;
    UserModel.findById(id).then((UserModel) => {
        return Object.assign(UserModel, { username: newUsername });
    }).then((UserModel) => {
        return UserModel.save();
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
