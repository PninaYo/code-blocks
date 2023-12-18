const CodeBlock = require("../models/codeBlock");

exports.getTitles = async (req, res) => {
    try {
        const titles = await CodeBlock.find().select('title');
        if (!titles) {
            return res.status(404).json({ message: 'Titles not found' });
        }
        res.status(200).json({ titles: titles });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getCodeBlock = async (req, res) => {
    const { title } = req.params;
    try {
        const codeBlock = await CodeBlock.findOne({ title });
        if (!codeBlock) {
            return res.status(404).json({ message: 'Code block not found' });
        }
        // Send only code to the client
        const { code } = codeBlock;
        res.status(200).json({ code });
    } catch (error) {
        console.error('Error retrieving code block:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

