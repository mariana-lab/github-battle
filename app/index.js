import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Battle from './components/Battle'
import Popular from './components/Popular'
import Uncontrolled from './components/Uncontrolled'

// Component
// State
// Lifecycle
// UI

class App extends React.Component{
    render(){
        return (
        <div className='container'>
            <Battle/>
            <Uncontrolled/>

        </div>
        )
    }
} 

//what, where to render
ReactDOM.render(
    <App/>,
    document.getElementById('app')
)
