import { useState, useEffect } from 'react'
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
        showSnackbar('사용자 목록을 불러오는데 실패했습니다', 'danger')
      }
    } catch (error) {
      console.error('Error fetching users:', error)
      showSnackbar('사용자 목록을 불러오는데 실패했습니다', 'danger')
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
          editingUser ? '사용자가 수정되었습니다' : '사용자가 생성되었습니다',
          'success'
        )
        handleCloseDialog()
        fetchUsers()
      } else {
        const error = await response.json()
        showSnackbar(error.detail || '작업에 실패했습니다', 'danger')
      }
    } catch (error) {
      console.error('Error saving user:', error)
      showSnackbar('작업에 실패했습니다', 'danger')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('정말 이 사용자를 삭제하시겠습니까?')) {
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
        showSnackbar('사용자가 삭제되었습니다', 'success')
        fetchUsers()
      } else {
        showSnackbar('사용자 삭제에 실패했습니다', 'danger')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      showSnackbar('사용자 삭제에 실패했습니다', 'danger')
    }
  }

  // Pagination logic
  const totalPages = Math.ceil(users.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedUsers = users.slice(startIndex, endIndex)

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography level="h1">
          사용자 관리
        </Typography>
        <Button
          variant="solid"
          startDecorator={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          사용자 추가
        </Button>
      </Box>

      <Sheet variant="outlined" sx={{ borderRadius: 'sm', overflow: 'auto' }}>
        <Table>
          <thead>
            <tr>
              <th style={{ width: 70, textAlign: 'center' }}>ID</th>
              <th style={{ minWidth: 150 }}>이름</th>
              <th style={{ minWidth: 200 }}>이메일</th>
              <th style={{ width: 120, textAlign: 'center' }}>역할</th>
              <th style={{ width: 100, textAlign: 'center' }}>상태</th>
              <th style={{ width: 180 }}>생성일</th>
              <th style={{ width: 100, textAlign: 'center' }}>작업</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '2rem' }}>
                  <Typography>로딩 중...</Typography>
                </td>
              </tr>
            ) : paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '2rem' }}>
                  <Typography>사용자가 없습니다</Typography>
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
                      {user.is_active ? '활성' : '비활성'}
                    </Chip>
                  </td>
                  <td>{new Date(user.created_at).toLocaleString('ko-KR')}</td>
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
              이전
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
              다음
            </Button>
          </Box>
        )}
      </Sheet>

      <Modal open={openDialog} onClose={handleCloseDialog}>
        <ModalDialog>
          <ModalClose />
          <DialogTitle>{editingUser ? '사용자 수정' : '사용자 추가'}</DialogTitle>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <FormControl required>
              <FormLabel>이름</FormLabel>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="이름을 입력하세요"
              />
            </FormControl>
            <FormControl required>
              <FormLabel>이메일</FormLabel>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="이메일을 입력하세요"
              />
            </FormControl>
            <FormControl required={!editingUser}>
              <FormLabel>
                {editingUser ? '비밀번호 (변경하려면 입력)' : '비밀번호'}
              </FormLabel>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="비밀번호를 입력하세요"
              />
              {editingUser && (
                <Typography level="body-xs" textColor="neutral.500" sx={{ mt: 0.5 }}>
                  비밀번호를 변경하지 않으려면 비워두세요
                </Typography>
              )}
            </FormControl>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
            <Button variant="outlined" onClick={handleCloseDialog} sx={{ flex: 1 }}>
              취소
            </Button>
            <Button
              variant="solid"
              onClick={handleSubmit}
              disabled={!formData.name || !formData.email || (!editingUser && !formData.password)}
              sx={{ flex: 1 }}
            >
              {editingUser ? '수정' : '추가'}
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
