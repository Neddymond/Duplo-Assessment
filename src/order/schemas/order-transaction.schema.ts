import * as mongoose from 'mongoose';
const { Schema } = mongoose;

export const OrderTransactionSchema = new Schema({
    amount: { type: Number, required: true },
    taxAmount: { type: Number, required: true },
    currency: { type: String, required: true },
    category: String,
    transactionId: { type: String, required: true },
    paymentChannel: { type: String, required: true, default: 'digital' },
    business: {
        id: { type: String, required: true },
        name: { type: String, required: true },
        location: String,
    },
}, { timestamps: true });

OrderTransactionSchema.index( { '$**': 'text' } );

export interface Business {
    id: string,
    name: string
}

export interface OrderTransaction extends mongoose.Document {
    amount: number;
    taxAmount: number;
    currency: string;
    category?: string;
    transactionId: string;
    paymentChannel: string;
    business: Business;
}
