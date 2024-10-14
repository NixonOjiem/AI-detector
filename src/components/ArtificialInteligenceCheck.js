import React, { useState } from 'react';
import axios from 'axios';

function ArtificialInteligenceCheck() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState(null);

  const handleClick = async () => {
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
    }
  };

  return (
    <>    
      <div>
        <h1 className='App-tittle'>AI Detector</h1>
        <textarea
          className='User-input'
          rows={15}
          placeholder='Type or paste some text to verify whether it is AI generated'
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
      <div>
        <button className='btn-primary' onClick={handleClick}>Check</button>
      </div>
      {result && (
        <div>
          <h2>Result:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
          {}
        </div>
      )}
    </>
  );
}

export default ArtificialInteligenceCheck;