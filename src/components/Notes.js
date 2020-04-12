import React from 'react';

const Notes = ({data}) => {
  return (
    <div>
      {data.map((note, index) => {
        return <h5 key={index}>{note}</h5>
      })}
    </div>
  )
}

export default Notes;
