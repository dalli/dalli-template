import { Card, Typography, Box } from '@mui/joy'

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  color?: string
}

export default function StatCard({ title, value, icon, color = '#1976d2' }: StatCardProps) {
  return (
    <Card sx={{ height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box
          sx={{
            backgroundColor: color,
            borderRadius: 2,
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            mr: 2,
          }}
        >
          {icon}
        </Box>
        <Typography level="title-md" textColor="neutral.500">
          {title}
        </Typography>
      </Box>
      <Typography level="h2">
        {value}
      </Typography>
    </Card>
  )
}
