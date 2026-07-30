import { Router, Response } from 'express';
import { authenticateToken, requireAdmin, requireStudent, AuthRequest } from '../middleware/auth.js';
import { createApplication, getStudentApplications, getAllApplications, updateApplicationStatus } from '../store.js';

const router = Router();

// POST /api/applications (Student: Submit a new application)
router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required.' });
    }

    const { program, gpa, statement } = req.body;
    if (!program || typeof program !== 'string' || !program.trim()) {
      return res.status(400).json({ message: 'Engineering program choice is required.' });
    }

    const application = await createApplication({
      student_id: req.user.userId,
      program: program.trim(),
      gpa: gpa || '3.85',
      statement: statement || '',
    });

    return res.status(201).json({
      message: 'Admission application submitted successfully.',
      application,
    });
  } catch (error) {
    console.error('Application creation error:', error);
    return res.status(500).json({ message: 'Failed to submit admission application.' });
  }
});

// GET /api/applications/my (Student: Get current student's application status)
router.get('/my', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required.' });
    }

    const applications = await getStudentApplications(req.user.userId);
    return res.json({ applications });
  } catch (error) {
    console.error('Fetch student applications error:', error);
    return res.status(500).json({ message: 'Failed to retrieve application status.' });
  }
});

// GET /api/applications (Admin: Retrieve all student applications)
router.get('/', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const applications = await getAllApplications();
    return res.json({ applications });
  } catch (error) {
    console.error('Fetch all applications error:', error);
    return res.status(500).json({ message: 'Failed to retrieve applications.' });
  }
});

// PUT /api/applications/:id/status (Admin: Update application status)
router.put('/:id/status', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Must be pending, approved, or rejected.' });
    }

    const updated = await updateApplicationStatus(id, status as 'pending' | 'approved' | 'rejected');
    if (!updated) {
      return res.status(404).json({ message: 'Application record not found.' });
    }

    return res.json({
      message: `Application status updated to ${status}.`,
      application: updated,
    });
  } catch (error) {
    console.error('Update status error:', error);
    return res.status(500).json({ message: 'Failed to update application status.' });
  }
});

export default router;
