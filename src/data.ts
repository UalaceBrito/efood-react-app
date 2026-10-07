export type MenuItem = {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

export type Restaurant = {
  id: string
  name: string
  cuisine: string
  rating: string
  deliveryTime: string
  deliveryFee: string
  featured?: string
  image: string
  description: string
  menu: MenuItem[]
}

export const restaurants: Restaurant[] = [
  {
    id: 'la-dolce-vita',
    name: 'La Dolce Vita',
    cuisine: 'Italiana',
    rating: '4.8',
    deliveryTime: '30–40 min',
    deliveryFee: 'R$ 6,90',
    featured: 'Destaque',
    image: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1000&q=85',
    description: 'Uma viagem pelos sabores da Itália, feita com ingredientes frescos e muito carinho.',
    menu: [
      { id: 'margherita', name: 'Pizza Margherita', description: 'Molho de tomate artesanal, mozzarella fresca, manjericão e azeite.', price: 49.9, image: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=600&q=80', category: 'Pizzas' },
      { id: 'carbonara', name: 'Spaghetti alla Carbonara', description: 'Massa fresca, pancetta crocante, parmesão e gema cremosa.', price: 42.9, image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=600&q=80', category: 'Massas' },
      { id: 'lasagna', name: 'Lasagna della Casa', description: 'Camadas de massa fresca, molho bolonhesa e gratinado de parmesão.', price: 45.9, image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=600&q=80', category: 'Massas' },
      { id: 'tiramisu', name: 'Tiramisù', description: 'Clássica sobremesa italiana com café, mascarpone e cacau.', price: 19.9, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80', category: 'Sobremesas' },
    ],
  },
  {
    id: 'sushi-house',
    name: 'Sushi House',
    cuisine: 'Japonesa',
    rating: '4.9',
    deliveryTime: '35–45 min',
    deliveryFee: 'R$ 8,90',
    featured: 'Mais pedido',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1000&q=85',
    description: 'Sushi preparado na hora com peixes selecionados e o cuidado da cozinha japonesa.',
    menu: [
      { id: 'combo-salmao', name: 'Combo Salmão (16 peças)', description: 'Sashimi, uramaki e nigiri de salmão fresquinho.', price: 59.9, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80', category: 'Combos' },
      { id: 'temaki', name: 'Temaki de Salmão', description: 'Salmão, cream cheese e cebolinha enrolados na alga crocante.', price: 29.9, image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80', category: 'Temakis' },
      { id: 'hot-roll', name: 'Hot Roll (10 peças)', description: 'Salmão e cream cheese empanados, com molho tarê.', price: 34.9, image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=600&q=80', category: 'Combos' },
    ],
  },
  {
    id: 'burger-boss',
    name: 'Burger Boss',
    cuisine: 'Hambúrguer',
    rating: '4.7',
    deliveryTime: '25–35 min',
    deliveryFee: 'R$ 5,90',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=85',
    description: 'Hambúrguer artesanal, pão quentinho e combinações feitas para surpreender.',
    menu: [
      { id: 'boss-burger', name: 'Boss Burger', description: 'Blend 180g, cheddar, cebola caramelizada e molho da casa.', price: 38.9, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', category: 'Hambúrgueres' },
      { id: 'crispy-chicken', name: 'Crispy Chicken', description: 'Frango crocante, alface, picles e maionese especial.', price: 32.9, image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=600&q=80', category: 'Hambúrgueres' },
      { id: 'fritas-cheddar', name: 'Fritas com Cheddar', description: 'Porção de fritas douradas com cheddar cremoso e bacon.', price: 22.9, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80', category: 'Acompanhamentos' },
    ],
  },
  {
    id: 'cantina-da-praca',
    name: 'Cantina da Praça',
    cuisine: 'Brasileira',
    rating: '4.6',
    deliveryTime: '30–40 min',
    deliveryFee: 'R$ 4,90',
    featured: 'Frete grátis',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85',
    description: 'Comida brasileira com gostinho de casa, ingredientes de verdade e porções generosas.',
    menu: [
      { id: 'parmegiana', name: 'Parmegiana da Casa', description: 'Filé empanado, molho de tomate e queijo, com arroz e fritas.', price: 39.9, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80', category: 'Pratos' },
      { id: 'feijoada', name: 'Feijoada Completa', description: 'Feijão preto, carnes selecionadas, arroz, farofa e couve.', price: 44.9, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80', category: 'Pratos' },
      { id: 'pudim', name: 'Pudim de Leite', description: 'Pudim artesanal com calda de caramelo.', price: 12.9, image: 'https://images.unsplash.com/photo-1551024506-0dccd828d307?auto=format&fit=crop&w=600&q=80', category: 'Sobremesas' },
    ],
  },
  {
    id: 'verde-no-prato',
    name: 'Verde no Prato',
    cuisine: 'Saudável',
    rating: '4.8',
    deliveryTime: '20–30 min',
    deliveryFee: 'R$ 6,00',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=85',
    description: 'Pratos leves, coloridos e cheios de sabor para deixar seu dia mais gostoso.',
    menu: [
      { id: 'bowl-grao', name: 'Bowl de Grãos', description: 'Quinoa, grão-de-bico, abacate, tomate e molho cítrico.', price: 33.9, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80', category: 'Bowls' },
      { id: 'salada-caesar', name: 'Salada Caesar', description: 'Alface crocante, frango grelhado, parmesão e molho caesar.', price: 29.9, image: 'https://images.unsplash.com/photo-1546793665-c74683d6bd3d?auto=format&fit=crop&w=600&q=80', category: 'Saladas' },
      { id: 'suco-verde', name: 'Suco Verde', description: 'Abacaxi, couve, hortelã e limão, feito na hora.', price: 12.9, image: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&w=600&q=80', category: 'Bebidas' },
    ],
  },
  {
    id: 'doce-encontro',
    name: 'Doce Encontro',
    cuisine: 'Doces',
    rating: '4.9',
    deliveryTime: '25–35 min',
    deliveryFee: 'R$ 4,00',
    featured: 'Novidade',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1000&q=85',
    description: 'Doces feitos à mão para transformar qualquer momento em uma ocasião especial.',
    menu: [
      { id: 'brownie', name: 'Brownie com Brigadeiro', description: 'Brownie de chocolate intenso com brigadeiro cremoso.', price: 18.9, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80', category: 'Bolos' },
      { id: 'cheesecake', name: 'Cheesecake de Frutas', description: 'Base crocante, creme leve e calda de frutas vermelhas.', price: 21.9, image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80', category: 'Bolos' },
      { id: 'brigadeiros', name: 'Caixa de Brigadeiros', description: 'Seis brigadeiros artesanais nos sabores clássicos.', price: 24.9, image: 'https://images.unsplash.com/photo-1581798459219-318e76aecc7b?auto=format&fit=crop&w=600&q=80', category: 'Docinhos' },
    ],
  },
]

export const formatPrice = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
