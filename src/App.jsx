
import './App.css'
import Echo from 'laravel-echo';

import Pusher from 'pusher-js';
import { useEffect, useState } from 'react';
import Home from './pages/home/Home';
import AppRouter from './config/AppRouter';
window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: "7d41f2b4cc8463397fa4",
  cluster: "ap2",
  wsHost: "localhost",
  wsPort: 6001,
  forceTLS: false,
  disableStats: true,
  enabledTransports: ['ws', 'wss'],
});



function App() {
  const [data, setData] = useState(null)
  useEffect(() => {
    window.Echo.channel("channel")
      .listen('Hello', (e) => {
        console.log("event=", e)
        setData(e)
      })
  }, [])
  console.log("data", data)
  return (
    <>
      <AppRouter />
    </>
  )
}

export default App
