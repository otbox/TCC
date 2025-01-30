## API PHP 

Está API não segue nenhum tipo de arquitetura. Eu chamo de uma API RESTLess, foi criada, pois não tinha noções de REST, assim queria garantir que ninguém acessasse a API tão simplesmente com gets, então tudo é feito com com POST.
O arquivo Connect(1).php funciona como um hub, para ir para outras funções, eu não gostaria que a pessoa por meio do cliente, tivesse acesso aos meus códigos, então existe esse hub, e as outros arquivos ficam a uma refião inacessível pela web. 

Esta API comunica tanto o front-end, quanto o microcontroladores ou Arduinos. 