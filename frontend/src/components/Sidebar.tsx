import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
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
} from '@mui/joy'
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

const menuItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/dashboard' },
  { text: 'Users', icon: <GroupIcon />, path: '/dashboard/users' },
  { text: 'Analytics', icon: <AnalyticsIcon />, path: '/dashboard/analytics' },
  { text: 'Clients', icon: <PeopleIcon />, path: '/dashboard/clients' },
  { text: 'Tasks', icon: <AssignmentIcon />, path: '/dashboard/tasks' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/dashboard/settings' },
  { text: 'About', icon: <InfoIcon />, path: '/dashboard/about' },
  { text: 'Feedback', icon: <FeedbackIcon />, path: '/dashboard/feedback' },
]

export default function Sidebar() {
  const location = useLocation()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleProfile = () => {
    handleClose()
    navigate('/dashboard/profile')
  }

  const handleSettings = () => {
    handleClose()
    navigate('/dashboard/settings')
  }

  const handleLogout = () => {
    handleClose()
    logout()
    navigate('/signin')
  }

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
            <ListItem key={item.text}>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                variant={location.pathname === item.path ? 'soft' : 'plain'}
                color={location.pathname === item.path ? 'primary' : 'neutral'}
              >
                <ListItemDecorator>{item.icon}</ListItemDecorator>
                <ListItemContent>{item.text}</ListItemContent>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8,
              },
            }}
            onClick={handleClick}
          >
            <Avatar size="sm">
              {user?.name?.[0] || 'U'}
            </Avatar>
            <Box>
              <Typography level="body-sm" sx={{ fontWeight: 600 }}>
                {user?.name || 'User'}
              </Typography>
              <Typography level="body-xs" textColor="neutral.500">
                {user?.email || 'user@example.com'}
              </Typography>
            </Box>
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            placement="top-start"
          >
            <MenuItem onClick={handleProfile}>
              <ListItemDecorator>
                <PersonIcon fontSize="small" />
              </ListItemDecorator>
              Profile
            </MenuItem>
            <MenuItem onClick={handleSettings}>
              <ListItemDecorator>
                <SettingsIcon fontSize="small" />
              </ListItemDecorator>
              Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout} color="danger">
              <ListItemDecorator>
                <LogoutIcon fontSize="small" />
              </ListItemDecorator>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Sheet>
  )
}
