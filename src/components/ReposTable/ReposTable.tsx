import React, { FunctionComponent, useContext } from 'react';

import ReposContext, { ReposContextType } from '../../ReposContext';

import ReposCellsContainer from './ReposCellsContainer';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  root: {
    width: '100%',
    minWidth: '400px',
    margin: '0 auto'
  },
  container: {
    maxHeight: '85vh'
  }
});

const ReposTable: FunctionComponent = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { reposNames } = useContext(ReposContext) as ReposContextType;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Stars</TableCell>
              <TableCell align="right">Forks</TableCell>
              <TableCell align="right">Cteated At</TableCell>
              <TableCell align="right">Last Release</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reposNames.map((reposName, index) => (
              <TableRow key={reposName + index}>
                <ReposCellsContainer reposName={reposName} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={reposNames.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ReposTable;
