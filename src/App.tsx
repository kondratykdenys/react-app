import React, { FunctionComponent } from 'react';
import { ReposProvider } from './ReposContext';

import ReposTable from './components/ReposTable/ReposTable';
import AddForm from './components/AddForm';

const App: FunctionComponent = () => (
  <ReposProvider>
    <AddForm />
    <ReposTable />
  </ReposProvider>
);

export default App;
