import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
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

export default function SignUp() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await register(name, email, password)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.detail || t('auth.registerError'))
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
                {t('auth.joinUs')}
              </Typography>
              <Typography level="title-lg" sx={{ mb: 2, textAlign: 'center' }}>
                {t('auth.adaptablePerformance')}
              </Typography>
              <Typography level="body-md" sx={{ mb: 3, textAlign: 'center', maxWidth: 400 }}>
                {t('auth.adaptablePerformanceDesc')}
              </Typography>
              <Typography level="title-lg" sx={{ mb: 2, textAlign: 'center' }}>
                {t('auth.builtToLast')}
              </Typography>
              <Typography level="body-md" sx={{ mb: 3, textAlign: 'center', maxWidth: 400 }}>
                {t('auth.builtToLastDesc')}
              </Typography>
              <Typography level="title-lg" sx={{ mb: 2, textAlign: 'center' }}>
                {t('auth.greatUserExperience')}
              </Typography>
              <Typography level="body-md" sx={{ mb: 3, textAlign: 'center', maxWidth: 400 }}>
                {t('auth.greatUserExperienceDesc')}
              </Typography>
              <Typography level="title-lg" sx={{ mb: 2, textAlign: 'center' }}>
                {t('auth.innovativeFunctionality')}
              </Typography>
              <Typography level="body-md" sx={{ textAlign: 'center', maxWidth: 400 }}>
                {t('auth.innovativeFunctionalityDesc')}
              </Typography>
            </Box>
          </Grid>
          {/* Right side - Sign up form */}
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
              <Typography level="h3">{t('auth.signUp')}</Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
                <Grid container spacing={2}>
                  <Grid xs={12}>
                    <FormControl required>
                      <FormLabel>{t('auth.fullName')}</FormLabel>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t('auth.fullName')}
                        autoFocus
                      />
                    </FormControl>
                  </Grid>
                  <Grid xs={12}>
                    <FormControl required>
                      <FormLabel>{t('auth.email')}</FormLabel>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('auth.email')}
                      />
                    </FormControl>
                  </Grid>
                  <Grid xs={12}>
                    <FormControl required>
                      <FormLabel>{t('auth.password')}</FormLabel>
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={t('auth.password')}
                      />
                    </FormControl>
                  </Grid>
                  <Grid xs={12}>
                    <FormControl>
                      <Checkbox label={t('auth.emailUpdates')} />
                    </FormControl>
                  </Grid>
                </Grid>
                {error && (
                  <Alert color="danger" variant="soft" sx={{ mt: 2 }}>
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
                  {t('auth.signUp')}
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid>
                    <JoyLink component={Link} to="/signin" level="body-sm">
                      {t('auth.hasAccount')}
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
                  {t('auth.signUpWithGoogle')}
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
                  {t('auth.signUpWithFacebook')}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
