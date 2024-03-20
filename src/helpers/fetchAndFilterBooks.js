import axios from 'axios';

export const fetchAndFilterBooks = async (targetBookCount, setLoading, setButtonText) => {
    setLoading(true);
    setButtonText('Loading...this might take a sec');
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    let page = 1;
    let accumulatedBooks = [];

    try {
        while (accumulatedBooks.length < targetBookCount) {
            const randomSort = Math.random() < 0.5 ? 'random' : 'random1';
            const response = await axios.get('https://openlibrary.org/search.json', {
                params: {
                    q: '*',
                    sort: randomSort,
                    limit: 100,
                    page: page,
                    lang: 'en',
                },
                cancelToken: source.token,
            });

            const newFilteredBooks = response.data.docs.filter(book => book.language && book.language.includes('eng') && book.cover_i);
            accumulatedBooks = [...accumulatedBooks, ...newFilteredBooks];

            if (newFilteredBooks.length === 0 || accumulatedBooks.length >= targetBookCount) break;

            page++;
        }
    } catch (error) {
        if (!axios.isCancel(error)) {
            console.error('Error fetching books:', error);
            setButtonText('Unable to fetch books');
        }
    } finally {
        setLoading(false);
        setButtonText('Show me some titles');
    }

    return accumulatedBooks.slice(0, targetBookCount);
};