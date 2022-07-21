import React from 'react'
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

const theme = createTheme({
  palette: {
    primary: {
      main: '#14b8a6',
    },
  },
})

export function MuiThemeButton(props) {
  return (
    <MuiThemeProvider theme={theme}>
      <Button color="primary" className={props.className}>
        {props.text}
      </Button>
    </MuiThemeProvider>
  )
}
