export type MenuItem = {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

export const games: MenuItem[] = [
  {
    id: 'hogwarts-legacy',
    name: 'Hogwarts Legacy',
    description: 'Explore Hogwarts no século XIX e escreva sua própria história no mundo bruxo.',
    price: 249.9,
    image: '/images/fundo_hogwarts.png',
    category: 'Aventura',
  },
  {
    id: 'marvel-spider-man',
    name: 'Marvel’s Spider-Man: Miles Morales',
    description: 'Vista o uniforme do Miles e proteja Nova York nesta aventura de ação.',
    price: 199.9,
    image: '/images/banner-homem-aranha.png',
    category: 'Ação',
  },
  {
    id: 'diablo-iv',
    name: 'Diablo IV',
    description: 'Enfrente as forças infernais e descubra os segredos de Santuário.',
    price: 279.9,
    image: '/images/diablo.png',
    category: 'RPG',
  },
  {
    id: 'resident-evil-4',
    name: 'Resident Evil 4',
    description: 'Reviva o clássico survival horror em uma missão de resgate aterrorizante.',
    price: 189.9,
    image: '/images/resident.png',
    category: 'Terror',
  },
  {
    id: 'star-wars-jedi-survivor',
    name: 'Star Wars Jedi: Survivor',
    description: 'Continue a jornada de Cal Kestis em uma galáxia sob domínio imperial.',
    price: 229.9,
    image: '/images/star_wars.png',
    category: 'Ação',
  },
  {
    id: 'zelda-tears-of-the-kingdom',
    name: 'The Legend of Zelda: Tears of the Kingdom',
    description: 'Descubra os céus e os mistérios de Hyrule nesta aventura épica.',
    price: 299.9,
    image: '/images/zelda.png',
    category: 'Aventura',
  },
]

export const formatPrice = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
