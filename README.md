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
 
       -  O uso de ThemeProvider para gerenciar o estado do tema, permitindo que diferentes implementações de gerenciamento de tema possam ser injetadas sem modificar os componentes que utilizam o tema.

# 2. Plugin de Extração de Dados

## 2.1. Descrição

O Plugin extrai dados da página web e os envia para a API. Ele é ativado por um botão injetado na página e fornece feedback sobre a conclusão, andamento ou erros da extração.

## 2.2. Funcionalidades

- Validação do token
- Feedback visual das informações que serão extraídas
- Extração de dados do dispositivo, sistema operacional, origem (domínio) e contagem de mudanças de tema
- Feedback visual de conclusão
- Feedback visual de erro
- Feedback visual de token inválido
- Feedback visual de loading

## 2.3. Estrutura do Diretório
```bash
/Plugin
  /public
  /src
    /core
      /@types
      /config
      /entities
    /infra
      /api
      /browser
    /repositories
    /ui
    /usecases
    /utils
    global.d.ts
    main.ts
    vite-env.d.ts
  /test
  .env.local
  .gitignore
  index.html
  jest.config.cjs
  package.json
  tsconfig.json
  vite.config.ts
```

### 2.4. Padrões de Projeto Utilizados e Motivações
  
##### 2.4.1. Singleton Pattern:
 - *Motivação: Garantir que uma classe tenha apenas uma única instância e fornecer um ponto global de acesso a essa instância. Foi útil pela necessidade de gerenciar um recurso compartilhado, como os repositories.*
 
  - *Exemplo na Aplicação: A classe AnalyticsDataRepository foi implementada como um Singleton para garantir que apenas uma instância seja usada para acessar e salvar dados de analytics, evitando inconsistências e duplicações.*

##### 2.4.2. Dependency Injection:
 - *Motivação: Promover a flexibilidade e a testabilidade do código ao injetar dependências em vez de criá-las internamente. Isso permite substituir facilmente as dependências por mocks ou stubs durante os testes, além de facilitar a troca de implementações em tempo de execução.*
 
  - *Exemplo na Aplicação: Dependências como repositórios (TokenValidateRepository, BrowserAnalyticsRepository) são injetadas nas classes que as utilizam, promovendo a inversão de controle e facilitando a substituição das implementações concretas por alternativas de teste.*
  
### 2.5. Regras de SOLID e Clean Architecture
O plugin de extração de dados foi desenvolvido seguindo tanto os princípios do SOLID quanto os conceitos de Clean Architecture, garantindo um código limpo, modular e fácil de manter.

##### 2.5.1. Single Responsibility Principle (SRP):
 - *Motivação: Cada classe ou módulo deve ter uma única responsabilidade.*
 
       -  A classe AnalyticsData é responsável apenas pela modelagem dos dados de analytics.
       -  A classe TokenValidateRepository lida exclusivamente com a validação dos tokens.
       
##### 2.5.2. Open/Closed Principle (OCP):
 - *Motivação: O código deve ser aberto para extensão, mas fechado para modificação.*
- *Exemplo na Aplicação:*
 
       -  A classe BrowserAnalyticsRepository pode ser estendida para suportar novos métodos de extração de dados sem alterar a implementação existente.
      
##### 2.5.3. Liskov Substitution Principle (LSP):
 - *Motivação: Subclasses devem poder substituir suas classes base sem alterar o comportamento esperado.*
 
       -  Implementações de IGetBrowserAnalyticsRepository devem funcionar de maneira intercambiável sem alterar o comportamento do sistema.
             
##### 2.5.4. Interface Segregation Principle (ISP):
 - *Motivação: Muitas interfaces específicas são melhores do que uma interface geral única.*
 
       -  Interfaces específicas para diferentes tipos de repositórios (IAnalyticsDataRepository, IGetBrowserAnalyticsRepository) em vez de uma interface genérica.
       
##### 2.5.5. Dependency Inversion Principle (DIP):
 - *Motivação: Depender de abstrações, não de implementações concretas.*
 - *Exemplo na Aplicação:*
 
       -  O uso de injeção de dependência para fornecer repositórios e serviços ao invés de criar instâncias diretamente dentro das classes.
       
##### 2.5.6. Clean Architecture:

###### 2.5.6.1. Camadas da Arquitetura:
 - *Motivação: Separar as responsabilidades em camadas distintas para promover a independência da implementação e a testabilidade.*
 - *Exemplo na Aplicação:*
 
       -  Entities: Contém as entidades de domínio (AnalyticsData), que são objetos de negócios que não dependem de frameworks ou bibliotecas externas.
       -  Use Cases: Contém a lógica de aplicação (GetAnalyticsDataUseCase, SaveAnalyticsDataUseCase), coordenando a interação entre as entidades e os repositórios.
       -  Interface Adapters: Adaptadores e transformadores que convertem dados entre a camada de aplicação e a camada de infraestrutura
       -  Frameworks and Drivers: Contém implementações específicas de frameworks e bibliotecas externas (Api, BrowserAnalyticsRepository).
      
###### 2.5.6.2. Independência da Framework:
 - *Motivação: A aplicação não deve depender de detalhes da framework. A framework deve ser facilmente substituível.*
 - *Exemplo na Aplicação:*
 
       -  A camada de infraestrutura pode ser trocada sem impactar a lógica de negócios ou a camada de aplicação. Por exemplo, substituir a implementação de Api ou BrowserAnalyticsRepository por outra biblioteca.
       
###### 2.5.6.3. Teste Independente:
 - *Motivação: Cada camada deve ser testável de forma independente, promovendo a testabilidade e facilitando a detecção de problemas.*
 - *Exemplo na Aplicação:*
 
       -  Testes unitários foram implementados para verificar a funcionalidade de cada use case, entidade e repositório de forma isolada.

##### 2.5.7 Resumo
A adoção desses princípios e padrões de projeto garante que a aplicação seja robusta, fácil de manter e extensível, permitindo que novas funcionalidades sejam adicionadas com mínimo impacto no código existente.
     


