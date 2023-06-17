import React from 'react'
import { AppBar, Toolbar } from '@material-ui/core'
import styled from '@emotion/styled'


const Container = styled(AppBar)`
    background: #060606;
`

const Header = () => {

    const logo = "https://icon-library.com/images/codepen-icon/codepen-icon-26.jpg"

  return (
    <Container position='static'>
        <Toolbar>
            <img src={logo} alt="logo" style={{width:"40px"}} />
        </Toolbar>
    </Container>
  )
}

export default Header