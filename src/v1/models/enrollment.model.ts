import mongoose, { Document, Schema } from 'mongoose'

export interface IEnrollment extends Document {
  student: mongoose.Types.ObjectId
  course: mongoose.Types.ObjectId
  enrollmentDate: Date
  status: string // e.g., 'Enrolled', 'Completed', 'Dropped'
}

const EnrollmentSchema: Schema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  enrollmentDate: { type: Date, default: Date.now },
  status: { type: String, required: true }
})

export default mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema)
