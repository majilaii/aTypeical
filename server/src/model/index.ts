'use strict';
import mongoose from 'mongoose';

const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/';
const DATABASE_NAME = process.env.DATABASE_NAME || 'Users';

mongoose.connect( `${DATABASE_URL}${DATABASE_NAME}`);

export default mongoose;
