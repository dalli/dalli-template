import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link as MuiLink,
  Paper,
  Box,
  Grid,
  Typography,
  Divider,
  AppBar,
  Toolbar,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useAuth } from '../contexts/AuthContext'
import Logo from '../components/Logo'

export default function SignIn() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.detail || '로그인에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <CssBaseline />
      {/* AppBar */}
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <Logo variant="h6" />
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          p: 2,
        }}
      >
      <Grid
        container
        component={Paper}
        elevation={6}
        sx={{
          maxWidth: 1200,
          minHeight: { xs: 'auto', sm: 800 },
          height: { xs: 'auto', sm: 'auto' },
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        {/* Left side - Promotional area */}
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpaper)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: { xs: 'none', sm: 'flex' },
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              p: 4,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
            }}
          >
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
              Welcome Back
            </Typography>
            <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
              Adaptable performance
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, textAlign: 'center', maxWidth: 400 }}>
              Our product effortlessly adjusts to your needs, boosting efficiency and simplifying
              your tasks.
            </Typography>
            <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
              Built to last
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, textAlign: 'center', maxWidth: 400 }}>
              Experience unmatched durability that goes above and beyond with lasting investment.
            </Typography>
            <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
              Great user experience
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, textAlign: 'center', maxWidth: 400 }}>
              Integrate our product into your routine with an intuitive and easy-to-use interface.
            </Typography>
            <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
              Innovative functionality
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center', maxWidth: 400 }}>
              Stay ahead with features that set new standards, addressing your evolving needs
              better than the rest.
            </Typography>
          </Box>
        </Grid>
        {/* Right side - Sign in form */}
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              Sign in
            </Button>
            <Grid container>
              <Grid item xs>
                <MuiLink component={Link} to="#" variant="body2">
                  Forgot your password?
                </MuiLink>
              </Grid>
              <Grid item>
                <MuiLink component={Link} to="/signup" variant="body2">
                  Don't have an account? Sign up
                </MuiLink>
              </Grid>
            </Grid>
            <Divider sx={{ my: 3 }}>or</Divider>
            <Button
              fullWidth
              variant="outlined"
              sx={{ mb: 1 }}
              startIcon={
                <Box
                  component="img"
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  sx={{ width: 20, height: 20 }}
                />
              }
            >
              Sign in with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={
                <Box
                  component="img"
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg"
                  alt="Facebook"
                  sx={{ width: 20, height: 20 }}
                />
              }
            >
              Sign in with Facebook
            </Button>
          </Box>
        </Box>
        </Grid>
      </Grid>
      </Box>
    </Box>
  )
}
