import mongoose, { Document, Schema } from 'mongoose'

export interface IInstructor extends Document {
  firstName: string
  lastName: string
  email: string
  department: string
  courses: mongoose.Types.ObjectId[]
}

const InstructorSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  department: { type: String },
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
})

export default mongoose.model<IInstructor>('Instructor', InstructorSchema)
