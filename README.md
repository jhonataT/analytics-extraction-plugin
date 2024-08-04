# Descrição Geral

Esta documentação detalha a aplicação desenvolvida para extrair dados de uso de uma página web estática, enviá-los para o *Firebase Realtime Database* e disponibilizar esses dados através de uma API. A aplicação é composta por três partes principais: Página de Teste, Plugin de Extração de Dados e API. A arquitetura segue princípios de Clean Architecture, SOLID e utiliza diversos padrões de projeto.

# Estrutura do Repositório

A aplicação foi organizada como um monorepo com a seguinte estrutura:

```
Root/
  Page/
  Plugin/
  API/
```


# 1.  Página de Teste

## 1.1. Descrição

A Página de Teste fornece um ambiente para testar a instalação e funcionamento do Plugin de Extração de Dados. A página foi desenvolvida usando NodeJS, TypeScript e React, e segue os padrões de acessibilidade WCAG.

## 1.2. Funcionalidades

- Alternância entre temas Dark Mode e Light Mode
- Validação de código da W3C
- Acessibilidade
- Testes unitários

## 1.3. Estrutura do Diretório
```bash
/Page
  /cypress
  /public
  /src
    /assets
      /Images
    /components
      /Button
      /Container
      /Footer
      /Header
      /ProfilePhoto
      /Section
      /SwitchThemeMode
    /containers
      /AboutContainer
      /HomeContainer
      /PostsContainer
      /ProjectsContainer
    /core
      /providers
      /utils
    /screens
      /AboutScreen
      /HomeScreen
      /PostsScreen
      /ProjectsScreen
    /styles
      Global.ts
      Theme.ts
    App.tsx
    main.tsx
    vite-env.d.ts
  .eslintrc.cjs
  .gitignore
  cypress.config.ts
  index.html
  package.json
  README.md
  tsconfig.app.json
  tsconfig.json
  tsconfig.node.json
  vite.config.ts
```

### 1.4. Padrões de Projeto Utilizados e Motivações

##### 1.4.1. Componentização: Organização da UI em componentes reutilizáveis.
 - *Motivação: Facilitar a reutilização, manutenção e teste de componentes. Além de promover uma estrutura mais organizada e legível. Cada componente é responsável por uma parte específica da interface, o que torna o código mais modular e fácil de entender.*
 
  - *Exemplo na Aplicação: Componentes como Button, Header, Footer, Container são usados para encapsular partes específicas da UI, garantindo que possam ser reutilizados em diferentes partes da aplicação.*
  
##### 1.4.2. Hooks: Utilização de custom hooks, separando responsabilidades
 - *Motivação: Foi utilizado Custom hooks para permitir a separação das responsabilidades relacionadas ao estado e lógica de negócios da interface de usuário. Além disso, com as custom hooks, foi possível a reutilização de lógica entre diferentes componentes sem duplicação de código.*
 
  - *Exemplo na Aplicação: Custom hooks são usados para gerenciar a lógica de alternância de temas entre Dark Mode e Light Mode. Isso permite que a lógica de mudança de tema seja reutilizada por diferentes componentes, mantendo a consistência e simplificando a manutenção.*
  
##### 1.4.3. Providers: Gerenciamento de estado global e contexto
 - *Motivação: Houve a necessidade de gerenciamento do esttado global e o contexto da aplicação. Dessa forma, os providers permitiram a passagem de dados e funções entre componentes sem a necessidade de prop drilling, facilitando o gerenciamento do estado e a comunicação entre componentes em diferentes níveis da árvore de componentes.*
 
  - *Exemplo na Aplicação: Providers são utilizados para gerenciar o tema da aplicação (Dark Mode e Light Mode). Um ThemeProvider fornece o estado do tema e funções para alterá-lo, permitindo que qualquer componente na árvore de componentes acesse e modifique o tema conforme necessário.*
 
##### 1.4.4. Resumo:
- Os Design Paterns utilizados são essenciais para manter a aplicação escalável, modular e de fácil manutenção, garantindo que cada parte dos sistema seja claramente definida e facilmente testável.

### 1.5. Regras Isoladas (Seguindo SOLID)
A página de teste foi desenvolvida seguindo os princípios do SOLID, assegurando que cada componente e container tenha responsabilidades bem definidas e que o código seja modular e de fácil manutenção.

##### 1.5.1. Single Responsibility Principle (SRP):
 - *Motivação: Cada componente deve ter uma única responsabilidade. Isso facilita a compreensão, manutenção e teste do componente.*
- *Exemplo na Aplicação:*
 
       -  O componente Button é responsável apenas por renderizar um botão.
       -  O componente Header lida exclusivamente com a renderização do cabeçalho da página.
       
##### 1.5.2. Open/Closed Principle (OCP):
 - *Motivação: Os componentes devem estar abertos para extensão, mas fechados para modificação. Isso permite adicionar novas funcionalidades sem alterar o código existente.*
 - *Exemplo na Aplicação:*
 
       -  O componente SwitchThemeMode pode ser estendido para suportar novos temas sem modificar sua implementação atual.
     
