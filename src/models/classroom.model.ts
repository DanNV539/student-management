import mongoose, { Document, Schema } from 'mongoose'

export interface IClassroom extends Document {
  roomNumber: string
  building: string
  capacity: number
  courses: mongoose.Types.ObjectId[]
}

const ClassroomSchema: Schema = new Schema({
  roomNumber: { type: String, required: true },
  building: { type: String, required: true },
  capacity: { type: Number, required: true },
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
})

export default mongoose.model<IClassroom>('Classroom', ClassroomSchema)
