export const generateDescription = async (req, res) => {
    const { title, type, property, bedroom, bathroom, size, city, address, amenities } = req.body;

    try {
        // This is a premium template-based generator that mimics AI behavior.
        // In a production environment, you would replace this with an OpenAI API call.

        const introTemplates = [
            `Experience unmatched luxury in this stunning ${bedroom}-bedroom ${property} located in the heart of ${city}.`,
            `Discover the perfect blend of comfort and elegance with this exquisite ${property} at ${address}.`,
            `Set within the prestigious neighborhood of ${city}, this ${property} offers a rare opportunity for sophisticated living.`,
        ];

        const bodyTemplates = [
            `Boasting a spacious ${size} sqft layout, this home features ${bathroom} beautifully designed bathrooms and high-end finishes throughout.`,
            `The meticulously planned ${size} sqft interior includes a sun-drenched living area, ${bedroom} serene bedrooms, and modern ${bathroom} bathrooms.`,
        ];

        const luxuryDetails = [
            "Designed for the modern connoisseur, every corner of this residence exudes quality and style.",
            "From the sleek designer kitchen to the expansive windows offering breathtaking views, no detail has been overlooked.",
        ];

        const closing = `Available for ${type === 'buy' ? 'purchase' : 'lease'} immediately. Contact us today to schedule your private tour of this exceptional ${city} property.`;

        const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

        const generatedText = `
      <p><strong>${title.toUpperCase()}</strong></p>
      <p>${random(introTemplates)}</p>
      <p>${random(bodyTemplates)}</p>
      <p>${random(luxuryDetails)}</p>
      <p>${closing}</p>
    `;

        // Simulate network delay for "AI thinking" effect
        setTimeout(() => {
            res.status(200).json({ description: generatedText });
        }, 1500);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to generate description" });
    }
};
