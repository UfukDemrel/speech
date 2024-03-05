import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useSpeechSynthesis } from 'react-speech-kit';

function BookDetails() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [reading, setReading] = useState(false);
    const {speak} = useSpeechSynthesis();;

    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setBook(data);
            })
            .catch(err => console.error(err));
    }, [id]);

    if (!book) {
        return <div>Loading...</div>
    }

    const handleSpeak = () => {
        if(!reading){
          speak({text: book?.volumeInfo?.description});
          setReading(true);
        }else{
          window.speechSynthesis.cancel();
          setReading(false);
        }
      }

    return (
        <div>
            <div className='mb-6 p-3 background rounded-2xl gap-3'>
                <div className='flex justify-center mb-6'>
                    {book.volumeInfo.imageLinks && (
                        <img alt='alt' className='w-11/12 rounded-2xl' src={book.volumeInfo.imageLinks.thumbnail} />
                    )}
                </div>
                <div className='text-center'>
                    <div className='font-semibold text-lg'>{book.volumeInfo.title}</div>
                    <Link to={`/book/${book.id}`}>
                        <button className='background rounded-lg mt-4 p-2' onClick={handleSpeak}>{reading ? 'Durdur' : 'Dinle'}</button>
                    </Link>
                </div>
            </div>
            <div className='p-3 background rounded-2xl'>
                <div>Yazar: {book.volumeInfo.authors[0]}</div>
                <div>Yayın Evi: {book.volumeInfo.publisher}</div>
                <div>Tarih: {book.volumeInfo.publishedDate}</div>        
            </div>
        </div>
    )
}
export default BookDetails