import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import ProductPersonalizationForm from '@/components/ProductPersonalizationForm'
import { clsx } from 'clsx'

function App() {
  return (
    <ThemeProvider defaultTheme='light'>
      <div
        className={clsx('min-h-screen', 'bg-background', 'flex', 'flex-col', 'w-full')}
      >
        <main
          className={clsx(
            'flex',
            'container',
            'mx-auto',
            'py-8',
            'px-0 sm:px-4',
            'lg:px-8',
            'min-h-[92vh]',
            'justify-center',
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
