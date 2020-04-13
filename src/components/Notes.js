import React from 'react';

const Notes = ({data}) => {
  if (data)
    return (
      <ul className={"collection"}>
        {
          data.map((note, index) => {
            return <li className={"collection-item"} key={index}>{note}</li>
          })
        }
      </ul>
    )

  return (
    <span>Нет ниодной заметки</span>
  )
}

export default Notes;
