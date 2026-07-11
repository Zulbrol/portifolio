export const revalidate = 86400 // Revalida uma vez por dia (em segundos)

export default function sitemap() {
  return [
    {
      url: 'https://portifolio-liard-kappa.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
