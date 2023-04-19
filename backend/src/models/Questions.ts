import { Schema, model, connect } from 'mongoose';
import {IQuestion, IAnswer} from '../interfaces/schemas'
import mongoose from 'mongoose';

const questionSchema = new Schema<IQuestion>({
    question: { type: String, required: true },
    answers: [{
        text: { type: String, required: true },
        points: { type: Number, required: true },
    }]

});

export default mongoose.model<IQuestion>('questions', questionSchema);