import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Avatar,
  Button,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Link as JoyLink,
  Sheet,
  Grid,
  Box,
  Typography,
  Divider,
  Alert,
} from '@mui/joy'
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
      {/* AppBar */}
      <Sheet
        variant="outlined"
        sx={{
          p: 1,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
          <Logo variant="h6" />
        </Box>
      </Sheet>
      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'background.level1',
          p: 2,
        }}
      >
        <Grid
          container
          component={Sheet}
          variant="outlined"
          sx={{
            maxWidth: 1200,
            minHeight: { xs: 'auto', sm: 800 },
            height: { xs: 'auto', sm: 'auto' },
            borderRadius: 'sm',
            overflow: 'hidden',
          }}
        >
          {/* Left side - Promotional area */}
          <Grid
            xs={12}
            sm={6}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random?wallpaper)',
              backgroundRepeat: 'no-repeat',
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
              <Typography level="h1" sx={{ fontWeight: 700, mb: 3 }}>
                Welcome Back
              </Typography>
              <Typography level="title-lg" sx={{ mb: 2, textAlign: 'center' }}>
                Adaptable performance
              </Typography>
              <Typography level="body-md" sx={{ mb: 3, textAlign: 'center', maxWidth: 400 }}>
                Our product effortlessly adjusts to your needs, boosting efficiency and simplifying
                your tasks.
              </Typography>
              <Typography level="title-lg" sx={{ mb: 2, textAlign: 'center' }}>
                Built to last
              </Typography>
              <Typography level="body-md" sx={{ mb: 3, textAlign: 'center', maxWidth: 400 }}>
                Experience unmatched durability that goes above and beyond with lasting investment.
              </Typography>
              <Typography level="title-lg" sx={{ mb: 2, textAlign: 'center' }}>
                Great user experience
              </Typography>
              <Typography level="body-md" sx={{ mb: 3, textAlign: 'center', maxWidth: 400 }}>
                Integrate our product into your routine with an intuitive and easy-to-use interface.
              </Typography>
              <Typography level="title-lg" sx={{ mb: 2, textAlign: 'center' }}>
                Innovative functionality
              </Typography>
              <Typography level="body-md" sx={{ textAlign: 'center', maxWidth: 400 }}>
                Stay ahead with features that set new standards, addressing your evolving needs
                better than the rest.
              </Typography>
            </Box>
          </Grid>
          {/* Right side - Sign in form */}
          <Grid
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
              <Avatar sx={{ m: 1, bgcolor: 'primary.500' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography level="h3">Sign in</Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                <FormControl required sx={{ mb: 2 }}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일을 입력하세요"
                    autoFocus
                  />
                </FormControl>
                <FormControl required sx={{ mb: 2 }}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호를 입력하세요"
                  />
                </FormControl>
                <FormControl sx={{ mb: 2 }}>
                  <Checkbox label="Remember me" />
                </FormControl>
                {error && (
                  <Alert color="danger" variant="soft" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="solid"
                  sx={{ mt: 3, mb: 2 }}
                  loading={loading}
                >
                  Sign in
                </Button>
                <Grid container>
                  <Grid xs>
                    <JoyLink component={Link} to="#" level="body-sm">
                      Forgot your password?
                    </JoyLink>
                  </Grid>
                  <Grid>
                    <JoyLink component={Link} to="/signup" level="body-sm">
                      Don't have an account? Sign up
                    </JoyLink>
                  </Grid>
                </Grid>
                <Divider sx={{ my: 3 }}>or</Divider>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 1 }}
                  startDecorator={
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
                  startDecorator={
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
