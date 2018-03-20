import React, {Component} from 'react';
import './App.sass';
import ParallaxCard from './ParallaxCard';

class App extends Component {
    render() {
        return (
            <div id="wrapper">
                <ParallaxCard layers={
                    [
                        'https://raw.githubusercontent.com/jansmolders86/react-3D-parallax-card/master/public/images/bg.jpg',
                        'https://raw.githubusercontent.com/jansmolders86/react-3D-parallax-card/master/public/images/front.png'
                    ]
                } />
            </div>
        );
    }
}

export default App;
