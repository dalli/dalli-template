import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  Select,
  Option,
  Card,
  Divider,
} from '@mui/joy'
import LanguageIcon from '@mui/icons-material/Language'

export default function Settings() {
  const { t, i18n } = useTranslation()
  const [language, setLanguage] = useState(i18n.language || 'en')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('i18nextLng') || 'en'
    setLanguage(savedLanguage)
    i18n.changeLanguage(savedLanguage)
  }, [i18n])

  const handleLanguageChange = (newLanguage: string | null) => {
    if (newLanguage) {
      setLanguage(newLanguage)
      i18n.changeLanguage(newLanguage)
      localStorage.setItem('i18nextLng', newLanguage)
    }
  }

  return (
    <Box>
      <Typography level="h1" sx={{ mb: 3 }}>
        {t('settings.title')}
      </Typography>

      <Card sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <LanguageIcon />
          <Box>
            <Typography level="title-lg">{t('settings.language')}</Typography>
            <Typography level="body-sm" textColor="neutral.500">
              {t('settings.languageDesc')}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        <FormControl>
          <FormLabel>{t('settings.language')}</FormLabel>
          <Select
            value={language}
            onChange={(_, value) => handleLanguageChange(value)}
            sx={{ minWidth: 200 }}
          >
            <Option value="en">{t('settings.english')}</Option>
            <Option value="ko">{t('settings.korean')}</Option>
          </Select>
        </FormControl>
      </Card>
    </Box>
  )
}

