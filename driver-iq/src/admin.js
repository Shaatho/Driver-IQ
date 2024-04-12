import React, { useState } from 'react';
import { app, db, firebase } from './firebaseConfig'; // Import app, db, and firebase from firebaseConfig
import './admin.css'; // Import CSS file

const matshwaoCollection = db.collection('Matshwao');

const Admin = () => {
  const [chapterName, setChapterName] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [answer, setAnswer] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleAddChapter = (event) => {
    event.preventDefault(); // Prevent the page reload
    if (chapterName.trim() !== '') {
      db.collection('Matshwao')
        .doc(chapterName)
        .set({})
        .then(() => {
          console.log('Chapter added successfully!');
          setChapterName('');
        })
        .catch((error) => {
          console.error('Error adding chapter: ', error);
        });
    } else {
      console.error('Chapter name cannot be empty!');
    }
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    const questionData = {
      question: question,
      options: options,
      answer: (parseInt(answer)).toString(), // Convert back to string
    };

    if (imageFile) {
      // Upload image to Firebase Storage
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(imageFile.name);
      imageRef.put(imageFile)
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => {
          questionData.imageURL = url;
          addQuestionToFirestore(questionData);
        })
        .catch((error) => {
          console.error('Error uploading image: ', error);
        });
    } else {
      addQuestionToFirestore(questionData);
    }
  };

  const addQuestionToFirestore = (questionData) => {
    matshwaoCollection
      .doc(chapterName)
      .collection('Questions')
      .add(questionData)
      .then(() => {
        console.log('Question added successfully!');
      })
      .catch((error) => {
        console.error('Error adding question: ', error);
      });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <div className="admin-container">
      <h1>Add Chapters and Questions</h1>
      <div className="chapter-form">
        <input
          type="text"
          value={chapterName}
          required
          onChange={(e) => setChapterName(e.target.value)}
          placeholder="Chapter Name"
        />
        <button onClick={(event) => handleAddChapter(event)}>Add Chapter</button>
      </div>
      <div className="question-form">
        <h2>Add Question</h2>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Question"
        />
        {/* Image upload input field */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            placeholder={`Option ${index}`}
          />
        ))}
        <select value={answer} onChange={(e) => setAnswer(e.target.value)} defaultValue={answer}>
          {options.map((option, index) => (
            <option key={index} value={index}>
              Option {index}
            </option>
          ))}
        </select>
        <button onClick={handleAddQuestion}>Add Question</button>
      </div>
    </div>
  );
};

export default Admin;
