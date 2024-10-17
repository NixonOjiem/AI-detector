import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';

function ArtificialInteligenceCheck() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

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
    await new Promise(resolve => setTimeout(resolve, 100)); // Small delay for debugging
    console.log('Loading state', loading)
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
      {loading ? (
        <div className="loading-spinner">
          <svg width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" stroke="#87A1FF" strokeWidth="10" strokeLinecap="round" strokeDasharray="283.916" strokeDashoffset="283.916" fill="none">
              <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="2s" repeatCount="indefinite" />
            </circle>
            <LoadingSpinner />
          </svg>
          <h2 className='Results-header'>Loading...</h2>
        </div>
      ) : result ? (
        <>
          <h2 className='Results-header'>Result:</h2>
          <div className='gradient-cards'>

          <div className="card">
            <div className="container-card bg-yellow-box">
              <svg width="80" height="80" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className='SVG'>
                <rect x="1" y="1" width="118" height="118" rx="24" fill="url(#paint0_linear_1366_4557)" fill-opacity="0.15" stroke="url(#paint1_radial_1366_4557)" stroke-width="2"></rect>
                <path d="M74.2105 36C73.373 36 72.5698 35.6839 71.9776 35.1213C71.3853 34.5587 71.0526 33.7956 71.0526 33C71.0526 32.2044 71.3853 31.4413 71.9776 30.8787C72.5698 30.3161 73.373 30 74.2105 30H86.8421C87.6796 30 88.4829 30.3161 89.0751 30.8787C89.6673 31.4413 90 32.2044 90 33V45C90 45.7956 89.6673 46.5587 89.0751 47.1213C88.4829 47.6839 87.6796 48 86.8421 48C86.0046 48 85.2014 47.6839 84.6091 47.1213C84.0169 46.5587 83.6842 45.7956 83.6842 45V40.242L65.3905 57.621C64.7983 58.1834 63.9953 58.4994 63.1579 58.4994C62.3205 58.4994 61.5175 58.1834 60.9253 57.621L52.1053 49.242L35.3905 65.121C34.7949 65.6675 33.9972 65.9699 33.1693 65.963C32.3413 65.9562 31.5492 65.6407 30.9637 65.0845C30.3782 64.5282 30.0461 63.7758 30.0389 62.9892C30.0317 62.2026 30.35 61.4448 30.9253 60.879L49.8726 42.879C50.4648 42.3166 51.2679 42.0006 52.1053 42.0006C52.9426 42.0006 53.7457 42.3166 54.3379 42.879L63.1579 51.258L79.219 36H74.2105ZM36.3158 78V87C36.3158 87.7957 35.9831 88.5587 35.3909 89.1213C34.7986 89.6839 33.9954 90 33.1579 90C32.3204 90 31.5171 89.6839 30.9249 89.1213C30.3327 88.5587 30 87.7957 30 87V78C30 77.2043 30.3327 76.4413 30.9249 75.8787C31.5171 75.3161 32.3204 75 33.1579 75C33.9954 75 34.7986 75.3161 35.3909 75.8787C35.9831 76.4413 36.3158 77.2043 36.3158 78ZM52.1053 66C52.1053 65.2043 51.7726 64.4413 51.1803 63.8787C50.5881 63.3161 49.7849 63 48.9474 63C48.1098 63 47.3066 63.3161 46.7144 63.8787C46.1222 64.4413 45.7895 65.2043 45.7895 66V87C45.7895 87.7957 46.1222 88.5587 46.7144 89.1213C47.3066 89.6839 48.1098 90 48.9474 90C49.7849 90 50.5881 89.6839 51.1803 89.1213C51.7726 88.5587 52.1053 87.7957 52.1053 87V66ZM64.7368 69C65.5744 69 66.3776 69.3161 66.9698 69.8787C67.562 70.4413 67.8947 71.2043 67.8947 72V87C67.8947 87.7957 67.562 88.5587 66.9698 89.1213C66.3776 89.6839 65.5744 90 64.7368 90C63.8993 90 63.0961 89.6839 62.5039 89.1213C61.9117 88.5587 61.5789 87.7957 61.5789 87V72C61.5789 71.2043 61.9117 70.4413 62.5039 69.8787C63.0961 69.3161 63.8993 69 64.7368 69ZM83.6842 57C83.6842 56.2044 83.3515 55.4413 82.7593 54.8787C82.1671 54.3161 81.3638 54 80.5263 54C79.6888 54 78.8856 54.3161 78.2933 54.8787C77.7011 55.4413 77.3684 56.2044 77.3684 57V87C77.3684 87.7957 77.7011 88.5587 78.2933 89.1213C78.8856 89.6839 79.6888 90 80.5263 90C81.3638 90 82.1671 89.6839 82.7593 89.1213C83.3515 88.5587 83.6842 87.7957 83.6842 87V57Z" fill="#FFEE24"></path>
                <defs>
                  <linearGradient id="paint0_linear_1366_4557" x1="-0.0208152" y1="-0.102528" x2="119.899" y2="119.817" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FFE34B" stop-opacity="0.7"></stop>
                    <stop offset="0.510417" stop-color="#FFE34B" stop-opacity="0"></stop>
                    <stop offset="1" stop-color="#FFE34B" stop-opacity="0.7"></stop>
                  </linearGradient>
                  <radialGradient id="paint1_radial_1366_4557" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(60 60) rotate(96.8574) scale(122.674 149.921)">
                    <stop stop-color="#FFEE24"></stop>
                    <stop offset="1" stop-color="#302A1A" stop-opacity="0.2"></stop>
                  </radialGradient>
                </defs>
              </svg> <br />
              <p className="card-title">Total Words:</p>
              <p1 className="card-description">{result.textWords}</p1>
            </div>
         </div>

            <div className="card">
            <div className="container-card bg-yellow-box">
              <svg width="80" height="80" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className='SVG'>
                <rect x="1" y="1" width="118" height="118" rx="24" fill="url(#paint0_linear_1366_4557)" fill-opacity="0.15" stroke="url(#paint1_radial_1366_4557)" stroke-width="2"></rect>
                <path d="M74.2105 36C73.373 36 72.5698 35.6839 71.9776 35.1213C71.3853 34.5587 71.0526 33.7956 71.0526 33C71.0526 32.2044 71.3853 31.4413 71.9776 30.8787C72.5698 30.3161 73.373 30 74.2105 30H86.8421C87.6796 30 88.4829 30.3161 89.0751 30.8787C89.6673 31.4413 90 32.2044 90 33V45C90 45.7956 89.6673 46.5587 89.0751 47.1213C88.4829 47.6839 87.6796 48 86.8421 48C86.0046 48 85.2014 47.6839 84.6091 47.1213C84.0169 46.5587 83.6842 45.7956 83.6842 45V40.242L65.3905 57.621C64.7983 58.1834 63.9953 58.4994 63.1579 58.4994C62.3205 58.4994 61.5175 58.1834 60.9253 57.621L52.1053 49.242L35.3905 65.121C34.7949 65.6675 33.9972 65.9699 33.1693 65.963C32.3413 65.9562 31.5492 65.6407 30.9637 65.0845C30.3782 64.5282 30.0461 63.7758 30.0389 62.9892C30.0317 62.2026 30.35 61.4448 30.9253 60.879L49.8726 42.879C50.4648 42.3166 51.2679 42.0006 52.1053 42.0006C52.9426 42.0006 53.7457 42.3166 54.3379 42.879L63.1579 51.258L79.219 36H74.2105ZM36.3158 78V87C36.3158 87.7957 35.9831 88.5587 35.3909 89.1213C34.7986 89.6839 33.9954 90 33.1579 90C32.3204 90 31.5171 89.6839 30.9249 89.1213C30.3327 88.5587 30 87.7957 30 87V78C30 77.2043 30.3327 76.4413 30.9249 75.8787C31.5171 75.3161 32.3204 75 33.1579 75C33.9954 75 34.7986 75.3161 35.3909 75.8787C35.9831 76.4413 36.3158 77.2043 36.3158 78ZM52.1053 66C52.1053 65.2043 51.7726 64.4413 51.1803 63.8787C50.5881 63.3161 49.7849 63 48.9474 63C48.1098 63 47.3066 63.3161 46.7144 63.8787C46.1222 64.4413 45.7895 65.2043 45.7895 66V87C45.7895 87.7957 46.1222 88.5587 46.7144 89.1213C47.3066 89.6839 48.1098 90 48.9474 90C49.7849 90 50.5881 89.6839 51.1803 89.1213C51.7726 88.5587 52.1053 87.7957 52.1053 87V66ZM64.7368 69C65.5744 69 66.3776 69.3161 66.9698 69.8787C67.562 70.4413 67.8947 71.2043 67.8947 72V87C67.8947 87.7957 67.562 88.5587 66.9698 89.1213C66.3776 89.6839 65.5744 90 64.7368 90C63.8993 90 63.0961 89.6839 62.5039 89.1213C61.9117 88.5587 61.5789 87.7957 61.5789 87V72C61.5789 71.2043 61.9117 70.4413 62.5039 69.8787C63.0961 69.3161 63.8993 69 64.7368 69ZM83.6842 57C83.6842 56.2044 83.3515 55.4413 82.7593 54.8787C82.1671 54.3161 81.3638 54 80.5263 54C79.6888 54 78.8856 54.3161 78.2933 54.8787C77.7011 55.4413 77.3684 56.2044 77.3684 57V87C77.3684 87.7957 77.7011 88.5587 78.2933 89.1213C78.8856 89.6839 79.6888 90 80.5263 90C81.3638 90 82.1671 89.6839 82.7593 89.1213C83.3515 88.5587 83.6842 87.7957 83.6842 87V57Z" fill="#FFEE24"></path>
                <defs>
                  <linearGradient id="paint0_linear_1366_4557" x1="-0.0208152" y1="-0.102528" x2="119.899" y2="119.817" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FFE34B" stop-opacity="0.7"></stop>
                    <stop offset="0.510417" stop-color="#FFE34B" stop-opacity="0"></stop>
                    <stop offset="1" stop-color="#FFE34B" stop-opacity="0.7"></stop>
                  </linearGradient>
                  <radialGradient id="paint1_radial_1366_4557" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(60 60) rotate(96.8574) scale(122.674 149.921)">
                    <stop stop-color="#FFEE24"></stop>
                    <stop offset="1" stop-color="#302A1A" stop-opacity="0.2"></stop>
                  </radialGradient>
                </defs>
              </svg> <br />
              <p className="card-title">AI Words:</p>
              <h1 className="card-description">{result.aiWords}</h1>
            </div>
         </div>

         <div className="card">
            <div className="container-card bg-yellow-box">
            <svg width="80" height="80" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="118" height="118" rx="24" fill="url(#paint0_linear_1366_4582)" fill-opacity="0.15" stroke="url(#paint1_radial_1366_4582)" stroke-width="2"></rect>
              <path d="M90.9405 64.775L88.0155 69.55L85.1155 64.775H80.0655L85.5155 72.85L79.5905 82H84.4905L88.0155 76.175L91.5155 82H96.4405L90.4905 72.85L95.9405 64.775H90.9405Z" fill="#87A1FF"></path>
              <path d="M44.9833 35.52L27.3433 43.92V52.53L35.1833 49.17V82H44.9833V35.52ZM71.37 35.52L53.73 43.92V52.53L61.57 49.17V82H71.37V35.52Z" fill="#87A1FF"></path>
              <defs>
                <linearGradient id="paint0_linear_1366_4582" x1="120.194" y1="119.827" x2="-13.1225" y2="17.1841" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#61A0FF" stop-opacity="0.7"></stop>
                  <stop offset="0.489583" stop-color="#61A0FF" stop-opacity="0"></stop>
                  <stop offset="1" stop-color="#61A0FF" stop-opacity="0.7"></stop>
                </linearGradient>
                <radialGradient id="paint1_radial_1366_4582" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(60 60) rotate(96.8574) scale(122.674 149.921)">
                  <stop stop-color="#87A1FF"></stop>
                  <stop offset="1" stop-color="#16161D" stop-opacity="0.2"></stop>
                </radialGradient>
                </defs>
              </svg> <br />
              <p className="card-title">AI Percentage:</p>
              <h1 className="card-description">{result.fakePercentage}%</h1>
            </div>
         </div>

         <div className="card">
            <div className="container-card bg-yellow-box">
            <svg width="80" height="80" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="118" height="118" rx="24" fill="url(#paint0_linear_1366_4582)" fill-opacity="0.15" stroke="url(#paint1_radial_1366_4582)" stroke-width="2"></rect>
              <path d="M90.9405 64.775L88.0155 69.55L85.1155 64.775H80.0655L85.5155 72.85L79.5905 82H84.4905L88.0155 76.175L91.5155 82H96.4405L90.4905 72.85L95.9405 64.775H90.9405Z" fill="#87A1FF"></path>
              <path d="M44.9833 35.52L27.3433 43.92V52.53L35.1833 49.17V82H44.9833V35.52ZM71.37 35.52L53.73 43.92V52.53L61.57 49.17V82H71.37V35.52Z" fill="#87A1FF"></path>
              <defs>
                <linearGradient id="paint0_linear_1366_4582" x1="120.194" y1="119.827" x2="-13.1225" y2="17.1841" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#61A0FF" stop-opacity="0.7"></stop>
                  <stop offset="0.489583" stop-color="#61A0FF" stop-opacity="0"></stop>
                  <stop offset="1" stop-color="#61A0FF" stop-opacity="0.7"></stop>
                </linearGradient>
                <radialGradient id="paint1_radial_1366_4582" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(60 60) rotate(96.8574) scale(122.674 149.921)">
                  <stop stop-color="#87A1FF"></stop>
                  <stop offset="1" stop-color="#16161D" stop-opacity="0.2"></stop>
                </radialGradient>
              </defs>
             </svg> <br />
              <p className="card-title">Is human:</p>
              <h1 className="card-description">{result.isHuman ? 'Yes' : 'No'}</h1>
            </div>
         </div>

         <div className="card">
            <div className="container-card bg-yellow-box">
              <svg width="80" height="80" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className='SVG'>
                <rect x="1" y="1" width="118" height="118" rx="24" fill="url(#paint0_linear_1366_4557)" fill-opacity="0.15" stroke="url(#paint1_radial_1366_4557)" stroke-width="2"></rect>
                <path d="M74.2105 36C73.373 36 72.5698 35.6839 71.9776 35.1213C71.3853 34.5587 71.0526 33.7956 71.0526 33C71.0526 32.2044 71.3853 31.4413 71.9776 30.8787C72.5698 30.3161 73.373 30 74.2105 30H86.8421C87.6796 30 88.4829 30.3161 89.0751 30.8787C89.6673 31.4413 90 32.2044 90 33V45C90 45.7956 89.6673 46.5587 89.0751 47.1213C88.4829 47.6839 87.6796 48 86.8421 48C86.0046 48 85.2014 47.6839 84.6091 47.1213C84.0169 46.5587 83.6842 45.7956 83.6842 45V40.242L65.3905 57.621C64.7983 58.1834 63.9953 58.4994 63.1579 58.4994C62.3205 58.4994 61.5175 58.1834 60.9253 57.621L52.1053 49.242L35.3905 65.121C34.7949 65.6675 33.9972 65.9699 33.1693 65.963C32.3413 65.9562 31.5492 65.6407 30.9637 65.0845C30.3782 64.5282 30.0461 63.7758 30.0389 62.9892C30.0317 62.2026 30.35 61.4448 30.9253 60.879L49.8726 42.879C50.4648 42.3166 51.2679 42.0006 52.1053 42.0006C52.9426 42.0006 53.7457 42.3166 54.3379 42.879L63.1579 51.258L79.219 36H74.2105ZM36.3158 78V87C36.3158 87.7957 35.9831 88.5587 35.3909 89.1213C34.7986 89.6839 33.9954 90 33.1579 90C32.3204 90 31.5171 89.6839 30.9249 89.1213C30.3327 88.5587 30 87.7957 30 87V78C30 77.2043 30.3327 76.4413 30.9249 75.8787C31.5171 75.3161 32.3204 75 33.1579 75C33.9954 75 34.7986 75.3161 35.3909 75.8787C35.9831 76.4413 36.3158 77.2043 36.3158 78ZM52.1053 66C52.1053 65.2043 51.7726 64.4413 51.1803 63.8787C50.5881 63.3161 49.7849 63 48.9474 63C48.1098 63 47.3066 63.3161 46.7144 63.8787C46.1222 64.4413 45.7895 65.2043 45.7895 66V87C45.7895 87.7957 46.1222 88.5587 46.7144 89.1213C47.3066 89.6839 48.1098 90 48.9474 90C49.7849 90 50.5881 89.6839 51.1803 89.1213C51.7726 88.5587 52.1053 87.7957 52.1053 87V66ZM64.7368 69C65.5744 69 66.3776 69.3161 66.9698 69.8787C67.562 70.4413 67.8947 71.2043 67.8947 72V87C67.8947 87.7957 67.562 88.5587 66.9698 89.1213C66.3776 89.6839 65.5744 90 64.7368 90C63.8993 90 63.0961 89.6839 62.5039 89.1213C61.9117 88.5587 61.5789 87.7957 61.5789 87V72C61.5789 71.2043 61.9117 70.4413 62.5039 69.8787C63.0961 69.3161 63.8993 69 64.7368 69ZM83.6842 57C83.6842 56.2044 83.3515 55.4413 82.7593 54.8787C82.1671 54.3161 81.3638 54 80.5263 54C79.6888 54 78.8856 54.3161 78.2933 54.8787C77.7011 55.4413 77.3684 56.2044 77.3684 57V87C77.3684 87.7957 77.7011 88.5587 78.2933 89.1213C78.8856 89.6839 79.6888 90 80.5263 90C81.3638 90 82.1671 89.6839 82.7593 89.1213C83.3515 88.5587 83.6842 87.7957 83.6842 87V57Z" fill="#FFEE24"></path>
                <defs>
                  <linearGradient id="paint0_linear_1366_4557" x1="-0.0208152" y1="-0.102528" x2="119.899" y2="119.817" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FFE34B" stop-opacity="0.7"></stop>
                    <stop offset="0.510417" stop-color="#FFE34B" stop-opacity="0"></stop>
                    <stop offset="1" stop-color="#FFE34B" stop-opacity="0.7"></stop>
                  </linearGradient>
                  <radialGradient id="paint1_radial_1366_4557" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(60 60) rotate(96.8574) scale(122.674 149.921)">
                    <stop stop-color="#FFEE24"></stop>
                    <stop offset="1" stop-color="#302A1A" stop-opacity="0.2"></stop>
                  </radialGradient>
                </defs>
              </svg> <br />
              <p className="card-title">Feedback:</p>
              <p1 className="paragraph">{result.otherFeedback}</p1>
            </div>
         </div>

         <div className="card">
            <div className="container-card bg-yellow-box">
            <svg width="80" height="80" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="118" height="118" rx="24" fill="url(#paint0_linear_1366_4582)" fill-opacity="0.15" stroke="url(#paint1_radial_1366_4582)" stroke-width="2"></rect>
              <path d="M90.9405 64.775L88.0155 69.55L85.1155 64.775H80.0655L85.5155 72.85L79.5905 82H84.4905L88.0155 76.175L91.5155 82H96.4405L90.4905 72.85L95.9405 64.775H90.9405Z" fill="#87A1FF"></path>
              <path d="M44.9833 35.52L27.3433 43.92V52.53L35.1833 49.17V82H44.9833V35.52ZM71.37 35.52L53.73 43.92V52.53L61.57 49.17V82H71.37V35.52Z" fill="#87A1FF"></path>
              <defs>
                <linearGradient id="paint0_linear_1366_4582" x1="120.194" y1="119.827" x2="-13.1225" y2="17.1841" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#61A0FF" stop-opacity="0.7"></stop>
                  <stop offset="0.489583" stop-color="#61A0FF" stop-opacity="0"></stop>
                  <stop offset="1" stop-color="#61A0FF" stop-opacity="0.7"></stop>
                </linearGradient>
                <radialGradient id="paint1_radial_1366_4582" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(60 60) rotate(96.8574) scale(122.674 149.921)">
                  <stop stop-color="#87A1FF"></stop>
                  <stop offset="1" stop-color="#16161D" stop-opacity="0.2"></stop>
                </radialGradient>
                </defs>
              </svg> <br />
              <p className="card-title">Verification Status:</p>
              <h1 className="card-description">{result.status ? 'Success' : 'Failed'}</h1>
            </div>
         </div>

          </div>
        </>
      ) : null}
    </>
  );
  
}

export default ArtificialInteligenceCheck;