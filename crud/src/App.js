import React, { useState, useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_URL_BACK, { transports: ['websocket', 'polling', 'flashsocket'] })


const App = () => {


  const [array, setarray] = useState([])


  useEffect(() => {
    socket.on('UserAddedResponse', (resp) => {
      let ua = array;
      ua.push(resp.data)
      setarray([...ua]);
    })
  }, [])


  const sendData = () => {
    let data = {
      name: 'Andres'
    }

    axios.post(`${process.env.REACT_APP_URL_BACK}/api/users` , data)
      .then(res => {
        socket.emit('UserAdded', { data })
      })
  }



  return (
    <div>
      <button onClick={sendData}  >Enviar</button>
      {array.map((item, index) => {
        return (
          <h1 key={index} >{item.name}</h1>
        )
      })}
    </div>
  )
}

export default App;


