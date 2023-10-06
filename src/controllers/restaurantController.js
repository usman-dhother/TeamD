exports.addRestaurant = (req, res) => {
    const { name, description, address, phone_number, owner_id, category_id } = req.body;
    const imageUrl = req.file.path; // This will be the path to the uploaded image in the 'uploads' directory

    // Save the restaurant data, including the imageUrl, to your MongoDB database

    // Send a response back to the client
    res.json({ message: 'Restaurant added successfully!', imageUrl: imageUrl });
};
