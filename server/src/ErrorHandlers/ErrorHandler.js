const handleDuplicateEntryError = (error, res) => {
    if (error.code === 'ER_DUP_ENTRY') {
        // Extract the conflicting field(s) from the error message
        const duplicateField = extractDuplicateFieldFromErrorMessage(error.message);
        
        // Return a customized error message indicating the conflict
        return res.status(400).json({ status: false, message: `${duplicateField} already exists` });
    } else {
        // Handle other errors
        console.error(error);
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
};

function extractDuplicateFieldFromErrorMessage(errorMessage) {
    // Logic to extract the duplicate field(s) from the error message
    // You may need to parse the error message to determine which field(s) caused the conflict
    // For example, you can use regular expressions or string manipulation to extract relevant information
    // Replace this with your actual logic based on the error message structure
    return "Unknown field"; // Placeholder value
}

module.exports = {
    handleDuplicateEntryError
};
