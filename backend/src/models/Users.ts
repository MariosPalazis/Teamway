import { Schema, model, connect } from 'mongoose';
import {IUsers} from '../interfaces/schemas'
import mongoose from 'mongoose';

const userSchema = new Schema<IUsers>({
    name: { type: String, required: true },
    points: { type: Number, required: false },
});

export default mongoose.model<IUsers>('users', userSchema);