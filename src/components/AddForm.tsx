import React, { FunctionComponent, useContext } from 'react';
import { useForm } from 'react-hook-form';

import ReposContext, { ReposContextType } from '../ReposContext';

import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '35ch'
      }
    }
  })
);

const AddForm: FunctionComponent = () => {
  const classes = useStyles();
  const { appendRepo } = useContext(ReposContext) as ReposContextType;
  const { register, handleSubmit, reset } = useForm();

  const submitHandler = handleSubmit(({ repoName }) => {
    appendRepo(repoName);
    reset();
  });

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={submitHandler}>
      <TextField id="standard-basic" label="Search" name="repoName" inputRef={register} required />
      <input style={{ display: 'none' }} type="submit" />
    </form>
  );
};

export default AddForm;
