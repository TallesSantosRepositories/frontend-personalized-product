# Personalized Products — Frontend

Este projeto tem o intuito de ser a porta de entrada dos usuario que forem acessar o site de venda de produtos personalizados.  
Atualmente o projeto só contemplara canecas personalizadas, mas futuramente a ideia é expandir para copos stanley e até artigos de roupas personalizados.

---

## Rodando localmente

Para rodar localmente o projeto,
 - clonar o repositorio
 - dentro da raiz do projeto, baixar as dependencias: npm i
 - apontar o variavel `apiBaseUrl` para a api rodando localmente, ou para a de ambiente de homologação:
    - `https://staging.personalizedproducts/internal/api`
    - `http://staging.personalizedproducts/internal/api` *(devera ser configurado o acesso ao https, neste caso contatar o devops responsavel)*
- npm run dev para subir o servidor localmente
---

## Consensos do projeto

Os commits que entrarem na branch `developer` automativamente dispararão uma esteira que subira para o ambiente de staging na nuvem. Então para que seja possivel o rastreio de features e etc, devera ser implementado a solução com os seguintes padrões:

- `feature/[n° do card]/[descrição da branch caso queira]` — Esta branch devera ser guardada e estar atualizada com a main para o deploy na esteira para produção
- `merge/feature/[n° do card]/[descrição da branch caso queira]` — Esta branch é a que ira para developer, e devera ser solicitado MR para branch developer, e ter no mínimo uma aprovação para de fato ir para developer e trigar a esteira

O deploy para produção sera feito pelo devops responsavel todo final de semana.

---

> **Obs:** Esta primeira versão do README não possui informações de fato do projeto, somente explicação do processo a ser seguido.  
> Documentação e melhorias serão responsabilidade dos programadores que implementarem as features.