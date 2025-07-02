import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { getAuth } from "firebase/auth";
import usePageTitle from "../../PageTitle/PageTitle";
import Container from "../../Container/Container";

const WishList = () => {
  usePageTitle("Wishlist");

  const [wishlist, setWishlist] = useState([]);
  const [showFull, setShowFull] = useState({});

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const token = await user.getIdToken();

          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/wishlist`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setWishlist(res.data);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#15961e",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const token = await user.getIdToken();

          await axios.delete(`${import.meta.env.VITE_API_URL}/wishlist/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          Swal.fire(
            "Deleted!",
            "Your blog has been removed from wishlist.",
            "success"
          );
          setWishlist((prev) => prev.filter((blog) => blog._id !== id));
        }
      } catch (err) {
        Swal.fire("Error!", "Something went wrong.", "error");
        console.error("Error deleting wishlist item:", err);
      }
    }
  };

  const toggleShowFull = (id) => {
    setShowFull((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="bg-gray-100 py-20">
      <Container>
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            My Wishlist
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Here are the blogs you've saved to revisit later. Dive in, explore,
            or remove items you no longer need.
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="mx-auto bg-white border border-gray-200 rounded-xl shadow-md p-6 lg:py-16 text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
              alt="Empty Wishlist"
              className="w-24 h-24 mx-auto mb-4 opacity-80"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              You didn’t save any blogs yet
            </h3>
            <p className="text-gray-600 text-sm">
              Start exploring and add blogs you love to your wishlist!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((blog) => (
              <div
                key={blog._id}
                className="max-w-md mx-auto bg-gradient-to-br from-white/90 to-gray-100 backdrop-blur-md border border-gray-200 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
              >
                <img
                  className="w-full h-48 object-cover rounded-t-xl"
                  src={blog.imageURL}
                  alt="Blog Banner"
                />

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
                      {blog.category}
                    </span>
                    <span>{blog.date}</span>
                  </div>

                  <h2 className="text-xl font-semibold text-gray-800 mb-1 hover:text-blue-600 transition">
                    {blog.title}
                  </h2>

                  <p
                    className={`text-gray-600 text-sm leading-relaxed ${
                      showFull[blog._id] ? "" : "line-clamp-3"
                    }`}
                  >
                    {showFull[blog._id]
                      ? blog.longDescription
                      : blog.shortDescription}
                  </p>

                  {/* Buttons pinned bottom */}
                  <div className="mt-auto pt-4 flex flex-wrap gap-2 text-sm font-semibold">
                    <button
                      onClick={() => toggleShowFull(blog._id)}
                      className={`flex-1 h-9 rounded-lg border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 ${
                        showFull[blog._id]
                          ? "bg-blue-500 text-white hover:bg-blue-600"
                          : "text-blue-600 bg-white/70 hover:bg-blue-500 hover:text-white"
                      }`}
                    >
                      {showFull[blog._id] ? "Hide" : "Read"}
                    </button>

                    <button className="flex-1 h-9 rounded-lg border border-emerald-500 text-emerald-600 bg-white/70 hover:bg-emerald-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 transition">
                      Details
                    </button>

                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="flex-1 h-9 rounded-lg border border-red-500 text-red-500 bg-white/70 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default WishList;
