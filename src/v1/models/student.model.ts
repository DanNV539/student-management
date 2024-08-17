import mongoose, { Document, Schema } from 'mongoose'

export interface IStudent extends Document {
  firstName: string
  lastName: string
  email: string
  dateOfBirth: Date
  grades: Record<string, number>
  enrollmentDate: Date
  courses: mongoose.Types.ObjectId[]
}

const StudentSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dateOfBirth: { type: Date, required: true },
  grades: { type: Map, of: Number },
  enrollmentDate: { type: Date, default: Date.now },
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
})

export default mongoose.model<IStudent>('Student', StudentSchema)
