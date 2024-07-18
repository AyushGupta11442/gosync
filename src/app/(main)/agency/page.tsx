// import AgencyDetails from '@/components/forms/agency-details'
// import { getAuthUserDetails, verifyAndAcceptInvitation } from '@/lib/queries'
import { Plan } from '@prisma/client'
import { redirect } from 'next/navigation'
import React from 'react'
import { currentUser } from '@clerk/nextjs/server'

const Page = async () => {
    const user = await currentUser()
    if (!user) {
        redirect('/sign-in')
    }
    
    return (
        <div>
        <h1>Agency</h1>
        <p>Welcome to your agency dashboard</p>
        </div>
    )
}

export default Page