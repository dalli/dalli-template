import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Grid,
  Typography,
  Button,
  Breadcrumbs,
  Link as JoyLink,
  Card,
  Alert,
  Chip,
  List,
  ListItem,
  ListItemContent,
  ListItemDecorator,
} from '@mui/joy'
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
  const { t } = useTranslation()
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
          sx={{
            cursor: hasChildren ? 'pointer' : 'default',
            '&:hover': hasChildren ? { backgroundColor: 'background.level1' } : {},
          }}
          onClick={() => hasChildren && toggleFolder(item.name)}
        >
          <ListItemDecorator>
            {hasChildren ? (
              isExpanded ? (
                <FolderOpenIcon fontSize="small" />
              ) : (
                <FolderIcon fontSize="small" />
              )
            ) : (
              <Box sx={{ width: 20 }} />
            )}
          </ListItemDecorator>
          <ListItemContent>{item.name}</ListItemContent>
          {hasChildren && (
            <Box>{isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}</Box>
          )}
        </ListItem>
        {hasChildren && isExpanded && (
          <List>
            {item.children.map((child: any) => renderTreeItem(child, level + 1))}
          </List>
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
    <Box sx={{ width: '100%' }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <JoyLink href="#" color="neutral">
          {t('dashboard.breadcrumb')}
        </JoyLink>
        <Typography>{t('common.home')}</Typography>
      </Breadcrumbs>

      {/* Alert Banner */}
      <Alert
        color="warning"
        endDecorator={
          <Button size="sm" variant="soft" color="warning">
            {t('dashboard.getDiscount')}
          </Button>
        }
        sx={{ mb: 3 }}
      >
        {t('dashboard.alertTitle')}
        <br />
        {t('dashboard.alertMessage')}
      </Alert>

      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography level="h1" gutterBottom>
            {t('dashboard.title')}
          </Typography>
          <Typography level="body-sm" textColor="neutral.500">
            {t('dashboard.date')}
          </Typography>
        </Box>
      </Box>

      {/* Overview Section */}
      <Typography level="title-lg" sx={{ mb: 2 }}>
        {t('dashboard.overview')}
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Users */}
        <Grid xs={12} sm={6} md={4}>
          <Card>
            <Typography level="body-sm" textColor="neutral.500" gutterBottom>
              {t('dashboard.users')}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography level="h2">14k</Typography>
              <Chip
                startDecorator={<TrendingUpIcon />}
                color="success"
                size="sm"
                variant="soft"
              >
                +25%
              </Chip>
            </Box>
            <Typography level="body-xs" textColor="neutral.500" sx={{ mt: 1 }}>
              {t('dashboard.last30Days')}
            </Typography>
          </Card>
        </Grid>

        {/* Conversions */}
        <Grid xs={12} sm={6} md={4}>
          <Card>
            <Typography level="body-sm" textColor="neutral.500" gutterBottom>
              {t('dashboard.conversions')}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography level="h2">325</Typography>
              <Chip
                startDecorator={<TrendingDownIcon />}
                color="danger"
                size="sm"
                variant="soft"
              >
                -25%
              </Chip>
            </Box>
            <Typography level="body-xs" textColor="neutral.500" sx={{ mt: 1 }}>
              {t('dashboard.last30Days')}
            </Typography>
          </Card>
        </Grid>

        {/* Event count */}
        <Grid xs={12} sm={6} md={4}>
          <Card>
            <Typography level="body-sm" textColor="neutral.500" gutterBottom>
              {t('dashboard.eventCount')}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography level="h2">200k</Typography>
              <Chip
                startDecorator={<TrendingUpIcon />}
                color="success"
                size="sm"
                variant="soft"
              >
                +5%
              </Chip>
            </Box>
            <Typography level="body-xs" textColor="neutral.500" sx={{ mt: 1 }}>
              {t('dashboard.last30Days')}
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Explore your data */}
      <Card sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography level="title-lg" gutterBottom>
              {t('dashboard.exploreData')}
            </Typography>
            <Typography level="body-sm" textColor="neutral.500">
              {t('dashboard.exploreDataDesc')}
            </Typography>
          </Box>
          <Button variant="solid" startDecorator={<AutoAwesomeIcon />}>
            {t('dashboard.getInsights')}
          </Button>
        </Box>
      </Card>

      <Grid container spacing={3}>
        {/* Sessions */}
        <Grid xs={12} md={6}>
          <Card>
            <Typography level="title-lg" gutterBottom>
              {t('dashboard.sessions')}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 1 }}>
              <Typography level="h2">13,277</Typography>
              <Chip
                startDecorator={<TrendingUpIcon />}
                color="success"
                size="sm"
                variant="soft"
              >
                +35%
              </Chip>
            </Box>
            <Typography level="body-sm" textColor="neutral.500">
              {t('dashboard.sessionsDesc')}
            </Typography>
          </Card>
        </Grid>

        {/* Page views and downloads */}
        <Grid xs={12} md={6}>
          <Card>
            <Typography level="title-lg" gutterBottom>
              {t('dashboard.pageViews')}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 1 }}>
              <Typography level="h2">1.3M</Typography>
              <Chip
                startDecorator={<TrendingDownIcon />}
                color="danger"
                size="sm"
                variant="soft"
              >
                -8%
              </Chip>
            </Box>
            <Typography level="body-sm" textColor="neutral.500">
              {t('dashboard.pageViewsDesc')}
            </Typography>
          </Card>
        </Grid>

        {/* Details Section */}
        <Grid xs={12} md={6}>
          <Card>
            <Typography level="title-lg" gutterBottom>
              {t('dashboard.details')}
            </Typography>
            <Typography level="title-lg" gutterBottom sx={{ mt: 2 }}>
              {t('dashboard.productTree')}
            </Typography>
            <List>
              {productTree.map((item) => renderTreeItem(item))}
            </List>
          </Card>
        </Grid>

        {/* Users by country */}
        <Grid xs={12} md={6}>
          <Card>
            <Typography level="title-lg" gutterBottom>
              {t('dashboard.usersByCountry')}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography level="h3">98.5K</Typography>
              <Typography level="body-sm" textColor="neutral.500">
                {t('dashboard.total')}
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
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
