import React, { FC, ReactNode } from 'react';

interface DocComponentProps {
  title: string;
  description?: string;
  children: ReactNode;
}

const DocComponent: FC<DocComponentProps> = ({ title, description, children }) => {
  return (
    <div className="bg-white rounded shadow p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {description && <p className="text-gray-600 mb-4">{description}</p>}
      <div className="">{children}</div>
    </div>
  );
};

export default DocComponent;
