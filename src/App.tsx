import { useMemo, useState } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import { useCart, type CartLine } from './cart-store'
import { formatPrice, games, type MenuItem } from './data'

const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
  :root { font-family: Inter, 'Segoe UI', Arial, sans-serif; color: #f5f5f5; background: #111; font-synthesis: none; text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; }
  body { margin: 0; min-width: 320px; min-height: 100vh; }
  button, input { font: inherit; }
  button, a { -webkit-tap-highlight-color: transparent; }
  a { color: inherit; }
  button:focus-visible, a:focus-visible, input:focus-visible { outline: 3px solid #e7313e; outline-offset: 3px; }
  ::selection { background: #e7313e; color: white; }
`

const Page = styled.div`
  min-height: 100vh;
  background: #111;
`
const Header = styled.header`
  height: 76px;
  padding: 0 max(24px, calc((100vw - 1180px) / 2));
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #080808;
  border-bottom: 1px solid #282828;
  img { display: block; width: 78px; height: 34px; }
  @media (max-width: 580px) { padding: 0 18px; height: 66px; }
`
const CartLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  img { width: 26px; height: 26px; object-fit: contain; }
  .count { display: grid; place-items: center; min-width: 20px; height: 20px; padding: 0 5px; background: #e7313e; border-radius: 12px; font-size: 11px; }
`
const Main = styled.main`
  width: min(1180px, calc(100% - 48px));
  margin: 0 auto;
  @media (max-width: 580px) { width: calc(100% - 32px); }
`
const Hero = styled.section`
  height: clamp(260px, 39vw, 440px);
  margin: 28px 0 48px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  background: #1b2025 url('/images/banner-homem-aranha.png') center 34% / cover no-repeat;
  display: flex;
  align-items: end;
  &::before { content: ''; position: absolute; inset: 0; background: linear-gradient(0deg, rgba(0,0,0,.9), rgba(0,0,0,.02) 76%); }
  @media (max-width: 580px) { margin: 18px 0 34px; height: 250px; background-position: 50% 24%; }
`
const HeroCopy = styled.div`
  z-index: 1;
  padding: 32px 38px;
  h1 { font-size: clamp(27px, 4vw, 44px); line-height: 1.08; margin: 0 0 8px; letter-spacing: -.8px; }
  p { color: #dedede; margin: 0; font-size: 14px; }
  @media (max-width: 580px) { padding: 22px; }
`
const Eyebrow = styled.p`
  color: #ee3945 !important;
  font-size: 11px !important;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.8px;
  margin: 0 0 9px !important;
`
const SectionTop = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 20px;
  h2 { margin: 0; font-size: 25px; }
  p { margin: 6px 0 0; color: #999; font-size: 13px; }
  @media (max-width: 620px) { align-items: stretch; flex-direction: column; }
`
const Search = styled.input`
  height: 40px;
  width: min(290px, 100%);
  padding: 0 12px;
  color: white;
  background: #1a1a1a;
  border: 1px solid #3a3a3a;
  border-radius: 4px;
  &::placeholder { color: #929292; }
`
const Filters = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 2px 2px 14px;
  margin-bottom: 8px;
`
const Filter = styled.button<{ $active: boolean }>`
  flex: 0 0 auto;
  padding: 8px 14px;
  border: 1px solid ${({ $active }) => $active ? '#e7313e' : '#373737'};
  border-radius: 22px;
  color: ${({ $active }) => $active ? 'white' : '#c8c8c8'};
  background: ${({ $active }) => $active ? '#e7313e' : '#191919'};
  font-size: 12px;
  cursor: pointer;
`
const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  @media (max-width: 820px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media (max-width: 540px) { grid-template-columns: 1fr; }
`
const GameCard = styled.article`
  min-width: 0;
  overflow: hidden;
  background: #1a1a1a;
  border: 1px solid #2e2e2e;
  border-radius: 6px;
  transition: transform .18s ease, border-color .18s ease;
  &:hover { transform: translateY(-3px); border-color: #5b3033; }
`
const Cover = styled.div`
  height: 220px;
  position: relative;
  background: #242424;
  img { display: block; width: 100%; height: 100%; object-fit: cover; }
  @media (max-width: 540px) { height: 245px; }
`
const Category = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 6px 9px;
  color: white;
  background: rgba(12,12,12,.78);
  border: 1px solid rgba(255,255,255,.15);
  border-radius: 3px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .6px;
`
const CardBody = styled.div`
  padding: 16px;
  h3 { min-height: 42px; margin: 0 0 7px; font-size: 17px; line-height: 1.25; }
  p { min-height: 54px; margin: 0 0 16px; color: #aaa; font-size: 12px; line-height: 1.5; }
`
const CardBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  strong { color: #fff; font-size: 16px; white-space: nowrap; }
`
const Button = styled.button`
  min-height: 38px;
  border: 0;
  border-radius: 4px;
  padding: 9px 13px;
  color: white;
  background: #d82c39;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  transition: background .15s ease;
  &:hover { background: #f03b49; }
  &:disabled { background: #555; cursor: not-allowed; }
`
const Empty = styled.p`
  grid-column: 1 / -1;
  padding: 32px;
  color: #aaa;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 5px;
  text-align: center;
`
const Footer = styled.footer`
  margin-top: 58px;
  padding: 24px 16px;
  color: #888;
  text-align: center;
  border-top: 1px solid #292929;
  font-size: 12px;
`
const CartMain = styled(Main)`
  max-width: 930px;
  padding-top: 42px;
  h1 { margin: 0; font-size: clamp(32px, 5vw, 44px); }
`
const CartLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 290px;
  gap: 22px;
  margin-top: 28px;
  align-items: start;
  @media (max-width: 740px) { grid-template-columns: 1fr; }
`
const CartList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`
const CartRow = styled.article`
  display: grid;
  grid-template-columns: 82px minmax(0, 1fr) auto;
  align-items: center;
  gap: 14px;
  padding: 12px;
  background: #1a1a1a;
  border: 1px solid #303030;
  border-radius: 5px;
  img { width: 82px; height: 86px; object-fit: cover; border-radius: 3px; }
  h2 { font-size: 15px; margin: 0 0 7px; }
  p { color: #aaa; font-size: 12px; margin: 0 0 8px; }
  strong { color: #f1f1f1; font-size: 13px; }
  @media (max-width: 480px) { grid-template-columns: 66px minmax(0, 1fr); gap: 10px; img { width: 66px; height: 78px; } }
`
const RowActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 10px;
  @media (max-width: 480px) { grid-column: 2; flex-direction: row; align-items: center; justify-content: space-between; }
`
const Quantity = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  button { width: 28px; height: 28px; border: 1px solid #444; border-radius: 4px; color: white; background: #242424; font-weight: 800; cursor: pointer; }
  span { min-width: 15px; text-align: center; font-size: 13px; }
`
const Remove = styled.button`
  border: 0;
  color: #ff727b;
  background: transparent;
  font-size: 11px;
  text-decoration: underline;
  cursor: pointer;
`
const Summary = styled.aside`
  padding: 20px;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 5px;
  h2 { margin: 0 0 20px; font-size: 18px; }
  .total { display: flex; justify-content: space-between; gap: 10px; padding: 16px 0; border-top: 1px solid #3a3a3a; font-size: 14px; font-weight: 800; }
  .total strong { color: white; }
  ${Button} { width: 100%; }
`
const EmptyCart = styled.div`
  margin-top: 26px;
  padding: 55px 22px;
  text-align: center;
  background: #1a1a1a;
  border: 1px solid #303030;
  border-radius: 5px;
  img { width: 46px; height: 46px; object-fit: contain; opacity: .8; }
  h2 { margin: 14px 0 8px; font-size: 21px; }
  p { margin: 0 0 20px; color: #aaa; font-size: 13px; }
`
const BackLink = styled(Link)`
  display: inline-block;
  margin-top: 25px;
  color: #ff6872;
  text-decoration: none;
  font-size: 13px;
  font-weight: 700;
  &:hover { text-decoration: underline; }
`

function StorePage() {
  const { addItem } = useCart()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Todos')
  const categories = ['Todos', ...new Set(games.map((game) => game.category))]
  const filteredGames = useMemo(
    () => games.filter((game) =>
      (category === 'Todos' || game.category === category)
      && `${game.name} ${game.description}`.toLocaleLowerCase('pt-BR').includes(query.toLocaleLowerCase('pt-BR')),
    ),
    [category, query],
  )

  return (
    <Main>
      <Hero>
        <HeroCopy>
          <Eyebrow>eplay • jogos para todos os estilos</Eyebrow>
          <h1>A próxima aventura começa aqui.</h1>
          <p>Encontre seu próximo jogo favorito.</p>
        </HeroCopy>
      </Hero>
      <SectionTop>
        <div><h2>Explore os jogos</h2><p>Grandes histórias. Novas aventuras.</p></div>
        <Search aria-label="Buscar jogos" placeholder="Buscar jogo" value={query} onChange={(event) => setQuery(event.target.value)} />
      </SectionTop>
      <Filters aria-label="Filtrar por gênero">
        {categories.map((item) => (
          <Filter key={item} type="button" $active={category === item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</Filter>
        ))}
      </Filters>
      <GameGrid>
        {filteredGames.length
          ? filteredGames.map((game) => <GameCardView key={game.id} game={game} onAdd={() => addItem(game, 'eplay', 'EPLAY')} />)
          : <Empty>Nenhum jogo encontrado. Tente outra busca.</Empty>}
      </GameGrid>
      <Footer>Seu próximo jogo favorito está na <strong>EPLAY</strong>.</Footer>
    </Main>
  )
}

function GameCardView({ game, onAdd }: { game: MenuItem; onAdd: () => void }) {
  return (
    <GameCard>
      <Cover>
        <img src={game.image} alt={`Capa de ${game.name}`} loading="lazy" />
        <Category>{game.category}</Category>
      </Cover>
      <CardBody>
        <h3>{game.name}</h3>
        <p>{game.description}</p>
        <CardBottom><strong>{formatPrice(game.price)}</strong><Button type="button" onClick={onAdd}>Adicionar ao carrinho</Button></CardBottom>
      </CardBody>
    </GameCard>
  )
}

function CartPage() {
  const { items, count, subtotal, changeQuantity, removeItem, clearCart } = useCart()

  return (
    <CartMain>
      <Eyebrow>eplay • sua seleção</Eyebrow>
      <h1>Carrinho</h1>
      {items.length === 0 ? (
        <EmptyCart>
          <img src="/images/carrinho.svg" alt="" />
          <h2>Seu carrinho está vazio</h2>
          <p>Escolha um jogo e sua próxima aventura começa aqui.</p>
          <ButtonLink />
        </EmptyCart>
      ) : (
        <CartLayout>
          <CartList aria-label="Jogos no carrinho">
            {items.map((line) => (
              <CartItem
                key={`${line.restaurantId}-${line.item.id}`}
                line={line}
                onRemove={() => removeItem(line.item.id, line.restaurantId)}
                onChange={(amount) => changeQuantity(line.item.id, line.restaurantId, amount)}
              />
            ))}
            <RemoveAll type="button" onClick={clearCart}>Esvaziar carrinho</RemoveAll>
          </CartList>
          <Summary>
            <h2>Resumo da compra</h2>
            <div className="total"><span>Total ({count} {count === 1 ? 'item' : 'itens'})</span><strong>{formatPrice(subtotal)}</strong></div>
            <Button type="button" onClick={() => window.alert('Compra demonstrativa: nenhum pagamento foi realizado.')}>Continuar para pagamento</Button>
          </Summary>
        </CartLayout>
      )}
      <BackLink to="/">← Continuar comprando</BackLink>
    </CartMain>
  )
}

function ButtonLink() {
  return <LinkButton to="/">Ver jogos</LinkButton>
}

const LinkButton = styled(Link)`
  display: inline-block;
  border-radius: 4px;
  padding: 10px 16px;
  color: white;
  background: #d82c39;
  text-decoration: none;
  font-size: 12px;
  font-weight: 800;
  &:hover { background: #f03b49; }
`
const RemoveAll = styled(Remove)`
  align-self: flex-start;
  padding: 8px 0;
  font-size: 12px;
`

function CartItem({ line, onRemove, onChange }: { line: CartLine; onRemove: () => void; onChange: (amount: number) => void }) {
  return (
    <CartRow>
      <img src={line.item.image} alt={`Capa de ${line.item.name}`} />
      <div>
        <h2>{line.item.name}</h2>
        <p>{formatPrice(line.item.price)} cada</p>
        <strong>{formatPrice(line.item.price * line.quantity)}</strong>
      </div>
      <RowActions>
        <Quantity aria-label={`Quantidade de ${line.item.name}`}>
          <button type="button" aria-label={`Diminuir ${line.item.name}`} onClick={() => onChange(-1)}>−</button>
          <span>{line.quantity}</span>
          <button type="button" aria-label={`Aumentar ${line.item.name}`} onClick={() => onChange(1)}>+</button>
        </Quantity>
        <Remove type="button" onClick={onRemove}>Remover</Remove>
      </RowActions>
    </CartRow>
  )
}

function NotFound() {
  return <Main><Empty>Esta página não existe. <LinkButton to="/">Voltar à loja</LinkButton></Empty></Main>
}

function AppShell() {
  const { count } = useCart()
  return (
    <Page>
      <Header>
        <Link to="/" aria-label="EPLAY, página inicial"><img src="/images/logo.svg" alt="EPLAY" /></Link>
        <CartLink to="/carrinho" aria-label={`Carrinho, ${count} ${count === 1 ? 'item' : 'itens'}`}>
          <img src="/images/carrinho.svg" alt="" />
          <span>Carrinho</span><span className="count">{count}</span>
        </CartLink>
      </Header>
      <Routes>
        <Route path="/" element={<StorePage />} />
        <Route path="/carrinho" element={<CartPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Page>
  )
}

export default function App() {
  return <BrowserRouter><GlobalStyle /><AppShell /></BrowserRouter>
}
