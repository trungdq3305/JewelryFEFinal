import React, { useState } from 'react'
import classNames from 'classnames/bind'
import styles from '../Login/login.module.scss'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useAuth } from '../../Context/UserContext'

const cx = classNames.bind(styles)

const Login = () => {
  const { loginUser } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (username, password) => {
    
    const result = loginUser(username, password)
  }

  return (
    <div className={cx('login-container')}>
      <div className={cx('login-box')}>
      <div className={cx('login-title')}>JEWSHINE</div>
      <div className={cx('login-title2')}>Management</div>

      <div className={cx('login-body')}>
        <Box
          component="form"
          sx={{
            '& > :not(style)': {
              m: 1,
              width: '50ch',
              display: 'flex',
              marginBottom: '10px',
            },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            sx={{
              '& > :not(style)': { borderRadius: '50px'},
            }}
            id="outlined-basic"
            fullWidth
            label="User Name"
            variant="outlined"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            sx={{
              '& > :not(style)': { borderRadius: '50px' },
            }}
            id="outlined-basic"
            fullWidth
            label="Password"
            variant="outlined"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Box>
      </div>
      <div className={cx('login-submit')}>
        <button onClick={() => handleLogin(username, password)}>Login</button>
      </div>
      </div>
    </div>
  )
}

export default Login
