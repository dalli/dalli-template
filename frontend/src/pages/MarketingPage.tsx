import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Button,
  Input,
  Link as JoyLink,
  Sheet,
  Grid,
  Box,
  Typography,
  Card,
  Avatar,
  Accordion,
  AccordionGroup,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Chip,
} from '@mui/joy'
import {
  ExpandMore as ExpandMoreIcon,
  Dashboard as DashboardIcon,
  PhoneAndroid as PhoneAndroidIcon,
  Devices as DevicesIcon,
} from '@mui/icons-material'
import Logo from '../components/Logo'

export default function MarketingPage() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* AppBar */}
      <Sheet
        variant="outlined"
        sx={{
          p: 1,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2 }}>
          <Logo variant="h6" />
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button variant="plain" color="neutral">{t('marketing.footer.features')}</Button>
            <Button variant="plain" color="neutral">{t('marketing.testimonials')}</Button>
            <Button variant="plain" color="neutral">{t('marketing.highlights')}</Button>
            <Button variant="plain" color="neutral">{t('marketing.pricing')}</Button>
            <Button variant="plain" color="neutral">{t('marketing.faq')}</Button>
            <Button variant="plain" color="neutral">Blog</Button>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="plain" color="neutral" component={Link} to="/signin">
              {t('auth.signIn')}
            </Button>
            <Button variant="solid" color="primary" component={Link} to="/signup">
              {t('auth.signUp')}
            </Button>
          </Box>
        </Box>
      </Sheet>

      {/* Hero Section */}
      <Box sx={{ maxWidth: 'md', mx: 'auto', py: 12, textAlign: 'center', px: 2 }}>
        <Typography level="h1" sx={{ fontWeight: 700, mb: 3 }}>
          {t('marketing.title')}
        </Typography>
        <Typography level="title-lg" textColor="neutral.500" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
          {t('marketing.subtitle')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mb: 6 }}>
          <Input
            placeholder={t('auth.email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ minWidth: 300 }}
          />
          <Button variant="solid" size="lg" color="primary">
            {t('marketing.startNow')}
          </Button>
        </Box>
        <Typography level="body-sm" textColor="neutral.500">
          {t('marketing.terms')}
        </Typography>

        {/* Trusted by */}
        <Box sx={{ mt: 8 }}>
          <Typography level="body-sm" textColor="neutral.500" sx={{ mb: 3 }}>
            {t('marketing.trustedBy')}
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Grid xs="auto" key={i}>
                <Typography level="body-sm" textColor="neutral.500">
                  Fake company number {i}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ bgcolor: 'background.surface', py: 10 }}>
        <Box sx={{ maxWidth: 'lg', mx: 'auto', px: 2 }}>
          <Typography level="h2" textAlign="center" gutterBottom sx={{ mb: 2 }}>
            {t('marketing.features')}
          </Typography>
          <Typography level="body-md" textColor="neutral.500" textAlign="center" sx={{ mb: 6 }}>
            {t('marketing.featuresDesc')}
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                titleKey: 'marketing.dashboard',
                descKey: 'marketing.dashboardDesc',
                icon: <DashboardIcon sx={{ fontSize: 40 }} />,
              },
              {
                titleKey: 'marketing.mobileIntegration',
                descKey: 'marketing.mobileIntegrationDesc',
                icon: <PhoneAndroidIcon sx={{ fontSize: 40 }} />,
              },
              {
                titleKey: 'marketing.allPlatforms',
                descKey: 'marketing.allPlatformsDesc',
                icon: <DevicesIcon sx={{ fontSize: 40 }} />,
              },
            ].map((feature, index) => (
              <Grid xs={12} md={4} key={index}>
                <Card variant="outlined" sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                  <Box sx={{ color: 'primary.500', mb: 2 }}>{feature.icon}</Box>
                  <Typography level="title-lg" gutterBottom>
                    {t(feature.titleKey)}
                  </Typography>
                  <Typography level="body-sm" textColor="neutral.500">
                    {t(feature.descKey)}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ bgcolor: 'background.level1', py: 10 }}>
        <Box sx={{ maxWidth: 'lg', mx: 'auto', px: 2 }}>
          <Typography level="h2" textAlign="center" gutterBottom sx={{ mb: 2 }}>
            {t('marketing.testimonials')}
          </Typography>
          <Typography level="body-md" textColor="neutral.500" textAlign="center" sx={{ mb: 6 }}>
            {t('marketing.testimonialsDesc')}
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                name: 'Remy Sharp',
                role: 'Senior Engineer',
                text: "I absolutely love how versatile this product is! Whether I'm tackling work projects or indulging in my favorite hobbies, it seamlessly adapts to my changing needs. Its intuitive design has truly enhanced my daily routine, making tasks more efficient and enjoyable.",
                logo: 'Logo 1',
              },
              {
                name: 'Travis Howard',
                role: 'Lead Product Designer',
                text: "One of the standout features of this product is the exceptional customer support. In my experience, the team behind this product has been quick to respond and incredibly helpful. It's reassuring to know that they stand firmly behind their product.",
                logo: 'Logo 2',
              },
              {
                name: 'Cindy Baker',
                role: 'CTO',
                text: 'The level of simplicity and user-friendliness in this product has significantly simplified my life. I appreciate the creators for delivering a solution that not only meets but exceeds user expectations.',
                logo: 'Logo 3',
              },
              {
                name: 'Julia Stewart',
                role: 'Senior Engineer',
                text: "I appreciate the attention to detail in the design of this product. The small touches make a big difference, and it's evident that the creators focused on delivering a premium experience.",
                logo: 'Logo 4',
              },
              {
                name: 'John Smith',
                role: 'Product Designer',
                text: "I've tried other similar products, but this one stands out for its innovative features. It's clear that the makers put a lot of thought into creating a solution that truly addresses user needs.",
                logo: 'Logo 5',
              },
              {
                name: 'Daniel Wolf',
                role: 'CDO',
                text: "The quality of this product exceeded my expectations. It's durable, well-designed, and built to last. Definitely worth the investment!",
                logo: 'Logo 6',
              },
            ].map((testimonial, index) => (
              <Grid xs={12} md={4} key={index}>
                <Card variant="outlined" sx={{ height: '100%', p: 3 }}>
                  <Typography level="body-sm" textColor="neutral.500" sx={{ mb: 2 }}>
                    {testimonial.text}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
                    <Avatar sx={{ mr: 2 }}>{testimonial.name[0]}</Avatar>
                    <Box>
                      <Typography level="title-sm">{testimonial.name}</Typography>
                      <Typography level="body-xs" textColor="neutral.500">
                        {testimonial.role}
                      </Typography>
                    </Box>
                    <Typography level="body-xs" textColor="neutral.500" sx={{ ml: 'auto' }}>
                      {testimonial.logo}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Highlights Section */}
      <Box sx={{ bgcolor: 'background.surface', py: 10 }}>
        <Box sx={{ maxWidth: 'lg', mx: 'auto', px: 2 }}>
          <Typography level="h2" textAlign="center" gutterBottom sx={{ mb: 2 }}>
            {t('marketing.highlights')}
          </Typography>
          <Typography level="body-md" textColor="neutral.500" textAlign="center" sx={{ mb: 6 }}>
            {t('marketing.highlightsDesc')}
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                titleKey: 'auth.adaptablePerformance',
                descKey: 'auth.adaptablePerformanceDesc',
              },
              {
                titleKey: 'auth.builtToLast',
                descKey: 'auth.builtToLastDesc',
              },
              {
                titleKey: 'auth.greatUserExperience',
                descKey: 'auth.greatUserExperienceDesc',
              },
              {
                titleKey: 'auth.innovativeFunctionality',
                descKey: 'auth.innovativeFunctionalityDesc',
              },
              {
                titleKey: 'auth.greatUserExperience',
                descKey: 'auth.greatUserExperienceDesc',
              },
              {
                titleKey: 'auth.innovativeFunctionality',
                descKey: 'auth.innovativeFunctionalityDesc',
              },
            ].map((highlight, index) => (
              <Grid xs={12} md={4} key={index}>
                <Box>
                  <Typography level="title-lg" gutterBottom>
                    {t(highlight.titleKey)}
                  </Typography>
                  <Typography level="body-sm" textColor="neutral.500">
                    {t(highlight.descKey)}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Pricing Section */}
      <Box sx={{ bgcolor: 'background.level1', py: 10 }}>
        <Box sx={{ maxWidth: 'lg', mx: 'auto', px: 2 }}>
          <Typography level="h2" textAlign="center" gutterBottom sx={{ mb: 2 }}>
            {t('marketing.pricing')}
          </Typography>
          <Typography level="body-md" textColor="neutral.500" textAlign="center" sx={{ mb: 6 }}>
            {t('marketing.pricingDesc')}
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              {
                name: 'Free',
                price: '$0',
                period: 'per month',
                features: [
                  '10 users included',
                  '2 GB of storage',
                  'Help center access',
                  'Email support',
                ],
                buttonText: 'Sign up for free',
                recommended: false,
              },
              {
                name: 'Professional',
                price: '$15',
                period: 'per month',
                features: [
                  '20 users included',
                  '10 GB of storage',
                  'Help center access',
                  'Priority email support',
                  'Dedicated team',
                  'Best deals',
                ],
                buttonText: t('marketing.startNow'),
                recommended: true,
              },
              {
                name: 'Enterprise',
                price: '$30',
                period: 'per month',
                features: [
                  '50 users included',
                  '30 GB of storage',
                  'Help center access',
                  'Phone & email support',
                ],
                buttonText: 'Contact us',
                recommended: false,
              },
            ].map((plan, index) => (
              <Grid xs={12} md={4} key={index}>
                <Card
                  variant={plan.recommended ? 'soft' : 'outlined'}
                  color={plan.recommended ? 'primary' : 'neutral'}
                  sx={{
                    height: '100%',
                    position: 'relative',
                    border: plan.recommended ? 2 : 1,
                    borderColor: plan.recommended ? 'primary.500' : 'divider',
                  }}
                >
                  {plan.recommended && (
                    <Chip
                      size="sm"
                      variant="solid"
                      color="primary"
                      sx={{ position: 'absolute', top: 16, right: 16 }}
                    >
                      Recommended
                    </Chip>
                  )}
                  <Box sx={{ p: 4 }}>
                    <Typography level="title-lg" gutterBottom>
                      {plan.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
                      <Typography level="h1" component="span">
                        {plan.price}
                      </Typography>
                      <Typography level="body-sm" textColor="neutral.500" sx={{ ml: 1 }}>
                        {plan.period}
                      </Typography>
                    </Box>
                    <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mb: 3 }}>
                      {plan.features.map((feature, i) => (
                        <Box
                          component="li"
                          key={i}
                          sx={{
                            py: 1,
                            borderBottom: i < plan.features.length - 1 ? 1 : 0,
                            borderColor: 'divider',
                          }}
                        >
                          <Typography level="body-sm">{feature}</Typography>
                        </Box>
                      ))}
                    </Box>
                    <Button
                      variant={plan.recommended ? 'solid' : 'outlined'}
                      fullWidth
                      color="primary"
                    >
                      {plan.buttonText}
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ bgcolor: 'background.surface', py: 10 }}>
        <Box sx={{ maxWidth: 'md', mx: 'auto', px: 2 }}>
          <Typography level="h2" textAlign="center" gutterBottom sx={{ mb: 2 }}>
            {t('marketing.faq')}
          </Typography>
          <Box sx={{ mt: 4 }}>
            <AccordionGroup>
              {[
                {
                  question: 'How do I contact customer support if I have a question or issue?',
                  answer:
                    "You can reach our customer support team by emailing support@email.com or calling our toll-free number. We're here to assist you promptly.",
                },
                {
                  question: "Can I return the product if it doesn't meet my expectations?",
                  answer:
                    "Absolutely! We offer a hassle-free return policy. If you're not completely satisfied, you can return the product within [number of days] days for a full refund or exchange.",
                },
                {
                  question: 'What makes your product stand out from others in the market?',
                  answer:
                    'Our product distinguishes itself through its adaptability, durability, and innovative features. We prioritize user satisfaction and continually strive to exceed expectations in every aspect.',
                },
                {
                  question: 'Is there a warranty on the product, and what does it cover?',
                  answer:
                    'Yes, our product comes with a [length of warranty] warranty. It covers defects in materials and workmanship. If you encounter any issues covered by the warranty, please contact our customer support for assistance.',
                },
              ].map((faq, index) => (
                <Accordion key={index}>
                  <AccordionSummary
                    indicator={<ExpandMoreIcon />}
                  >
                    <Typography level="title-sm">{faq.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography level="body-sm" textColor="neutral.500">
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </AccordionGroup>
          </Box>
        </Box>
      </Box>

      {/* Newsletter Section */}
      <Box sx={{ bgcolor: 'primary.500', py: 8, color: 'white' }}>
        <Box sx={{ maxWidth: 'sm', mx: 'auto', textAlign: 'center', px: 2 }}>
          <Typography level="title-lg" gutterBottom>
            {t('marketing.newsletter')}
          </Typography>
          <Typography level="body-sm" sx={{ mb: 4, opacity: 0.9 }}>
            {t('marketing.newsletterDesc')}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Input
              placeholder={t('auth.email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                minWidth: 300,
                bgcolor: 'white',
              }}
            />
            <Button variant="solid" size="lg" sx={{ bgcolor: 'white', color: 'primary.500' }}>
              {t('marketing.subscribe')}
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: 'background.surface', py: 6, borderTop: 1, borderColor: 'divider' }}>
        <Box sx={{ maxWidth: 'lg', mx: 'auto', px: 2 }}>
          <Grid container spacing={4}>
            <Grid xs={12} md={3}>
              <Typography level="title-lg" gutterBottom>
                {t('marketing.footer.product')}
              </Typography>
              <Stack spacing={1}>
                <JoyLink href="#" textColor="neutral.500" underline="hover">
                  {t('marketing.footer.features')}
                </JoyLink>
                <JoyLink href="#" textColor="neutral.500" underline="hover">
                  {t('marketing.footer.testimonials')}
                </JoyLink>
                <JoyLink href="#" textColor="neutral.500" underline="hover">
                  {t('marketing.footer.highlights')}
                </JoyLink>
                <JoyLink href="#" textColor="neutral.500" underline="hover">
                  {t('marketing.footer.pricing')}
                </JoyLink>
                <JoyLink href="#" textColor="neutral.500" underline="hover">
                  {t('marketing.footer.faqs')}
                </JoyLink>
              </Stack>
            </Grid>
            <Grid xs={12} md={3}>
              <Typography level="title-lg" gutterBottom>
                {t('marketing.footer.company')}
              </Typography>
              <Stack spacing={1}>
                <JoyLink href="#" textColor="neutral.500" underline="hover">
                  {t('marketing.footer.aboutUs')}
                </JoyLink>
                <JoyLink href="#" textColor="neutral.500" underline="hover">
                  {t('marketing.footer.careers')}
                </JoyLink>
                <JoyLink href="#" textColor="neutral.500" underline="hover">
                  {t('marketing.footer.press')}
                </JoyLink>
              </Stack>
            </Grid>
            <Grid xs={12} md={3}>
              <Typography level="title-lg" gutterBottom>
                {t('marketing.footer.legal')}
              </Typography>
              <Stack spacing={1}>
                <JoyLink href="#" textColor="neutral.500" underline="hover">
                  {t('marketing.footer.terms')}
                </JoyLink>
                <JoyLink href="#" textColor="neutral.500" underline="hover">
                  {t('marketing.footer.privacy')}
                </JoyLink>
                <JoyLink href="#" textColor="neutral.500" underline="hover">
                  {t('marketing.footer.contact')}
                </JoyLink>
              </Stack>
            </Grid>
            <Grid xs={12} md={3}>
              <Typography level="body-sm" textColor="neutral.500">
                {t('marketing.footer.privacyPolicy')}
              </Typography>
              <Typography level="body-sm" textColor="neutral.500" sx={{ mt: 2 }}>
                {t('marketing.footer.copyright')}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}
