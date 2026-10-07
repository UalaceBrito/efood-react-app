# efood — demonstração de delivery

Aplicação front-end demonstrativa de delivery criada com React, TypeScript, Vite, React Router e Styled Components. A referência Figma informada não estava acessível (retornava HTTP 403); por isso, a interface segue a linguagem visual efood/EBAC indicada: fundo `#f4f1ea`, marca vermelha, navegação centralizada e cards de restaurantes com fotos, etiquetas e ações.

## Escopo

- Página inicial com busca, filtros por tipo de cozinha e cards de restaurantes.
- Perfil de cada restaurante com cardápio dividido por categoria.
- Modal acessível para consultar um produto e escolher quantidade.
- Carrinho compartilhado entre rotas, com ajuste de quantidades, remoção, resumo e CTA demonstrativo.
- Layout responsivo para telas menores e maiores.

## Dados e limitações

Todos os restaurantes, itens, preços, avaliações, taxas e tempos são **dados demonstrativos locais** definidos em `src/data.ts`. O carrinho vive apenas em memória e é reiniciado ao recarregar a página. As fotografias usam URLs públicas do Unsplash e precisam de conexão com a internet para aparecer.

O CTA “Finalizar pedido” apenas apresenta uma confirmação demonstrativa e limpa o carrinho. Não existe checkout real, coleta de dados de cartão, integração com API/backend, autenticação ou envio de pedidos.

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
