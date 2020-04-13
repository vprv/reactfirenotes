import React from 'react';

const Files = ({data}) => {
  if (data)
    return (
      <div className={'collection'}>
        {
          data.map((file, index) => {
            return <a href={file.url} className="collection-item">{file.name}</a>
          })
        }
      </div>
    );

  return (
    <span>Файлов нет</span>
  )
};

export default Files;
