const generateToken = require('../utils/generateToken').generateToken;
const Contact = require('../database/models').Contact;
const bcrypt = require('bcrypt');

module.exports = {
  signupContact: async (req, res) => {
    try {
      const { name, number, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const contact = await Contact.create({
        name,
        number,
        password: hashedPassword
      });
      return res.status(201).json({
        message: 'Contact successfully created!',
        contact
      })    
    } catch (error) {
      if (error) return res.status(500).json({
        error: 'An error occured when trying to create the contact!'
      });
    }
  },
  signinContact: async (req, res) => {
    try {
      const { number, password } = req.body;
      const contact = await Contact.findOne({
        where: {
          number
        }
      });
      if (!contact) {
        return res.status(404).json({
          error: 'Contact with given number not found!'
        })
      }
      const isValid = await bcrypt.compare(password, contact.password)
      if (isValid) {
        const { id, number, name } = contact;
        const payload = {
          id,
          number,
          name
        }
        const token = generateToken(payload);
        return res.status(200).json({
          message: 'Contact logged in successfully',
          token
        })
      }
      return res.status(401).json({
        error: 'Wrong number or password!'
      });
    } catch (error) {
      if (error) return res.status(500).json({
        error: 'An error occured when trying to log in the contact!'
      });
    }
  }
}