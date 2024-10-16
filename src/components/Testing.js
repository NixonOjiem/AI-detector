import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ArtificialInteligenceCheck() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedResult = localStorage.getItem('aiDetectorResult');
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    }
  }, []);

  useEffect(() => {
    if (result) {
      localStorage.setItem('aiDetectorResult', JSON.stringify(result));
    }
  }, [result]);

  const handleClick = async () => {
    setLoading(true);
    try {
      const options = {
        method: 'POST',
        url: 'https://ai-content-detector-ai-gpt.p.rapidapi.com/api/detectText/',
        headers: {
          'x-rapidapi-key': 'ebebcb8e2amsh93b423a4b4a48e9p158944jsnf11091b0d168',
          'x-rapidapi-host': 'ai-content-detector-ai-gpt.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
          text: inputText
        }
      };

      const response = await axios.request(options);
      const resultData = response.data;
      setResult(resultData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <h1 className='App-tittle'>AI Detector</h1>
        <textarea
          className='User -input'
          rows={15}
          placeholder='Type or paste some text to verify whether it is AI generated'
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
      <div>
        <button className='btn-primary' onClick={handleClick}>Check</button>
      </div>
      {loading ? (
        <div className="loading-spinner">
          <svg width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" stroke="#87A1FF" stroke-width="10" stroke-linecap="round" stroke-dasharray="283.916" stroke-dashoffset="283.916" fill="none">
              <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
      ) : result ? (
        <>
          <h2 className='Results-header'>Result:</h2>
          <div className='gradient-cards'>

            {/* ... rest of the code remains the same ... */}