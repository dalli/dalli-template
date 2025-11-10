import { useState } from 'react'
import {
  Box,
  Grid,
  Typography,
  Button,
  Breadcrumbs,
  Link as MuiLink,
  Card,
  CardContent,
  Alert,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
} from '@mui/material'
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  AutoAwesome as AutoAwesomeIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Folder as FolderIcon,
  FolderOpen as FolderOpenIcon,
} from '@mui/icons-material'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const countryData = [
  { name: 'India', value: 50, count: 49250 },
  { name: 'USA', value: 35, count: 34475 },
  { name: 'Brazil', value: 10, count: 9850 },
  { name: 'Other', value: 5, count: 4925 },
]

export default function Dashboard() {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['Website']))

  const toggleFolder = (folder: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folder)) {
      newExpanded.delete(folder)
    } else {
      newExpanded.add(folder)
    }
    setExpandedFolders(newExpanded)
  }

  const renderTreeItem = (item: any, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedFolders.has(item.name)

    return (
      <Box key={item.name} sx={{ pl: level * 2 }}>
        <ListItem
          disablePadding
          sx={{
            cursor: hasChildren ? 'pointer' : 'default',
            '&:hover': hasChildren ? { backgroundColor: 'action.hover' } : {},
          }}
          onClick={() => hasChildren && toggleFolder(item.name)}
        >
          <ListItemIcon sx={{ minWidth: 32 }}>
            {hasChildren ? (
              isExpanded ? (
                <FolderOpenIcon fontSize="small" />
              ) : (
                <FolderIcon fontSize="small" />
              )
            ) : (
              <Box sx={{ width: 20 }} />
            )}
          </ListItemIcon>
          <ListItemText primary={item.name} />
          {hasChildren && (
            <Box>{isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}</Box>
          )}
        </ListItem>
        {hasChildren && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map((child: any) => renderTreeItem(child, level + 1))}
            </List>
          </Collapse>
        )}
      </Box>
    )
  }

  const productTree = [
    {
      name: 'Website',
      children: [
        { name: 'Home' },
        { name: 'Pricing' },
        { name: 'About us' },
        { name: 'Blog' },
      ],
    },
    { name: 'Store' },
    { name: 'Contact' },
    { name: 'Help' },
  ]

  return (
    <Box>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <MuiLink color="inherit" href="#">
          Dashboard
        </MuiLink>
        <Typography color="text.primary">Home</Typography>
      </Breadcrumbs>

      {/* Alert Banner */}
      <Alert
        severity="warning"
        action={
          <Button color="inherit" size="small">
            Get the discount
          </Button>
        }
        sx={{ mb: 3 }}
      >
        Plan about to expire
        <br />
        Enjoy 10% off when renewing your plan today.
      </Alert>

      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Apr 17, 2023
          </Typography>
        </Box>
      </Box>

      {/* Overview Section */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Users */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom variant="body2">
                Users
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4">14k</Typography>
                <Chip
                  icon={<TrendingUpIcon />}
                  label="+25%"
                  color="success"
                  size="small"
                  sx={{ height: 24 }}
                />
              </Box>
              <Typography variant="caption" color="text.secondary">
                Last 30 days
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Conversions */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom variant="body2">
                Conversions
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4">325</Typography>
                <Chip
                  icon={<TrendingDownIcon />}
                  label="-25%"
                  color="error"
                  size="small"
                  sx={{ height: 24 }}
                />
              </Box>
              <Typography variant="caption" color="text.secondary">
                Last 30 days
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Event count */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom variant="body2">
                Event count
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4">200k</Typography>
                <Chip
                  icon={<TrendingUpIcon />}
                  label="+5%"
                  color="success"
                  size="small"
                  sx={{ height: 24 }}
                />
              </Box>
              <Typography variant="caption" color="text.secondary">
                Last 30 days
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Explore your data */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Explore your data
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Uncover performance and visitor insights with our data wizardry.
              </Typography>
            </Box>
            <Button variant="contained" startIcon={<AutoAwesomeIcon />}>
              Get insights
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {/* Sessions */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sessions
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 1 }}>
                <Typography variant="h4">13,277</Typography>
                <Chip
                  icon={<TrendingUpIcon />}
                  label="+35%"
                  color="success"
                  size="small"
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Sessions per day for the last 30 days
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Page views and downloads */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Page views and downloads
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 1 }}>
                <Typography variant="h4">1.3M</Typography>
                <Chip
                  icon={<TrendingDownIcon />}
                  label="-8%"
                  color="error"
                  size="small"
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Page views and downloads for the last 6 months
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Details Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Details
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Product tree
              </Typography>
              <List>
                {productTree.map((item) => renderTreeItem(item))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Users by country */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Users by country
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5">98.5K</Typography>
                <Typography variant="body2" color="text.secondary">
                  Total
                </Typography>
              </Box>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={countryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {countryData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
