import React from 'react';

type Props = {
  items: string[];
};

export const DirectoryBreadcrumbs = (props: Props) => {
  return (
    <div className="flex flex-row gap-2">
      {props.items.map((item, index) => {
        return (
          <div key={index} className="flex flex-row gap-2">
            <span>{item}</span>
            {index < props.items.length - 1 && <span>/</span>}
          </div>
        );
      })}
    </div>
  );
};
