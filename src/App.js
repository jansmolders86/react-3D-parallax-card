import React, {Component} from 'react';
import './App.sass';
import ParallaxCard from './ParallaxCard.sass';

class App extends Component {
    render() {
        return (
            <div id="wrapper">
                <ParallaxCard layers={[]} />
            </div>
        );
    }
}

export default App;
