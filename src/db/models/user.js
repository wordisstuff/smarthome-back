import { model, Schema } from 'mongoose';
export const serializeUser = ({
    name,
    email,
    photo,
    activeTime,
    verifyByEmail,
}) => ({
    name,
    email,
    photo,
    activeTime,
    verifyByEmail,
});

const userSchema = new Schema(
    {
        name: { type: String, default: 'User' },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        photo: { type: String, default: null },
        activeTime: { type: Number, default: '' },
        verifyByEmail: { type: Boolean, default: false },
        token: { type: String, default: null },
        verifyToken: { type: String, default: null },
    },
    { timestamps: true, versionKey: false },
);

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

const User = model('users', userSchema);
export default User;
