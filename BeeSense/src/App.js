import logo from './Bee.png';
import './App.css';
import React from 'react';
import Form from './Form';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      submitted: false,
    };
  }

  handler = () => {
    this.setState({
      submitted: !this.state.submitted,
    });
  }

  render () {
    return (
      <>
        <div className='logo'>
          <img src={ logo } alt='Bee' />
        </div>

        { !this.state.submitted ?
          <Form handler={ this.handler } />
          :
          <>
            <h3>You can now move the downloaded file onto the USB</h3>
            <div className='button2'>
              <button onClick={ this.handler }>Create Another?</button>
            </div>
          </>
        }
      </>
    );
  }
}

export default App;
