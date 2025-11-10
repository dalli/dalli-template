import { Link } from 'react-router-dom'
import { Box, Typography } from '@mui/joy'

interface LogoProps {
  variant?: 'h4' | 'h5' | 'h6'
  sx?: any
}

export default function Logo({ variant = 'h6', sx }: LogoProps) {
  const level = variant === 'h4' ? 'h4' : variant === 'h5' ? 'h4' : 'h4'
  
  return (
    <Box
      component={Link}
      to="/"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        textDecoration: 'none',
        color: 'inherit',
        ...sx,
      }}
    >
      <Box
        component="img"
        src="/DalliSoft-logo-0.svg"
        alt="DalliSoft Logo"
        sx={{
          height: variant === 'h4' ? 40 : variant === 'h5' ? 32 : 28,
          width: 'auto',
        }}
      />
      <Typography level={level} sx={{ fontWeight: 700 }}>
        DalliSoft
      </Typography>
    </Box>
  )
}

