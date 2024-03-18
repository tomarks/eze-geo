import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  items: { name: string; id: string }[];
};

export const DirectoryBreadcrumbs = (props: Props) => {
  var navigate = useNavigate();

  const handleOnClick = (id: string) => {
    navigate(`/${id}`);
  };

  return (
    <div className="flex flex-row gap-2">
      {props.items.map((item, index) => {
        return (
          <div key={index} className="flex flex-row gap-2">
            <a style={{ cursor: 'pointer' }} onClick={() => handleOnClick(item.id)}>
              {item.name}
            </a>
            {index < props.items.length - 1 && <span>/</span>}
          </div>
        );
      })}
    </div>
  );
};
