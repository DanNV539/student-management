import mongoose, { Document, Schema } from 'mongoose'

export interface IGrade extends Document {
  student: mongoose.Types.ObjectId
  course: mongoose.Types.ObjectId
  grade: number
  dateRecorded: Date
}

const GradeSchema: Schema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  grade: { type: Number, required: true },
  dateRecorded: { type: Date, default: Date.now }
})

export default mongoose.model<IGrade>('Grade', GradeSchema)
