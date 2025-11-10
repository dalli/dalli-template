import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Box, Sheet, IconButton } from '@mui/joy'
import MenuIcon from '@mui/icons-material/Menu'
import Sidebar from '../components/Sidebar'

const drawerWidth = 240

export default function DashboardLayout() {
  const [open, setOpen] = useState(true)

  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: open ? drawerWidth : 0,
          height: '100%',
          zIndex: 1200,
          transition: 'width 0.3s ease',
          overflow: 'hidden',
        }}
      >
        <Sidebar />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          marginLeft: open ? `${drawerWidth}px` : 0,
          transition: 'margin-left 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 1100,
            p: 1,
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <IconButton
            variant="plain"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
        </Sheet>
        <Box sx={{ flex: 1, p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
