import './App.css';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { Outlet } from 'react-router-dom';
import Header from './shared/Header';

function App() {
  return (
    <div>
      <Provider store={store}>
        <div>
          <Header />
          <main className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <Outlet />
          </main>
        </div>
      </Provider>  
    </div>
  );
}
export default App;