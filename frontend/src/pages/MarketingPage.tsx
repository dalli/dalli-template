import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link as MuiLink,
  Stack,
  Chip,
} from '@mui/material'
import {
  ExpandMore as ExpandMoreIcon,
  Dashboard as DashboardIcon,
  PhoneAndroid as PhoneAndroidIcon,
  Devices as DevicesIcon,
} from '@mui/icons-material'
import Logo from '../components/Logo'

export default function MarketingPage() {
  const [email, setEmail] = useState('')

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* AppBar */}
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Logo variant="h6" />
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button color="inherit">Features</Button>
            <Button color="inherit">Testimonials</Button>
            <Button color="inherit">Highlights</Button>
            <Button color="inherit">Pricing</Button>
            <Button color="inherit">FAQ</Button>
            <Button color="inherit">Blog</Button>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button color="inherit" component={Link} to="/signin">
              Sign in
            </Button>
            <Button variant="contained" color="primary" component={Link} to="/signup">
              Sign up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="md" sx={{ py: 12, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
          Our latest products
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
          Explore our cutting-edge dashboard, delivering high-quality solutions tailored to your
          needs. Elevate your experience with top-tier features and services.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mb: 6 }}>
          <TextField
            placeholder="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ minWidth: 300 }}
          />
          <Button variant="contained" size="large" color="primary">
            Start now
          </Button>
        </Box>
        <Typography variant="body2" color="text.secondary">
          By clicking "Start now" you agree to our Terms & Conditions.
        </Typography>

        {/* Trusted by */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Trusted by the best companies
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Grid item key={i}>
                <Typography variant="body2" color="text.secondary">
                  Fake company number {i}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 10 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" textAlign="center" gutterBottom sx={{ mb: 2 }}>
            Product features
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 6 }}>
            Provide a brief overview of the key features of the product. For example, you could
            list the number of features, their types or benefits, and add-ons.
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                title: 'Dashboard',
                description:
                  'This item could provide a snapshot of the most important metrics or data points related to the product.',
                icon: <DashboardIcon sx={{ fontSize: 40 }} />,
              },
              {
                title: 'Mobile integration',
                description:
                  'This item could provide information about the mobile app version of the product.',
                icon: <PhoneAndroidIcon sx={{ fontSize: 40 }} />,
              },
              {
                title: 'Available on all platforms',
                description:
                  'This item could let users know the product is available on all platforms, such as web, mobile, and desktop.',
                icon: <DevicesIcon sx={{ fontSize: 40 }} />,
              },
            ].map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card elevation={0} sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ bgcolor: 'background.default', py: 10 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" textAlign="center" gutterBottom sx={{ mb: 2 }}>
            Testimonials
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 6 }}>
            See what our customers love about our products. Discover how we excel in efficiency,
            durability, and satisfaction. Join us for quality, innovation, and reliable support.
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
              <Grid item xs={12} md={4} key={index}>
                <Card elevation={0} sx={{ height: '100%', p: 3 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {testimonial.text}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
                    <Avatar sx={{ mr: 2 }}>{testimonial.name[0]}</Avatar>
                    <Box>
                      <Typography variant="subtitle2">{testimonial.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                      {testimonial.logo}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Highlights Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 10 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" textAlign="center" gutterBottom sx={{ mb: 2 }}>
            Highlights
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 6 }}>
            Explore why our product stands out: adaptability, durability, user-friendly design, and
            innovation. Enjoy reliable customer support and precision in every detail.
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                title: 'Adaptable performance',
                description:
                  'Our product effortlessly adjusts to your needs, boosting efficiency and simplifying your tasks.',
              },
              {
                title: 'Built to last',
                description:
                  'Experience unmatched durability that goes above and beyond with lasting investment.',
              },
              {
                title: 'Great user experience',
                description:
                  'Integrate our product into your routine with an intuitive and easy-to-use interface.',
              },
              {
                title: 'Innovative functionality',
                description:
                  'Stay ahead with features that set new standards, addressing your evolving needs better than the rest.',
              },
              {
                title: 'Reliable support',
                description:
                  'Count on our responsive customer support, offering assistance that goes beyond the purchase.',
              },
              {
                title: 'Precision in every detail',
                description:
                  'Enjoy a meticulously crafted product where small touches make a significant impact on your overall experience.',
              },
            ].map((highlight, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {highlight.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {highlight.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Pricing Section */}
      <Box sx={{ bgcolor: 'background.default', py: 10 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" textAlign="center" gutterBottom sx={{ mb: 2 }}>
            Pricing
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 6 }}>
            Quickly build an effective pricing table for your potential customers with this layout.
            It's built with default Material UI components with little customization.
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
                buttonText: 'Start now',
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
              <Grid item xs={12} md={4} key={index}>
                <Card
                  elevation={plan.recommended ? 8 : 0}
                  sx={{
                    height: '100%',
                    position: 'relative',
                    border: plan.recommended ? 2 : 1,
                    borderColor: plan.recommended ? 'primary.main' : 'divider',
                  }}
                >
                  {plan.recommended && (
                    <Chip
                      label="Recommended"
                      color="primary"
                      sx={{ position: 'absolute', top: 16, right: 16 }}
                    />
                  )}
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" gutterBottom>
                      {plan.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
                      <Typography variant="h3" component="span">
                        {plan.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
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
                          <Typography variant="body2">{feature}</Typography>
                        </Box>
                      ))}
                    </Box>
                    <Button
                      variant={plan.recommended ? 'contained' : 'outlined'}
                      fullWidth
                      color="primary"
                    >
                      {plan.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 10 }}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" textAlign="center" gutterBottom sx={{ mb: 2 }}>
            Frequently asked questions
          </Typography>
          <Box sx={{ mt: 4 }}>
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
              <Accordion key={index} elevation={0}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1">{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" color="text.secondary">
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Newsletter Section */}
      <Box sx={{ bgcolor: 'primary.main', py: 8, color: 'white' }}>
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Join the newsletter
          </Typography>
          <Typography variant="body2" sx={{ mb: 4, opacity: 0.9 }}>
            Subscribe for weekly updates. No spams ever!
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <TextField
              placeholder="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                minWidth: 300,
                bgcolor: 'white',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                },
              }}
            />
            <Button variant="contained" size="large" sx={{ bgcolor: 'white', color: 'primary.main' }}>
              Subscribe
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', py: 6, borderTop: 1, borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom>
                Product
              </Typography>
              <Stack spacing={1}>
                <MuiLink href="#" color="text.secondary" underline="hover">
                  Features
                </MuiLink>
                <MuiLink href="#" color="text.secondary" underline="hover">
                  Testimonials
                </MuiLink>
                <MuiLink href="#" color="text.secondary" underline="hover">
                  Highlights
                </MuiLink>
                <MuiLink href="#" color="text.secondary" underline="hover">
                  Pricing
                </MuiLink>
                <MuiLink href="#" color="text.secondary" underline="hover">
                  FAQs
                </MuiLink>
              </Stack>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom>
                Company
              </Typography>
              <Stack spacing={1}>
                <MuiLink href="#" color="text.secondary" underline="hover">
                  About us
                </MuiLink>
                <MuiLink href="#" color="text.secondary" underline="hover">
                  Careers
                </MuiLink>
                <MuiLink href="#" color="text.secondary" underline="hover">
                  Press
                </MuiLink>
              </Stack>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom>
                Legal
              </Typography>
              <Stack spacing={1}>
                <MuiLink href="#" color="text.secondary" underline="hover">
                  Terms
                </MuiLink>
                <MuiLink href="#" color="text.secondary" underline="hover">
                  Privacy
                </MuiLink>
                <MuiLink href="#" color="text.secondary" underline="hover">
                  Contact
                </MuiLink>
              </Stack>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body2" color="text.secondary">
                Privacy Policy • Terms of Service
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Copyright © Sitemark 2025
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

