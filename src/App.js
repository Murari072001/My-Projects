import './App.css';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { Outlet } from 'react-router-dom';
import Navbar from './shared/Navbar';
function App() {
  return (
    <div >
      <Provider store={store}>
        <div className="">
          {/* <h1>Ticketing... App...</h1> */}
          <Navbar></Navbar>
          <Outlet></Outlet>
        </div>
    </Provider>  
    </div>
    
  );
}
export default App;