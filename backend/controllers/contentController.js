import asyncHandler from 'express-async-handler';
import Content from '../models/content.js';

// Add Content
export const createContent = asyncHandler(async (request, response) => {
    const { title, content } = request.body;
    const { username, fullName } = request.user;  // Assuming req.user is populated by authentication middleware

    const coverImage = request.files.coverImage ? `/uploads/${request.files.coverImage[0].filename}` : null;
    const iconImage = request.files.iconImage ? `/uploads/${request.files.iconImage[0].filename}` : null;

    const newContent = new Content({
        title,
        coverImage,
        iconImage,
        content,
        username,    
        fullName     
    });

    const createdContent = await newContent.save();
    response.status(201).json(createdContent);
});

// Display All Contents
export const displayAllContents = asyncHandler(async (request, response) => {
    const contents = await Content.find({})
        .populate('username', 'username') 
        .populate('fullName', 'fullName'); 
    response.json(contents);
});

// Display Particular Content
export const displayParticularContent = asyncHandler(async (request, response) => {
    const content = await Content.findById(request.params.id)
        .populate('username', 'username') 
        .populate('fullName', 'fullName'); 

    if (content) {
        response.json(content);
    } else {
        response.status(404);
        throw new Error('Content not found');
    }
});

// Update Feedback
export const updateFeedback = asyncHandler(async (request, response) => {
    const { stars, comments, status } = request.body;
    const content = await Content.findById(request.params.id);

    if (content) {
        content.stars = stars;
        content.comments = comments;
        content.status = status;

        const updatedContent = await content.save();
        response.json(updatedContent);
    } else {
        response.status(404);
        throw new Error('Content not found');
    }
});

// Delete Content
export const deleteContent = asyncHandler(async (request, response) => {
    const content = await Content.findById(request.params.id);

    if (content) {
        // Optional: Check if the user is allowed to delete this content
        // if (content.username.toString() !== request.user._id.toString()) {
        //     response.status(403);
        //     throw new Error('You do not have permission to delete this content');
        // }

        await content.remove();
        response.json({ message: 'Content removed' });
    } else {
        response.status(404);
        throw new Error('Content not found');
    }
});
