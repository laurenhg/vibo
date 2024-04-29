import axios from "axios";


export const fetchAndFilterBooksHome = async (subject, targetBookCount = 25) => {
    try {
        const page = Math.floor(Math.random() * 100) + 1;
        const response = await axios.get('https://openlibrary.org/subjects/' + subject + '.json', {
            params: {
                limit: targetBookCount,
                offset: page * targetBookCount,
            },
        });


        const filteredBooks = response.data.works.filter(book => book.cover_id).slice(0, targetBookCount);

        return filteredBooks.map(book => ({
            cover_id: book.cover_id,
            key: book.key,
            title: book.title,
        }));
    } catch (error) {
        console.error('Error fetching books:', error);
        return [];
    }
};