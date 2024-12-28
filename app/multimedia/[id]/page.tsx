import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { multimediaContent } from '../../../utils/multimediaData'
import MultimediaItemPage from './MultimediaItemPage'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const item = multimediaContent.find(item => item.id === parseInt(params.id))
  if (!item) {
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    }
  }
  return {
    title: item.title,
    description: item.description,
  }
}

export default function Page({ params }: { params: { id: string } }) {
  const item = multimediaContent.find(item => item.id === parseInt(params.id))

  if (!item) {
    notFound()
  }

  return <MultimediaItemPage item={item} />
}