# gama_t3

> Chat sobre esse projeto e notificações de mudanças no repositório

[![Join the chat at https://gitter.im/gama-time-3/Lobby](https://badges.gitter.im/gama-time-3/Lobby.svg)](https://gitter.im/gama-time-3/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

##Projeto

Landing page para captação de leads para startup de mobilidade *DoDrive* http://wwwdodrive.com.br

##Stack

- Node.js
- Express
- Pattern MVC
- Handlebars
- Sass
- Material Design - Materialize
- Bower
- Grunt
- Banco de dados MongoDB (MongoLab)
- Pronto para Deploy automatizado no Heroku e no Azure

##Estrurura
```.
|--app
|   |-- assets
|       |-- components -> pasta gerenciada pelo bower
|       |-- img
|       |-- js
|       |-- sass
|         | -- style.scss -> toda alteracão em css deve ser feita aqui! assim que salvar gera um novo output.css
|   |-- controllers
|       |-- .. -> controladores
|   |-- models
|       |-- .. -> modelos (não estã sendo usado ainda)
|   |-- views
|       |-- layouts
|           | --main.handlebars -> master page
|       |-- partials
|           |--.. -> views parciais (topo e rodapé)
|-- config
|    |-- config.js -> configuracões do banco e portas
|-- www -> pasta gerada automaticamente
|    |-- ... -> após o comando de deploy no grunt, todos os arquivos serão preparados para producão e jogados aqui dentro
|-- app.js -> script de start do app - abre a conexao com o MongoDb
|-- bower.json -> todas as dependências do front-end
|-- package.json -> todas as dependências de desenvolvimento e do back-end
|-- Gruntfile.js -> todas as tarefas do Grunt são carregadas pelo 'load-grunt-tasks'
```

##Tarefas do Grunt
- Clean: limpar pastas temporárias, inclusive a `www` (gerada sempre no comando `grunt deploy`)
- Concat: concaneta todos os arquivos `css` e `js` e um arquivo único
- Copy: copia arquivos de pastas temporárias para a `www`
- Cssmin: minifica o arquivo `css` gerado com a tarefa `concat`
- Sass: compila o `style.scss` e joga o resultado no `output.css` - executado na tarefa `watch`
- Ugllify: __minifica__ os arquivos `js`
- Watch: espera alterações nos arquivos `js`, `css`, `handlebars` e `bower.json`
- Develop: trata de subir o servidor local
- String-replace: substitui algumas strings nos `handlebars` (ajustes de referências de `js` e `css`)
- Uncss: exclui classes `css` não utilizadas no `html`(`handlebars` no caso) (cuidado ao usar isso)
- Usemin: trocas as referências dos `js` e `css` para os novos arquivos gerados pelo *useminPrepare*
- Wiredep: injeta as dependências instaladas pelo *Bower* - executado na tarefa `watch` que rastreia alterações no arquivo `bower.json`
- Time-grunt: apenas para mostrar o tempo de execução das tarefas do grunt no terminal

##Wokflow de de Desenvolvimento

- Execute o comando `grunt` na raiz do projeto, isso irá compilar o `sass`, subir o servidor local do `express`, abrir o navegador com o projeto rodando com __livereload__ e executar a tarefa `watch` esperando qualquer alteração no `scss`, `js` ou `handlebars` - qualquer alteração nesses arquivos é refletida no navegador sem precisar dar __reload__ na página
- Execute o comando `grunt deploy` para fazer o __deploy__ dos novos arquivos - isso irá excluir a pasta `www`, compilar todos os arquivos `js` e `css`, concatenar, __uglificar__, minificar, mudar as referências na __master page__ e enviar tudo para a pasta `www` pronta pra deploy no `Heroku` ou `Azure`
- Deploy para produção: com as credenciais certas e os `git remote` adicionados, basta fazer um __commit__ na `master` do Heroku `git push heroku master` ou no Azure `git push azure master`


##Preparar o Ambiente
- faça um `clone` ou `download` desse repositorio e rode `npm install && bower install`
