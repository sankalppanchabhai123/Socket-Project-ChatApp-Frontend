import React, { useCallback, useState } from 'react'


function Login() {
  const [email, setemail] = useState("");
  const [room, setroom] = useState("");

  useCallback((e) => {
    const onsubmit = () => {
      e.preventdefault();
      console.log(email, room);
    }
  }, {})

  return (
    <>
      <form>
        <div>
          <label htmlFor='email'>Email</label>
          <input className='border-1 ml-5' type='email' placeholder='your email' onChange={(e) => setemail(e.target.value)} value={email} />
        </div>
        <div>
          <label htmlFor='room'>Room</label>
          <input className='border-1 ml-5' type='text' placeholder='your room number' onChange={(e) => setroom(e.target.value)} value={room} />
        </div>
      </form>
      <button onClick={onsubmit}>Join room</button>
    </>
  )
}

export default Login