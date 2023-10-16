import React, { useState, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { updateDoc, doc, onSnapshot, getDoc } from 'firebase/firestore';
import { AiOutlineClose } from 'react-icons/ai';

const SavedMovies = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();

  const sliderLeft = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const sliderRight = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedMovies || []); // Add a conditional check
    });
  }, [user?.email]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const docRef = doc(db, 'users', `${user?.email}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setMovies(docSnap.data()?.savedMovies || []); // Add a conditional check
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    if (user?.email) {
      fetchMovies();
    }
  }, [user?.email]);

  const movieRef = doc(db, 'users', `${user?.email}`);
  const deleteMovie = async (passedID) => {
    try {
      const result = movies.filter((item) => item.id !== passedID);
      await updateDoc(movieRef, {
        savedMovies: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 className="text-white font-bold md:text-xl p-4"> My Favorite List </h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={sliderLeft}
          className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
        <div id={'slider'} className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative">
          {movies.map((item, id) => (
            <div key={id} className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
              <img
                className="w-full h-auto block"
                src={item?.img ? `https://image.tmdb.org/t/p/w500/${item?.img}` : 'URL_TO_DEFAULT_IMAGE'}
                alt={item?.title}
              />
              <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                  {item?.title}
                </p>
                <p onClick={() => deleteMovie(item.id)} className="absolute test-gray-300 top-4 right-4">
                  <AiOutlineClose />
                </p>
              </div>
            </div>
          ))}
        </div>
        <MdChevronRight
          onClick={sliderRight}
          className="bg-white rounded-full right-0 absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
      </div>
    </div>
  );
};

export default SavedMovies;