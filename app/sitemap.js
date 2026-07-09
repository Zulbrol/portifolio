export default function sitemap() {
  return [
    {
      url: 'https://vercel.app', // <-- Troque pelo link completo do seu site na Vercel
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
