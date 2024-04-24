import mongoose from "mongoose";
import TokenSchema from '../schema/TokenSchema';

export default mongoose.model('Token', TokenSchema);