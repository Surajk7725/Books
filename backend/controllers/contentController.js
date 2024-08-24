import asyncHandler from 'express-async-handler';
import Content from '../models/content.js';

// Add Content
export const createContent = asyncHandler(async (request, response) => {
  const { id, title, content } = request.body; 
  const { username, fullName } = request.user; 

  const coverImage = request.files?.coverImage ? `/uploads/${request.files.coverImage[0].filename}` : null;
  const iconImage = request.files?.iconImage ? `/uploads/${request.files.iconImage[0].filename}` : null;

  let savedContent;
  if (id) {
    savedContent = await Content.findById(id);

    if (savedContent) {
      savedContent.title = title;
      savedContent.content = content;
      if (coverImage) savedContent.coverImage = coverImage;
      if (iconImage) savedContent.iconImage = iconImage;
      savedContent = await savedContent.save();
    } else {
      response.status(404);
      throw new Error('Content not found');
    }
  } else {
    savedContent = new Content({
      title,
      coverImage,
      iconImage,
      content,
      username,
      fullName,
    });

    savedContent = await savedContent.save();
  }

  response.status(201).json(savedContent);
});

// Publish Document Content
export const publishContent = asyncHandler(async (request, response) => {
    const { id } = request.body; 
    const content = await Content.findById(id);
  
    if (content) {
      content.published = true; 
      await content.save();
      response.json({ message: 'Content published successfully' });
    } else {
      response.status(404);
      throw new Error('Content not found');
    }
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
      await content.remove();
      response.json({ message: 'Content removed' });
    } else {
      response.status(404);
      throw new Error('Content not found');
    }
});