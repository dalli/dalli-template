import * as React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Link as JoyLink,
  Typography,
  CssVarsProvider,
} from '@mui/joy'
import GoogleIcon from '@mui/icons-material/Google'
import { useAuth } from '../contexts/AuthContext'
import Logo from '../components/Logo'

export default function SignIn() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.detail || t('auth.loginError'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'background.level1',
          px: 2,
          py: 3,
        }}
      >
        <Box
          component="main"
          sx={{
            width: '100%',
            maxWidth: '450px',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 2,
            }}
          >
            <Logo variant="h6" />
          </Box>
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              overflow: 'auto',
            }}
          >
            <Box
              sx={{
                flex: 'none',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                mb: 2,
              }}
            >
              <Typography level="h2">{t('auth.signIn')}</Typography>
              <Typography level="body-sm">
                {t('auth.noAccount')}{' '}
                <JoyLink component={Link} to="/signup" level="title-sm">
                  {t('auth.signUp')}!
                </JoyLink>
              </Typography>
            </Box>
            <Button
              variant="outlined"
              color="neutral"
              fullWidth
              startDecorator={<GoogleIcon />}
              sx={{ mb: 2 }}
            >
              {t('auth.signInWithGoogle')}
            </Button>
            <Divider
              sx={(theme) => ({
                [theme.getColorSchemeSelector('light')]: {
                  color: 'text.tertiary',
                  fontWeight: 600,
                  '&::before': {
                    borderTop: 'thin solid',
                    borderColor: 'divider',
                  },
                  '&::after': {
                    borderTop: 'thin solid',
                    borderColor: 'divider',
                  },
                },
              })}
            >
              or
            </Divider>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                flex: 'auto',
                mt: 2,
                minWidth: 0,
              }}
            >
              <FormControl required>
                <FormLabel>{t('auth.email')}</FormLabel>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl required>
                <FormLabel>{t('auth.password')}</FormLabel>
                <Input
                  type="password"
                  placeholder="•••••••"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
              </FormControl>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Checkbox size="sm" label={t('auth.rememberMe')} name="persistent" />
                <JoyLink level="title-sm" component={Link} to="#">
                  {t('auth.forgotPassword')}
                </JoyLink>
              </Box>
              {error && (
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 'sm',
                    bgcolor: 'danger.50',
                    color: 'danger.500',
                  }}
                >
                  <Typography level="body-sm">{error}</Typography>
                </Box>
              )}
              <Button type="submit" fullWidth loading={loading}>
                {t('auth.signIn')}
              </Button>
            </Box>
            <Box
              component="footer"
              sx={{
                py: 3,
                display: 'flex',
                justifyContent: 'center',
                borderTop: '1px solid',
                borderColor: 'divider',
                mt: 2,
              }}
            >
              <Typography level="body-xs" sx={{ textAlign: 'center' }}>
                © Your company 2025
              </Typography>
            </Box>
          </Card>
        </Box>
      </Box>
    </CssVarsProvider>
  )
}
