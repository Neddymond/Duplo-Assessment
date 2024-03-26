import * as mongoose from 'mongoose';
const { Schema } = mongoose;

export const AccountSchema = new Schema({
    credit: { type: Number, required: true },
    debit: { type: Number, required: true },
    debt: { type: Number, required: true },
    revene: { type: Number, required: true },
    business: {
        id: { type: String, required: true },
        name: { type: String, required: true }
    },
    location: String,
}, { timestamps: true });

AccountSchema.index( { '$**': 'text' } );

export interface Business {
    id: string,
    name: string
}

export interface Account extends mongoose.Document {
    credit: number;
    debit: number;
    debt: number;
    revenue?: number;
    business: Business;
    
}
