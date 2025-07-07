
import React from 'react'

const Dashboard:React.FC<{ userRole: string }> = ({ userRole })=> {
  const role = userRole
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard