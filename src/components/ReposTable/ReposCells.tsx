import React, { FunctionComponent } from 'react';
import TableCell from '@material-ui/core/TableCell';

interface ReposCellsProps {
  name: string;
  stars: number;
  forks: number;
  repoUrl: string;
  created: string;
  lastRelease: string;
}

const ReposCells: FunctionComponent<ReposCellsProps> = ({ name, stars, forks, repoUrl, created, lastRelease }) => {
  return (
    <>
      <TableCell component="th" scope="row">
        <a href={repoUrl} target="_blank" rel="noreferrer">
          {name}
        </a>
      </TableCell>
      <TableCell align="right">{stars}</TableCell>
      <TableCell align="right">{forks}</TableCell>
      <TableCell align="right">{created}</TableCell>
      <TableCell align="right">{lastRelease}</TableCell>
    </>
  );
};

export default ReposCells;
