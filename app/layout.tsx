import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { UserProvider } from '../app/contexts/UserContexts'
import  Head  from 'next/head';



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TechVista Blog',
  description: 'An Aesthetically pleasing Dynamic Blog Website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
      <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          data-ad-client="ca-pub-4686305629312312"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <body className={`${inter.className} bg-gradient-to-br from-gray-900 to-black text-white min-h-screen flex flex-col`}>
      <div>
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4686305629312312"
            crossOrigin="anonymous"
          ></script>
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-4686305629312312"
            data-ad-slot="2138801538"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
          <script
            dangerouslySetInnerHTML={{
              __html: "(adsbygoogle = window.adsbygoogle || []).push({});",
            }}
          ></script>
        </div>
      <UserProvider>
        <div className="flex-grow">
          <Navbar />
          <main>{children}</main>
        </div>
        <Footer />
        </UserProvider>
      </body>
    </html>
  )
}

