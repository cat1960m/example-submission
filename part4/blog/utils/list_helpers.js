const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const sum = blogs.reduce((result, current) => {
    return result + current.likes;
  }, 0);

  return sum;
};

const favoriteBlog = (blogs) => {
  if (!blogs.length) {
    return null;
  }

  const favorite = blogs.reduce((result, current) => {
    if (current.likes > result.likes) {
      return current;
    }
    return result;
  }, blogs[0]);


  return favorite;
};

const mostBlogs = (blogs) => {
  if (!blogs.length) {
    return null;
  }
  const authorBlogs = [];

  blogs.forEach((blog) => {
    const index = authorBlogs.findIndex((item) => item.author === blog.author);

    if (index >= 0) {
      authorBlogs[index].blogs++;
    } else {
      authorBlogs.push({
        author: blog.author,
        blogs: 1,
      });
    }
  });

  const favorite = authorBlogs.reduce((result, current) => {
    if (current.blogs > result.blogs) {
      return current;
    }
    return result;
  }, authorBlogs[0]);

  return favorite;
};

const mostLikes = (blogs) => {
  if (!blogs.length) {
    return null;
  }
  const authorLikes = [];

  blogs.forEach((blog) => {
    const index = authorLikes.findIndex((item) => item.author === blog.author);

    if (index >= 0) {
      authorLikes[index].likes += blog.likes;
    } else {
      authorLikes.push({
        author: blog.author,
        likes: blog.likes,
      });
    }
  });

  const favorite = authorLikes.reduce((result, current) => {
    if (current.likes > result.likes) {
      return current;
    }
    return result;
  }, authorLikes[0]);

  return favorite;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
