'use client'
import Link from 'next/link'
import React from 'react'
import {ShoppingCartIcon} from '@heroicons/react/24/outline'
import { useCart } from '../utils/useCart'

const NavBar = () => {
  const {cartCount} = useCart()
  return (
    <nav className='bg-black p-2 flex justify-between'>
        <div className='text-slate-600 font-bold text-3xl'>Soleturner</div>

        <div className="flex space-x-6">
          <Link href="/" className='text-slate-600 font-bold pt-2 hover:text-white hover:cursor-pointer'>Home</Link>
          <Link href="/" className='text-slate-600 font-bold pt-2 hover:text-white hover:cursor-pointer'>About</Link>
          <Link href="/" className='text-slate-600 font-bold pt-2 hover:text-white hover:cursor-pointer'>Shpes</Link>
          <Link href="/" className='text-slate-600 font-bold pt-2 hover:text-white hover:cursor-pointer'>Watch</Link>
          <Link href="/login" className='text-slate-600 font-bold pt-2 hover:text-white hover:cursor-pointer'>Login</Link>
        </div>

        <Link href="/cart" className='text-slate-600 px-4 py-2 font-bold hover:text-white hover:cursor-pointer'>
            <ShoppingCartIcon className='w-7 h-7 inline-block' /> Cart
            <span> ({cartCount})</span>
        </Link>
    </nav>
  )
}

export default NavBar