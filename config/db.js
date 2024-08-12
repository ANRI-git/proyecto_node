// MongoDB Atlas connection
import mongoose from 'mongoose';

const db_uri = process.env.db_uri;

mongoose.connect(db_uri);
