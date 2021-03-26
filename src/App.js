
import './App.css';

import ChartControlTrading from './components/ChartControlTrading'
import ChartControlApplied from './components/ChartControlApplied'

// Source : https://blog.miguelgrinberg.com/post/how-to-create-a-react--flask-project
// Source: https://www.npmjs.com/package/react-bar-chart
function App() {

  return (
    <div className="App">
      <div className="container">
        <div className='row'>
          <h1 className=".h1">Trading Status</h1>

          <div className='col-sm'>
            
            <ChartControlTrading/>
            
          </div>
          <div className='col-sm'>
            
            <ChartControlApplied/>
            
          </div>
        </div>
        
      </div>
      
    </div>
  );
}

export default App;
