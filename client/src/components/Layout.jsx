import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: center;
`

const Layout = ({ children }) => {
    return <Wrapper>{children}</Wrapper>
}

export default Layout
