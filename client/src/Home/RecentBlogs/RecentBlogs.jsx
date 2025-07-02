import axios from "axios";
import React, { useEffect, useState } from "react";
import RecentBlogCards from "../../Pages/RecentBlogCards/RecentBlogCards";
import toast from "react-hot-toast";
import { getAuth } from "firebase/auth";
import Container from "../../Container/Container";

const RecentBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/blogsdata`)
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error(err));
  }, []);

  const addToWishlist = async (blog) => {
    const token = await auth.currentUser.getIdToken();
    const alreadyAdded = wishlist.find((item) => item._id === blog._id);
    if (alreadyAdded) {
      toast.error("Already added in Wishlist");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/wishlist`, blog, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Successfully added in Wishlist");
      setWishlist([...wishlist, blog]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="bg-gray-100 py-20">
      <Container>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Recent Blogs</h2>
          <p className="text-gray-600">
            Stay updated with the latest trends and insights in the dev world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <RecentBlogCards
              key={blog._id}
              blog={blog}
              addToWishlist={addToWishlist}
              wishlist={wishlist}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default RecentBlogs;
