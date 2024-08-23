import React from 'react'
import { Profile as ProfileComponent, Container } from '../components/index.js'
function Profile() {

    return (
        <div className='w-full'>
            <Container>
                <ProfileComponent />
            </Container>
        </div>
    )
}

export default Profile
