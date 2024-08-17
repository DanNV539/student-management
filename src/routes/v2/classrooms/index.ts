import { Router } from 'express'
import {
  createClassroom,
  getAllClassrooms,
  getClassroomById,
  updateClassroom,
  deleteClassroom
} from '@/controllers/v2/classroom.controller.js'

const router = Router()

/**
 * @swagger
 * /classrooms:
 *   get:
 *     summary: Get all classrooms
 *     tags: [Classrooms]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order
 *     responses:
 *       200:
 *         description: The list of classrooms
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Classroom'
 *       500:
 *         description: Server error
 */
router.get('/', getAllClassrooms)

/**
 * @swagger
 * /classrooms/{id}:
 *   get:
 *     summary: Get a classroom by ID
 *     tags: [Classrooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the classroom to retrieve
 *     responses:
 *       200:
 *         description: The classroom details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Classroom'
 *       404:
 *         description: Classroom not found
 */
router.get('/:id', getClassroomById)

/**
 * @swagger
 * /classrooms:
 *   post:
 *     summary: Create a new classroom
 *     tags: [Classrooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateClassroomRequest'
 *     responses:
 *       201:
 *         description: The classroom was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Classroom'
 *       500:
 *         description: Server error
 */
router.post('/', createClassroom)

/**
 * @swagger
 * /classrooms/{id}:
 *   put:
 *     summary: Update a classroom by ID
 *     tags: [Classrooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the classroom to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateClassroomRequest'
 *     responses:
 *       200:
 *         description: The classroom was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Classroom'
 *       404:
 *         description: Classroom not found
 *       500:
 *         description: Server error
 */
router.put('/:id', updateClassroom)

/**
 * @swagger
 * /classrooms/{id}:
 *   delete:
 *     summary: Delete a classroom by ID
 *     tags: [Classrooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the classroom to delete
 *     responses:
 *       200:
 *         description: The classroom was successfully deleted
 *       404:
 *         description: Classroom not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', deleteClassroom)

export default router