##### 1.5.3. Liskov Substitution Principle (LSP):
 - *Motivação: Subclasses devem poder substituir suas classes base sem alterar o comportamento esperado do programa.*
 - *Exemplo na Aplicação:*
 
       -  Componentes que herdam de um componente base devem manter a compatibilidade e o comportamento esperado, garantindo que qualquer instância de um componente derivado funcione conforme o esperado.
       
##### 1.5.4. Dependency Inversion Principle (DIP):
 - *Motivação: Depender de abstrações, não de implementações concretas. Isso promove a reutilização de código e facilita a substituição de dependências.*
 - *Exemplo na Aplicação:*

       -  O uso de ThemeProvider para gerenciar o estado do tema, permitindo que diferentes implementações de gerenciamento de tema possam ser injetadas sem modificar os componentes que utilizam o tema.

# 3. API

## 3.1. Descrição

A API recebe os dados extraídos e os armazena no Firebase Realtime Database. Foi desenvolvida para processar e gerenciar as solicitações de dados de analytics.

## 3.2. Funcionalidades

- Recepção e armazenamento de dados de analytics (/collect)
- Processamento de dados recebidos
- Integração com o Firebase Realtime Database
- Testes unitários
- Token JWT
- Restrição de acesso (5 requisições a cada 10 minutos por token)
- Listagem do histórico de extrações (/list ou /list?id=ID_DO_TOKEN)

## 3.3. Estrutura do Diretório
```bash
/API
  /src
    /controllers
    /middlewares
    /repositories
    /routes
    /services
    /utils
    app.ts
  .env
  .gitignore
  jest.config.cjs
  package.json
  tsconfig.json
```

### 3.4. Padrões de Projeto Utilizados e Motivações
  
##### 3.4.1. Repository Pattern:
 - *Motivação: Separar a lógica de acesso a dados da lógica de negócios, promovendo uma interface clara para acessar e manipular dados.*
 
  - *Exemplo na Aplicação: A classe AnalyticsDataRepository é responsável por interagir com o Firebase Realtime Database, isolando a lógica de acesso a dados da lógica de processamento de dados.*

##### 3.4.2. Middleware:
 - *Motivação: Modularizar o processamento das requisições HTTP, adicionando funcionalidades como autenticação, validação e logging de forma centralizada.*
 
  - *Exemplo na Aplicação: Middlewares são usados para validar tokens, verificar o limite de acesso e processar as requisições antes que elas cheguem aos controladores.*
  
##### 3.4.3. Service Layer:
 - *Motivação: Encapsular a lógica de negócios em serviços, permitindo que os controladores se concentrem apenas na manipulação das requisições e respostas.*
 
  - *Exemplo na Aplicação: Services são utilizados para processar e manipular dados de analytics, garantindo que a lógica de negócios esteja isolada e facilmente testável.*
  
### 3.5. Regras de SOLID e Clean Architecture
A API foi desenvolvida seguindo princípios SOLID e Clean Architecture para garantir um código modular, extensível e de fácil manutenção.

##### 3.5.1. Single Responsibility Principle (SRP):
 - *Motivação: Cada classe ou módulo deve ter uma única responsabilidade.*
  - *Exemplo na Aplicação:*

       -  Controladores lidam apenas com o processamento das requisições.
       -  Serviços lidam com a lógica de negócios.
       
##### 2.5.2. Open/Closed Principle (OCP):
 - *Motivação: O código deve ser aberto para extensão, mas fechado para modificação.*
- *Exemplo na Aplicação:*
 
       - O código da API pode ser estendido com novos endpoints e serviços sem alterar o código existente.
      
##### 2.5.3. Liskov Substitution Principle (LSP):
 - *Motivação: Subclasses devem poder substituir suas classes base sem alterar o comportamento esperado.*
  - *Exemplo na Aplicação:*

       -  Qualquer implementação de repositório deve manter a compatibilidade com a interface esperada, permitindo a substituição das implementações conforme necessário.
       
##### 2.5.4. Dependency Inversion Principle (DIP):
 - *Motivação: Depender de abstrações, não de implementações concretas.*
 - *Exemplo na Aplicação:*
 
       -  A API depende de abstrações para interagir com os repositórios e serviços, facilitando a substituição e a extensão do sistema sem alterar o código base.
       
##### 2.5.6. Clean Architecture:
 - *Motivação: Separar o sistema em camadas distintas para promover a separação de responsabilidades e permitir a flexibilidade de substituir partes do sistema sem afetar outras.*
 - *Exemplo na Aplicação:*
 
       -  Entidades: Representam o núcleo do sistema, encapsulando as regras de negócios e dados (por exemplo, AnalyticsData).
       -  Use Cases: Contêm a lógica de aplicação específica e coordenam o fluxo de dados entre as entidades e os repositórios (por exemplo, casos de uso para processar e armazenar dados de analytics).
       -  Interface Adapters: Incluem controladores e transformadores que convertem dados entre o formato necessário para a lógica de negócios e o formato requerido pela API (por exemplo, adaptadores de API).
       -  Frameworks e Drivers: Incluem a implementação concreta de frameworks e bibliotecas que interagem com o sistema (por exemplo, integração com o Firebase Realtime Database).
      

##### 2.5.8 Conclusão
Esta documentação fornece uma visão geral completa da aplicação, incluindo a estrutura do repositório, as funcionalidades de cada componente e os padrões de projeto utilizados

