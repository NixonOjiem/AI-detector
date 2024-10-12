import React from 'react'

function ArtificialInteligenceCheck() {
  return (
    <>    
    <div>
     <textarea className='User-input' rows={10} placeholder= 'Type or paste some text to verify whether it is AI genreted'/>
    </div>
    <div>
        <button className='btn-primary'>Check</button>
    </div>
    </>

  )
}

export default ArtificialInteligenceCheck