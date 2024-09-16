"use client"

import { logOutUserAction } from '@/app/actions/userActions'
import React from 'react'

const Logout = () => {
  const handleUserLogOut = async () => {
    await logOutUserAction();
  }

  return (
    <button
      onClick={handleUserLogOut}
      className="px-4 py-2 bg-red-300 hover:bg-red-100 border-2 border-gray-300 rounded-lg"
    >
      Logout
    </button>
  )
}

export default Logout
