const { bucket } = require('../config/firebaseAdmin');

async function uploadImage(req, res) {
    try {
        // Assuming you receive the image file in the request body
        const { file } = req.body;

        if (!file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        // Generate a unique filename for the image (you can use a UUID library)
        const uniqueFilename = generateUniqueFilename(file.originalname);

        // Specify the destination path in Firebase Storage
        const destinationPath = `restaurant-images/${uniqueFilename}`;

        // Create a write stream to Firebase Storage
        const fileStream = bucket.file(destinationPath).createWriteStream({
            metadata: {
                contentType: file.mimetype,
            },
        });

        // Handle errors during the upload process
        fileStream.on('error', (error) => {
            console.error('Error uploading image:', error);
            res.status(500).json({ error: 'Failed to upload image' });
        });

        // Handle successful upload
        fileStream.on('finish', () => {
            // Construct the public URL for the uploaded image
            const imageUrl = `https://storage.googleapis.com/maristhungerexpress.appspot.com/${destinationPath}`;

            // You can now save the `imageUrl` to your database or respond to the client
            res.status(201).json({ imageUrl });
        });

        // Pipe the image file to the Firebase Storage write stream
        file.pipe(fileStream);
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
}

// Function to generate a unique filename (you can use a UUID library)
function generateUniqueFilename(originalFilename) {
    // Generate a unique filename based on the original filename
    // You can use a UUID library or any other method to ensure uniqueness
    const uniqueId = generateUniqueIdSomehow(); // Implement this function
    const fileExtension = getFileExtension(originalFilename);
    return `${uniqueId}.${fileExtension}`;
}

// Function to extract file extension from a filename
function getFileExtension(filename) {
    return filename.split('.').pop();
}

module.exports = { uploadImage };
