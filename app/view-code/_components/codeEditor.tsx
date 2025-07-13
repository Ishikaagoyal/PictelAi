'use client'

import React from 'react'
import { Sandpack } from '@codesandbox/sandpack-react'
import Constants from '@/data/Constants'
import { aquaBlue, nightOwl } from '@codesandbox/sandpack-themes'
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
} from '@codesandbox/sandpack-react'
import { useTheme } from 'next-themes'

function CodeEditor({ coderesp, isready }: any) {
  const { resolvedTheme } = useTheme()
  const theme = resolvedTheme === 'dark' ? nightOwl : aquaBlue

  return (
    <div>
      {isready ? (
        <Sandpack
          template="react"
          theme={theme}
          options={{
            externalResources: ['https://cdn.tailwindcss.com'],
            showNavigator: true,
            showTabs: true,
            editorHeight: 600,
          }}
          customSetup={{
            dependencies: {
              ...Constants.DEPENDANCY,
            }
          }}
          files={{
            '/App.js': `${coderesp}`,
          }}
        />
      ) : (
        <SandpackProvider
          template="react"
          theme={theme}
          files={{
            '/app.js': {
              code: `${coderesp}`,
              active: true,
            }
          }}
          customSetup={{
            dependencies: {
              ...Constants.DEPENDANCY,
            }
          }}
          options={{
            externalResources: ['https://cdn.tailwindcss.com'],
          }}
        >
          <SandpackLayout>
            <SandpackCodeEditor showTabs={true} style={{ height: '70vh' }} />
          </SandpackLayout>
        </SandpackProvider>
      )}
    </div>
  )
}

export default CodeEditor
