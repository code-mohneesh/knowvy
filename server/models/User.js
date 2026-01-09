import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['student', 'mentor', 'organization', 'admin'],
            required: true,
        },

        profileCompleted: {
            type: Boolean,
            default: false,
        },
        isApproved: {
            type: Boolean,
            default: false,
        },

        avatar: {
            type: String,
            default: '',
        },
        averageRating: {
            type: Number,
            default: 0
        },
        numReviews: {
            type: Number,
            default: 0
        },
        eventsJoined: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hackathon' // Or Session, unify if possible
        }]
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Virtual for userType to maintain backward compatibility with frontend
userSchema.virtual('userType').get(function () {
    return this.role;
});

// Hash password before saving (only for local auth)
userSchema.pre('save', async function () {
    if (!this.isModified('password') || !this.password) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
    if (!this.password) {
        return false;
    }
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
