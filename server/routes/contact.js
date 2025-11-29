import express from 'express';
import { body, validationResult } from 'express-validator';
import ContactMessage from '../models/ContactMessage.js';

const router = express.Router();

// POST new contact message
router.post('/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const contactMessage = new ContactMessage(req.body);
      await contactMessage.save();
      
      // TODO: Send email notification here using Nodemailer
      // Example: await sendEmail(contactMessage);
      
      res.status(201).json({
        message: 'Message received successfully',
        data: {
          name: contactMessage.name,
          email: contactMessage.email
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Error submitting message', error: error.message });
    }
  }
);

// GET all contact messages (for admin use)
router.get('/', async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error: error.message });
  }
});

// PATCH mark message as read
router.patch('/:id/read', async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: 'Error updating message', error: error.message });
  }
});

export default router;
