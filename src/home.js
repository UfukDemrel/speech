import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Home() {
    
    const[books, setBooks] = useState([]);

    useEffect(() => {
        fetch('https://www.googleapis.com/books/v1/volumes?q=harry&country=US')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setBooks(data.items);
        })
        .catch(err => console.error(err));
    },[]);

  return (
    <div>
        <div>
            { books.map((book, index) => (
                <div key={index} id={book.id}>
                <div className='flex justify-around text-center items-center mb-6 p-3 background rounded-2xl floating gap-3'>
                    <img alt='alt' className=' rounded-2xl' src={book.volumeInfo.imageLinks.thumbnail} />
                    <div>
                        <div className='font-semibold text-base'>{book.volumeInfo.title}</div>
                        <Link to={`/book/${book.id}`}>
                            <button className='background rounded-lg mt-4 p-2'>Detay</button>
                        </Link>
                    </div>
                </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Home
