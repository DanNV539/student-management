import mongoose, { Document, Schema } from 'mongoose'

export interface ICourse extends Document {
  name: string
  code: string
  description: string
  credits: number
  students: mongoose.Types.ObjectId[]
  instructor: mongoose.Types.ObjectId
}

const CourseSchema: Schema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  description: { type: String },
  credits: { type: Number, required: true },
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  instructor: { type: Schema.Types.ObjectId, ref: 'Instructor' }
})

export default mongoose.model<ICourse>('Course', CourseSchema)
