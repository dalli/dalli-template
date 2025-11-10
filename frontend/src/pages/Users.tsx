import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Sheet,
  Typography,
  Button,
  Modal,
  ModalDialog,
  ModalClose,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Chip,
  Alert,
  Table,
  IconButton,
} from '@mui/joy'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useAuth } from '../contexts/AuthContext'

interface User {
  id: number
  email: string
  name: string
  role: string
  is_active: boolean
  created_at: string
}

interface UserFormData {
  email: string
  name: string
  password: string
}

export default function Users() {
  const { t, i18n } = useTranslation()
  const { token } = useAuth()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState<UserFormData>({
    email: '',
    name: '',
    password: '',
  })
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    color: 'success' as 'success' | 'danger',
  })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:8000/api/users/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        setUsers(data)
      } else {
        showSnackbar(t('users.fetchError'), 'danger')
      }
    } catch (error) {
      console.error('Error fetching users:', error)
      showSnackbar(t('users.fetchError'), 'danger')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [token])

  const showSnackbar = (message: string, color: 'success' | 'danger') => {
    setSnackbar({ open: true, message, color })
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  const handleOpenDialog = (user?: User) => {
    if (user) {
      setEditingUser(user)
      setFormData({
        email: user.email,
        name: user.name,
        password: '',
      })
    } else {
      setEditingUser(null)
      setFormData({
        email: '',
        name: '',
        password: '',
      })
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingUser(null)
    setFormData({
      email: '',
      name: '',
      password: '',
    })
  }

  const handleSubmit = async () => {
    try {
      const url = editingUser
        ? `http://localhost:8000/api/users/${editingUser.id}`
        : 'http://localhost:8000/api/users/'
      
      const method = editingUser ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        showSnackbar(
          editingUser ? t('users.updateSuccess') : t('users.createSuccess'),
          'success'
        )
        handleCloseDialog()
        fetchUsers()
      } else {
        const error = await response.json()
        showSnackbar(error.detail || t('users.saveError'), 'danger')
      }
    } catch (error) {
      console.error('Error saving user:', error)
      showSnackbar(t('users.saveError'), 'danger')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm(t('users.confirmDelete'))) {
      return
    }

    try {
      const response = await fetch(`http://localhost:8000/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        showSnackbar(t('users.deleteSuccess'), 'success')
        fetchUsers()
      } else {
        showSnackbar(t('users.deleteError'), 'danger')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      showSnackbar(t('users.deleteError'), 'danger')
    }
  }

  // Pagination logic
  const totalPages = Math.ceil(users.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedUsers = users.slice(startIndex, endIndex)

  const getLocale = () => {
    return i18n.language === 'ko' ? 'ko-KR' : 'en-US'
  }

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography level="h1">
          {t('users.title')}
        </Typography>
        <Button
          variant="solid"
          startDecorator={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          {t('users.addUser')}
        </Button>
      </Box>

      <Sheet variant="outlined" sx={{ borderRadius: 'sm', overflow: 'auto' }}>
        <Table>
          <thead>
            <tr>
              <th style={{ width: 70, textAlign: 'center' }}>{t('users.id')}</th>
              <th style={{ minWidth: 150 }}>{t('users.nameLabel')}</th>
              <th style={{ minWidth: 200 }}>{t('users.emailLabel')}</th>
              <th style={{ width: 120, textAlign: 'center' }}>{t('users.role')}</th>
              <th style={{ width: 100, textAlign: 'center' }}>{t('users.status')}</th>
              <th style={{ width: 180 }}>{t('users.createdAt')}</th>
              <th style={{ width: 100, textAlign: 'center' }}>{t('common.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '2rem' }}>
                  <Typography>{t('common.loading')}</Typography>
                </td>
              </tr>
            ) : paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '2rem' }}>
                  <Typography>{t('common.noData')}</Typography>
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user) => (
                <tr key={user.id}>
                  <td style={{ textAlign: 'center' }}>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td style={{ textAlign: 'center' }}>
                    <Chip
                      size="sm"
                      variant="soft"
                      color={user.role === 'admin' ? 'danger' : 'neutral'}
                    >
                      {user.role}
                    </Chip>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <Chip
                      size="sm"
                      variant="soft"
                      color={user.is_active ? 'success' : 'neutral'}
                    >
                      {user.is_active ? t('common.active') : t('common.inactive')}
                    </Chip>
                  </td>
                  <td>{new Date(user.created_at).toLocaleString(getLocale())}</td>
                  <td style={{ textAlign: 'center' }}>
                    <IconButton
                      size="sm"
                      variant="plain"
                      color="neutral"
                      onClick={() => handleOpenDialog(user)}
                      sx={{ mr: 0.5 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="sm"
                      variant="plain"
                      color="danger"
                      onClick={() => handleDelete(user.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
        {users.length > itemsPerPage && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2, gap: 1 }}>
            <Button
              variant="outlined"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              {t('common.previous')}
            </Button>
            <Typography level="body-sm" sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
              {currentPage} / {totalPages}
            </Typography>
            <Button
              variant="outlined"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              {t('common.next')}
            </Button>
          </Box>
        )}
      </Sheet>

      <Modal open={openDialog} onClose={handleCloseDialog}>
        <ModalDialog>
          <ModalClose />
          <DialogTitle>{editingUser ? t('users.editUser') : t('users.addUser')}</DialogTitle>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <FormControl required>
              <FormLabel>{t('users.nameLabel')}</FormLabel>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t('users.namePlaceholder')}
              />
            </FormControl>
            <FormControl required>
              <FormLabel>{t('users.emailLabel')}</FormLabel>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder={t('users.emailPlaceholder')}
              />
            </FormControl>
            <FormControl required={!editingUser}>
              <FormLabel>
                {editingUser ? t('users.passwordChangeLabel') : t('users.passwordLabel')}
              </FormLabel>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder={t('users.passwordPlaceholder')}
              />
              {editingUser && (
                <Typography level="body-xs" textColor="neutral.500" sx={{ mt: 0.5 }}>
                  {t('users.passwordChangeHint')}
                </Typography>
              )}
            </FormControl>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
            <Button variant="outlined" onClick={handleCloseDialog} sx={{ flex: 1 }}>
              {t('common.cancel')}
            </Button>
            <Button
              variant="solid"
              onClick={handleSubmit}
              disabled={!formData.name || !formData.email || (!editingUser && !formData.password)}
              sx={{ flex: 1 }}
            >
              {editingUser ? t('common.save') : t('common.add')}
            </Button>
          </Stack>
        </ModalDialog>
      </Modal>

      {snackbar.open && (
        <Alert
          color={snackbar.color}
          variant="soft"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 9999,
            minWidth: 300,
          }}
          endDecorator={
            <IconButton
              variant="plain"
              size="sm"
              onClick={handleCloseSnackbar}
            >
              ×
            </IconButton>
          }
        >
          {snackbar.message}
        </Alert>
      )}
    </Box>
  )
}
