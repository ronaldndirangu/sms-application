const Contact = require('../database/models').Contact;
const Message = require('../database/models').Message;

module.exports = {
  getContact: async (req, res) => {
    try {
      const { id } = req.params;
      const contact = await Contact.findOne({ where: { id }, 
        include : [{
          model: Message,
          as: 'sentMessages',
        }]
      });
      if (!contact) return res.status(404).json({
        error: 'Contact not found!'
      });
      return res.status(200).json({
        message: 'Contact retrieved successfully!',
        contact
      });
    } catch (error) {
      return res.status(500).json({
        error: 'An error occured when trying to retrieved the contact!'
      });
    }
  },
  updateContact: async(req, res) => {
    try {
      const { id } = req.params;
      const updatedContact = await Contact.update(
        {...req.body},
        { 
          returning: true,
          where: { id }
        }
      );
      if (updatedContact[0] === 0) return res.status(404).json({
        error: 'Contact not found!'
      });
      return res.status(201).json({
        message: 'Contact updated successfully!',
        contact: updatedContact
      })
    } catch (error) {
      return res.status(500).json({
        error: 'An error occured when trying to update the contact!'
      });
    }
  },
  deleteContact: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedContact = await Contact.destroy({ returning: true, where: { id }})
      if (!deletedContact) return res.status(404).json({
        error: 'Contact not found!'
      });
      return res.status(200).json({
        message: 'Contact delete successfully!',
        deletedContact
      });
    } catch (error) {
      return res.status(500).json({
        error: 'An error occured when trying to delete the contact!'
      });
    }
  },
  getAllContacts: async (req, res) => {
    try {
      const contacts = await Contact.findAll();
      if (contacts.length < 1) {
        return res.status(200).json({
          message: 'There are no contacts currently'
        });
      }
      return res.status(200).json({
        message: 'Contacts retrieved successfully!',
        contacts
      });
    } catch(error) {
      return res.status(500).json({
        error: 'An error occured when trying to get your contacts!'
      });
    }
  }
}