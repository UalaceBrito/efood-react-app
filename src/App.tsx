import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Link, Route, Routes, useParams } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import { CartProvider } from './cart'
import { useCart, type CartLine } from './cart-context'
import { formatPrice, restaurants, type MenuItem, type Restaurant } from './data'

const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
  :root { font-family: Inter, 'Segoe UI', Arial, sans-serif; color: #3b3b3b; background: #f4f1ea; font-synthesis: none; text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; }
  body { margin: 0; min-width: 320px; min-height: 100vh; }
  button, input { font: inherit; }
  button, a { -webkit-tap-highlight-color: transparent; }
  a { color: inherit; }
  button:focus-visible, a:focus-visible, input:focus-visible { outline: 3px solid #b64242; outline-offset: 3px; }
  ::selection { background: #f0cccc; }
`

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`
const Header = styled.header`
  min-height: 100px;
  background: #f4f1ea;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px max(24px, calc((100vw - 1100px) / 2));
  position: relative;
  @media (max-width: 580px) { min-height: 84px; padding: 18px 16px; }
`
const Brand = styled(Link)`
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: 700;
  font-size: 36px;
  letter-spacing: -2px;
  color: #e66767;
  text-decoration: none;
  line-height: 1;
  span { color: #a74242; }
  @media (max-width: 580px) { font-size: 31px; }
`
const CartLink = styled(Link)`
  position: absolute;
  right: max(24px, calc((100vw - 1100px) / 2));
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: #a74242;
  font-weight: 700;
  text-decoration: none;
  font-size: 14px;
  .cart-icon { font-size: 20px; }
  @media (max-width: 580px) { right: 16px; gap: 6px; font-size: 12px; .cart-icon { font-size: 18px; } }
`
const Main = styled.main`
  width: min(1100px, calc(100% - 48px));
  margin: 0 auto;
  flex: 1;
  @media (max-width: 580px) { width: calc(100% - 32px); }
`
const Footer = styled.footer`
  text-align: center;
  padding: 29px 16px;
  color: #77716a;
  font-size: 13px;
  margin-top: 62px;
  border-top: 1px solid #e5dfd5;
`
const Button = styled.button`
  border: 0;
  border-radius: 4px;
  background: #e66767;
  color: #fff;
  min-height: 38px;
  padding: 9px 15px;
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
  transition: background .16s ease, transform .16s ease;
  &:hover { background: #ca5050; }
  &:active { transform: translateY(1px); }
  &:disabled { background: #c8c2b9; cursor: not-allowed; transform: none; }
`
const QuietButton = styled.button`
  border: 1px solid #e66767;
  border-radius: 4px;
  background: transparent;
  color: #b34e4e;
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  &:hover { background: #fff5f3; }
`
const Eyebrow = styled.p`
  color: #b34e4e;
  text-transform: uppercase;
  letter-spacing: 1.6px;
  font-size: 11px;
  font-weight: 800;
  margin: 0 0 13px;
`
const PageTitle = styled.h1`
  color: #33302d;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(32px, 5vw, 48px);
  line-height: 1.13;
  letter-spacing: -1.2px;
  margin: 0;
`

function AppShell() {
  const { count } = useCart()
  return (
    <Page>
      <Header>
        <Brand to="/" aria-label="efood, página inicial">e<span>food</span></Brand>
        <CartLink to="/carrinho" aria-label={`Carrinho, ${count} ${count === 1 ? 'item' : 'itens'}`}>
          <span className="cart-icon" aria-hidden="true">🛒</span>
          <span>{count} {count === 1 ? 'produto' : 'produtos'}</span>
        </CartLink>
      </Header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/restaurante/:id" element={<RestaurantPage />} />
        <Route path="/carrinho" element={<CartPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer>Feito com carinho para a sua fome. <strong>efood</strong></Footer>
    </Page>
  )
}

const Hero = styled.section`
  background: #e66767;
  border-radius: 5px;
  min-height: 245px;
  padding: 43px 54px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
  &::after { content: 'e'; position: absolute; font: 700 320px/1 Georgia, serif; color: rgba(255,255,255,.08); right: 82px; bottom: -143px; }
  @media (max-width: 700px) { min-height: 230px; padding: 32px 26px; &::after { right: -38px; bottom: -160px; } }
`
const HeroContent = styled.div`
  max-width: 600px;
  position: relative;
  z-index: 1;
  p { font-size: 13px; margin: 14px 0 0; color: rgba(255,255,255,.88); }
  h1 { font: 700 clamp(33px, 5vw, 52px)/1.1 Georgia, serif; letter-spacing: -1.4px; margin: 0; max-width: 540px; }
`
const HeroTag = styled.span`
  display: inline-flex;
  background: #f4f1ea;
  color: #a74242;
  border-radius: 30px;
  padding: 8px 13px;
  font-size: 11px;
  font-weight: 800;
  margin-top: 24px;
`
const ContentSection = styled.section`
  padding-top: 54px;
  @media (max-width: 580px) { padding-top: 38px; }
`
const SectionTop = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 24px;
  h2 { margin: 0; color: #33302d; font: 700 28px/1.2 Georgia, serif; }
  p { margin: 7px 0 0; color: #817b74; font-size: 13px; }
  @media (max-width: 580px) { align-items: start; flex-direction: column; gap: 14px; }
`
const Search = styled.input`
  border: 1px solid #ded8cf;
  border-radius: 4px;
  height: 42px;
  width: min(275px, 100%);
  padding: 0 13px;
  background: #fffdfa;
  color: #383431;
  font-size: 13px;
  &::placeholder { color: #99938b; }
`
const Chips = styled.div`
  display: flex;
  gap: 9px;
  margin-bottom: 22px;
  overflow: auto;
  padding-bottom: 3px;
`
const Chip = styled.button<{ $active?: boolean }>`
  white-space: nowrap;
  border: 1px solid ${({ $active }) => $active ? '#e66767' : '#e0dacf'};
  background: ${({ $active }) => $active ? '#e66767' : '#fffdfa'};
  color: ${({ $active }) => $active ? '#fff' : '#5d5750'};
  padding: 8px 15px;
  border-radius: 25px;
  font-size: 12px;
  font-weight: 650;
  cursor: pointer;
  &:hover { border-color: #e66767; }
`
const RestaurantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  @media (max-width: 850px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media (max-width: 560px) { grid-template-columns: 1fr; gap: 16px; }
`
const RestaurantCard = styled.article`
  background: #fffdfa;
  border: 1px solid #e9e3da;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform .18s ease, box-shadow .18s ease;
  &:hover { transform: translateY(-3px); box-shadow: 0 10px 24px rgba(65,48,30,.09); }
`
const CardImageWrap = styled.div`
  height: 185px;
  position: relative;
  background: #e6ddd1;
  img { width: 100%; height: 100%; object-fit: cover; display: block; }
`
const Badge = styled.span`
  background: #e66767;
  color: #fff;
  position: absolute;
  top: 13px;
  left: 13px;
  border-radius: 3px;
  padding: 6px 9px;
  font-size: 10px;
  font-weight: 800;
`
const CardBody = styled.div`
  padding: 17px;
  display: flex;
  flex-direction: column;
  flex: 1;
`
const CardHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  h3 { color: #37322e; font: 700 20px/1.2 Georgia, serif; margin: 0; }
  span { color: #a74242; font-weight: 800; font-size: 12px; white-space: nowrap; }
`
const CardMeta = styled.p`
  color: #807a73;
  font-size: 12px;
  margin: 9px 0 14px;
  span { padding: 0 6px; color: #c2b8ac; }
`
const CardDescription = styled.p`
  color: #716b64;
  font-size: 13px;
  line-height: 1.55;
  margin: 0 0 17px;
  flex: 1;
`
const FullButtonLink = styled(Link)`
  display: block;
  background: #e66767;
  color: #fff;
  border-radius: 4px;
  padding: 11px 12px;
  font-weight: 800;
  font-size: 12px;
  text-decoration: none;
  text-align: center;
  &:hover { background: #ca5050; }
`
const EmptyMessage = styled.p`
  color: #77716a;
  background: #fffdfa;
  border: 1px solid #e9e3da;
  border-radius: 5px;
  padding: 30px;
  text-align: center;
  grid-column: 1 / -1;
`

function HomePage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Todos')
  const categories = ['Todos', ...new Set(restaurants.map((restaurant) => restaurant.cuisine))]
  const filteredRestaurants = useMemo(
    () => restaurants.filter((restaurant) =>
      (category === 'Todos' || restaurant.cuisine === category)
      && `${restaurant.name} ${restaurant.cuisine}`.toLocaleLowerCase('pt-BR').includes(query.toLocaleLowerCase('pt-BR')),
    ),
    [category, query],
  )

  return (
    <Main>
      <Hero>
        <HeroContent>
          <Eyebrow style={{ color: '#fff', opacity: .85 }}>Seu próximo prato favorito</Eyebrow>
          <h1>Tem sabor que pede efood.</h1>
          <p>Comida boa, de quem cozinha com carinho, até a sua porta.</p>
          <HeroTag>Descubra restaurantes perto de você</HeroTag>
        </HeroContent>
      </Hero>
      <ContentSection>
        <SectionTop>
          <div><h2>Restaurantes</h2><p>Escolha seu lugar favorito para pedir hoje.</p></div>
          <Search aria-label="Buscar restaurantes" placeholder="Buscar restaurante ou cozinha" value={query} onChange={(event) => setQuery(event.target.value)} />
        </SectionTop>
        <Chips aria-label="Filtrar por categoria">
          {categories.map((item) => (
            <Chip type="button" key={item} $active={category === item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</Chip>
          ))}
        </Chips>
        <RestaurantGrid>
          {filteredRestaurants.length
            ? filteredRestaurants.map((restaurant) => <RestaurantTile key={restaurant.id} restaurant={restaurant} />)
            : <EmptyMessage>Nenhum restaurante encontrado. Tente outra busca.</EmptyMessage>}
        </RestaurantGrid>
      </ContentSection>
    </Main>
  )
}

function RestaurantTile({ restaurant }: { restaurant: Restaurant }) {
  return (
    <RestaurantCard>
      <CardImageWrap>
        <img src={restaurant.image} alt={`Prato servido pelo restaurante ${restaurant.name}`} loading="lazy" />
        {restaurant.featured && <Badge>{restaurant.featured}</Badge>}
      </CardImageWrap>
      <CardBody>
        <CardHeading><h3>{restaurant.name}</h3><span aria-label={`Avaliação ${restaurant.rating}`}>★ {restaurant.rating}</span></CardHeading>
        <CardMeta>{restaurant.cuisine}<span>•</span>{restaurant.deliveryTime}<span>•</span>{restaurant.deliveryFee}</CardMeta>
        <CardDescription>{restaurant.description}</CardDescription>
        <FullButtonLink to={`/restaurante/${restaurant.id}`}>Ver cardápio</FullButtonLink>
      </CardBody>
    </RestaurantCard>
  )
}

const RestaurantHero = styled.section`
  height: 275px;
  background: #9a5546;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  color: #fff;
  img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  &::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(25,18,14,.78), rgba(25,18,14,.05)); }
  @media (max-width: 580px) { height: 225px; }
`
const RestaurantInfo = styled.div`
  position: absolute;
  z-index: 1;
  left: 38px;
  bottom: 30px;
  max-width: 620px;
  .type { font-size: 12px; margin: 0 0 9px; color: #ffe0d9; }
  h1 { font: 700 clamp(32px, 5vw, 48px)/1.1 Georgia, serif; margin: 0 0 9px; }
  .description { font-size: 13px; line-height: 1.5; margin: 0; color: rgba(255,255,255,.9); }
  @media (max-width: 580px) { left: 22px; right: 18px; bottom: 22px; }
`
const BackLink = styled(Link)`
  display: inline-block;
  color: #a74242;
  text-decoration: none;
  font-size: 12px;
  font-weight: 800;
  margin: 23px 0 20px;
  &:hover { text-decoration: underline; }
`
const MenuSection = styled.section`
  padding-top: 35px;
  h2 { font: 700 28px/1.2 Georgia, serif; color: #33302d; margin: 0 0 18px; }
`
const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 15px;
  @media (max-width: 650px) { grid-template-columns: 1fr; }
`
const MenuCard = styled.article`
  background: #fffdfa;
  border: 1px solid #e9e3da;
  border-radius: 5px;
  padding: 13px;
  display: flex;
  align-items: stretch;
  gap: 15px;
  min-height: 148px;
  img { width: 132px; min-height: 122px; border-radius: 4px; object-fit: cover; flex-shrink: 0; }
  @media (max-width: 430px) { gap: 11px; padding: 10px; img { width: 100px; min-height: 112px; } }
`
const MenuCardInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  h3 { font: 700 17px/1.25 Georgia, serif; color: #37322e; margin: 2px 0 7px; }
  p { color: #77716a; font-size: 11px; line-height: 1.45; margin: 0 0 12px; }
  .price { color: #a74242; font-size: 13px; font-weight: 800; margin-top: auto; }
  button { margin-top: 9px; }
`
const MenuCategory = styled.p`
  color: #a74242;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  font-weight: 800;
  margin: 0 0 9px;
`

function RestaurantPage() {
  const { id } = useParams()
  const restaurant = restaurants.find((item) => item.id === id)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [notice, setNotice] = useState('')
  const menuCategories = restaurant ? [...new Set(restaurant.menu.map((item) => item.category))] : []

  if (!restaurant) return <NotFound />

  return (
    <Main>
      <BackLink to="/">← Voltar para restaurantes</BackLink>
      <RestaurantHero>
        <img src={restaurant.image} alt="" />
        <RestaurantInfo>
          <p className="type">{restaurant.cuisine} · ★ {restaurant.rating} · {restaurant.deliveryTime}</p>
          <h1>{restaurant.name}</h1>
          <p className="description">{restaurant.description}</p>
        </RestaurantInfo>
      </RestaurantHero>
      {notice && <Notice role="status">{notice}</Notice>}
      {menuCategories.map((categoryName) => (
        <MenuSection key={categoryName}>
          <MenuCategory>{categoryName}</MenuCategory>
          <MenuGrid>
            {restaurant.menu.filter((item) => item.category === categoryName).map((item) => (
              <MenuCard key={item.id}>
                <img src={item.image} alt={item.name} loading="lazy" />
                <MenuCardInfo>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <span className="price">{formatPrice(item.price)}</span>
                  <Button type="button" onClick={() => setSelectedItem(item)}>Adicionar</Button>
                </MenuCardInfo>
              </MenuCard>
            ))}
          </MenuGrid>
        </MenuSection>
      ))}
      {selectedItem && <ProductDialog item={selectedItem} restaurant={restaurant} onClose={() => setSelectedItem(null)} onAdded={() => { setNotice(`${selectedItem.name} adicionado ao carrinho.`); setSelectedItem(null) }} />}
    </Main>
  )
}

const Notice = styled.p`
  background: #edf5ea;
  border-left: 3px solid #65915b;
  color: #3d6934;
  padding: 12px 15px;
  border-radius: 3px;
  margin: 18px 0 0;
  font-size: 13px;
`
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10;
  background: rgba(31, 27, 24, .6);
  display: grid;
  place-items: center;
  padding: 18px;
`
const Dialog = styled.div`
  width: min(470px, 100%);
  max-height: min(720px, 92vh);
  overflow: auto;
  background: #fffdfa;
  border-radius: 6px;
  box-shadow: 0 20px 60px rgba(0,0,0,.25);
  position: relative;
  img { display: block; width: 100%; height: 235px; object-fit: cover; }
`
const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  border: 0;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  background: #fffdfa;
  color: #39332d;
  font-size: 20px;
  cursor: pointer;
`
const DialogContent = styled.div`
  padding: 22px;
  h2 { font: 700 26px/1.2 Georgia, serif; color: #37322e; margin: 0 0 9px; }
  p { color: #77716a; font-size: 13px; line-height: 1.6; margin: 0 0 17px; }
  strong { color: #a74242; font-size: 17px; }
`
const DialogActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 20px;
  button:last-child { flex: 1; }
`
const QuantityControl = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 13px;
  button { border: 1px solid #e2dacf; border-radius: 4px; width: 32px; height: 32px; background: #fff; color: #a74242; font-weight: 800; cursor: pointer; }
  span { min-width: 16px; text-align: center; font-weight: 700; }
`

function ProductDialog({ item, restaurant, onClose, onAdded }: { item: MenuItem; restaurant: Restaurant; onClose: () => void; onAdded: () => void }) {
  const [quantity, setQuantity] = useState(1)
  const addItem = useCart().addItem
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])
  const add = () => {
    for (let index = 0; index < quantity; index += 1) addItem(item, restaurant.id, restaurant.name)
    onAdded()
  }
  return (
    <Overlay onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <Dialog role="dialog" aria-modal="true" aria-labelledby="product-title">
        <CloseButton type="button" aria-label="Fechar" onClick={onClose}>×</CloseButton>
        <img src={item.image} alt="" />
        <DialogContent>
          <MenuCategory>{restaurant.name}</MenuCategory>
          <h2 id="product-title">{item.name}</h2>
          <p>{item.description}</p>
          <strong>{formatPrice(item.price)}</strong>
          <DialogActions>
            <QuantityControl aria-label="Quantidade">
              <button type="button" aria-label="Diminuir quantidade" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>−</button>
              <span aria-live="polite">{quantity}</span>
              <button type="button" aria-label="Aumentar quantidade" onClick={() => setQuantity((value) => value + 1)}>+</button>
            </QuantityControl>
            <Button type="button" onClick={add}>Adicionar ao carrinho · {formatPrice(item.price * quantity)}</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Overlay>
  )
}

const CartMain = styled(Main)`
  padding-top: 36px;
  max-width: 920px;
`
const CartLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 310px;
  gap: 24px;
  margin-top: 30px;
  align-items: start;
  @media (max-width: 760px) { grid-template-columns: 1fr; }
`
const CartList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`
const CartRow = styled.article`
  background: #fffdfa;
  border: 1px solid #e9e3da;
  border-radius: 5px;
  padding: 14px;
  display: grid;
  grid-template-columns: 86px minmax(0, 1fr) auto;
  gap: 14px;
  align-items: center;
  img { width: 86px; height: 78px; object-fit: cover; border-radius: 4px; }
  h3 { margin: 0 0 5px; font: 700 17px Georgia, serif; color: #37322e; }
  p { color: #817b74; font-size: 11px; margin: 0 0 7px; }
  .price { color: #a74242; font-size: 13px; font-weight: 800; }
  @media (max-width: 480px) { grid-template-columns: 68px minmax(0, 1fr) auto; gap: 9px; padding: 10px; img { width: 68px; height: 70px; } }
`
const RowControls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 9px;
  button { border: 0; color: #a74242; text-decoration: underline; background: transparent; font-size: 11px; cursor: pointer; padding: 2px; }
`
const Summary = styled.aside`
  background: #fffdfa;
  border: 1px solid #e9e3da;
  border-radius: 5px;
  padding: 20px;
  h2 { margin: 0 0 18px; font: 700 22px Georgia, serif; color: #37322e; }
  .summary-row { display: flex; justify-content: space-between; gap: 12px; color: #77716a; font-size: 13px; margin-bottom: 13px; }
  .total { border-top: 1px solid #e9e3da; padding-top: 15px; color: #37322e; font-size: 15px; font-weight: 800; margin: 4px 0 18px; }
  ${Button} { width: 100%; }
  small { display: block; color: #8a837a; font-size: 10px; line-height: 1.5; margin-top: 12px; }
`
const EmptyCart = styled.div`
  background: #fffdfa;
  border: 1px solid #e9e3da;
  border-radius: 5px;
  text-align: center;
  padding: 52px 24px;
  margin-top: 32px;
  .icon { font-size: 42px; }
  h2 { font: 700 25px Georgia, serif; color: #37322e; margin: 13px 0 7px; }
  p { color: #77716a; font-size: 13px; margin: 0 0 22px; }
`
const Success = styled(Notice)`
  margin-top: 20px;
`

function CartPage() {
  const { items, subtotal, changeQuantity, removeItem, clearCart } = useCart()
  const [message, setMessage] = useState('')
  const fee = items.length ? 6.9 : 0
  const total = subtotal + fee

  if (items.length === 0) {
    return (
      <CartMain>
        <Eyebrow>Seu pedido</Eyebrow><PageTitle>Carrinho</PageTitle>
        {message && <Success role="status">{message}</Success>}
        <EmptyCart>
          <div className="icon" aria-hidden="true">🛍️</div>
          <h2>Seu carrinho está vazio</h2>
          <p>Explore os restaurantes e encontre algo delicioso.</p>
          <FullButtonLink to="/">Ver restaurantes</FullButtonLink>
        </EmptyCart>
      </CartMain>
    )
  }

  return (
    <CartMain>
      <Eyebrow>Seu pedido</Eyebrow><PageTitle>Carrinho</PageTitle>
      <CartLayout>
        <CartList aria-label="Itens do carrinho">
          {items.map((line) => <CartItemRow key={`${line.restaurantId}-${line.item.id}`} line={line} onRemove={() => removeItem(line.item.id, line.restaurantId)} onChange={(amount) => changeQuantity(line.item.id, line.restaurantId, amount)} />)}
          <QuietButton type="button" onClick={clearCart}>Limpar carrinho</QuietButton>
        </CartList>
        <Summary>
          <h2>Resumo do pedido</h2>
          <div className="summary-row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
          <div className="summary-row"><span>Entrega</span><span>{formatPrice(fee)}</span></div>
          <div className="summary-row total"><span>Total</span><span>{formatPrice(total)}</span></div>
          <Button type="button" onClick={() => { setMessage('Pedido demonstrativo finalizado! Nenhum pagamento foi realizado.'); clearCart() }}>Finalizar pedido</Button>
          <small>Esta é uma demonstração. Nenhum pagamento ou pedido real será feito.</small>
        </Summary>
      </CartLayout>
    </CartMain>
  )
}

function CartItemRow({ line, onRemove, onChange }: { line: CartLine; onRemove: () => void; onChange: (amount: number) => void }) {
  return (
    <CartRow>
      <img src={line.item.image} alt="" />
      <div>
        <h3>{line.item.name}</h3>
        <p>{line.restaurantName}</p>
        <span className="price">{formatPrice(line.item.price * line.quantity)}</span>
      </div>
      <RowControls>
        <QuantityControl aria-label={`Quantidade de ${line.item.name}`}>
          <button type="button" aria-label={`Diminuir ${line.item.name}`} onClick={() => onChange(-1)}>−</button>
          <span>{line.quantity}</span>
          <button type="button" aria-label={`Aumentar ${line.item.name}`} onClick={() => onChange(1)}>+</button>
        </QuantityControl>
        <button type="button" onClick={onRemove}>Remover</button>
      </RowControls>
    </CartRow>
  )
}

function NotFound() {
  return (
    <Main>
      <EmptyCart>
        <h2>Não encontramos essa página</h2>
        <p>Mas podemos ajudar você a encontrar algo gostoso.</p>
        <FullButtonLink to="/">Ir para restaurantes</FullButtonLink>
      </EmptyCart>
    </Main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <GlobalStyle />
        <AppShell />
      </CartProvider>
    </BrowserRouter>
  )
}
