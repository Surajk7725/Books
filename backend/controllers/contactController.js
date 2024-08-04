import Contact from '../models/contact.js';

// Create a new contact
export const createContact = asyncHandler (async (request, response) => {
    try {
        const {fullName, phoneNumber, email, message} = request.body;
        const newContact = new Contact({fullName, phoneNumber, email, message});
        await newContact.save();
        response.status(201).json({message:"Issue Created", contact:newContact});
    } catch (error) {
        response.status(400).json({message:"Server Error", error: error.message});
    }
});

// Display all contacts

export const getAllContacts = asyncHandler(async(request, response) => {
    try {
        const allcontacts = await Contact.find();
        response.status(200).json(allcontacts);
    } catch(error) {
        response.status(400).json({message:"Server Error", error:error.message});
    }
});