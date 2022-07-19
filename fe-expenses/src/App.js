import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import "antd/dist/antd.css";
import ModalWrapper from './components/Modal';
import { useEffect, useState } from 'react';
import RouterConfig from './navigation/RouterConfig';
import { getAllTransactions } from './services';

function App() {
  const [showModal, updateShowModal] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    getAllTransactions()
      .then(res => setData(res.data))
      .catch(err => console.log('Error fetching all transactions'));
  }, [showModal]);

  const handleOk = () => {
    updateShowModal(false);
  }

  const handleCancel = () => {
    updateShowModal(false)
  }

  const openModal = () => {
    updateShowModal(true);
  }

  return (
    <div className="App">
      <ModalWrapper show={showModal} handleOk={handleOk} handleCancel={handleCancel} setData={setData} />
      <Router>
        <RouterConfig openModal={openModal} expenseData={data} />
      </Router>
    </div>
  );
}

export default App;
