import mongoose from "mongoose";

const UserSchema = new mongoose.Schema ( { //Рисуем схему дял юзеров
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post", //на какую строку будем ссылаться
        },
    ],
},
    {timestamps: true}, //видно время поста
)

export default mongoose.model('User', UserSchema)  // Схема создана