import Image from 'next/image'
import appImage from '@/assets/le-creuset-LJ8OnqaYUqw-unsplash.jpg'

export default function ImageApp() {
  return (
    <div className="container">
      <Image className="container__image" src={appImage} alt="cooking" fill />
    </div>
  )
}