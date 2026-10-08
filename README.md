# EPLAY — loja demonstrativa de games

Loja front-end responsiva criada com React, TypeScript, Vite, React Router, Redux Toolkit e Styled Components. As artes fornecidas para o exercício estão em `public/images`.

## Funcionalidades

- Vitrine de jogos com busca e filtros por gênero.
- Carrinho controlado pelo Redux Toolkit e compartilhado entre rotas.
- Adição, remoção e ajuste da quantidade dos jogos.
- Total da compra calculado pela soma do preço dos jogos multiplicado pelas quantidades.
- Layout responsivo baseado nos assets de identidade visual do exercício.

## Dados e limitações

Os jogos, descrições e preços são demonstrativos e estão definidos em `src/data.ts`. O carrinho é mantido em memória e reinicia ao recarregar a página. O botão para continuar ao pagamento apresenta uma confirmação demonstrativa; não há checkout, integração de pagamento ou envio de pedidos.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Validação

```bash
npm run build
npm run lint
```
