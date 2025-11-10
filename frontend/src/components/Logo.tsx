import { Link } from 'react-router-dom'
import { Box, Typography } from '@mui/material'

interface LogoProps {
  variant?: 'h4' | 'h5' | 'h6'
  sx?: any
}

export default function Logo({ variant = 'h6', sx }: LogoProps) {
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
      <Typography variant={variant} component="span" sx={{ fontWeight: 700 }}>
        DalliSoft
      </Typography>
    </Box>
  )
}

