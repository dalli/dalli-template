import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Sheet,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  MenuButton,
  Dropdown,
} from '@mui/joy'
import { useColorScheme } from '@mui/joy/styles'
import { useAuth } from '../contexts/AuthContext'
import Logo from './Logo'
import HomeIcon from '@mui/icons-material/Home'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import PeopleIcon from '@mui/icons-material/People'
import AssignmentIcon from '@mui/icons-material/Assignment'
import SettingsIcon from '@mui/icons-material/Settings'
import InfoIcon from '@mui/icons-material/Info'
import FeedbackIcon from '@mui/icons-material/Feedback'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'
import GroupIcon from '@mui/icons-material/Group'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import BrightnessAutoIcon from '@mui/icons-material/BrightnessAuto'
import LanguageIcon from '@mui/icons-material/Language'

export default function Sidebar() {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { setMode } = useColorScheme()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [settingsAnchorEl, setSettingsAnchorEl] = useState<HTMLElement | null>(null)
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | 'system'>(
    () => (localStorage.getItem('theme') as 'light' | 'dark' | 'system') || 'system'
  )

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (currentTheme === 'system') {
        setMode(mediaQuery.matches ? 'dark' : 'light')
      }
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [currentTheme, setMode])

  const menuItems = [
    { textKey: 'common.home', icon: <HomeIcon />, path: '/dashboard' },
    { textKey: 'common.users', icon: <GroupIcon />, path: '/dashboard/users' },
    { textKey: 'common.analytics', icon: <AnalyticsIcon />, path: '/dashboard/analytics' },
    { textKey: 'common.clients', icon: <PeopleIcon />, path: '/dashboard/clients' },
    { textKey: 'common.tasks', icon: <AssignmentIcon />, path: '/dashboard/tasks' },
    { textKey: 'common.settings', icon: <SettingsIcon />, path: '/dashboard/settings' },
    { textKey: 'common.about', icon: <InfoIcon />, path: '/dashboard/about' },
    { textKey: 'common.feedback', icon: <FeedbackIcon />, path: '/dashboard/feedback' },
  ]

  const handleProfile = () => {
    navigate('/dashboard/profile')
  }

  const handleSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setSettingsAnchorEl(event.currentTarget)
    setSettingsOpen(true)
  }

  const handleSettingsClose = () => {
    setSettingsOpen(false)
    setSettingsAnchorEl(null)
  }

  const handleThemeChange = (newMode: 'light' | 'dark' | 'system') => {
    setCurrentTheme(newMode)
    if (newMode === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setMode(prefersDark ? 'dark' : 'light')
      localStorage.setItem('theme', 'system')
    } else {
      setMode(newMode)
      localStorage.setItem('theme', newMode)
    }
    handleSettingsClose()
  }

  const handleLanguageChange = (newLanguage: 'en' | 'ko') => {
    i18n.changeLanguage(newLanguage)
    localStorage.setItem('i18nextLng', newLanguage)
    handleSettingsClose()
  }

  const handleLogout = () => {
    logout()
    navigate('/signin')
  }

  const currentLanguage = i18n.language || 'en'

  return (
    <Sheet
      variant="soft"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box sx={{ p: 2 }}>
        <Logo variant="h6" />
      </Box>
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.textKey}>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                variant={location.pathname === item.path ? 'soft' : 'plain'}
                color={location.pathname === item.path ? 'primary' : 'neutral'}
              >
                <ListItemDecorator>{item.icon}</ListItemDecorator>
                <ListItemContent>{t(item.textKey)}</ListItemContent>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Dropdown>
            <MenuButton
              variant="plain"
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                justifyContent: 'flex-start',
                p: 1,
                '&:hover': {
                  bgcolor: 'background.level1',
                },
              }}
            >
              <Avatar size="sm">
                {user?.name?.[0] || 'U'}
              </Avatar>
              <Box sx={{ flex: 1, textAlign: 'left' }}>
                <Typography level="body-sm" sx={{ fontWeight: 600 }}>
                  {user?.name || 'User'}
                </Typography>
                <Typography level="body-xs" textColor="neutral.500">
                  {user?.email || 'user@example.com'}
                </Typography>
              </Box>
            </MenuButton>
            <Menu placement="top-start" sx={{ zIndex: 1300 }}>
              <MenuItem onClick={handleProfile}>
                <ListItemDecorator>
                  <PersonIcon fontSize="small" />
                </ListItemDecorator>
                {t('common.profile')}
              </MenuItem>
              <MenuItem onClick={handleSettingsClick}>
                <ListItemDecorator>
                  <SettingsIcon fontSize="small" />
                </ListItemDecorator>
                {t('common.settings')}
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout} color="danger">
                <ListItemDecorator>
                  <LogoutIcon fontSize="small" />
                </ListItemDecorator>
                {t('common.logout')}
              </MenuItem>
            </Menu>
          </Dropdown>
          <Menu
            anchorEl={settingsAnchorEl}
            open={settingsOpen}
            onClose={handleSettingsClose}
            placement="right-start"
            sx={{ zIndex: 1400 }}
          >
            <MenuItem disabled>
              <Typography level="body-sm" sx={{ fontWeight: 600 }}>
                {t('settings.theme')}
              </Typography>
            </MenuItem>
            <MenuItem
              selected={currentTheme === 'light'}
              onClick={() => handleThemeChange('light')}
            >
              <ListItemDecorator>
                <LightModeIcon fontSize="small" />
              </ListItemDecorator>
              {t('settings.light')}
            </MenuItem>
            <MenuItem
              selected={currentTheme === 'dark'}
              onClick={() => handleThemeChange('dark')}
            >
              <ListItemDecorator>
                <DarkModeIcon fontSize="small" />
              </ListItemDecorator>
              {t('settings.dark')}
            </MenuItem>
            <MenuItem
              selected={currentTheme === 'system'}
              onClick={() => handleThemeChange('system')}
            >
              <ListItemDecorator>
                <BrightnessAutoIcon fontSize="small" />
              </ListItemDecorator>
              {t('settings.system')}
            </MenuItem>
            <Divider />
            <MenuItem disabled>
              <Typography level="body-sm" sx={{ fontWeight: 600 }}>
                {t('settings.language')}
              </Typography>
            </MenuItem>
            <MenuItem
              selected={currentLanguage === 'en'}
              onClick={() => handleLanguageChange('en')}
            >
              <ListItemDecorator>
                <LanguageIcon fontSize="small" />
              </ListItemDecorator>
              {t('settings.english')}
            </MenuItem>
            <MenuItem
              selected={currentLanguage === 'ko'}
              onClick={() => handleLanguageChange('ko')}
            >
              <ListItemDecorator>
                <LanguageIcon fontSize="small" />
              </ListItemDecorator>
              {t('settings.korean')}
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Sheet>
  )
}
