import {
    createMediaHandler,
  } from 'next-tinacms-cloudinary/dist/handlers'
  
  import { isAuthorized } from '@tinacms/auth'
  
  if(!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || !process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) throw new Error('Missing Cloudinary env variables')

  export default createMediaHandler({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    authorized: async (req, _res) => {
      try {
       if (process.env.NODE_ENV == 'development') {
          return true
       }
        const user = await isAuthorized(req)
    
        return !!user && user.verified
      } catch (e) {
        console.error(e)
        return false 
      }
    },
  })