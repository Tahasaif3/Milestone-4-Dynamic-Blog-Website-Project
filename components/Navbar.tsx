'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, UserIcon, LogOut } from 'lucide-react'
import { useUser } from '../app/contexts/UserContexts'
import { Button } from "@/components/ui/button"

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
  { name: 'Multimedia', path: '/multimedia' },
  { name: 'About', path: '/about1' },
  { name: 'Author', path: '/Author' },
  { name: 'Contact', path: '/contact' },
]

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, isActive, onClick }) => (
  <Link href={href} onClick={onClick}>
    <motion.span
      className={`relative text-lg ${isActive ? 'text-purple-400' : 'text-white'} hover:text-purple-300 transition-colors duration-200`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-400"
          layoutId="underline"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </motion.span>
  </Link>
);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const pathname = usePathname() ?? '';
  const { user, logout } = useUser();
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      // Set a flag in localStorage
      localStorage.setItem('justLoggedOut', 'true')

      // Perform the logout action
      await logout()

      // Redirect to home page
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  };

  const navVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 ${
        scrolled 
          ? 'bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      } transition-all duration-300`}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold">
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              TechVista
            </motion.span>
          </Link>
          <motion.div 
            className="hidden md:flex space-x-6 items-center"
            variants={navVariants}
          >
            {navItems.map((item) => (
              <motion.div key={item.name} variants={itemVariants}>
                <NavLink href={item.path} isActive={pathname === item.path}>
                  {item.name}
                </NavLink>
              </motion.div>
            ))}
            {user ? (
              <>
                <motion.div variants={itemVariants}>
                  <Link href="/profile">
                    <Button variant="ghost" className="text-white hover:text-purple-300">
                      <UserIcon className="w-5 h-5 mr-2" />
                      {user.username}
                    </Button>
                  </Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <motion.button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Logout</span>
                    <motion.div
                      initial={{ x: -5, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 5, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <LogOut size={18} />
                    </motion.div>
                  </motion.button>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div variants={itemVariants}>
                  <NavLink href="/login" isActive={pathname === '/login'}>
                    Login
                  </NavLink>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <NavLink href="/signup" isActive={pathname === '/signup'}>
                    Sign Up
                  </NavLink>
                </motion.div>
              </>
            )}
          </motion.div>
          <motion.button
            className="md:hidden text-white bg-purple-600 hover:bg-purple-700 rounded-full p-2 transition-colors duration-200"
            onClick={toggleMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isOpen ? 'close' : 'open'}
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-gray-900 bg-opacity-95 backdrop-blur-md"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <motion.div 
              className="container mx-auto px-4 py-4 flex flex-col space-y-4"
              variants={navVariants}
              initial="hidden"
              animate="visible"
            >
              {navItems.map((item) => (
                <motion.div key={item.name} variants={itemVariants}>
                  <NavLink href={item.path} isActive={pathname === item.path} onClick={toggleMenu}>
                    {item.name}
                  </NavLink>
                </motion.div>
              ))}
              {user ? (
                <>
                  <motion.div variants={itemVariants}>
                    <Link href="/profile" onClick={toggleMenu}>
                      <Button variant="ghost" className="text-white hover:text-purple-300">
                        <UserIcon className="w-5 h-5 mr-2" />
                        {user.username}
                      </Button>
                    </Link>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <motion.button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition-colors duration-300 w-full justify-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Logout</span>
                      <motion.div
                        initial={{ x: -5, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 5, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <LogOut size={18} />
                      </motion.div>
                    </motion.button>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div variants={itemVariants}>
                    <NavLink href="/login" isActive={pathname === '/login'} onClick={toggleMenu}>
                      Login
                    </NavLink>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <NavLink href="/signup" isActive={pathname === '/signup'} onClick={toggleMenu}>
                      Sign Up
                    </NavLink>
                  </motion.div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;



// old code
// 'use client'

// import { useState, useEffect } from 'react'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'
// import { usePathname } from 'next/navigation'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Menu, X, UserIcon } from 'lucide-react'
// import { useUser } from '../app/contexts/UserContexts'
// import { Button } from "@/components/ui/button"

// const navItems = [
//   { name: 'Home', path: '/' },
//   { name: 'Blog', path: '/blog' },
//   { name: 'Multimedia', path: '/multimedia' },
//   { name: 'About', path: '/about1' },
//   { name: 'Contact', path: '/contact' },
// ]

// interface NavLinkProps {
//   href: string;
//   children: React.ReactNode;
//   isActive: boolean;
//   onClick?: () => void;
// }

// const NavLink: React.FC<NavLinkProps> = ({ href, children, isActive, onClick }) => (
//   <Link href={href} onClick={onClick}>
//     <motion.span
//       className={`relative text-lg ${isActive ? 'text-purple-400' : 'text-white'} hover:text-purple-300 transition-colors duration-200`}
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//     >
//       {children}
//       {isActive && (
//         <motion.div
//           className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-400"
//           layoutId="underline"
//           initial={{ width: 0 }}
//           animate={{ width: '100%' }}
//           transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//         />
//       )}
//     </motion.span>
//   </Link>
// );

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const [scrolled, setScrolled] = useState<boolean>(false);
//   const pathname = usePathname() ?? '';
//   const { user, logout } = useUser();
//   const router = useRouter();

//   const toggleMenu = () => setIsOpen(!isOpen);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     }

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleLogout = () => {
//     logout();
//     router.push('/');
//   };

//   const navVariants = {
//     hidden: { opacity: 0, y: -50 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { 
//         type: 'spring',
//         stiffness: 300,
//         damping: 30,
//         staggerChildren: 0.1,
//         delayChildren: 0.2
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: -20 },
//     visible: { opacity: 1, y: 0 }
//   };

//   return (
//     <motion.nav
//       className={`fixed top-0 left-0 right-0 z-50 ${
//         scrolled 
//           ? 'bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg' 
//           : 'bg-transparent'
//       } transition-all duration-300`}
//       initial="hidden"
//       animate="visible"
//       variants={navVariants}
//     >
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center py-4">
//           <Link href="/" className="text-2xl font-bold">
//             <motion.span
//               className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               TechVista
//             </motion.span>
//           </Link>
//           <motion.div 
//             className="hidden md:flex space-x-6 items-center"
//             variants={navVariants}
//           >
//             {navItems.map((item) => (
//               <motion.div key={item.name} variants={itemVariants}>
//                 <NavLink href={item.path} isActive={pathname === item.path}>
//                   {item.name}
//                 </NavLink>
//               </motion.div>
//             ))}
//             {user ? (
//               <>
//                 <motion.div variants={itemVariants}>
//                   <Link href="/profile">
//                     <Button variant="ghost" className="text-white hover:text-purple-300">
//                       <UserIcon className="w-5 h-5 mr-2" />
//                       {user.username}
//                     </Button>
//                   </Link>
//                 </motion.div>
//                 <motion.div variants={itemVariants}>
//                   <Button onClick={handleLogout} variant="ghost" className="text-white hover:text-purple-300">
//                     Logout
//                   </Button>
//                 </motion.div>
//               </>
//             ) : (
//               <>
//                 <motion.div variants={itemVariants}>
//                   <NavLink href="/login" isActive={pathname === '/login'}>
//                     Login
//                   </NavLink>
//                 </motion.div>
//                 <motion.div variants={itemVariants}>
//                   <NavLink href="/signup" isActive={pathname === '/signup'}>
//                     Sign Up
//                   </NavLink>
//                 </motion.div>
//               </>
//             )}
//           </motion.div>
//           <motion.button
//             className="md:hidden text-white bg-purple-600 hover:bg-purple-700 rounded-full p-2 transition-colors duration-200"
//             onClick={toggleMenu}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             <AnimatePresence mode="wait" initial={false}>
//               <motion.div
//                 key={isOpen ? 'close' : 'open'}
//                 initial={{ opacity: 0, rotate: -180 }}
//                 animate={{ opacity: 1, rotate: 0 }}
//                 exit={{ opacity: 0, rotate: 180 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 {isOpen ? <X size={24} /> : <Menu size={24} />}
//               </motion.div>
//             </AnimatePresence>
//           </motion.button>
//         </div>
//       </div>
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             className="md:hidden bg-gray-900 bg-opacity-95 backdrop-blur-md"
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.3, ease: 'easeInOut' }}
//           >
//             <motion.div 
//               className="container mx-auto px-4 py-4 flex flex-col space-y-4"
//               variants={navVariants}
//               initial="hidden"
//               animate="visible"
//             >
//               {navItems.map((item) => (
//                 <motion.div key={item.name} variants={itemVariants}>
//                   <NavLink href={item.path} isActive={pathname === item.path} onClick={toggleMenu}>
//                     {item.name}
//                   </NavLink>
//                 </motion.div>
//               ))}
//               {user ? (
//                 <>
//                   <motion.div variants={itemVariants}>
//                     <Link href="/profile" onClick={toggleMenu}>
//                       <Button variant="ghost" className="text-white hover:text-purple-300">
//                         <UserIcon className="w-5 h-5 mr-2" />
//                         {user.username}
//                       </Button>
//                     </Link>
//                   </motion.div>
//                   <motion.div variants={itemVariants}>
//                     <Button onClick={handleLogout} variant="ghost" className="text-white hover:text-purple-300">
//                       Logout
//                     </Button>
//                   </motion.div>
//                 </>
//               ) : (
//                 <>
//                   <motion.div variants={itemVariants}>
//                     <NavLink href="/login" isActive={pathname === '/login'} onClick={toggleMenu}>
//                       Login
//                     </NavLink>
//                   </motion.div>
//                   <motion.div variants={itemVariants}>
//                     <NavLink href="/signup" isActive={pathname === '/signup'} onClick={toggleMenu}>
//                       Sign Up
//                     </NavLink>
//                   </motion.div>
//                 </>
//               )}
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.nav>
//   );
// }

// export default Navbar;

