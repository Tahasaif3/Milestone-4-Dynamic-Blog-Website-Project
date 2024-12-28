import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'

interface AuthorCardProps {
  name: string
  bio: string
  imageUrl?: string
}

const AuthorCard: React.FC<AuthorCardProps> = ({ name, bio, imageUrl = '/placeholder.svg' }) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
          <Image src={imageUrl} alt={name} width={96} height={96} className="object-cover" />
        </div>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{bio}</CardDescription>
      </CardContent>
    </Card>
  )
}

export default AuthorCard

