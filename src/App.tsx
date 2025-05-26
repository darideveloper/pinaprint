import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import ProductPersonalizationForm from '@/components/ProductPersonalizationForm'
import { PrinterIcon } from 'lucide-react'
import { clsx } from 'clsx'

function App() {
  return (
    <ThemeProvider defaultTheme='light'>
      <div
        className={clsx('min-h-screen', 'bg-background', 'flex', 'flex-col')}
      >
        <main
          className={clsx(
            'flex-1',
            'container',
            'mx-auto',
            'py-8',
            'px-4',
            'lg:px-8'
          )}
        >
          <ProductPersonalizationForm />
        </main>

        <footer
          className={clsx(
            'w-full',
            'py-6',
            'border-t',
            'bg-background',
            'print:hidden'
          )}
        >
          <div
            className={clsx(
              'container',
              'mx-auto',
              'px-4',
              'lg:px-8',
              'flex',
              'justify-center',
              'items-center'
            )}
          >
            <div className={clsx('flex', 'items-center', 'gap-2')}>
              <span
                className={clsx('text-lg', 'font-semibold', 'text-primary')}
              >
                <img
                  src='/logo.png'
                  alt='Pina Print logo'
                  className={clsx('h-8', 'inline-block')}
                />
              </span>
            </div>
          </div>
        </footer>

        <Toaster />
      </div>
    </ThemeProvider>
  )
}

export default App
