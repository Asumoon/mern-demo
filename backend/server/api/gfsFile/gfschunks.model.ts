import * as mongoose from 'mongoose';

import { model, Document, Model, Schema } from 'mongoose';

interface GFSChunks extends Document {};
interface GFSChunksModel extends Model<GFSChunks> {};

export default mongoose.model<GFSChunks, GFSChunksModel>('gfsChunks', new mongoose.Schema({}, {strict: false}), 'fs.chunks' );