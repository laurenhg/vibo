import axios from "axios";

// Fetches a list of books based on the subject. This function now purely focuses on fetching data.
export const fetchAndFilterBooks = async (subject, targetBookCount = 25) => {
    try {
        // Using a fixed page for simplicity, consider implementing a more dynamic approach for actual randomness
        const page = Math.floor(Math.random() * 100) + 1;
        const response = await axios.get('https://openlibrary.org/subjects/' + subject + '.json', {
            params: {
                limit: targetBookCount,
                offset: page * targetBookCount, // Simple attempt to randomize results
            },
        });

        // Filter to ensure each book has a cover image
        const filteredBooks = response.data.works.filter(book => book.cover_id).slice(0, targetBookCount);

        return filteredBooks.map(book => ({
            cover_id: book.cover_id,
            key: book.key,
            title: book.title,
        }));
    } catch (error) {
        console.error('Error fetching books:', error);
        return []; // Return an empty array in case of error
    }
};