import React, { useEffect, useState } from "react";

const Scrolling = () => {
  let [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}`)
      .then((res) => res.json())
      .then((result) => {
        setPosts([...posts, ...result]);
        setLoading(false);
      });
  }, [page]);
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight
    ) {
        setLoading(true)
      setPage((prev) => prev + 1);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
  return (
    <div>
      {posts.map((elem) => {
        return (
          <h3 key={elem.id}>
            {elem.id}-{elem.title}
          </h3>
        );
      })}
      <div>
        {loading && <h3>Loading....</h3>}
      </div>
    </div>
  );
};

export default Scrolling;
