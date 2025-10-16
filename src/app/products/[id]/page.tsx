// Редирект на дефолтную страницу товара
import { redirect } from 'next/navigation'

export default async function ProductPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  redirect(`/products/${id}/default`)
}

