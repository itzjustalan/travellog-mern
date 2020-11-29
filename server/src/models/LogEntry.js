const mongoose = require('mongoose');

const { Schema } = mongoose;

const requiredString = {
    type: String,
    required: true,
};

const requiredNumber = {
    type: Number,
    required: true,
};

//const defaultRequiredDate = {
//    type: Date,
//    default: Date.now,
//    required: true,
//};

const logEntrySchema = new Schema({
    title: requiredString,
    description: String,
    image: String,
    comments: String,
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 5,
    },
    latitude: {
        ...requiredNumber,
        min: -90,
        max: 90,
    },
    longitude: {
        ...requiredNumber,
        min: -180,
        max: 180,
    },
    visitDate: {
        type: Date,
        required: true,
    }
    //createdAt: defaultRequiredDate,
    //updatedAt: defaultRequiredDate,
}, {
    timestamps: true,
});

//module.exports = logEntrySchema;

const logEntry = mongoose.model('LogEntry', logEntrySchema);

module.exports = logEntry;