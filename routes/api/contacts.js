const express = require('express');
const contact = require('../../controllers/contacts');
const { validateBody, authenticate } = require("../../middlewars");
const { schemas } = require("../../models/contact");
const { ctrlWrapper } = require("../../helpers");

const router = express.Router();


router.get('/',authenticate, ctrlWrapper(contact.listContacts));

router.get('/:contactId',authenticate, ctrlWrapper(contact.getContactById));

router.post('/',authenticate, validateBody(schemas.addSchema), ctrlWrapper(contact.addContact));

router.put('/:contactId',authenticate, validateBody(schemas.addSchema), ctrlWrapper(contact.updateContact));

router.patch('/:contactId/favorite',authenticate, validateBody(schemas.updateFavoriteSchema), ctrlWrapper(contact.upddateFavorite));

router.delete('/:contactId',authenticate, ctrlWrapper(contact.removeContact));

module.exports = router
