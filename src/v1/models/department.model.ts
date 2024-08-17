import mongoose, { Document, Schema } from 'mongoose'

export interface IDepartment extends Document {
  name: string
  code: string
  description: string
  instructors: mongoose.Types.ObjectId[]
}

const DepartmentSchema: Schema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  description: { type: String },
  instructors: [{ type: Schema.Types.ObjectId, ref: 'Instructor' }]
})

export default mongoose.model<IDepartment>('Department', DepartmentSchema)
