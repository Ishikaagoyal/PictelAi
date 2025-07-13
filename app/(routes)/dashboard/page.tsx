'use client'
import React from 'react'
import ImageUpload from './_components/ImageUpload'
import { ThemeToggle } from './_components/ThemeToggle'

function Dashboard() {
    return (
        <div className="relative min-h-screen xl:px-40 py-10 transition-all duration-500">
            <h2 className="font-bold text-3xl mb-6 text-primary dark:text-gray-100 ">Convert Wireframe to Code</h2>
            <ImageUpload />
            <div className="fixed bottom-5 right-5 z-50">
                <ThemeToggle />
            </div>
        </div>
    )
}

export default Dashboard
