export const updateCacheBooks = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByTitleAuthor = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.title + "____" + item.author.name;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, (data) => {
    console.log("data uniqByTitleAuthor--------", data);
    if (!data) {
      return;
    }
    const allBooks = data.allBooks;
    return {
      allBooks: uniqByTitleAuthor(allBooks.concat(addedBook)),
    };
  });
};

export   const clearCacheItem = (
    cache,
    fieldName, //not query -inner name!!
    args
  ) => {
    cache.evict({
      fieldName, //not query -inner name!!
      args,
    });

    cache.gc(); // Garbage collect unused cache entries
  };


export const updateCacheAuthors = (cache, query, addedBookAuthorName) => {
  // helper that is used to eliminate saving same person twice

  cache.updateQuery(query, (data) => {
   
    const allAuthors = data.allAuthors;
     console.log("data updateCacheAuthors--------allAuthors", allAuthors);
    if (!allAuthors?.find((author) => author.name === addedBookAuthorName)) {
      console.log("---clear cash authors")
      clearCacheItem(cache, "allAuthors")
    }
  });
};

export const updateCacheDeleteBook = (cache, query, bookId) => {
  cache.updateQuery(query, (data) => {
    const allBooks = data.allBooks;
     console.log("data updateCacheDeleteBook--------allBooks", allBooks);
      return {
        allBooks: allBooks.filter(book => book.id !== bookId),
      };
  });
}
