import React from 'react'

function ArtificialInteligenceCheck() {
  return (
    <>    
    <div>
        <h1 className='App-tittle'>AI Detector</h1>
     <textarea className='User-input' rows={15} placeholder= 'Type or paste some text to verify whether it is AI genreted'/>
    </div>
    <div>
        <button className='btn-primary'>Check</button>
    </div>
    </>

  )
}

export default ArtificialInteligenceCheck