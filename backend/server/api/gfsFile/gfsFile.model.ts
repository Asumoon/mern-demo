import * as mongoose from 'mongoose';
import { model, Document, Model, Schema } from 'mongoose';

interface GFSFiles extends Document {};
interface GFSFilesModel extends Model<GFSFiles> {};

export default mongoose.model<GFSFiles, GFSFilesModel>('GFS', new mongoose.Schema({}, {strict: false}), 'fs.files' );