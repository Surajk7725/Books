import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    coverImage: { type: String, default: null },
    iconImage: { type: String, default: null },
    content: { type: String, required: true },
    username: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  
    fullName: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    published: {type: Boolean,default: false},
    stars: { type: Number, default: 0 },
    comments: { type: String, default: '' },
    status: { type: Boolean, default: false }
}, { timestamps: true });

const Content = mongoose.model('Content', contentSchema);

export default Content;
