import Navbar from './NavBar'; // Corrected import statement
import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig'; 
import { Link } from 'react-router-dom'; // Added import statement for Link
import './Chapters.css';

const Chapters = () => {
    const [chapters, setChapters] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
  
    // Fetch chapters from the database when component mounts
    useEffect(() => {
      const fetchChapters = async () => {
        try {
          const snapshot = await db.collection('Matshwao').get();
          const chaptersData = snapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.id, // Assuming chapter name is stored as the document ID
            // You might need to adjust this depending on your Firestore structure
            // Add other chapter details here if needed
          }));
          setChapters(chaptersData);
        } catch (error) {
          console.error('Error fetching chapters:', error);
        }
      };
      fetchChapters();
    }, []); // Empty dependency array ensures the effect runs only once when component mounts
  
    // Filter chapters based on search query
    const filteredChapters = chapters.filter(chapter =>
        chapter.name && chapter.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
    return (
        <div>
          <Navbar /> {/* Navbar component should be correctly nested */}
          <div className="chapters-container">
            <h1>Chapters</h1>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search"
            />
            <div className="grid-container">
              {filteredChapters.map(chapter => (
                <div key={chapter.id} className="chapter-card">
                    <Link to={`/chapter/${chapter.id}`}> 
                      <h2>{chapter.name}</h2>
                    </Link>
                  {/* Render other chapter details as needed */}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
};

export default Chapters;
