import React, { createContext, FunctionComponent, useState, useEffect } from 'react';

export type ReposArrayType = string[];

export type ReposContextType = {
  reposNames: ReposArrayType;
  appendRepo(reposName: string): void;
};

export const initialState: ReposArrayType = [
  'react',
  'redux',
  'reselect',
  'redux-saga',
  'typescript'
];

const ReposContext = createContext<Partial<ReposContextType>>({});

export const ReposProvider: FunctionComponent = ({ children }) => {
  const [reposNames, setContext] = useState<ReposArrayType>(initialState);
  const appendRepo = (reposName: string): void => {
    setContext([...reposNames, reposName]);
  };

  useEffect(() => {
    const storageData: string | null = localStorage.getItem('reposNames');
    const storageReposNames: ReposArrayType = storageData && JSON.parse(storageData).reposNames;
    if (storageReposNames && storageReposNames.length > reposNames.length) {
      setContext(storageReposNames);
    } else if (storageReposNames === null || storageReposNames.length < reposNames.length) {
      localStorage.setItem('reposNames', JSON.stringify({ reposNames }));
    }
  }, [reposNames]);

  return (
    <ReposContext.Provider value={{ reposNames, appendRepo }}>{children}</ReposContext.Provider>
  );
};

export default ReposContext;
