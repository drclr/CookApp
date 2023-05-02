import { AppBar } from '@mui/material'
import ImageApp from '@/components/ImageApp'
import Typography from '@mui/material/Typography'

export default function AppHeader() {
  return (<header>
    <AppBar sx={{ height: 60, bgcolor: 'white' }} position="sticky">
      <Typography color="primary" variant="h6" sx={{ m: 2 }} >
        WhatToCook
      </Typography>
    </AppBar >
    <ImageApp />
  </header >)
}