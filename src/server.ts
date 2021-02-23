// Comandos utilziados para o node:

/*
 npm init -y => inicia o projeto node 
 npm install typescript -D => instala as dependencias do ts, como dependencia de desenvolvimento
 npx tsc --init => arquivo de config ts
 npm install ts-node-dev -D => dependencia para monitorar o código caso há alguma alteração restarta o serv

 Atualizar o target para o es2017 dentro do tsconfig.json

 npm install @types/express => tipagem do framework

 No package.json adicionar as flags dentro do objeto scripts na propriedade start
 para não converter o conteúdo em node modules, e para converter o que criamos para js sem verificação de erros
 além da funcionalidade do serve ficar sempre executando e reiniciar automaticamente quando verificar mudanças
*/

import express from 'express'; /* Framework para facilitar a config do servidor e utilziação */
import routes from './routes';
import cors from 'cors';

const app = express();

//Permite que mesmo que a api esteja em outro endereço localhost:3333 seja utilizada pelo front localhost:3000
app.use(cors());  

// Por padrão o express não entende o formato jsson,precisa importar
app.use(express.json());

app.use(routes);

//localhost:3333

app.listen(3333); //Ouvir requests http (porta)
