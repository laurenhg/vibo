import localForage from 'localforage';

const bookshelfStore = localForage.createInstance({
    name: "BookshelfDB"
});

export const saveBookshelf = async (books) => {
    try {
        await bookshelfStore.setItem('myBookshelf', books);
        console.log("Bookshelf saved successfully!");
    } catch (error) {
        console.error("Failed to save bookshelf:", error);
    }
};

export const loadBookshelf = async () => {
    try {
        const books = await bookshelfStore.getItem('myBookshelf');
        console.log("Bookshelf loaded:", books);
        return books || [];
    } catch (error) {
        console.error("Failed to load bookshelf:", error);
        return [];
    }
};